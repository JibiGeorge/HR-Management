import userCredential from '../model/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = (req, res) => {
    try {
        const { username, password } = req.body;
        userCredential.findOne({ username })
            .then(user => {
                bcrypt.compare(password, user.password)
                    .then(passwordCheck => {
                        if (!passwordCheck)
                            return res.json({ error: 'Account Not Exist' });
                        // Create JWT Token
                        const UserToken = jwt.sign({
                            userId: user._id,
                            username: user.username
                            // eslint-disable-next-line no-undef
                        }, process.env.JWT_TOKEN, { expiresIn: '24h' });

                        return res.status(200).json({
                            msg: 'Login Successfull...!',
                            username: user.username,
                            UserToken,
                            role: user.role,
                            _id: user.userID,
                            loggedIn:true
                        });
                    })
                    // eslint-disable-next-line no-unused-vars
                    .catch((error) => {
                        return res.json({ error: 'Password does not match' });
                    });
            })
            // eslint-disable-next-line no-unused-vars
            .catch(error => {
                return res.json({ error: 'Username not found' });
            });
    } catch (error) {
        res.json({ message: "Internal Server Error...!" });
    }
};

export const verifyToken = async (req, res) => {
    let token = req.body.token;
    try {
        // eslint-disable-next-line no-undef
        const decoded = await jwt.verify(token, process.env.JWT_TOKEN);
        const userId = decoded.userId;
        const username = decoded.username;
        userCredential.findOne({ $and: [{ _id: userId }, { username }] })
            .then((user) => {
                if (user) {
                    return res.status(200).json({ user: true });
                } else {
                    return res.json({ user: false });
                }
            });
    } catch (error) {
        return res.json({ user: false })
    }
};