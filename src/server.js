import express from 'express';

const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');

const { chemAxon } = require('./routers');
require('dotenv').config()

const PORT = process.env.PORT;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// routes

app.use(chemAxon);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
