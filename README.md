[![GitHub version](https://badge.fury.io/gh/Zarad1993%2Flets-innovate.svg)](http://badge.fury.io/gh/Zarad1993%2Flets-innovate) [![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badge/) [![Build Status](https://travis-ci.org/Zarad1993/lets-innovate.svg?branch=master)](https://travis-ci.org/Zarad1993/lets-innovate/) [![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)   


# lets-innovate
An application designed to submit a new feature request 

## Production

Check our website [CLICK](http://lets-innovate.herokuapp.com/#/) It's COOL!.


## Table of Contents
1. [Tech Stack](#tech-stack)
1. [Development](#development)

### Tech Stack

1) Front-End
- Angular
- Bootstrap
- jQuery   

2) Back-End
- Node/Express
- MongoDB
- Socket.io


3) Testing
- Mocha
- Chai

4) Deployment
- Heroku



## Development

```sh
git clone https://github.com/Zarad1993/lets-innovate.git
```

### Installing Dependencies
```sh
npm install && bower install
```
## Before running on localhost 
```sh
sudo mongod
```
## Toggle Socket.IO on local
```sh
Open client/js/services/services.js
	SWITCH from 
	var socket = io.connect('http://lets-innovate.herokuapp.com');
	TO
	var socket = io.connect('http://localhost:8000/#/');
```
## Localhost
```sh
http://localhost:8000/#/
```
## Styling guide
```sh
gulp
```
## Tests
```sh
npm test
```



