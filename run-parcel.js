// This is the fix for the know issue of Parcel v1: https://github.com/parcel-bundler/parcel/issues/1315#issuecomment-523524186
const Bundler = require('parcel-bundler');
const app = require('express')();

const files = 'src/*.html'; // Pass an absolute path to the entrypoint here
const options = {}; // See options section of api docs, for the possibilities

// Initialize a new bundler using a file and options
const bundler = new Bundler(files, options);

// handle GET request for "/" correctly
app.get('/', (req, res, next) => {
  req.url = '/index.html';
  app._router.handle(req, res, next);
});

// Let express use the bundler middleware, this will let Parcel handle every request over your express server
app.use(bundler.middleware());

// Listen on port 1234
const port = Number(process.env.PORT || 1234);
app.listen(port);
console.log(`Server running at http://localhost:${port}`);
