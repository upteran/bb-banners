import { getDeviceType } from './js/helpers';
import { BannerBuilder } from './bannerCreator';

let canvasConfig = {
    steps: [1,2], //Порядок баннеров в очереди на отображение
    filter: undefined,
    screenSize : {
        width : window.innerWidth,
        height : window.innerHeight,
    },
    deviceType: getDeviceType()
};

const contentData = {
    title: 'Some custom title',
    description: 'Some description',
    btnTitle: 'IM Button'
}

const bannerBuilder = new BannerBuilder({ id: 'banner-c', canvasConfig, data: contentData });

bannerBuilder.render();




