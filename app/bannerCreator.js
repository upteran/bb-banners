import { CONTAINER } from "./js/container";
import { uiControllersInit } from "./js/uiControllersInit";

export class BannerBuilder {
  /*
  * {String} id
  * {Object} data
  * */
  constructor({ id, canvasConfig, data }) {
    const {
      title,
      description,
      btnTitle
    } = data;
    this.container = document.getElementById(id);
    this.container.attachShadow({ mode: 'open'});
    this.shRoot = this.container.shadowRoot;
    // class configs
    this.idConfig = {
      canvasId: 'c',
      titleId: 'caption1',
      btnId: 'btn'
    };

    this.config = canvasConfig;

    // content
    this.contentData = {
      title,
      description,
      btnTitle
    }
  }

  getTemplate() {
    return `
          <style>
              #c {
                  width: 1600px;
                  height: 547px;
              }
              
              #caption1{
                  position: absolute;
                  top: 250px;
                  left: 160px;
                  color: azure;
                  font-size: 48px;
              }
              
               #btn {
                  position: absolute;
                  top: 340px;
                  left: 160px;
                  
                  background-color: rgb(255, 238, 0);
                  color: rgb(0, 0, 0);
                  font-size: 24px;
                  padding: 18px 32px;
                  border: none;
                  cursor: pointer;
                  border-radius: 5px;
                }
                
              .btn:hover {
                  background-color: rgb(233, 194, 20);
              }
          </style>
            <canvas id="${this.idConfig.canvasId}"></canvas>
            <div id="${this.idConfig.titleId}">${this.contentData.title}</div>
            <button id="${this.idConfig.btnId}">${this.contentData.btnTitle}</button>
          
          `;
  }

  getCanvasParams() {
    return {
      ...this.config,
      scaleFactor: (this.shRoot.getElementById('c').offsetWidth) / 1600, //Коэфициент маштабирования, 1600 - исходное изображения бекграунда в пикселях
      canvasSize: {
        width: this.shRoot.getElementById('c').offsetWidth,
        height: this.shRoot.getElementById('c').offsetHeight,
      }
    };
  }

  startCanvasContainer() {
    //Инициируем корневой блок
    const mainBlock = new CONTAINER(this.getCanvasParams(), this.shRoot);
    mainBlock.init();
    mainBlock.startTransition(1);
    uiControllersInit(mainBlock, { height: this.shRoot.getElementById('c').offsetHeight, width: this.shRoot.getElementById('c').offsetWidth });
  }

  render() {
    this.container.shadowRoot.innerHTML = this.getTemplate();
    this.startCanvasContainer();
  }

}

// https://css-tricks.com/encapsulating-style-and-structure-with-shadow-dom/