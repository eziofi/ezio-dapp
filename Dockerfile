FROM nginx:alpine
ADD build /usr/share/nginx/html
RUN echo 'server {\
  listen       80 default_server;\
  location / {\
    root   /usr/share/nginx/html;\
    try_files $uri /index.html;\
    gzip_static  on;\
    gzip_proxied expired no-cache no-store private auth;\
    gzip on;\
    gzip_min_length 1k;\
    gzip_buffers 4 16k;\
    gzip_http_version 1.0|1.1;\
    gzip_comp_level 2;\
    gzip_types text/plain application/javascript text/css application/xml;\
    gzip_vary on;\
  } \
}\
' > /etc/nginx/conf.d/app.conf
ENTRYPOINT nginx -g "daemon off;"
