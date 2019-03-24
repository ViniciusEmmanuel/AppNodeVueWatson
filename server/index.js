const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors');

const app = express();

//Middleware
app.use(bodyParse.json());
app.use(cors());

const routes = require('./routes/routes');
app.use(routes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server started on port ${port}`));