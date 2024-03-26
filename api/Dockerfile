FROM node:18.0.0
RUN VERSION=$(curl https://envkey-releases.s3.amazonaws.com/latest/envkeysource-version.txt) \ 
  && curl -s https://envkey-releases.s3.amazonaws.com/envkeysource/release_artifacts/$VERSION/install.sh | bash

RUN mkdir /app
COPY . /app
WORKDIR /app
RUN npm install

CMD envkey-source -w --rolling -- npm run start