import Employee from "../model/employee.js";
import nodemailer from 'nodemailer'
import userCredential from "../model/userModel.js";
import bcrypt from 'bcrypt'

// Password Sending to Email
const sendPassWord = async (username, email, password) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.VERIFICATION_MAIL_ID,
                pass: process.env.VERIFICATION_MAIL_PASSWORD
            }
        })
        const mailOption = {
            from: process.env.VERIFICATION_MAIL_ID,
            to: email,
            subject: "For Verification Mail",
            html: `<p> Hi, ` + username + ` , You Password <h3>${password}</h3> </p>`
        }
        const mailStatus = transporter.sendMail(mailOption);
        if (mailStatus) {
            return { passwordSend: true }
        } else {
            return { passwordSend: false }
        }
    } catch (error) {
        return { password: false }
    }
}


export const generateCredentials = async (req, res) => {
    const empID = req.params.id;
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const passwordLength = 8;
    try {
        let password = "";
        const employee = await Employee.findOne({ _id: empID })
        if (employee) {
            for (let i = 0; i <= passwordLength; i++) {
                let randomNumber = Math.floor(Math.random() * chars.length);
                password += chars.substring(randomNumber, randomNumber + 1);
            }
            const email = await sendPassWord(employee?.username, employee?.email, password);
            if (email.passwordSend) {
                const bcryptPassword = await bcrypt.hash(password, 10);
                const credentails = new userCredential({
                    userID: employee?._id,
                    username: employee?.username,
                    password: bcryptPassword,
                    role: employee?.role
                })
                credentails.save().then(async (response) => {
                    try {
                        await Employee.findByIdAndUpdate({ _id: empID }, {
                            $set: {
                                loginPermisionEnabled: true
                            }
                        })
                    } catch (error) {
                        console.log('whats the error',error.message);                        
                    }
                    res.status(200).json({ success: true, message: 'Genereated & Password Send to the Email.' })
                }).catch((error) => {
                    res.json({ message: 'Email Send Failed..!' })
                })
            } else {
                res.json({ message: 'Email Send Failed..!' })
            }
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const reGenerateCredentials = async (req,res)=>{
    const empID = req.params.id;
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const passwordLength = 8;
    try {
        let password = "";
        const employee = await Employee.findOne({ _id: empID })
        if (employee) {
            for (let i = 0; i <= passwordLength; i++) {
                let randomNumber = Math.floor(Math.random() * chars.length);
                password += chars.substring(randomNumber, randomNumber + 1);
            }
            const email = await sendPassWord(employee?.username, employee?.email, password);
            if (email.passwordSend) {
                const bcryptPassword = await bcrypt.hash(password, 10);
                await userCredential.findOneAndUpdate({userID:empID},{
                    password: bcryptPassword
                }).then((response)=>{
                        res.status(200).json({ success: true, message: 'Genereated & Password Send to the Email.' })
                }).catch((error)=>{
                        res.json({ message: 'Email Send Failed..!' })                    
                })


                // const credentails = new userCredential({
                //     userID: employee?._id,
                //     username: employee?.username,
                //     password: bcryptPassword,
                //     role: employee?.role
                // })
                // credentails.save().then(async (response) => {
                //     try {
                //         await Employee.findByIdAndUpdate({ _id: empID }, {
                //             $set: {
                //                 loginPermisionEnabled: true
                //             }
                //         })
                //     } catch (error) {
                //         console.log('whats the error',error.message);                        
                //     }
                //     res.status(200).json({ success: true, message: 'Genereated & Password Send to the Email.' })
                // }).catch((error) => {
                //     res.json({ message: 'Email Send Failed..!' })
                // })
            } else {
                res.json({ message: 'Email Send Failed..!' })
            }
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}