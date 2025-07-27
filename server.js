const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./config/db");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swaggerConfig"); // ✅ Import only

dotenv.config();

const app = express();
app.use(express.json());

// ✅ Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ✅ API routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/menu-items", require("./routes/menuItems"));

// ✅ DB connection
sequelize.authenticate()
  .then(() => console.log("✅ Connected to DB"))
  .catch(err => console.error("❌ DB connection failed:", err));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
