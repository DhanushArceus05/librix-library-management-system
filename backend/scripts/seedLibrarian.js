require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");
const connectDB = require("../config/db");

const seedLibrarian = async () => {
  await connectDB();

  const email = "librarian@library.com";
  const password = "LibrixDemo@2026";

  let librarian = await User.findOne({ email });

  if (librarian) {
    librarian.name = "Head Librarian";
    librarian.password = password;
    librarian.role = "librarian";

    await librarian.save();

    console.log("✅ Librarian account updated successfully!");
  } else {
    librarian = await User.create({
      name: "Head Librarian",
      email,
      password,
      role: "librarian",
    });

    console.log("✅ Librarian account created successfully!");
  }

  console.log(`   Email   : ${email}`);
  console.log(`   Password: ${password}`);
  console.log(`   Role    : librarian`);

  console.log("\n🚀 Librix demo account is ready.");

  await mongoose.disconnect();
  process.exit(0);
};

seedLibrarian().catch(async (err) => {
  console.error("❌ Seed error:", err.message);
  await mongoose.disconnect();
  process.exit(1);
});