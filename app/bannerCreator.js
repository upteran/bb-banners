import { CONTAINER } from './js/container';
import { uiControllersInit } from './js/uiControllersInit';
import { bannerDOMTemplate } from './template/banner';
// size: 1900*620 6/2 k=3
export class BannerBuilder {
  constructor({ containerId, sizeConfig, data }) {
    this.contentData = data;
    this.sizeConfig = sizeConfig || {};
    this.container = document.getElementById(containerId);
    this.container.attachShadow({ mode: 'open' });
    this.shRoot = this.container.shadowRoot;

    // class configs
    this.domElId = {
      wrapper: 'wrapper',
      canvasId: 'c',
      titleId: 'caption1',
      btnId: 'btn'
    };

    this.canvasH = null;
    this.canvasW = null;
  }

  getTemplate() {
    return bannerDOMTemplate(this.domElId, this.contentData);
  }

  getCanvasParams() {
    return {
      ...this.sizeConfig,
      screenSize: {
        width: this.canvasW,
        height: this.canvasW / 3.2
      },
      scaleFactor: this.canvasW / 1600, //Коэфициент маштабирования, 1600 - исходное изображения бекграунда в пикселях
      canvasSize: {
        width: this.canvasW,
        height: this.canvasW / 3.2 // 6:2 ratio
      }
    };
  }

  startCanvasContainer() {
    //Инициируем корневой блок
    const mainBlock = new CONTAINER({
      params: this.getCanvasParams(),
      root: this.shRoot,
      container: this.shRoot.getElementById(this.domElId.wrapper),
      canvas: this.shRoot.getElementById(this.domElId.canvasId)
    });
    mainBlock.init();
    mainBlock.startTransition(1);
    uiControllersInit(mainBlock, { height: this.canvasH, width: this.canvasW });
  }

  updateSizes() {
    this.canvasW = this.shRoot.getElementById(
      this.domElId.canvasId
    ).offsetWidth;
    this.canvasH = this.canvasW / 3;
  }

  render() {
    this.container.shadowRoot.innerHTML = this.getTemplate();
    this.updateSizes();
    this.startCanvasContainer();
  }
}

// https://css-tricks.com/encapsulating-style-and-structure-with-shadow-dom/
