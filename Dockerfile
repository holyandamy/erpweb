FROM node:alpine

ENV PROJECTNAME erpweb
ENV TZ Asia/Shanghai

RUN apk add --update tzdata
RUN echo "${TZ}" > /etc/timezone
RUN ln -sf /usr/share/zoneinfo/${TZ} /etc/localtime
RUN apk --update add wget
RUN mkdir -p /usr/src/app/views
RUN mkdir -p /usr/src/app/public
RUN mkdir -p /usr/src/temp

COPY . /usr/src/temp
WORKDIR /usr/src/temp/
WORKDIR /usr/src/temp/node_modules/webwrapper
RUN ./node_modules/.bin/gulp release
RUN rm -rf src/

RUN cp -r /usr/src/temp/node_modules/webwrapper/* /usr/src/app/
RUN rm -rf /usr/src/app/public/*
RUN cp -r /usr/src/temp/dist/* /usr/src/app/public/
RUN cp /usr/src/temp/dist/index.html /usr/src/app/views/index.ejs
RUN rm -rf /usr/src/temp
WORKDIR /usr/src/app/

ENTRYPOINT ["/bin/sh","start.sh"] 
EXPOSE 3000