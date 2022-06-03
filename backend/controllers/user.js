
const { validateEmail, validateLength, validateUsername } = require("../helper/validation");
const User = require("../models/User")
const bcrypt = require("bcrypt");
const { generateToken } = require("../helper/tokens");
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

        //check length of first & last name
        if (!validateLength(first_name, 3, 30)) {
            return res.status(400).json({ message: "first name must between 3-30 charachters" })

        }
        if (!validateLength(last_name, 3, 30)) {
            return res.status(400).json({ message: "last name must between 3-30 charachters" })

        }

        //password
        if (!validateLength(password, 6, 18)) {
            return res.status(400).json({ message: "password must between 6 & 18 charachters" })

        }

        //check if users age is more than 12 years
        if ((2022 - bYear) < 12) {
            return res.status(400).json({ message: "Minimum age to register is 12,Sorry You are not allowed" })
        }

        //unique username

        let tempUsername = first_name + last_name;
        let uniqueUserName = await validateUsername(tempUsername);



        //password hash
        const cryptedPassword = await bcrypt.hash(password, 12);
        // console.log(cryptedPassword);
        const user = await new User({
            //can also use req.body
            first_name, last_name, email, username: uniqueUserName, bYear, bMonth, bDay, password: cryptedPassword, gender
        }).save();

        //generte token
        const emailValidationToken = generateToken({ id: user._id.toString() }, "30m");
        console.log(emailValidationToken)
        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }



}