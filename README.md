# Meetup Portal API

## Getting Started

Make sure you have [NodeJS](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/en/) installed.

Clone this repository, and then install the dependencies:

```
> git clone https://github.com/temekuweb/meetup-portal-api
...
> cd meetup-port-api
> yarn install
```

### Run it

From here, you can run the application in dev mode and go to http://localhost:3030
in your favorite browser
```
> yarn dev
```

There should be documentation running at http://localhost:3030/docs.

## Docker

Run MongoDB using Docker
```
docker run --name meetuppp-mongo -d -p 27017:27017 mongo
```


Build docker image

```
docker build -t twt/mpp-api .
docker run --link meetuppp-mongo:mongo twt/mpp-api
```

## Docker Compose Mode

To run in docker-compose

```
docker-compose build
docker-compose up
```

To shut down

```
docker-compose down
```