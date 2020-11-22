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

Transaction.getPemasukan = (qparams, result) => {
    let divisi = (qparams.divisi == null) ? '' : qparams.divisi;
    let bulan = (qparams.bulan == null) ? '' : qparams.bulan;
    let tahun = (qparams.tahun == null) ? '' : qparams.tahun;
    let obj = {status: "OK", total_pemasukan: 0, total_pengeluaran: 0, data: {}};
    
    var params = ` where divisi LIKE '%${divisi}%' AND tanggal_transaksi LIKE '${tahun}-${bulan}%'`;
    var resPem; 
    var resPen;
    var resAll;

    sql.query("SELECT SUM(IF(jenis_transaksi = 'PEMASUKAN', jumlah_transaksi ,0)) AS value_sum_plus FROM transaksi"
        +params, (err,res) => {
        if (err) {
            console.log("error pem: ", err);
            result(null, err);
            return;
        };
        resPem = res[0].value_sum_plus;
    });
    sql.query("SELECT SUM(IF(jenis_transaksi = 'PENGELUARAN', jumlah_transaksi ,0)) AS value_sum_min FROM transaksi"
        +params, (err,res) => {
        if (err) {
            console.log("error pen: ", err);
            result(null, err);
            return;
        }
        resPen = res[0].value_sum_min;
    });

    sql.query("SELECT * FROM transaksi"+params, (err,res) => {
        if (err) {
            console.log("error all: ", err);
            result(null, err);
            return;
        }
        resAll = res;
        obj.total_pemasukan = resPem;
        obj.total_pengeluaran = resPen;
        obj.data = resAll;
        result(null, obj);
    });
};

module.exports = Transaction;