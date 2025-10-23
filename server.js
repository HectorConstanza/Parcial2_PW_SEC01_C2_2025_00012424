const express = require("express");
const cuentasRoutes = require("./routes/cuentas");

const app = express();
const PORT = 3130;

app.use(express.json());
app.use("/cuentas", cuentasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
