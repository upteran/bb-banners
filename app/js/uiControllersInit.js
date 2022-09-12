//Отрисовка элементов управления

//Отрисовка элементов управления
export function uiControllersInit(mainBlock, config) {
  const left = new PIXI.Graphics();
  left.interactive = true;
  left.buttonMode = true;
  left.beginFill(0xff0000);
  left.drawRect(0, config.height / 2 - 25, 50, 50);
  left.on('pointerdown', event => {
    mainBlock.toLeft(left);
  });

  const right = new PIXI.Graphics();
  right.interactive = true;
  right.buttonMode = true;
  right.beginFill(0x00ff00);
  right.drawRect(config.width - 50, config.height / 2 - 25, 50, 50);
  right.on('pointerdown', event => {
    mainBlock.toRight(right);
  });

  const app = mainBlock.getContext();

  app.stage.interactive = true;
  app.stage.addChild(left);
  app.stage.addChild(right);
}
