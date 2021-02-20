FROM node:alpine

LABEL version="0.1" mantainer="ruds.devel@gmail.com"

ENV APP_NAME=shorter-url-we
ENV HOME=/home/apps

RUN adduser --home $HOME --disabled-password --shell /bin/false apps &&\
 	mkdir -p $HOME/$APP_NAME/node_modules &&\
	chown -R apps:apps $HOME/*

WORKDIR $HOME/$APP_NAME

COPY package*.json $HOME/$APP_NAME/

RUN npm install --silent --progress=false

COPY . $HOME/$APP_NAME/

COPY --chown=apps:apps . $HOME/$APP_NAME/

USER apps

EXPOSE 4440

CMD ["npm", "run", "dev-docker"]
