import jwt from 'jsonwebtoken'
import userCredential from '../model/userModel.js';

export const auth = async (req, res, next) => {
    let token = req.headers.authorization
    try {
        const decoded = await jwt.verify(token, process.env.JWT_TOKEN);
        const userID = decoded.userId;
        const username = decoded.username;
        userCredential.findOne({
            $and:
                [{ _id: userID }, { username }]
        }).then((user) => {
            if (user) {
                next()
            }else{
                res.send('Invalid Token')
            }
        })
    } catch (error) {
        res.json({message: 'Invalid Token'})
    }
}