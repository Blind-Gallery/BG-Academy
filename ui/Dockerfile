FROM node:16.19
RUN mkdir /ui
COPY . /ui
WORKDIR /ui

RUN yarn install
RUN yarn build

CMD ["yarn", "start"]
