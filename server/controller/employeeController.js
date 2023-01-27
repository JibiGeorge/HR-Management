import Employee from "../model/employee.js"

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
                image
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

export const getEmployeeData = async (req,res)=>{
    try {
        let id = req.query.id
        const data = await Employee.findOne({_id:id}).populate('department').populate('designation')
        console.log(data);
        return res.status(200).json({success:true, data})
    } catch (error) {
        return res.json({success:false, error: 'Internal Server Error...!'})        
    }
}

export const updateProfile = async (req,res)=>{
    const userID = req.query.id;
    const data = req.body;
    console.log(data);
    try {
        const employee = await Employee.findByIdAndUpdate({_id:userID},{
            department: data.department,
            designation: data.designation,
            dateofJoin: data.dateofJoin,
            contactNumber: data.contactNumber,
            email: data.email,
            dateofBirth: data.dateofBirth,
            address: data.address,
            gender: data.gender,
            role: data.role
        })
        return res.status(200).json({sucess:true, employee, message:"SuccessFully Updated"})
    } catch (error) {
        console.log(error.message);
        return res.json({sucess:false,  message:"Internal Server Error"})
    }
}