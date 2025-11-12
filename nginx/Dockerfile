FROM nginx:alpine

# Install njs module
RUN apk add --no-cache nginx-mod-http-js

# Copy HTML files
COPY www/ /usr/share/nginx/html/

# Copy NGINX configuration and njs script
COPY nginx.conf /etc/nginx/nginx.conf
COPY captcha-check.js /etc/nginx/http.js
