const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const app = express();
const PORT = process.env.PORT || 3001;

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