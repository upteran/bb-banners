import { CONTAINER } from './js/container';
import { uiControllersInit } from './js/uiControllersInit';
import { bannerDOMTemplate } from './template/bannerHTML';
import { scriptLoader } from './pixiLoader/scriptLoader';

export class BannerBuilder {
  constructor({ containerId, sizeConfig, data, cb }) {
    console.log('load class');
    scriptLoader.load(cb?.onScriptLoad || this.render);
    this.contentData = data;
    this.cb = cb;
    this.sizeConfig = sizeConfig || {};
    this.container = document.getElementById(containerId);
    this.container.attachShadow({ mode: 'open' });
    this.shRoot = this.container.shadowRoot;
    this.isRender = false;

    // class configs
    this.domElId = {
      wrapper: 'wrapper',
      content: 'content',
      canvasId: 'c',
      titleId: 'caption1',
      btnId: 'btn'
    };

    this.canvasH = null;
    this.canvasW = null;
  }

  async startExternalScriptFetch() {
    try {
      await scriptLoader.load();
    } catch (e) {
      console.error(e);
    }
  }

  getHeightByRatio() {
    return this.canvasW / 3.2; // 6/2 ratio
  }

  getTemplate() {
    return bannerDOMTemplate(this.domElId, this.contentData);
  }

  getCanvasParams() {
    return {
      ...this.sizeConfig,
      screenSize: {
        width: this.canvasW,
        height: this.getHeightByRatio()
      },
      scaleFactor: this.canvasW / 1600, //Коэфициент маштабирования, 1600 - исходное изображения бекграунда в пикселях
      canvasSize: {
        width: this.canvasW,
        height: this.getHeightByRatio()
      }
    };
  }

  startCanvasContainer() {
    //Инициируем корневой блок
    const mainBlock = new CONTAINER({
      params: this.getCanvasParams(),
      root: this.shRoot,
      container: this.shRoot.getElementById(this.domElId.wrapper),
      canvas: this.shRoot.getElementById(this.domElId.canvasId),
      contentData: this.contentData
    });
    mainBlock.init();
    mainBlock.startTransition(1);
    uiControllersInit(mainBlock, { height: this.canvasH, width: this.canvasW });
  }

  updateSizes() {
    this.canvasW = this.shRoot.getElementById(
      this.domElId.canvasId
    ).offsetWidth;
    this.canvasH = this.getHeightByRatio();
  }

  render = () => {
    if (this.isRender) return;
    console.log(window.PIXI.spine.Spine)
    this.container.shadowRoot.innerHTML = this.getTemplate();
    try {
      this.updateSizes();
      this.startCanvasContainer();
      this.isRender = true;
      console.log('Banner render');
    } catch (e) {
      console.error(e);
    }
  }

  // callback отрисовки банера
  onRender() {
    console.log('onRender cb');
    this.cb?.onRender && this.cb.onRender();
  }

  // callback клика prev, next кнопки банера
  onBtnClick() {
    console.log('onBtnClick cb');
    this.cb?.onBtnClick && this.cb.onBtnClick();
  }

  // callback смены слайда
  onSlideChange() {
    console.log('onSlideChange cb');
    this.cb?.onSlideChange && this.cb.onSlideChange();
  }

  // callback удаление банера, освобождение памяти
  destroy() {
    this.isRender = false;
    console.log('Destroy banners');
  }
}

// https://css-tricks.com/encapsulating-style-and-structure-with-shadow-dom/
