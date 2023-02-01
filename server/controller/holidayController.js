import Holiday from "../model/holidayModel.js";

export const addHoliday = async (req, res) => {
    const { nameOfTheHoliday, startDate, endDate } = req.body;
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(startDate);
    const secondDate = new Date(endDate);
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay) + 1);
    try {
        const exist = await Holiday.findOne({$and: [{nameOfTheHoliday},{startDate},{endDate}]});
        if(exist){
            return res.json({message: 'Alerady Exist'})
        }else{
            const holiday = new Holiday({
                nameOfTheHoliday,
                startDate,
                endDate,
                total: diffDays
            })
            holiday.save().then(() => {
                return res.status(200).json({success: true, message: 'Successfully Added..!'})
            })
        }
    } catch (error) {
        return res.json({message: 'Internal Server Error..!'})
    }
}

export const getAllHolidays = async (req,res)=>{
    try {
        const result = await Holiday.find()
        return res.status(200).json({success: true, result})        
    } catch (error) {
        return res.json({message: 'Internal Server Error..!'})        
    }
}

export const deleteHoliday = async (req,res)=>{
    try {
        await Holiday.findByIdAndDelete({_id:req.params.id}).then(()=>{
            return res.status(200).json({success: true, message: 'Deleted Successfully'})
        })
    } catch (error) {
        return res.json({message: 'Internal Server Error..!'})           
    }
}

export const getHolidayData = async (req,res)=>{
    try {
        const data = await Holiday.findById({_id:req.params.id})
        res.status(200).json(data)
    } catch (error) {
        return res.json({message: 'Internal Server Error..!'})        
    }
}

export const updateHolidayData = async (req,res)=>{
    const {_id, nameOfTheHoliday, startDate, endDate } = req.body;
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(startDate);
    const secondDate = new Date(endDate);
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay) + 1);
    try {
        await Holiday.findByIdAndUpdate(
            {_id},
            {
                nameOfTheHoliday,
                startDate,
                endDate,
                total: diffDays
            })
            res.status(200).json({success: true, message: 'Successfully Updated...!'})
    } catch (error) {
        res.json({message: 'Internal Server Error..!'})  
    }
}