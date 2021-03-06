# FF-Backend 

[![Build Status](https://www.travis-ci.com/ziggi24/ff-backend.svg?branch=main)](https://www.travis-ci.com/ziggi24/ff-backend)
[![Known Vulnerabilities](https://snyk.io/test/github/ziggi24/ff-backend/badge.svg)](https://snyk.io/test/github/ziggi24/ff-backend)
[![Maintainability](https://api.codeclimate.com/v1/badges/82843919e9da8dfa9f57/maintainability)](https://codeclimate.com/github/ziggi24/ff-backend/maintainability)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HitCount](http://hits.dwyl.com/ziggi24/ff=backend.svg)](http://hits.dwyl.com/ziggi24/ff=backend)



A reworked URL Shortening API backend (based on [this project](https://github.com/ziggi24/ffrf.fr)). This is 1/2 of a URL shortening full stack app, the other half being a react front-end with auth. I wanted to rebuild this project becuase the first version I made in an afternoon and has some very glaring flaws. I wanted to put more of an emphasis on security and get more experience designing perfomant, scalable, and efficient code. 

## Curent Routes 
| Path          | HTTP METHOD |                                                                            INFO |
| :------------ | :---------: | :------------------------------------------------------------------------------ |
| /             |     GET     |                                         main route returns json welcome message |
| /             |    POST     |                    adds a URL to the DB either using a specified or random slug |
| /:slug        |     GET     |                                       redirects to the URL associated with slug |
| /:slug        |    POST     |                         updates the URL associated with slug with newSlug value |
| /:slug/info   |     GET     | returns full DB object with info about url, including count, date created, etc. |
| /:slug/delete |    POST     |                          deletes db db object and returns status 200 to confirm |


## TODO 
- [x] Add edit route 
- [ ] Add delete route
- [x] Dockerize
  - [x] Locally
  - [ ] Remote
  - [x] Travis
- [ ] Add Tests to each route
  - [x] / GET 
  - [x] / POST 
    - [x] valid url no slug 
    - [x] valid url valid slug 
    - [x] valid url invalid slug 
    - [x] invalid url 
  - [x] /:slug GET
    - [x] valid slug
    - [x] invalid slug
  - [ ] /:slug POST
    - [x] valid slug
    - [ ] invalid slug
  - [x] /:slug/info GET
    - [x] valid slug 
    - [x] invalid slug
  - [ ] /:slug/delete
    - [x] valid slug
    - [ ] invalid slug
- [ ] Write error handling middleware 

## Resources 
- [integrating graphql](https://medium.com/@utkarshprakash/setting-up-graphql-server-with-nodejs-express-and-mongodb-d72fba13216)
- [travis & docker config example](https://github.com/heroku/logplex)
- [Docker docs for env vars](https://docs.docker.com/compose/environment-variables/)