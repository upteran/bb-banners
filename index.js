import { getDeviceType } from './app/js/helpers/index.js';
import { BannerBuilder } from './app/bannerCreator.js';

let sizeConfig = {
  steps: [1, 2], //Порядок баннеров в очереди на отображение
  filter: undefined,
  screenSize: {
    width: window.innerWidth,
    height: window.innerHeight
  },
  deviceType: getDeviceType()
};

const data = [
  {
    id: 1,
    systemName: 'some1',
    caption: 'Hello im second banner',
    description: 'Some description',
    btn: 'IM Button too',
    btnLink: 'someLink',
    position: 2,
    linkCb: () => {
      console.log('hello');
    }
  },
  {
    id: 2,
    systemName: 'some2',
    caption: 'Some custom caption',
    description: 'Some description',
    btn: 'IM Button',
    btnLink: 'someLink',
    position: 1,
    linkCb: () => {
      console.log('hello');
    }
  }
];

const bannerBuilder = new BannerBuilder({
  containerId: 'banner-c',
  sizeConfig,
  data
});
