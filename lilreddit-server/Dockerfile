FROM node:14
#something nodejs alpine can be used but issue with argon2 so no
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY yarn.lock ./


RUN yarn

COPY . .
COPY .env.production .env

RUN yarn build

COPY . .

ENV NODE_ENV production


EXPOSE 8080
CMD [ "node", "dist/index.js" ]
USER node