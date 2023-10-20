import User from "../Models/user.js";

export const testing = (req, res) => {
  res.json("Test is Working!");
};

export const registerUser = async (req, res) => {
  console.log("Register endpoint hit");
  try {
    const { name, email, password } = req.body;
    // checks if name, email, and  password are not empty
    if (!name) {
      return res.json({ error: "Name is required" });
    }
    // password
    if (!password || password.length < 6) {
      return res.json({ error: "Password is required and should be 6 chars" });
    }
    // Email check
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({ error: "Email is taken" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};
