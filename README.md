# bb-banner

frontend proj for bb canvas banners


## roadmap

- responsive canvas
- генерация путей изображений на сервер, тк запуск на другом домене
- определить интерфейс запуска банера
- удаление банера и событий при смене роута
- оптимизировать бандл и загрузку канваса
- предзагрузка изображения перед запуском канваса (fallback)
- клик по кнопкам
- логика работы если скрипт не загрузился
- тестирование с дургого проекта
- CORS запросы assets
- minify


``` 
// nginx config

server {
    listen       8090;
    server_name  mywebsite.local.com;
    root /Users/au_tereshkin/work/bb-banner/dist/;

    location / {
        root /Users/au_tereshkin/work/bb-banner/dist/;
        index  bannerCreator.mjs;
    }

    location /banner/ {
        try_files $uri /;
        add_header Access-Control-Allow-Origin *;
    }

    # redirect server error pages to the static page /50x.html
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
}
```