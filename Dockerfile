FROM alpine:3.10

RUN apk add --update nodejs npm

# Copies your code file from your action repository to the filesystem path `/` of the container
WORKDIR /app

RUN npm install

EXPOSE 7777

COPY . .

# Code file to execute when the docker container starts up (`entrypoint.sh`)
CMD ["npm", "run", "serve"] 