import User from "../models/User.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });
    return res.status(201).json({
  success: true,
  message: "User registered successfully",
  user: {
    id: user._id,
    name: user.name,
    email: user.email
  }
});

    console.log(hashedPassword);

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};