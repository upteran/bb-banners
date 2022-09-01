export const bannerDOMTemplate = (styles, content) => `
  <style>
      #${styles.wrapper} {
        position: relative;
      }
      #${styles.canvasId} {
          position: relative;
          width: 100%;
          height: 100%;
      }
      
      #${styles.titleId}{
          position: absolute;
          top: 250px;
          left: 160px;
          color: azure;
          font-size: 48px;
          z-index: 100;
      }
      
       #${styles.btnId} {
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
          z-index: 100;
        }
        
      .${styles.btnId}:hover {
          background-color: rgb(233, 194, 20);
      }
  </style>
  <div id="${styles.wrapper}">
    <canvas id="${styles.canvasId}"></canvas>
    <div id="${styles.titleId}">${content.title}</div>
    <button id="${styles.btnId}">${content.btnTitle}</button>
  </div>
  `;
