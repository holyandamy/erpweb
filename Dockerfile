FROM node:alpine

ENV PROJECTNAME erpweb
ENV TZ Asia/Shanghai

RUN apk add --update tzdata
RUN echo "${TZ}" > /etc/timezone
RUN ln -sf /usr/share/zoneinfo/${TZ} /etc/localtime
RUN apk --update add wget
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/temp

COPY . /usr/src/temp
WORKDIR /usr/src/temp/webwrapper
RUN yarn
RUN ./node_modules/.bin/gulp release
RUN rm -rf src/
WORKDIR /usr/src/temp/
RUN yarn
RUN yarn run build

RUN cp -r /usr/src/temp/webwrapper/* /usr/src/app/
RUN rm -rf /usr/src/app/public/*
RUN cp -r /usr/src/temp/dist/* /usr/src/app/public/
RUN rm -rf /usr/src/temp
WORKDIR /usr/src/app/

ENTRYPOINT ["/bin/sh","start.sh"] 
EXPOSE 3000