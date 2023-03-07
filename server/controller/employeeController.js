import Employee from "../model/employee.js"
import userCredential from "../model/userModel.js";

const convertCamelCase = (values) => {
    return values.split(/\s+/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

export const addEmployee = async (req, res) => {
    let data = req.body.values
    for (const key in data) {
        if (key === 'firstName' || key === 'lastName' || key === 'panNumber') {
            data[key] = convertCamelCase(data[key])
        }
        if (key === 'username') {
            data[key] = data[key].toLowerCase().trim();
        }
        if (key === 'panNumber') {
            data[key] = data[key].toUpperCase().trim();
        }
    }
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
    } = data;
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
                loginPermisionEnabled: false,
                status: 'Active'
            })
            emp.save().then((response) => {
                res.status(200).json({ response, success: true, message: 'Successfully Added...!' });
            })
        }
    } catch (error) {
        res.json({ success: false, message: "Internal Server Error...!" })
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
    let data = req.body;
    for (const key in data) {
        if (key === 'address') {
            data[key] = convertCamelCase(data[key])
        }
    }
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
            role: data.role,
            taxType: data.taxType
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
    let data = req.body;
    for (const key in data) {
        if (key === 'firstName' || key === 'lastName') {
            data[key] = convertCamelCase(data[key])
        }
        if (key === 'username') {
            data[key] = data[key].toLowerCase().trim();
        }
        if (key === 'panNumber' || key === 'passportNumber') {
            data[key] = data[key].toUpperCase().trim();
        }
    }
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

export const employeeCount = async (req, res) => {
    try {
        const count = await Employee.find().count();
        return res.status(200).json({ success: true, count })
    } catch (error) {
        return res.json({ success: false, error: 'Internal Server Error...!' })
    }
}

export const getEmployeeCode = async (req, res) => {
    try {
        const employeeCode = await Employee.find().sort({ empCode: -1 }).limit(1);
        const lastEmployeeCode = employeeCode.length > 0 ? employeeCode[0].empCode : 0;
        const nextEmployeeCode = parseInt(lastEmployeeCode) + 1;
        res.status(200).json({ success: true, nextEmployeeCode: nextEmployeeCode.toString().padStart(4, '0') })
    } catch (error) {
        res.json({ message: 'Internal server Error..!' });
    }
}

export const allDetails = async (req, res) => {
    try {
        const employees = await Employee.find().populate('department').populate('designation');
        res.status(200).json({ success: true, employees });
    } catch (error) {
        console.log(error.message);
        res.json({ message: 'Internal server Error..!' });
    }
}

export const deleteEmployee = async (req, res) => {
    const id = req.query.id;
    try {
        await Employee.findByIdAndDelete({ _id: id }).then(()=>{
            res.status(200).json({ success: true, message: 'Deleted Successfully' });
        })
    }catch (error) {
        res.json({ success: false, message: 'Internal Server Error..!' });
    }
}