class ScriptLoader {
  constructor() {
    this.pixiSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pixi.js/6.5.1/browser/pixi.min.js';
    this.pixiSpineSrc =
      '/public/external/pixi-spine/pixi-spine-4.0.min.umd.js';
  }

  async load(cb) {
    try {
      return await this.loadScript(this.pixiSrc, 'pixijs')
        .then(() => {
          console.log('pixi.js is loaded');
          return this.loadScript(this.pixiSpineSrc, 'pixi-spine').then(() => {
            console.log('pixi-spine is loaded');
            cb && cb();
          });
        })
        .catch(e => console.error(e));
    } catch (e) {
      console.log(e);
    }
  }

  loadScript = (src, name) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.id = name;
      script.onload = resolve;
      script.defer = true;
      script.onerror = reject;
      script.src = src;
      document.head.append(script);
    });
  };
}

export const scriptLoader = new ScriptLoader();
