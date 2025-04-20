import express from "express";
import planeRoutes from "./routes/planeRoutes";
import cashFlowRoutes from "./routes/cashFlowRoutes";
import airportRoutes from "./routes/airportRoutes";
import employeeRoutes from "./routes/employeeRoutes";
import flightRoutes from "./routes/flightRoutes";
import ticketRoutes from "./routes/ticketRoutes";
import passengerRoutes from "./routes/passengerRoutes";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/api", planeRoutes);
app.use("/api", cashFlowRoutes);
app.use("/api", airportRoutes);
app.use("/api", employeeRoutes);
app.use("/api", flightRoutes);
app.use("/api", ticketRoutes);
app.use("/api", passengerRoutes);
app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;
