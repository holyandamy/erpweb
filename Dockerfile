FROM node:alpine

ENV PROJECTNAME erpweb
ENV TZ Asia/Shanghai

RUN apk --update add wget
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN yarn

ENTRYPOINT ["npm","run","dev"] 
EXPOSE 8080