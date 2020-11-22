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
    Transaction.getAll((err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving customers."
        });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Transaction.findByDivisi(req.params.divisi, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                message: `Not found divisi ${req.params.divisi}.`
                });
            } else {
                res.status(500).send({
                message: "Error retrieving divisi " + req.params.divisi
                });
            }
        } else res.send(data);
    });
};

exports.findTahun = (req, res) => {
    Transaction.findByTahun(req.params.tahun, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                message: `Not found tahun ${req.params.tahun}.`
                });
            } else {
                res.status(500).send({
                message: "Error retrieving tahun " + req.params.tahun
                });
            }
        } else res.send(data);
    });
};
exports.findBulan = (req, res) => {
    Transaction.findByBulan(req.params.tahun, req.params.bulan, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                message: `Not found tahun ${req.params.tahun} bulan ${req.params.bulan}.`
                });
            } else {
                res.status(500).send({
                message: "Error retrieving tahun " + req.params.tahun + " bulan " + req.params.bulan
                });
            }
        } else res.send(data);
    });
};