# CrisBot
CrisBot is a node.js server exposing its api and that handles all communications from iOT devices, Arduino boards, Raspberry Pi, etc..., and runs a simple bot on Facebook, Twitter, etc... CrisBot is part of ZykNet home network and also part of JARVIS, my own Iron-Man-like AI.

## Technology stack
CrisBot runs as a desktop app on electron. Its client side view is build on Angualar.
Server runs on Express.
All the data are store on MongoDB on mLab.
All communications are secured with SSL with openssl.
Ports are exposed via Ngrok

This is a sample text file for mia demo.

Once the devices are connected, the server i.e. groupOwner will listen for incoming connections and write this file. 

# electron-quick-start

**Clone and run for a quick way to see Electron in action.**

This is a minimal Electron application based on the [Quick Start Guide](https://electronjs.org/docs/tutorial/quick-start) within the Electron documentation.

**Use this app along with the [Electron API Demos](https://electronjs.org/#get-started) app for API code examples to help you get started.**

A basic Electron application needs just these files:

- `package.json` - Points to the app's main file and lists its details and dependencies.
- `main.js` - Starts the app and creates a browser window to render HTML. This is the app's **main process**.
- `index.html` - A web page to render. This is the app's **renderer process**.

You can learn more about each of these components within the [Quick Start Guide](https://electronjs.org/docs/tutorial/quick-start).

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/electron/electron-quick-start
# Go into the repository
cd electron-quick-start
# Install dependencies
npm install
# Run the app
npm start
```

Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

## Resources for Learning Electron

- [electronjs.org/docs](https://electronjs.org/docs) - all of Electron's documentation
- [electronjs.org/community#boilerplates](https://electronjs.org/community#boilerplates) - sample starter apps created by the community
- [electron/electron-quick-start](https://github.com/electron/electron-quick-start) - a very basic starter Electron app
- [electron/simple-samples](https://github.com/electron/simple-samples) - small applications with ideas for taking them further
- [electron/electron-api-demos](https://github.com/electron/electron-api-demos) - an Electron app that teaches you how to use Electron
- [hokein/electron-sample-apps](https://github.com/hokein/electron-sample-apps) - small demo apps for the various Electron APIs

## License

[CC0 1.0 (Public Domain)](LICENSE.md)


# BYOB: Build Your Own Backend
*MADCON 2017 Talk*

## Table of Contents
- [Prerequisites](https://gist.github.com/nlaz/3348fb41fdf86348165825c37b4a9048#prerequisites)
- [Step 0: Setup](https://gist.github.com/nlaz/3348fb41fdf86348165825c37b4a9048#0-setup)
- [Step 1: Express Yourself](https://gist.github.com/nlaz/3348fb41fdf86348165825c37b4a9048#1-express-yourself)
- [Step 2: Model Schemas](https://gist.github.com/nlaz/3348fb41fdf86348165825c37b4a9048#2-model-schemas)
- [Step 3: Building Models](https://gist.github.com/nlaz/3348fb41fdf86348165825c37b4a9048#3-building-models)
- [Step 4: Build Your Routes](https://gist.github.com/nlaz/3348fb41fdf86348165825c37b4a9048#4-build-your-routes)

# Prerequisites
**Node**

Use an installer for your OS or if you have [Homebrew](http://brew.sh/):
```sh
$ brew install node
```

**MongoDB**

Install MongoDB on your computer.
- ([Mac](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/), [Linux](https://docs.mongodb.com/manual/administration/install-on-linux/), [Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/))
Run the mongo daemon. Make sure it is running during development.
```
$ mongod
```

_**Nice To Haves**_
- **[ngrok](https://ngrok.com/)** - Provides a tunnel to your localhost so you can demo without deploying to a server or test on a mobile device with local backend
- **[Postman Chrome extension](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en)** - Allows you to make HTTP requests to your APIs
- **[JSONView Chrome extension](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc?hl=en)** - Prettifies JSON in your browser


# 0. Setup

### Setting up NPM
#### Package.json
Create a new folder for your project and open it:
```
$ mkdir test-project
$ cd test-project
```
You need to create and setup a new node project in this folder. Running `npm init` will guide you through setting the project information. You can just use the defaults for now.
```
$ npm init
```
This will add a file called `package.json` to your folder with all the information needed to run your application.

#### Packages
Now we want to install some Node packages so that we can get started. The three packages we need are:
- [Mongoose] - A Node package to work with the MongoDB database within Javascript
- [Express] - A middleware framework that allows us to build endpoints
- [body-parser] - An addon to Express that allows us to configure the types of supported endpoint requests.

In order to install these packages, use the handy install command:
```
$ npm install --save express body-parse mongoose
```


# 1. Express Yourself

Now that everything is setup, let's get into it and start writing our server application. Create a file called `server.js` with the following:

```js
// server.js
var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('Hello World');
});

app.listen(8000, function() {
  console.log('Listening to port ' + 8000);
});
```

The first part imports our `express` package and uses it to setup the base url `/` to send a response to the client. The second part specifies which port to watch. Try running this code now:
```
$ npm start
```
If you don't get any errors, you should be able to see this page in your brower at `http://localhost:8000` and see the output. You can use this application to build more elaborate webpages, but we are focused on building APIs today. 

* *Note*: `npm start` does the same thing as `node server.js` or `npm run start`. You can run individual Node files with the `node` command or complicated start scripts with `npm run ...`.


# 2. Model Schemas
At this point, we can send information to the server, but we don't have any actual data. We want to setup our MongoDB data models, using Mongoose, a Node library for MongoDB queries. Mongoose relies on Schema objects to define the shape of data objects in MongoDB. Let's create one in a new file named after our model, `movies.js`.

```js
// movies.js
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/madcon');

var Schema = mongoose.Schema;

var MovieSchema = new Schema({
  title: String,
  length: String,
  rating: Number,
});

module.exports = mongoose.model('Movie', MovieSchema);
```

The first part is importing the mongoose library and connecting to the local MongoDB database `mongodb://localhost:27017/movies`. The second part builds a model schema so you can reuse the model throughout your application. The last part exports this Schema object so it can be imported in other files.

# 3. Building Models
Now that we have defined our data shape, we need to populate our database. Jump into your local MongoDB `madcon` database with:
```
$ mongo madcon
```

Add a new object to the `movies` collection using:
```
> db.movies.insert({
 ...title: 'Mad Max',
 ...length: '2h 45m',
 ...rating: 10,
 ...})
 ```
 Show off your brand newly minted object:
 ```
 > db.movies.find()
 ```

# 4. Build Your Routes
Time to build your endpoints. APIs make use of the HTTP verbs,`GET`, `POST`, `PUT`, and `DELETE`, and by convention, API endpoints follow the pattern:
```
/movies GET
/movies POST
/movies/:movie_id GET
/movies/:movie_id PUT
/movies/:movie_id DELETE
```
We want to build our own routes in this pattern. Within your `server.js` file, add the following:

```js
// server.js
var Movie = require('./movies');
...

app.get('/movies', function(req, res) {
  Movie.find({}, function(err, movies) {
    if (err) {
      res.send(movies);
    }
    res.json(movies);
  });
});

...
app.listen(8000);
```

Now if you navigate to `localhost:8000/movies`, you should see your Movie object.
