FROM alpine:3.14

RUN apk update

RUN apk add --update nodejs npm

RUN apk add docker=20.10.9-r0
RUN apk add docker-compose
RUN apk add make

# Copies your code file from your action repository to the filesystem path `/` of the container
WORKDIR /app

COPY . .

RUN npm install

EXPOSE 7777



# Code file to execute when the docker container starts up (`entrypoint.sh`)
CMD ["npm", "run", "serve"] 