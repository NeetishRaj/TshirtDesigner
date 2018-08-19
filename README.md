# `Tshirt design editor` — Angularjs app with MySQL backend

This project is an Angularjs application that Utilizes [Fabric.js][fabric.js] library to make an Tshirt deisgn editor that can support image uploading, resizing and rotation.

### Design Requirements

1. Use the MyEAN stack (MySQL, ExpressJS, AngularJS, NodeJS).  along with fabric.js

2. Allow the ability for clients to upload, rotate and scale images and text within the editor

3. Allow multiple images to be uploaded to the canvas

4. Implement the ability to move layers forward and backward on the canvas

5. Allow the designs to be saved and reopened

Optional Features:

1. Implement an edit history for the editor


## Getting Started

To get you started you can simply clone the `TshirtDesigner` repository and install the dependencies:

### Prerequisites

You need git to clone the `TshirtDesigner` repository. You can get git from [here][git].

We also use a number of Node.js tools to initialize and test `TshirtDesigner`. You must have Node.js LTS version 8.11.3
and its package manager (npm) installed. You can get them from [here][node].

### Clone `TshirtDesigner`

Clone the `TshirtDesigner` repository using git:

```
git clone https://github.com/NeetishRaj/TshirtDesigner.git
cd TshirtDesigner
```

### Install Dependencies


To install the application we can simply do:

```
npm install
```


### Run the Application

We have preconfigured the project with a simple development web server. The simplest way to start
this server is:

```
npm start
```

Now browse to the app at [`localhost:8080/index.html`][local-app-url].

## Directory Layout for the Project

```
model/                --> The mysql data model files for the application
public/               --> all of the angularjs source files for client side     
  app/                   --> Angularjs client side code
  test/                  --> Test for angular app
routes/               --> contains the files Http methods for all the routes     
index.js              --> Entry point for our Nodejs server
config.js             --> Database and auth configurations(should be private)
```

## Directory Layout for Angularjs App

```
app/                 --> all of the source files for the application
  app.css               --> default stylesheet
  modules/              --> all app specific modules
    header/                    --> contains header module
      header.controller.js        --> Controller module for header section
      header.html                 --> Html content for the header
    footer/                    --> contains footer module
      footer.controller.js        --> Controller module for footer section
      footer.html                 --> Html content for the footer
    editor/                   --> contains editor module
      editor.controller.js        --> Controller module for editor section
      editor.html                 --> Html content for the editor
      fabric.service.js           --> Factory service of the Fabric.js library
      util.service.js             --> Factory service for few common DOM operations
  images/               --> the images folder
  app.js                --> main application module
  index.html            --> app layout file (the main html template file of the app)
  index.html            --> app layout file (the main html template file of the app)
```


## Testing (Pending)

There are two kinds of tests in the `TshirtDesigner` application: Unit tests and end-to-end tests.


## Serving the Application Files

While Angular is client-side-only technology and it is possible to create Angular web apps that
do not require a backend server at all, we recommend serving the project files using a local
web server during development to avoid issues with security restrictions (sandbox) in browsers. The
sandbox implementation varies between browsers, but quite often prevents things like cookies, XHR,
etc to function properly when an HTML page is opened via the `file://` scheme instead of `http://`.

### Running the App during Development

The `TshirtDesigner` project comes preconfigured with a local development web server. It is a Node.js
tool called [http-server][http-server]. You can start this web server with `npm start`, but you may
choose to install the tool globally:

```
sudo npm install -g http-server
```

Then you can start your own development web server to serve static files from a folder by running:

```
http-server -a localhost -p 8000
```

Alternatively, you can choose to configure your own web server, such as Apache or Nginx. Just
configure your server to serve the files under the `app/` directory.


## Contact

For any request or query please open an issue.

[angularjs]: https://angularjs.org/
[fabric.js]: http://fabricjs.com/
[git]: https://git-scm.com/
[http-server]: https://github.com/indexzero/http-server
[jasmine]: https://jasmine.github.io/
[jdk]: https://wikipedia.org/wiki/Java_Development_Kit
[jdk-download]: http://www.oracle.com/technetwork/java/javase/downloads
[karma]: https://karma-runner.github.io/
[local-app-url]: http://localhost:8080/
[node]: https://nodejs.org/
[npm]: https://www.npmjs.org/
[protractor]: http://www.protractortest.org/
[selenium]: http://docs.seleniumhq.org/
[travis]: https://travis-ci.org/
[travis-docs]: https://docs.travis-ci.com/user/getting-started
