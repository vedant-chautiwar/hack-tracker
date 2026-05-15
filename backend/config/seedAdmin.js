import User from "../models/User.js";

const seedAdminUser = async () => {
  const name = process.env.ADMIN_NAME || "admin";
  const password = process.env.ADMIN_PASSWORD || "hacktracker123";

  const existingUser = await User.findOne({ name });

  if (!existingUser) {
    await User.create({ name, password });
    console.log("Personal login user created:");
  } else {
    console.log("Personal login user already exists:");
  }

  console.log(`  name: ${name}`);
  console.log(`  password: ${password}`);
};

export default seedAdminUser;
