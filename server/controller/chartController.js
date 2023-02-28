import PayrolModel from "../model/payrolModel.js"

export const salaryPaidMonthWise = async (req, res) => {
    try {
        const result = await PayrolModel.aggregate([
            { $unwind: '$payrolData' },
            {
                $group: {
                    _id: '$month',
                    totalNetPayable: { $sum: "$payrolData.netPayable" }
                }
            },
            {
                $project: {
                    _id: 0,
                    month: '$_id',
                    amount: '$totalNetPayable'
                }
            }
        ])
        res.status(200).json({ success: true, result })
    } catch (error) {
        res.json({ message: "Internal Server Error..!" })
    }
}