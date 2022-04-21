const asyncHandler = require("../middlewares/asyncHandlerFn");
const axios = require("axios");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const sgMail = require('@sendgrid/mail')


const JWT_EXPIRE = process.env.JWT_EXPIRE;
const JWT_SECRET = process.env.JWT_SECRET;

const { installWallet } = require("../utils/wallets");

const User = require("../models/User");
const ResetCode = require("../models/ResetCode");

mongoose.connect(process.env.USER_DBHOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// SIGN UP - Creates user model, adds salt to password, creates a JWT
exports.signup = asyncHandler(async (req, res) => {
    try {
        const newUser = new User(req.body);

        const result = await installWallet(req.body.username)
        newUser.wallet = result.data.wallet;

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        const user = await newUser.save();


        const payload = {
            userId: user._id,
            username: user.username,
            walletId: user.wallet.id,
            recieveKey: user.wallet.recieveKey,
        };


        const token = jwt.sign(payload, JWT_SECRET, {
            expiresIn: JWT_EXPIRE,
        });

        res.status(200).json({ success: true, token, expiresIn: JWT_EXPIRE });
    } catch (err) {
        console.log({ err });
    }
});

// LOGIN
exports.login = async (req, res) => {
    const { password, email } = req.body;

    try {
        let user;
        if (email) user = await User.findOne({ email });


        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            res.status(401).json({ success: false, message: "Incorrect Password" });
            return;
        }

        const payload = {
            userId: user._id,
            username: user.username,
            walletId: user.wallet.id,
            recieveKey: user.wallet.recieveKey,
        };

        const token = jwt.sign(payload, JWT_SECRET, {
            expiresIn: JWT_EXPIRE,
        });

        res
            .status(200)
            .json({ success: true, token, message: "Successfully logged in" });
    } catch (err) {
        console.log("Error with auth -> /login endpoint");
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

exports.initiateResetPassword = async (req, res) => {
    const { email } = req.body
    // Check email exists in db
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
        res.status(404).json({ success: false, message: "No user with that email address" });
        return
    }

    // Delete old codes with that email
    await ResetCode.deleteMany({ email })

    // Generate a code
    const randomBytes = crypto.randomBytes(2)
    const code = parseInt(randomBytes.toString('hex'), 16)

    // Save the code in the database with the userid and username, and email
    const newCode = new ResetCode({ email, code });
    await newCode.save();

    // Send the code to the email adddress
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: 'dr.mcgrane@gmail.com', // Change to your recipient
        from: 'dr.mcgrane@gmail.com', // Change to your verified sender
        subject: 'Reset your password',
        text: code.toString(),
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })

}

exports.authenticateResetCode = async (req, res) => {
    const { code, email } = req.body

    const foundCode = await ResetCode.findOne({ email, code });

    if (!foundCode) {
        res.status(401).json({ success: false, message: "Code incorrect" });
        return
    }

    res.status(201).json({ success: true, message: "Code correct" });

}

exports.resetNewPassword = async (req, res) => {
    const { code, email, newPassword } = req.body

    const foundCode = await ResetCode.findOne({ email, code });

    if (!foundCode) {
        res.status(401).json({ success: false, message: "Code incorrect" });
        return
    }

    const salt = await bcrypt.genSalt(10);
    const newPasswordWithSalt = await bcrypt.hash(newPassword, salt);

    const newPass = await User.findOneAndUpdate({ email }, { password: newPasswordWithSalt })

    if (newPass) {
        await ResetCode.findOneAndDelete({ email, code })
    }
    res.status(200).json({ success: true, message: "Password Updated" });
}

exports.veryifyDecodeUser = async (req, res) => {
    try {
        const decoded = await jwt.verify(req.query.token, process.env.JWT_SECRET);
        console.log({ decoded });
        res.status(200).json({
            success: true,
            message: "Verify decode loud and clear over",
            decoded,
        });
    } catch (err) {
        console.log({ err });
        res.status(403).json({
            success: true,
            message: "You cannot perform this upload.",
        });
    }
};
