export function bannerCreator() {
  const container = document.getElementById("banner-c");
  if(!container) return;

  container.attachShadow({ mode: 'open' });
  const b = '<canvas id=\'c\'></canvas>\n' +
    '    <div id=\'caption1\'>Тут будет подпись к баннеру</div>\n' +
    '    <button id="btn">Давай жми!</button>';
  container.shadowRoot.innerHTML = `<div>${b}</div>`;
}

// https://css-tricks.com/encapsulating-style-and-structure-with-shadow-dom/