### Stage 1: build ###

FROM node:14.17-alpine as builder

# Set working directory.
WORKDIR /app

# Copy app dependencies.
COPY angular10/package.json angular10/package-lock.json /app/

# Install app dependencies.
RUN npm install

# Copy app files.
COPY angular10 /app/

# Build app
RUN npm run build

### Stage 2: delivery ###
FROM nginx:1.19.0-alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder app/dist/out/main.js /usr/share/nginx/html/
COPY --from=builder app/dist/out/styles.css /usr/share/nginx/html/
COPY --from=builder app/dist/out/runtime.js /usr/share/nginx/html/
COPY --from=builder app/dist/out/polyfills.js /usr/share/nginx/html/
COPY --from=builder app/dist/out/4.js /usr/share/nginx/html/
COPY --from=builder app/dist/out/index.html /html/

# Copy output directory from builder to nginx image.
#COPY --from=builder app/dist/out/main.js /static/angular/
#COPY --from=builder app/dist/out/styles.css /static/angular/
#COPY --from=builder app/dist/out/runtime.js /static/angular/
#COPY --from=builder app/dist/out/polyfills.js /static/angular/
#COPY --from=builder app/dist/out/4.js /static/angular/

RUN ls
RUN ls html

# Copy nginx configuration file.
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80