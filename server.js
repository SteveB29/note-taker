// sets up express object, sets it to app, and creates PORT const
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// creates routes for modularized calls
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// express middleware
app.use(express.json());
app.use(express.urlencoded( {extended: true} ));

// makes all static files available on page load
app.use(express.static("public"));

// sets routes for api vs regular call
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// listens for PORT call
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});