import { CONTAINER } from './js/container.js';
import { getDeviceType } from './js/helpers';
import { uiControllersInit } from "./js/render/uiControllersInit";
import { bannerCreator } from './bannerCreator';

bannerCreator();

let params = {
    steps: [1,2], //Порядок баннеров в очереди на отображение
    filter: undefined,
    scaleFactor: (document.getElementById('c').offsetWidth) / 1600, //Коэфициент маштабирования, 1600 - исходное изображения бекграунда в пикселях
    canvasSize: {
        width: document.getElementById('c').offsetWidth ,
        height: document.getElementById('c').offsetHeight ,
    },
    screenSize : {
        width : window.innerWidth,
        height : window.innerHeight,
    },
    deviceType: getDeviceType()
};


//Инициируем корневой блок
const mainBlock = new CONTAINER(params);
mainBlock.init();
mainBlock.startTransition(1);

uiControllersInit(mainBlock);




