FROM node:20 AS build
WORKDIR /workspace
COPY package.json package-lock.json ./
RUN npm config rm proxy
RUN npm config rm https-proxy
RUN npm ci --fetch-timeout=100000
COPY . .
RUN npm run build

# https://mav-rana.medium.com/containerize-a-simple-static-website-a381c5e49633
FROM nginx:alpine AS publish
COPY --from=build /workspace/dist /usr/share/nginx/html
