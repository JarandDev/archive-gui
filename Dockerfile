FROM node:14 AS build

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY src/ src/
COPY public/ public/
RUN npm run build

FROM nginx

COPY --from=build build/ /etc/nginx/html/build/
RUN rm /etc/nginx/conf.d/default.conf
LABEL org.opencontainers.image.source https://github.com/JarandArchive/archive-gui
COPY nginx.conf /etc/nginx/conf.d/default.conf
