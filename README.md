# BG-Academy

## Description
Blind gallery academy is a project that uses nuxt + vuejs2 for the frontend and for the backend uses a fastify api for authentication and hasura

## How to Install
Make sure you have npm, nodejs, hasura-cli and docker installed on your machine, to run the backend you need to run the docker-compose.yaml container that has the API, database and hasura services.
For testing we are using this env vars
```
GRAPHQL_ENDPOINT='http://graphql-engine:8080/v1/graphql'
GRAPHQL_SECRET=myadminsecretkey
ACTION_SERVER_PORT=3000
ACTION_SERVER_HOST=action-server                    
ENABLE_CONSOLE=true                                 
RESTART_POLICY=no
```
For security reasions we can not provide the GOOGLE_CLIENT_SECRET and GOOGLE_CLIENT_ID, so if you run it locally you would not be able to login via google

## How to run the project

Run the backend with docker via `docker compose -f docker-compose.yaml up` and wait until all the images are up and running
cd to hasura and run `hasura metadata apply` then `hasura migrate apply` and finally `hasura metadata reload` to write all the info into your database
Go to the ui folder and follow the steps from the README.md
