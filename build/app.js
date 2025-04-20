"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const planeRoutes_1 = __importDefault(require("./routes/planeRoutes"));
const cashFlowRoutes_1 = __importDefault(require("./routes/cashFlowRoutes"));
const airportRoutes_1 = __importDefault(require("./routes/airportRoutes"));
const employeeRoutes_1 = __importDefault(require("./routes/employeeRoutes"));
const flightRoutes_1 = __importDefault(require("./routes/flightRoutes"));
const ticketRoutes_1 = __importDefault(require("./routes/ticketRoutes"));
const passengerRoutes_1 = __importDefault(require("./routes/passengerRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "*" }));
app.use("/api", planeRoutes_1.default);
app.use("/api", cashFlowRoutes_1.default);
app.use("/api", airportRoutes_1.default);
app.use("/api", employeeRoutes_1.default);
app.use("/api", flightRoutes_1.default);
app.use("/api", ticketRoutes_1.default);
app.use("/api", passengerRoutes_1.default);
app.get("/", (req, res) => {
    res.send("API is running...");
});
exports.default = app;
