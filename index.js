const express = require('express');
const app = express();
const port = 5000;
const toilettesRoute = require('./routes/toilettes');
require('./models');

app.use(express.json());

app.use('/toilets', toilettesRoute);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

// http://localhost:5000/toilets?latitude=40.20398&longitude=100.230940&r=10000
