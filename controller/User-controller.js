const User = require('../models/User')

module.exports = {
    addUser: async(req,res) => {
        try {
            const { email } = req.body;
        
            // Check if the email already exists in the database
            const existingUser = await User.findOne({ email });
            if (existingUser) {
              return res.status(400).json({ message: "User already exists with this email" });
            }
        
            // Create new user
            const user = new User(req.body);
            await user.save();
        
            res.status(201).json({ message: "User created successfully", user });
          } catch (error) {
            res.status(400).json({ error: error.message });
          }
    },
    getAllUsers: async (req, res) => {
        try {
          const users = await User.find({isDelete: false});
          res.status(200).json(users);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },
    
      // READ: Get a single user by ID
      getUserById: async (req, res) => {
        try {
          const user = await User.findById(req.params.id);
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
          res.status(200).json(user);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },
    
      // UPDATE User
      updateUser: async (req, res) => {
        try {
          const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
          });
    
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
    
          res.status(200).json({ message: "User updated successfully", user });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },
    
      // DELETE User
      deleteUser: async (req, res) => {
        const userId = req.params.id;
        try {
          const updatedUser = await User.findByIdAndUpdate(
            userId,
            { isDelete: true },
            { new: true }
          );
    
          if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
          }
    
          res
            .status(200)
            .json({ message: "User deleted successfully", user: updatedUser });
        } catch (error) {
          res.status(500).json({ error: "Error deleting user" });
        }
    
      }
}