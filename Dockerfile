FROM nginx:alpine
ADD build /usr/share/nginx/html
RUN echo 'server {\
  listen       80 default_server; \
  location / {\
    root   /usr/share/nginx/html; \
    index  index.html index.htm; \
    gzip_static on; \
    gzip_proxied expired no-cache no-store private auth; \
  } \
}\
' > /etc/nginx/conf.d/app.conf
ENTRYPOINT nginx -g "daemon off;"