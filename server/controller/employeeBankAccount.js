import EmployeeBankAccount from "../model/bankAccountModel.js";

export const addEmployeeBankAccount = async (req, res) => {
    const empID = req.params.id;
    const { holderName, accountNumber, bankName, branchName, ifscCode } = req.body;
    try {
        const exist = await EmployeeBankAccount.findOne({ employee: empID })
        if (exist) {
            await EmployeeBankAccount.findOneAndUpdate({ employee: empID }, {
                holderName: holderName,
                accountNumber: accountNumber,
                bankName: bankName,
                branchName: branchName,
                ifscCode: ifscCode
            }).then((response) => {
                res.status(200).json({ success: true, message: 'Successfully Updated..!' })
            })
        } else {
            const bankAccount = new EmployeeBankAccount({
                employee: empID,
                holderName,
                accountNumber,
                bankName,
                branchName,
                ifscCode
            })
            bankAccount.save().then(() => {
                res.status(200).json({ success: true, message: 'Successfully Updated..!' })
            })
        }
    } catch (error) {
        res.json({ message: 'Server Connection Problem..!' })
    }
}

export const getEmployeeBankAccount = async (req, res) => {
    const id = req.params.id
    try {
        const account = await EmployeeBankAccount.findOne({employee:id})
        res.status(200).json({success:true, account})
    } catch (error) {
        res.json({ message: 'Server Connection Problem..!' })
    }
}