var express = require('express');
var router = express.Router();
var crowdfunding_db = require('../crowdfunding_db')

var connection = crowdfunding_db.getconnection();

/* GET categories listing. */
router.get('/', function(req, res, next) {

  connection.query(
    'SELECT * FROM `category`',
    function (err, results, fields) {
      if (err) {
        console.log(err);
      } else {
        res.json(results); // results contains rows returned by server
      }
    }
  );
});

module.exports = router;