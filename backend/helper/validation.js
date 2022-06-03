const User = require("../models/User");

exports.validateEmail = (email) => {
    //validate email
    //regex => https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

exports.validateLength = (text, min, max) => {
    if (text.length > max || text.length < min) {
        return false;
    }
    return true
}


exports.validateUsername = async (username) => {
    let a = false;
    do {
        let check = await User.findOne({ username });
        if (check) {

            //change username if username already exists;
            username += (+new Date() * Math.random()).toString().substr(0, 1)
            a = true
        } else {
            a = false;
        }
    } while (a);
    return username;
}