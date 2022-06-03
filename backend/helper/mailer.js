const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;

const Oauth_link = "https://developers.google.com/oauthplayground";

const { EMAIL, MAILING_ID, MAILING_SECRET, MAILING_REFRESH } = process.env;

const auth = new OAuth2(
    EMAIL, MAILING_ID, MAILING_SECRET, MAILING_REFRESH, Oauth_link
);


exports.sendVerficationEmail = (email, name, url) => {
    auth.setCredentials({
        refresh_token: MAILING_REFRESH,
    });

    const accessToken = auth.getAccessToken();
    const stmp = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "QAuth2",
            user: "EMAIL",
            clientId: MAILING_ID,
            clientSecret: MAILING_SECRET,
            refreshToken: MAILING_REFRESH,
            accessToken,
        }
    });

    const mailOptions = {
        from: EMAIL,
        to: email,
        subject: "Facebook email verification",
        html: "",

    };
    stmp.sendMail(mailOptions, (err, res) => {
        if (err) return err;
        return res;
    })
}