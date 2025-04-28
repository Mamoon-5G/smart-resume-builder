import mongoose from 'mongoose';

// Define the schema for the user model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Makes sure that the email is unique
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email'], // Regex for email validation
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be at least 6 characters long'], // Password length validation
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the model
const User = mongoose.model('User', userSchema);
export default User;  // Use export default
