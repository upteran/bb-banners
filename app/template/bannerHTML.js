export const bannerDOMTemplate = (styles, content) => `
  <style>
      #${styles.wrapper} {
        position: relative;
        z-index: 10;
      }
      #${styles.canvasId} {
          position: relative;
          width: 100%;
          height: 100%;
      }
      
      #${styles.content} {
          position: absolute;
          left: 10%;
          top: 35%;
          z-index: 100;
      }
      
      #${styles.titleId}{
          color: azure;
          font-size: 48px;
          margin-bottom: 45px;
      }
      
       #${styles.btnId} {
          background-color: rgb(255, 238, 0);
          color: rgb(0, 0, 0);
          font-size: 24px;
          padding: 18px 32px;
          border: none;
          cursor: pointer;
          border-radius: 5px;
        }
        
      .${styles.btnId}:hover {
          background-color: rgb(233, 194, 20);
      }
  </style>
  <div id="${styles.wrapper}">
    <canvas id="${styles.canvasId}"></canvas>
    <div id="${styles.content}">
        <div id="${styles.titleId}">${content.title}</div>
        <button id="${styles.btnId}">${content.btnTitle}</button>
    </div>
  </div>
  `;
