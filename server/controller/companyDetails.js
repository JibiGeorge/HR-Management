import CompanyProfileModel from "../model/companyProfile.js";

export const updateCompanyDetails = async (req, res) => {
    const { logo, companyName, description, address, email } = req.body;
    try {
        await CompanyProfileModel.updateOne({},{
            $set:{
                companyName: companyName,
            description:description,
            address:address,
            email: email,
            logo:logo
            }
        },{upsert: true}).then((response)=>{
            console.log(response);
            res.status(200).json({success:true, message: 'Updated Successfully..'})
        }).catch((error)=>{
            res.json({message: error.message});
        })
    } catch (error) {
        res.json({ message: 'Internal Server Error' });
    }
}

export const getCompanyDetails = async (req,res)=>{
    try {
        const details = await CompanyProfileModel.findOne({});
        if(details){
            res.status(200).json({success:true,details})
        }else{
            res.status(200).json({message: 'Not Data Found'})
        }
    } catch (error) {
        res.json({ message: 'Internal Server Error' });
    }
}