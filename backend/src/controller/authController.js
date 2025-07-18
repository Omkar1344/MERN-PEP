const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../model/Users');
const secret = "309b161a-5c19-4952-bef1-546829211287";
const refreshSecret = process.env.JWT_REFRESH_TOKEN_SECRET;
const { OAuth2Client } = require('google-auth-library');
const { validationResult } = require('express-validator');
const { send } = require('../service/emailService');
// const { default: subscriptions } = require('razorpay/dist/types/subscriptions');


const authController = {
    login: async (request, response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty) {
            return response.status(401).json({ errors: errors.array() });
        }
        //These values are here because of express.json() middleware
        try {
            const { username, password } = request.body;

            const data = await Users.findOne({ email: username });
            if (!data) {
                return response.status(401).json({ message: 'Invalid Credentials' });
            }
            const isMatch = await bcrypt.compare(password, data.password);

            if (!isMatch) {
                return response.status(401).json({ message: 'Invalid Credentials' });
            }

            const userDetails = {
                id: data._id,
                name: data.name,
                email: data.email,
                role: data.role ? data.role : 'admin',
                adminId: data.adminId,
                credits: data.credits
            };
            const token = jwt.sign(userDetails, process.env.JWT_SECRET, { expiresIn: '1d' });
            const refreshToken = jwt.sign(userDetails, refreshSecret, { expiresIn: '7d' });

            response.cookie('jwtToken', token, {
                httpOnly: true,
                secure: true,
                domain: 'localhost',
                path: '/'
            });

            response.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                domain: 'localhost',
                path: '/'
            });

            response.json({ message: 'User authenticated', userDetails: userDetails });
        } catch (error) {
            console.log(error);
            response.status(500).json({ error: 'Internal server error' });
        }
    },

    logout: (request, response) => {
        response.clearCookie('jwtToken');
        response.clearCookie('refreshToken');
        response.json({ message: 'User logged out succesfully' });
    },

    isUserLoggedIn: async (request, response) => {
        const token = request.cookies.jwtToken;

        if (!token) {
            return response.status(401).json({ message: 'Unauthorized access' });
        }

        jwt.verify(token, process.env.JWT_SECRET, async (error, userDetails) => {
            if (error) {
                return response.status(401).json({ message: 'Unauthorized access' });
            } else {
                const data = await Users.findById({ _id: userDetails.id });
                return response.json({ userDetails: data });
            }
        });
    },

    register: async (request, response) => {
        try {
            const { username, password, name } = request.body;
            const data = await Users.findOne({ email: username });
            if (data) {
                return response.status(401).json({ message: 'User already exists' });
            }
            const encryptedPassword = await bcrypt.hash(password, 10);

            const user = new Users({
                email: username,
                password: encryptedPassword,
                name: name,
                role: 'admin',
                credits: user.credits
            });

            await user.save();
            response.status(200).json({ message: 'User registered' });
        } catch (error) {
            console.log(error);
            return response.status(500).json({ message: 'Internal server error' });
        }
    },

    googleAuth: async (request, response) => {
        const { idToken } = request.body;
        if (!idToken) {
            return response.status(400).json({ message: 'Invalid request' });
        }

        try {
            const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
            const googleResponse = await googleClient.verifyIdToken({
                idToken: idToken,
                audience: process.env.GOOGLE_CLIENT_ID
            });

            const payload = googleResponse.getPayload();
            const { sub: googleId, email, name } = payload;

            let data = await Users.findOne({ email: email });
            if (!data) {
                data = new Users({
                    email: email,
                    name: name,
                    isGoogleUser: true,
                    googleId: googleId,
                    role: 'admin'
                });

                await data.save();
            }

            const user = {
                id: data._id ? data._id : googleId,
                username: email,
                name: name,
                role: data.role ? data.role : 'admin',
                credits: data.credits
            };

            const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1d' });
            const refreshToken = jwt.sign(user, refreshSecret, { expiresIn: '7h' });

            response.cookie('jwtToken', token, {
                httpOnly: true,
                secure: true,
                domain: 'localhost',
                path: '/'
            });

            response.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                domain: 'localhost',
                path: '/'
            });

            response.json({ message: 'User authenticated', userDetails: user });
        } catch (error) {
            console.log(error);
            return response.status(500).json({ error: 'Internal server error' });
        }
    },

    refreshToken: async (request, response) => {
        try {
            const refreshToken = request.cookies?.refreshToken;
            if (!refreshToken) {
                return response.status(401).json({ message: 'No refresh token' });
            }

            const decoded = jwt.verify(refreshToken, refreshSecret);
            const data = await Users.findById({ _id: decoded.id });
            const user = {
                id: data._id,
                username: data.email,
                name: data.name,
                role: data.role ? data.role : 'admin',
                credits: data.credits,
                subscription: data.subscription
            };

            const newAccessToken = jwt.sign(user, secret, { expiresIn: '1d' });

            response.cookie('jwtToken', newAccessToken, {
                httpOnly: true,
                secure: true,
                domain: 'localhost',
                path: '/'
            });

            response.json({ message: 'Token refreshed', userDetails: user });
        } catch (error) {
            console.log(error);
            response.status(500).json({
                message: "Internal server error"
            });
        }
    },

    sendResetPasswordToken: async (req, res) => {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Generate 6-digit code
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now
        user.resetPasswordCode = code;
        user.resetPasswordCodeExpiry = expiry;
        await user.save();
        // Send code via email
        try {
            await send(email, 'Your Password Reset Code', `Your password reset code is: ${code}`);
        } catch (err) {
            return res.status(500).json({ message: 'Failed to send email' });
        }
        return res.json({ message: 'Reset code sent to email' });
    },

    resetPassword: async (req, res) => {
        const { email, code, newPassword } = req.body;
        if (!email || !code || !newPassword) {
            return res.status(400).json({ message: 'Email, code, and new password are required' });
        }
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!user.resetPasswordCode || !user.resetPasswordCodeExpiry) {
            return res.status(400).json({ message: 'No reset code found. Please request a new one.' });
        }
        if (user.resetPasswordCode !== code) {
            return res.status(400).json({ message: 'Invalid reset code' });
        }
        if (user.resetPasswordCodeExpiry < new Date()) {
            return res.status(400).json({ message: 'Reset code expired' });
        }
        // Hash new password
        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        user.password = encryptedPassword;
        user.resetPasswordCode = undefined;
        user.resetPasswordCodeExpiry = undefined;
        await user.save();
        return res.json({ message: 'Password reset successful' });

    }
};

module.exports = authController;