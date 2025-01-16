const db = require("../config/db");
const bcrypt = require("bcryptjs");

const signup = (req, res) => {
  const {  name, email, password } = req.body;

  // Check for missing fields
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if the email already exists
  db.query(
    "SELECT * FROM user_db WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) return res.status(500).json({ message: "Database error" });

      if (result.length > 0) {
        return res.status(400).json({ message: "Email already exists" });
      }

      try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        // Insert the user
        db.query(
          "INSERT INTO user_db (name, email, password) VALUES (?, ?, ?)", // Fixed the query
          [ name, email, hashedPassword], // Fixed: added the 4th value
          (err, result) => {
            if (err) return res.status(500).json({ message: "Signup failed" });

            res.status(201).json({ message: "User registered successfully" });
          }
        );
      } catch (error) {
        res.status(500).json({ message: "Server error during signup" });
      }
    }
  );
};

const login = () => {};

module.exports = {
  signup,
  login,
};
