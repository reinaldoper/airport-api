"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const data_source_1 = require("./database/data-source");
const PORT = 3000;
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("Banco de dados conectado!");
    app_1.default.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
})
    .catch((err) => {
    console.error("Erro ao conectar no banco de dados", err);
});
