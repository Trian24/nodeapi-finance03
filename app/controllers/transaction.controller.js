const Transaction = require("../models/transaction.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    //create a transaction
    const transaction = new Transaction({
        tanggal_transaksi: req.body.tanggal_transaksi,
        jenis_transaksi: req.body.jenis_transaksi,
        divisi: req.body.divisi,
        jumlah_transaksi: req.body.jumlah_transaksi,
        deskripsi: req.body.deskripsi,
        total_kas: req.body.total_kas
    });

    Transaction.create(transaction, (err, data) => {
        if(err)
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Customer."
        });
        else res.send(data);
    });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    const qparams = req.query;

    Transaction.getPemasukan(qparams, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving customers."
        });
        else res.send(data);
    });
};
