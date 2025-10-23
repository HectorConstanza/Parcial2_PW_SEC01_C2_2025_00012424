const express = require("express");
const router = express.Router();
const controller = require("../controllers/cuentasController");


router.get("/", (req, res) => {
  if (req.query.queryParam) {
    controller.getCuentaByQuery(req, res);
  } else {
    controller.getAllCuentas(req, res);
  }
});

router.get("/balance", controller.getBalanceTotal);
router.get("/:id", controller.getCuentaById);

module.exports = router;
