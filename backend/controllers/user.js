
const { validateEmail } = require("../helper/validation");
const User = require("../models/User")
exports.register = async (req, res) => {

    try {
        const { first_name, last_name, email, username, bYear, bMonth, bDay, password, gender } = req.body;


        //passing through validateEmail function
        if (!validateEmail(email)) {
            return res.status(400).json({ message: "Invalid Email" })
        }

        const user = await new User({
            //can also use req.body
            first_name, last_name, email, username, bYear, bMonth, bDay, password, gender
        }).save();
        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }



}