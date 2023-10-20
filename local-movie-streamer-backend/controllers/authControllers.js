import User from "../Models/user.js";
import { hashPassword, comparePasswords } from "../helpers/auth.js"; // import the helper functions
import jwt from "jsonwebtoken"; // import jsonwebtoken

// testing
export const testing = (req, res) => {
  res.json("Test is Working!");
};

// register user
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

    // hash the password
    const hashedPassword = await hashPassword(password);

    // create the user data
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

// loggin in user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // checks if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "No User found" });
    }
    //check if the password is correct
    const match = await comparePasswords(password, user.password);
    if (!match) {
      return res.json({ error: "Password wrong" });
    }
    if (match) {
      // create a token
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
        } // create a token
      );
      // return res.json("passwords match");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

export const getProfile = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

// logout user

// export const logoutUser = (req, res) => {
//   if (req.session) {
//     req.session.destroy((err) => {
//       if (err) {
//         res.status(500).send("Failed to logout");
//       } else {
//         res.status(200).send("Logged out successfully");
//       }
//     });
//   } else {
//     res.status(200).send("No active session found");
//   }
// };
export const logoutUser = (req, res) => {
  res.clearCookie("token").status(200).send("Logged out successfully");
};
