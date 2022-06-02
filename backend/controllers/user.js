
const { validateEmail } = require("../helper/validation");
const User = require("../models/User")
exports.register = async (req, res) => {

    try {
        const { first_name, last_name, email, username, bYear, bMonth, bDay, password, gender } = req.body;


        //passing through validateEmail function
        if (!validateEmail(email)) {
            return res.status(400).json({ message: "Invalid Email" })
        }

        //check if email is already exits or not
        const check = await User.findOne({ email });
        if (check) {
            return res.status(400).json({ message: "Email Already exists,Try with different email address" })
        }

        //check if users age is more than 12 years
        if ((2022 - bYear) < 12) {
            return res.status(400).json({ message: "Minimum age to register is 12,Sorry You are not allowed" })
        }

        //password hash

        const user = await new User({
            //can also use req.body
            first_name, last_name, email, username, bYear, bMonth, bDay, password, gender
        }).save();
        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }



}