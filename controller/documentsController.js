const mongoose = require('mongoose')
const Documents = mongoose.model('documents');

exports.getDocuments = async (req, res) => {
    try {
        const docs = await Documents.find();
        res.json(docs);
    } catch (error) {
        res.status(500).send({
            message: "Retrieve Document error"
        })
    }
}

exports.createDocument = async (req, res) => {
    await new Documents(req.body).save((error, data) => {
        if (error) {
            res.status(500).send({
                message: "Save document error"
            })
        }else {
            res.status(200).send({
                message: "document created",
                data
            })
        }
    })
}

exports.updateDocument = async (req, res) => {
    const documentId = req.params.id

    console.log(req.body)
    
    await Documents.findOneAndUpdate({_id: documentId}, { $set: req.body },
        (error, data) => {
            if (error) {
                res.status(500).send({
                    message: "Update document error"
                })
            }else {
                res.status(200).send({
                    message: "document updated",
                    data
                })
            }
        })
}

exports.deleteDocument = async (req, res) => {
    const documentId = req.params.id

    await Documents.deleteOne({_id: documentId}, (error, data) => {
        if (error) {
            res.status(500).send({
                message: "Delete document error"
            })
        }else {
            res.status(200).send({
                message: "document deleted",
                data
            })
        }
    })

}