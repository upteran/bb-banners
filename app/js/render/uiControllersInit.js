//Отрисовка элементов управления
import * as PIXI from "pixi.js";

//Отрисовка элементов управления
export function uiControllersInit(mainBlock){
  const left = new PIXI.Graphics();
  left.interactive = true;
  left.buttonMode = true;
  left.beginFill(0xff0000);
  left.drawRect(0, params.canvasSize.height /2 - 50, 50,50);
  left.on("pointerdown", (event) => {
    mainBlock.toLeft(left);
  });

  const right = new PIXI.Graphics();
  right.interactive = true;
  right.buttonMode = true;
  right.on("pointerdown", (event) => {
    mainBlock.toRight(right);
  });
  right.beginFill(0x00ff00);
  right.drawRect(params.canvasSize.width - 50, params.canvasSize.height /2 - 50  , 50,50);

  const app = mainBlock.getContext();

  app.stage.interactive = true;
  app.stage.addChild(left, right);
};