# FF-Backend 

[![Build Status](https://travis-ci.org/ziggi24/ff-backend.svg?branch=main)](https://travis-ci.org/ziggi24/ff-backend)

A reworked URL Shortening API backend (based on [this project](https://github.com/ziggi24/ffrf.fr)). This is 1/2 of a URL shortening full stack app, the other half being a react front-end with auth. I wanted to rebuild this project becuase the first version I made in an afternoon and has some very glaring flaws. I wanted to put more of an emphasis on security and get more experience designing perfomant, scalable, and efficient code. 

## Curent Routes 
| Path        | HTTP METHOD |                                                                            INFO |
| :---------- | :---------: | :------------------------------------------------------------------------------ |
| /           |     GET     |                                         main route returns json welcome message |
| /           |    POST     |                    adds a URL to the DB either using a specified or random slug |
| /:slug      |     GET     |                                       redirects to the URL associated with slug |
| /:slug/info |     GET     | returns full DB object with info about url, including count, date created, etc. |


## TODO 
- [ ] Add edit route 
- [ ] Add delete route
- [ ] Dockerize
- [ ] Add Tests to each route
  - [x] / GET 
  - [ ] / POST 
    - [x] valid url no slug 
    - [ ] valid url valid slug 
    - [ ] valid url invalid slug 
    - [ ] invalid url 
  - [ ] /:slug GET
  - [ ] /:slug/info GET
- [ ] Write error handling middleware 

## Resources 
- [medium graphql](https://medium.com/@utkarshprakash/setting-up-graphql-server-with-nodejs-express-and-mongodb-d72fba13216)
- [travis & docker](https://github.com/heroku/logplex)