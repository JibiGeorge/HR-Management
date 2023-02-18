import NoticeModel from "../model/noticeModel.js"
import Employee from "../model/employee.js";
import mongoose from "mongoose";
import nodemailer from 'nodemailer'

// Notice Sending to Employees through Email
const sendNotices = async (mails, noticeDetails) => {
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
            to: mails?.email,
            subject: noticeDetails?.title,
            html: `<p> Dear Employee,<br/> ` + noticeDetails?.message + `<br/>Thanks, </p>`
        }
        const mailStatus = await transporter.sendMail(mailOption);
        if (mailStatus) {
            return { mailSend: true }
        } else {
            return { mailSend: false }
        }
    } catch (error) {
        return { mailSend: false }
    }
}


export const addNotice = async (req, res) => {
    const { title, date, message, file } = req.body;
    try {
        const newData = new NoticeModel({
            title,
            date,
            message,
            file
        });
        newData.save().then(() => {
            res.status(200).json({ success: true, message: 'Successfully Added' });
        }).catch((error) => {
            res.json({ message: error.message })
        });
    } catch (error) {
        res.json({ message: 'Internal Server Connection Failed' });
    }
};

export const getAllNotices = async (req, res) => {
    try {
        const data = await NoticeModel.find({});
        res.status(200).json({ success: true, data })
    } catch (error) {
        res.json({ message: 'Internal Server Connection Failed' });
    }
}

export const sendEmail = async (req, res) => {
    const { noticeDetails } = req.body;
    const { department, designation, employee } = req.body.noticeTo;

    const checkMailIDS = async () => {
        if (employee != '') {
            return await Employee.aggregate([
                { $match: { _id: mongoose.Types.ObjectId(employee) } },
                {
                    $project: {
                        _id: 0, email: 1
                    }
                }
            ])
        } else {
            if (designation !== '') {
                return await Employee.aggregate([
                    { $match: { designation: mongoose.Types.ObjectId(designation) } },
                    {
                        $project: {
                            _id: 0, email: 1
                        }
                    }
                ])
            } else if (department != '') {
                return await Employee.aggregate([
                    { $match: { department: mongoose.Types.ObjectId(department) } },
                    {
                        $project: {
                            _id: 0, email: 1
                        }
                    }
                ])
            } else {
                return await Employee.aggregate([
                    {
                        $project: {
                            _id: 0, email: 1
                        }
                    }
                ])
            }
        }
    }
    try {
        const mailIDs = await checkMailIDS();
        mailIDs.forEach(async (mails) => {
            const mailsending = await sendNotices(mails, noticeDetails);
            if (mailsending.mailSend) {
                res.status(200).json({ success: true, message: 'Mail Sended Successfully' })
            } else {
                res.json({ message: 'Failed to Send Mails' })
            }
        })
    } catch (error) {
        res.json({ message: 'Internal Server Connection Failed' });
    }
}