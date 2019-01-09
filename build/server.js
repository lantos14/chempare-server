'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _nodeCron = require('node-cron');

var _nodeCron2 = _interopRequireDefault(_nodeCron);

var _scrapeController = require('./Scrapers/scrapeController');

var _scrapeController2 = _interopRequireDefault(_scrapeController);

var _parseQuery = require('./utilities/parseQuery');

var _parseQuery2 = _interopRequireDefault(_parseQuery);

var _index = require('./scheduler/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var bodyParser = require('body-parser');

var _require = require('./routers'),
    routerDB = _require.routerDB,
    routerUser = _require.routerUser;

var PORT = process.env.PORT || 3000;

require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(_express2.default.json());

// Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://' + process.env.DB_USERNAME + ':' + process.env.DB_PWD + '@duri-products-euhwc.mongodb.net/duriDB?retryWrites=true';
console.log('process.env.DB_USERNAME: ', process.env.DB_USERNAME);
console.log('process.env.DB_PWD: ', process.env.DB_PWD);
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// routes

app.use(routerDB);
app.use(routerUser);

app.get('/test', async function (req, res) {

  var queries = (0, _parseQuery2.default)(req.query);
  console.log('query parameters: ', queries);
  var result = await (0, _scrapeController2.default)(queries);

  res.json({
    result: result
  });
});

app.listen(PORT, function () {
  console.log('Server is running on port ' + PORT);
});

// initiate schedule

_nodeCron2.default.schedule('0 0 * * *', function () {
  console.log('---log: daily data fetching started');

  (0, _index2.default)();
});
//# sourceMappingURL=server.js.map