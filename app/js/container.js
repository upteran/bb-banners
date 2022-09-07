import * as PIXI from 'pixi.js';
// import 'pixi-spine';
import { BANNER } from './banner';
import { simpleDark } from '../data/effects/simpleDark';
import banners from '../data/banners/banners.json';
// Массив данных из JSON файла
let app;
// let bannerUrl = '../data/banners/banners.json'; //Путь к JSON файлу с описанием баннеров
let currentBanner; // По умолчанию стартует первый баннер в очереди
const textures = []; // Хранилище текстур для всех баннеров

let mainBlock; // Корневой контеинер

let parameters; // Общие параметры канваса

let shift = 1; // Значение альфы для перехода между баннерами
let filter; // Фильтр-шейдр области перехода между баннерами
let callback; // Возвращает значение когда транзишн перехода затемнен

let btnArrow;

let mergedBanners = banners;

// TODO: перенести все внутрь класса, чтобы удобнее было работать с данными
class CONTAINER {
  constructor({ params, root, canvas, container, contentData }) {
    parameters = params;
    currentBanner = parameters.steps[0];
    this.root = root;
    this.container = container;
    this.canvas = canvas;
    // TODO: добавить обработку разных кейсов
    this.contentData = contentData.reduce((acc, next) => {
      acc[next.systemName] = next;
      return acc;
    }, {});
    mergedBanners = this.getMergedBannersData();
  }

  getMergedBannersData() {
    return banners.map((props) => {
      const { name } = props;
      if (this.contentData[name]) {
        return {
          ...props,
          ...this.contentData[name]
        };
      } else {
        return props;
      }
    });
  }

  // Инициализация сцены
  init() {
    app = new PIXI.Application({
      width: parameters.canvasSize.width,
      height: parameters.canvasSize.height,
      antialias: true,
      view: this.canvas
    });
    this.container.appendChild(app.view);

    mainBlock = new PIXI.Container(); // Корневой контейнер, в него помещаем контйнеры и сбаннерами (один баннер - один контейнер)
    // mainBlock.scale.set(parameters.scaleFactor, parameters.scaleFactor); //Маштабирует изображения при изменении исходного размера контейнере

    app.stage.addChild(mainBlock);

    // запись в параметр для передачи в другие функции
    parameters.view = this.root;

    loaderTextures(banners, parameters); // Забираем данные банеров и отправляем на инициализацию

    /*
        let canvas = app.renderer.view;
     
        let gl = canvas.getContext('webgl2');
        console.log(gl.getFragDataLocation());
        */
  }

  // Возвращает активный баннер, позицию в очереди, а так же его тип.
  getInfo() {
    return mergedBanners[currentBanner];
  }

  // Сменить банер на предыдущий в очереди.
  toLeft(button) {
    if (mergedBanners) {
      shiftBanner(1, button);
    }
  }

  // Сменить банер напоследующий в очереди.
  toRight(button) {
    if (mergedBanners) {
      shiftBanner(1, button);
    }
  }

  // Возвращает размер canvas.
  getCanvasSize() {
    return parameters.canvasSize;
  }

  // Возвращает размер canvas.
  getScreenSize() {
    return parameters.screenSize;
  }

  // Поиск баннеров
  findBanners() {}

  // Управление подписями к баннерам за пределами блока canvas.
  setCuption() {}

  // Запуск эффекта при смене баннера.
  startTransition(shift) {
    let value;
    switch (shift) {
      case 1:
        value = simpleDark(parameters);
        initBgTransition(value);
        easyOut();
        break;
      default:
        value = simpleDark(parameters);
        initBgTransition(value);
        easyOut();
        break;
    }
  }

  // Запускается при изменении размера окна, с последующей перерисовкой баннера.
  update() {}

  // Возвращает сцену
  getContext() {
    return app;
  }
}

// end class

// Выбираем баннер из массива данных и отрисовываем его
// mergedBanners - массив баннеров
// position - позиция в массиве которая будет отрисованна
function playerBanner(banner, params) {
  addBanner(banner, params);
}

/* Создание экземпляра класса Banner с командой на отрисовку.
Конструктор принимает объект data из JSON и управляющие триггеры
отвечающие за мгновенную или отложенную отрисовку баннера.
item - объект баннера
*/
function addBanner(item, params) {
  const banner = new BANNER(item, mainBlock, params, app, textures);
  currentBanner = banner.draw();
}

// Загружаем картинки в массив текстур
function loaderTextures(bannerItem, params) {
  const loader = new PIXI.Loader();
  for (let i = 0; i < bannerItem.length; i++) {
    for (let j = 0; j < bannerItem[i].img.length; j++) {
      const value = bannerItem[i].img[j];
      loader.add(Object.keys(value)[0], Object.values(value)[0]);
    }
  }
  loader.load((loader, resources) => {
    for (let i = 0; i < Object.keys(resources).length; i++) {
      const value = Object.values(resources)[i].texture;
      textures.push(value);
    }
    playerBanner(getBannerByPosition(currentBanner), params);
  });
}

// Возвращет позицию банера в очереди по его ID
function findBannerInQueue(id, params) {
  const queue = params.steps;
  const index = queue.findIndex(element => element === id);
  return index;
}

// Возвращеет элемент баннера по значению position
function getBannerByPosition(pos) {
  let banner = -1;
  mergedBanners.forEach(item => {
    if (item.position === pos) {
      banner = item;
    }
  });
  return banner;
}

// Сдвиг баннера на позицию влево или вправо
function shiftBanner(shift, button) {
  let nextPosition;
  const currentInQueue = findBannerInQueue(currentBanner, parameters);
  const step = currentInQueue + shift;
  if (step > parameters.steps.length - 1) {
    nextPosition = parameters.steps[0];
  } else {
    nextPosition = parameters.steps[step];
  }
  if (nextPosition != undefined) {
    const banner = getBannerByPosition(nextPosition);
    button.interactive = false;
    easyIn(shift => {
      easyOut(button);
      playerBanner(banner, parameters);
      button.interactive = true;
    });
  }
}

// Прозрачность от 1 к 0
function easyOut() {
  filter.uniforms.shift = shift;
  shift -= 0.01;
  if (shift > 0) {
    requestAnimationFrame(easyOut);
  }
}

// Прозрачность от 0 к 1
function easyIn(fn) {
  if (callback === undefined) callback = fn;
  filter.uniforms.shift = shift;
  shift += 0.01;
  if (shift < 1) {
    // eslint-disable-next-line no-undef
    requestAnimationFrame(easyIn);
  } else if (shift >= 1) {
    callback(shift);
    callback = undefined; // Обнуление калбека (иначе будет показывать тот же баннер при клике на стрелку)
  }
}

// Инициируекм шейдер для эффекта перехода
function initBgTransition(value) {
  parameters.filter = new PIXI.Filter(undefined, value.f, value.u);
  const bg = new PIXI.Sprite();
  bg.width = parameters.canvasSize.width;
  bg.height = parameters.canvasSize.height;
  bg.filters = [parameters.filter];
  filter = parameters.filter;
  app.stage.addChild(bg);
}

export { CONTAINER };
