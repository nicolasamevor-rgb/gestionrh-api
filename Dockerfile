FROM node:22-alpine

WORKDIR /app

# installer chromium et les fonts nécessaires
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ttf-freefont \
    ttf-dejavu \
    ca-certificates

# pointer Puppeteer vers le binaire système et empêcher le téléchargement
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npx", "nodemon", "server.js"]