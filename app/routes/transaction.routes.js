module.exports = app => {
    const transaction = require("../controllers/transaction.controller.js");

    app.post("/transaction", transaction.create);

    app.get("/transaction", transaction.findAll);

    app.get("/transaction/:divisi", transaction.findOne);
    
    app.get("/transaction/bulan/:tahun/:bulan", transaction.findBulan);
    
    app.get("/transaction/tahun/:tahun", transaction.findTahun);
}