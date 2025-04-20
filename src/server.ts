import app from "./app";
import { AppDataSource } from "./database/data-source";

const PORT = 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado!");
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch((err) => {
    console.error("Erro ao conectar no banco de dados", err);
  });