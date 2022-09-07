# bb-banner

frontend proj for bb canvas banners

## roadmap

**общие и первостепенные**

- [x] responsive canvas
- [x] генерация путей изображений на сервер, тк запуск на другом домене
- [x] обработка передаваемого массива данных 
- [] кеширование данных, изображений и скриптов
- [] загрузка скриптов с hash id
- [] определить интерфейс запуска банера
- [] удаление банера и событий при смене роута
- [x] import только нужных модулей из pixi
- [] оптимизировать бандл и загрузку канваса
- [] предзагрузка изображения перед запуском канваса (fallback)
- [] клик по кнопкам
- [] responsive кнопки
- [] логика работы если скрипт не загрузился
- [] тестирование с дургого проекта
- [] логи запуска, ошибки
- [x] CORS запросы assets
- [x] minify
- [] добавить сервис
- [] добавить docker 
- [] graceful shutdown сервера

**работа баннера**

``` 
// nginx config

server {
    listen       8090;
    server_name  mywebsite.local.com;
    root /Users/au_tereshkin/work/bb-banner/dist/;

    location / {
        root /Users/au_tereshkin/work/bb-banner/dist/assets/;
        index  bannerCreator.js;
    }

    location /images/ {
        try_files $uri $uri/;
        add_header Access-Control-Allow-Origin *;
    }

    # redirect server error pages to the static page /50x.html
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
}
```