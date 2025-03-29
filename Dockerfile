FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm i

COPY . .

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

