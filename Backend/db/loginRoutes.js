// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcryptjs");
// const Login = require("./Login"); // ✅ Corrected Import

// // ✅ POST API: Register/Login User
// router.post("/api/logins", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if user already exists
//     let user = await Login.findOne({ email });
//     if (user) {
//       return res.status(400).json({ error: "User already exists" });
//     }

//     // Hash the password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);
//     user = new Login({ email, password: hashedPassword });

//     await user.save();
//     res.status(201).json({ message: "User registered successfully" });

//   } catch (error) {
//     res.status(500).json({ error: "Error in registering user" });
//   }
// });

// // ✅ GET API: Fetch All Login Users
// router.get("/api/logins", async (req, res) => {
//   try {
//     const users = await Login.find(); // Fetch all users
//     res.json(users);
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).json({ error: "Error fetching users" });
//   }
// });

// module.exports = router;

















const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const Login = require("./Login"); // Assuming Login is a User model





router.post("/api/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    console.log("Received login request for email:", email);

    // Convert email to lowercase and trim any spaces
    email = email.toLowerCase().trim();

    const user = await Login.findOne({ email });

    console.log("User found in DB:", user);

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful" });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});


router.get("/api/users", async (req, res) => {
  try {
    const users = await Login.find();  // Fetch all users

    // Remove password from each user object and send the password as well
    const usersWithPassword = users.map(user => {
      const userObj = user.toObject();
      return {
        id: userObj._id,
        email: userObj.email,
        Password: userObj.password  // Include the hashed password in the response (for testing purposes)
      };
    });

    res.status(200).json(usersWithPassword);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      error: "Error fetching users",
      details: error.message
    });
  }
});


// Optional: Fetch user by email
router.get("/api/users/:email", async (req, res) => {
  try {
    const user = await Login.findOne({ email: req.params.email }); // Fetch user by email
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userObj = user.toObject(); 
    delete userObj.password; // Remove password from response
    res.status(200).json(userObj);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Error fetching user" });
  }
});

module.exports = router;
