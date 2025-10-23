const cuentas = require("../data/cuentas");

exports.getAllCuentas = (req, res) => {
  res.json({
    count: cuentas.length,
    data: cuentas
  });
};

exports.getCuentaById = (req, res) => {
  const id = parseInt(req.params.id);
  const cuenta = cuentas.find(c => c.id === id);
  res.json({
    finded: !!cuenta,
    account: cuenta || null
  });
};

exports.getCuentaByQuery = (req, res) => {
  const query = req.query.queryParam?.toLowerCase();

  if (!query) {
    return res.json({ finded: false, message: "Debe enviar un queryParam" });
  }

  // Buscar por ID
  const byId = cuentas.find(c => c.id === parseInt(query));

  // Buscar por nombre (que contenga la palabra)
  const byName = cuentas.filter(c => c.nombre.toLowerCase().includes(query));

  // Buscar por género exacto
  const byGender = cuentas.filter(c => c.genero.toLowerCase() === query);

  if (byId) {
    return res.json({ finded: true, account: byId });
  }

  if (byName.length > 0) {
    return res.json({ finded: true, data: byName });
  }

  if (byGender.length > 0) {
    return res.json({ finded: true, data: byGender });
  }

  return res.json({ finded: false, message: "No se encontró ninguna coincidencia" });
};



exports.getBalanceTotal = (req, res) => {
  const cuentasActivas = cuentas.filter(c => c.isActive);
  const total = cuentasActivas.reduce((sum, c) => sum + c.balance, 0);

  res.json({
    status: cuentasActivas.length > 0,
    accountBalance: total.toFixed(2)
  });
};
