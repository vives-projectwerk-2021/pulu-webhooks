FROM alpine:3.10

RUN apk add --update nodejs npm

RUN apk add docker
RUN apk add docker-compose

# Copies your code file from your action repository to the filesystem path `/` of the container
WORKDIR /app

COPY . .

RUN npm install

EXPOSE 7777



# Code file to execute when the docker container starts up (`entrypoint.sh`)
CMD ["npm", "run", "serve"] 