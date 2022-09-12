import { scriptLoader } from './scriptLoader';

const x = await scriptLoader.load();

console.log(window.PIXI.spine)

const PIXI = window.PIXI;

export {
  PIXI
};
