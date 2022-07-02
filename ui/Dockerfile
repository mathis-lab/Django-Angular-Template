### Stage 1: build ###

FROM node:16.14-alpine as builder

# Set working directory.
WORKDIR /app

# Copy app dependencies.
COPY app/package.json app/package-lock.json /app/

# Install app dependencies.
RUN npm install

# Copy app files.
COPY app /app/

# Build app
ARG ENV
ARG SERVER_ADDRESS
RUN npm run config -- --server_address=${SERVER_ADDRESS}
RUN npm run build -- --configuration=${ENV}

### Stage 2: delivery ###
FROM nginx:1.19.0-alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy angular web site
COPY --from=builder app/dist/app/ /usr/share/nginx/html/

# Copy nginx config
ARG NGINX_MODE
COPY ./nginx/nginx-${NGINX_MODE}.conf.template /etc/nginx/nginx.conf.template

ARG SERVER_ADDRESS
ENV SERVER_ADDRESS=${SERVER_ADDRESS}
RUN envsubst '$SERVER_ADDRESS' < /etc/nginx/nginx.conf.template > /etc/nginx/conf.d/default.conf

EXPOSE 80
