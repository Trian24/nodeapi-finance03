const sql = require("./db.js");

//constructor
const Transaction = function(transaction) {
    this.tanggal_transaksi = transaction.tanggal_transaksi;
    this.jenis_transaksi = transaction.jenis_transaksi;
    this.divisi = transaction.divisi;
    this.jumlah_transaksi = transaction.jumlah_transaksi;
    this.deskripsi = transaction.deskripsi;
    this.total_kas = transaction.total_kas;
};

Transaction.create = (newTransaction, result) => {
    sql.query("INSERT INTO transaksi SET ?", newTransaction, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Created transaction: ", {id: res.insertID, ...newTransaction});
        result(null, { id: res.insertID, ...newTransaction });
    });
};

Transaction.findByDivisi = (transactionDivisi, result) => {
    sql.query(`SELECT * FROM transaksi WHERE divisi = "${transactionDivisi}"`, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found by divisi: ", res);
            result(null, res);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Transaction.findByTahun = (tahun, result) => {
    console.log(tahun + "yana bangast");
    sql.query(`SELECT * FROM transaksi WHERE tanggal_transaksi LIKE "${tahun}-%"`, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found by tahun: ", res);
            result(null, res);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Transaction.findByBulan = (tahun, bulan, result) => {
    console.log(tahun + "yana bangast" +bulan);
    sql.query(`SELECT * FROM transaksi WHERE tanggal_transaksi LIKE "${tahun}-${bulan}%"`, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found by bulan: ", res);
            result(null, res);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Transaction.getAll = result => {
    sql.query("SELECT * FROM transaksi", (err,res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
      
        console.log("Transaksi: ", res);
        result(null, res);
    });
};

module.exports = Transaction;