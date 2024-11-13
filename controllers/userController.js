import db from "../models/index.js";

const User = db.user;

const addUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Username, email, and password are required." });
  }
  const newUser = User.build({
    username,
    email,
    password,
  });
  console.log("start");
  console.log(newUser instanceof User); // true
  console.log(newUser.username); // Should log the username from the request

  // Save the user to the database
  await newUser.save();
  console.log("NewUser was saved to the database!");
  console.log(newUser.toJSON());

  // Return the saved user data
  res.status(200).json(newUser.toJSON());
};
export { addUser };
