const jwt = require("jsonwebtoken");
const User = require("../modals/userModal");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  try {
    const { name, password, email, role } = req.body;
    if (!email || !role || !name || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const emailcheck = await User.findOne({ email: email });
    if (emailcheck) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const saltRounds = 10;
  
    console.log(password)
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(hashedPassword)
    const user = new User({ name, password: hashedPassword, email, role });
    await user.save();
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log(error);
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const secretKey = "bscsnc123"; // Move to environment variable in production
    const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: "1h" });

    // Save token in the database (optional)
    if (!user.tokens) user.tokens = []; // Ensure tokens field exists
    user.tokens.push(token); // Store multiple tokens
    await user.save();

    res.status(200).json({
      message: "Logged in successfully",
      user: {
        id: user._id,
        token,
        role: user.role,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

const checkToken = async (req, res) => {
   
  try {

    if (!req.user || !req.user._id) {
      console.log("Error: req.user is undefined or missing _id");
      return res
        .status(401)
        .json({ message: "Unauthorized. Invalid token data." });
    }


    const user = await User.findById(req.user._id).select("-password");


    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Token is valid",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Error in checkToken:", error);
    return res.status(500).json({
      message: "Internal server error while checking token",
    });
  }
};

module.exports = { signUp, signIn, checkToken };
