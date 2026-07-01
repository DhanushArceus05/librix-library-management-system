require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log("\n🚀 Library Management System API");
      console.log("─────────────────────────────────────────");
      console.log(`  Status  : Running`);
      console.log(`  Port    : ${PORT}`);
      console.log(`  Env     : ${process.env.NODE_ENV || "development"}`);
      console.log(`  URL     : http://localhost:${PORT}`);
      console.log(`  Health  : http://localhost:${PORT}/api/health`);
      console.log("─────────────────────────────────────────\n");
    });

    // Handle unhandled promise rejections
    process.on("unhandledRejection", (err) => {
      console.error("❌ Unhandled Rejection:", err.message);
      server.close(() => process.exit(1));
    });

    // Graceful shutdown on SIGTERM
    process.on("SIGTERM", () => {
      console.log("👋 SIGTERM received. Shutting down gracefully...");
      server.close(() => {
        console.log("✅ Server closed.");
        process.exit(0);
      });
    });

    // Graceful shutdown on SIGINT (Ctrl+C)
    process.on("SIGINT", () => {
      console.log("\n👋 SIGINT received. Shutting down gracefully...");
      server.close(() => {
        console.log("✅ Server closed.");
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
