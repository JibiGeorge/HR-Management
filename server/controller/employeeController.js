import Employee from "../model/employee.js"
import userCredential from "../model/userModel.js";

export const addEmployee = async (req, res) => {
    let {
        firstName,
        lastName,
        empCode,
        department,
        designation,
        role,
        gender,
        bloodGroup,
        panNumber,
        contactNumber,
        dateofBirth,
        dateofJoin,
        dateofLeave,
        username,
        email,
        image
    } = req.body.values
    try {
        const exist = await Employee.findOne({ username: username });
        if (exist) {
            res.json({ success: false, message: "Already Exist...!" });
        } else {
            const emp = new Employee({
                firstName,
                lastName,
                empCode,
                department,
                designation,
                role,
                gender,
                bloodGroup,
                panNumber,
                contactNumber,
                dateofBirth,
                dateofJoin,
                dateofLeave,
                username,
                email,
                image,
                loginPermisionEnabled: false
            })
            emp.save().then((response) => {
                res.status(200).json({ response, success: true, message: 'Successfully Added...!' });
            })
        }
    } catch (error) {
        res.status(401).json({ success: false, message: "Internal Server Error...!" })
    }
}

export const getAllEmployees = async (req, res) => {
    try {
        const list = await Employee.find();
        if (list.length > 0) {
            res.status(200).json({ success: true, list })
        } else {
            res.status(200).json({ data: false, message: 'No Data' })
        }
    } catch (error) {
        res.json({ sucess: false, message: 'Internal Server Error...!' })
    }
}

export const getEmployeeData = async (req, res) => {
    try {
        let id = req.query.id
        const data = await Employee.findOne({ _id: id }).populate('department').populate('designation')
        return res.status(200).json({ success: true, data })
    } catch (error) {
        return res.json({ success: false, error: 'Internal Server Error...!' })
    }
}

export const updateProfile = async (req, res) => {
    const userID = req.query.id;
    const data = req.body;
    try {
        const employee = await Employee.findByIdAndUpdate({ _id: userID }, {
            department: data.department,
            designation: data.designation,
            dateofJoin: data.dateofJoin,
            contactNumber: data.contactNumber,
            email: data.email,
            dateofBirth: data.dateofBirth,
            place: data.address,
            gender: data.gender,
            role: data.role
        })
        await userCredential.findOneAndUpdate({ userID }, {
            role: data.role
        })
        return res.status(200).json({ sucess: true, employee, message: "SuccessFully Updated" })
    } catch (error) {
        return res.json({ sucess: false, message: "Internal Server Error" })
    }
}

export const updatePersonal = async (req, res) => {
    const empID = req.params.id;
    const data = req.body;
    try {
        const update = await Employee.findByIdAndUpdate({ _id: empID }, {
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
            bloodGroup: data.bloodGroup,
            panNumber: data.panNumber,
            passportNumber: data.passportNumber,
            nationality: data.nationality,
            religion: data.religion,
            maritialStatus: data.maritialStatus
        }).then((response) => {
            res.status(200).json({ success: true, message: "Updated Successfully❤❤" })
        })
    } catch (error) {
        return res.json({ success: false, message: "Internal Server Error..!" })
    }
}
