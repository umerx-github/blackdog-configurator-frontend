FROM node:20 AS build
ARG ENVIRONMENT=production
WORKDIR /workspace
COPY package.json package-lock.json ./
RUN npm ci --fetch-timeout=1000000
COPY . .
RUN npm run build:${ENVIRONMENT}

# https://mav-rana.medium.com/containerize-a-simple-static-website-a381c5e49633
FROM nginx:alpine AS publish
COPY --from=build /workspace/dist /usr/share/nginx/html
COPY etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf