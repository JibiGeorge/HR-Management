import SalaryModel from "../model/salaryModel.js";

export const addEmployeeSalaryDetails = async (req, res) => {
    const { salaryType, totalSalary, basicSalary, houseRent, medical, conveyance } = req.body;
    const empID = req.params.id;
    try {
        const obj = {
            salaryType,
            totalSalary,
            basicSalary,
            houseRent,
            medical,
            conveyance
        }
        const exist = await SalaryModel.findOne({ userID: empID });
        if (!exist) {
            const newData = new SalaryModel({
                userID: empID,
                salaryDetails: obj
            });
            newData.save()
                .then((resposne) => {
                    res.status(200).json({ success: true, message: 'Successfully Added' });
                })
                .catch((error) => {
                    res.json({ message: error.message })
                });
        } else {
            const salaryExist = await SalaryModel.findOne({
                $and: [
                    { userID: empID }, { salaryDetails: { $elemMatch: { salaryType: salaryType, totalSalary: totalSalary } } }
                ]
            });
            if (!salaryExist) {
                await SalaryModel.findOneAndUpdate({ userID: empID },
                    {
                        $push: {
                            salaryDetails: obj
                        }
                    }
                ).then((response) => {
                    res.status(200).json({ success: true, message: 'Successfully Added' });
                }).catch((error) => {
                    res.json({ message: error.message })
                });
            } else {
                res.json({ message: 'Salary Details Exist..!' });
            }
        }
    } catch (error) {
        res.json({ message: 'Internal Server Error..!' });
    }
}


export const getEmployeeSalaryDetails = async (req, res) => {
    const empID = req.params.id;
    try {
        await SalaryModel.findOne({ userID: empID })
            .then((response) => {
                res.json({ success: true, data: response?.salaryDetails });
            })
            .catch((error) => {
                res.json({ message: error.message })
            })
    } catch (error) {
        res.json({ message: 'Internal Server Error..!' });
    }
}

export const deleteEmployeeSalaryDetails = async (req, res) => {
    let salaryDetailsID = req.params.id;
    try {
        await SalaryModel.updateMany({}, {
            $pull: {
                salaryDetails: {
                    _id: salaryDetailsID
                }
            }
        })
            .then(() => {
                res.status(200).json({ success: true, message: 'Deleted Successfully..' })
            })
            .catch((error) => {
                res.json({ message: error.message })
            })
    } catch (error) {
        res.json({ message: 'Internal Server Error..!' });
    }
}