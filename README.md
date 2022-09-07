# bb-banner

- canvas banners service

### dev mode

```html
- yarn install
- yarn dev
- open browser http://127.0.0.1:5173/
- edit code
```

### dev workflow
- do prev step
- root html => `./index.html`
- init js module were init banner => `./index.js`
- all about banner module => `./app/`
- all images put to `./public/images/`

### build prod
```html
- yarn build
```

### serve
run server and send static js/images of banner by address http:localhost:8090

```html
- yarn serve
- go to http:localhost:8090
- get by '/' route js file
- route 'images' serve image static files
```

### env

```html
SERVICE_HOST=http://localhost:8090 <=== host where will be serve app
SERVE_PORT=8090
SERVE_HOST=0.0.0.0
```

### workflow

Go to your proj

```js
import { BannerBuilder } from '[linkToModule]';

// init banner constructor
bannerBuilder = new BannerBuilder({
    containerId: 'banner-c', // render canvas banner to div id#banner-c
    sizeConfig, // canvas size
    data: mockData // content data
});

bannerBuilder.render(); // add banners to DOM 
```

### formats

- banner
...


- data
```ts
type ContentData = {
	// external banner id
	id: string|number,
    // constant and contract system name
	systemName: string;
	// title
	caption: string;
	// sub title / description
	description: string;
	// btn text
	btn: string;
	// btn link
	btnLink: string;
	// banner position
	position: number,
}
```

### deploy steps

```html
- yarn install // install deps
- yarn build // build app
- yarn serve // run server
```
