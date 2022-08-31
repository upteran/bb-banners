import { getDeviceType } from './js/helpers';
import { BannerBuilder } from './bannerCreator';

let sizeConfig = {
  steps: [1, 2], //Порядок баннеров в очереди на отображение
  filter: undefined,
  screenSize: {
    width: window.innerWidth,
    height: window.innerHeight
  },
  deviceType: getDeviceType()
};

const contentData = {
  title: 'Some custom title',
  description: 'Some description',
  btnTitle: 'IM Button'
};

const bannerBuilder = new BannerBuilder({
  containerId: 'banner-c',
  sizeConfig,
  data: contentData
});

bannerBuilder.render();
