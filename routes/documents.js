const mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

const documentsController = require('../controller/documentsController')

/* GET documents */
router.get('/', documentsController.getDocuments)

/* Create documents */
router.post('/', documentsController.createDocument)

/* Update document */
router.put('/:id', documentsController.updateDocument)

/* Delete document */
router.delete('/:id', documentsController.deleteDocument)

module.exports = router;