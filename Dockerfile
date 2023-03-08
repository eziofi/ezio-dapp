FROM nginx:alpine
ADD build /usr/share/nginx/html
RUN echo 'server {\
  listen       80 default_server; \
  location / {\
    root   /usr/share/nginx/html; \
    try_files $uri /index.html; \
    gzip on; \
    gzip_buffers 32 4K; \
    gzip_comp_level 6; \
    gzip_min_length 100; \
    gzip_types application/javascript text/css text/xml; \
    gzip_disable "MSIE [1-6]\\."; \
    gzip_vary on; \
  } \
}\
' > /etc/nginx/conf.d/app.conf
ENTRYPOINT nginx -g "daemon off;"
