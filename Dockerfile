
FROM node:19-alpine3.15 as dev-deps
WORKDIR /app
COPY package.json package.json
RUN npm install --frozen-lockfile


FROM node:19-alpine3.15 as builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
# RUN npm run test
RUN npm run build


FROM nginx:1.24.0 as prod
EXPOSE 80

COPY --from=builder /app/dist /usr/share/nginx/html
COPY src/img/ /usr/share/nginx/html/assets
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

CMD [ "nginx","-g", "daemon off;"]


