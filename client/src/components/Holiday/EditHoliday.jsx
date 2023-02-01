import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { getAllHolidays, getHolidayData, updateHoliday } from '../../helper/HolidayHelper'
import { setHolidaysDetails } from '../../redux/features/holidaySlice'

const EditHoliday = ({closeModal, id}) => {
    const [holidayData, setHolidayData] = useState('')
    const dispatch = useDispatch()

    useEffect(()=>{
        (async()=>{
            try {
                const holidayData = await getHolidayData(id)
                holidayData.startDate = new Date(holidayData.startDate).toISOString().slice(0, 10)
                holidayData.endDate = new Date(holidayData.endDate).toISOString().slice(0, 10)
                setHolidayData(holidayData)
            } catch (error) {
                toast.error('Someting went Wrong...!', {
                    style: {
                        border: '1px solid #713200',
                        padding: '16px',
                        color: '#713200',
                    },
                    iconTheme: {
                        primary: '#713200',
                        secondary: '#FFFAEE',
                    },
                });
            }
        })()
    },[])
    const handleUpdate = async ()=>{
        try {
            const holidayUpdate = await updateHoliday(holidayData)
            if(holidayUpdate.success){
                const data = await getAllHolidays();
                for(let i=0;i<data.result.length;i++){
                    data.result[i].startDate = new Date(data.result[i].startDate).toISOString().slice(0,10)
                }
                for(let i=0;i<data.result.length;i++){
                    data.result[i].endDate = new Date(data.result[i].endDate).toISOString().slice(0,10)
                }
                dispatch(setHolidaysDetails(data.result))
                toast.success(holidayUpdate.message, {
                    style: {
                        border: '1px solid #713200',
                        padding: '16px',
                        color: '#25ab11',
                    },
                    iconTheme: {
                        primary: '#25ab11',
                        secondary: '#FFFAEE',
                    },
                });
                closeModal()
            }else{
                toast.error(holidayUpdate.message, {
                    style: {
                        border: '1px solid #713200',
                        padding: '16px',
                        color: '#713200',
                    },
                    iconTheme: {
                        primary: '#713200',
                        secondary: '#FFFAEE',
                    },
                }); 
            }
        } catch (error) {
            toast.error('Someting went Wrong...!', {
                style: {
                    border: '1px solid #713200',
                    padding: '16px',
                    color: '#713200',
                },
                iconTheme: {
                    primary: '#713200',
                    secondary: '#FFFAEE',
                },
            });            
        }
    }
  return (
    <>
            <div className="modal-wrapper">
                <div className="modal-container">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="form-header">
                                <h3>Update Holiday</h3>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-12 mb-2">
                                    <div className="form-group">
                                        <label>Name of the Holiday</label>
                                        <input type="text" className='form-control' id='nameOfTheHoliday'
                                        value={holidayData.nameOfTheHoliday}
                                        onChange={(e)=> setHolidayData({...holidayData, nameOfTheHoliday: e.target.value})} />
                                    </div>
                                </div>
                                <div className="col-sm-12 mb-3">
                                    <div className="form-group">
                                        <label>Starting Date</label>
                                        <input type="date" className='form-control' id='startDate'
                                        defaultValue={holidayData.startDate}
                                        onChange={(e) => setHolidayData({...holidayData, startDate: e.target.value})} />
                                    </div>
                                </div>
                                <div className="col-sm-12 mb-3">
                                    <div className="form-group">
                                        <label>Ending Date</label>
                                        <input type="date" className='form-control' id='endDate'
                                        defaultValue={holidayData.endDate}
                                        onChange={(e)=> setHolidayData({...holidayData, endDate: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="modal-btn delete-action">
                                <div className="row">
                                    <div className="col-6">
                                        <button className='btn btn-primary' onClick={handleUpdate}>Update</button>
                                    </div>
                                    <div className="col-6">
                                        <button className='btn btn-primary' onClick={closeModal}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
  )
}

export default EditHoliday