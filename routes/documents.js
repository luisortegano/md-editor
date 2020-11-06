var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send([
        {
            'name': 'File',
            'date': new Date()
        },
        {
            'name': 'File1',
            'date': new Date()
        },
        {
            'name': 'File2',
            'date': new Date()
        },
        {
            'name': 'File3',
            'date': new Date()
        },
    ]);
});

module.exports = router;