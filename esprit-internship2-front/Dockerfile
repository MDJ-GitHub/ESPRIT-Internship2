FROM nginx:1.23
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY dist/esprit-internship2-front/ ./
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80