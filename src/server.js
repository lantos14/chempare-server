import express from 'express';

const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');

const { chemAxon } = require('./routers');
const PORT = process.env.PORT || 3030;

require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// routes

app.use(chemAxon);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
