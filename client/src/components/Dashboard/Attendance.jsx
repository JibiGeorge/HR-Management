import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getPunchingData, punchIn, punchOut } from '../../helper/AttendanceHelper';
import { setPunchingData } from '../../redux/features/punching';
import './Attendance.css'

const Attendance = ({ token }) => {
    const dispatch = useDispatch();
    const { punchingData } = useSelector(state => state.punching);

    const handlePunchIn = async () => {
        try {
            const inPunching = await punchIn(token);
            if (inPunching.success) {
                const punchingData = await getPunchingData(token);
                if (punchingData.success) {
                    dispatch(setPunchingData(punchingData?.data[0]))
                } else {
                    toast.error(punchingData.message, {
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
                toast.success(inPunching.message, {
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
            } else {
                toast.error(inPunching.message, {
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
            toast.error('Punching Failed', {
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

    const handlePunchOut = async () => {
        try {
            const inPunching = await punchOut(token);
            if (inPunching.success) {
                const punchingData = await getPunchingData(token);
                if (punchingData.success) {
                    dispatch(setPunchingData(punchingData?.data[0]))
                } else {
                    toast.error(punchingData.message, {
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
                toast.success(inPunching.message, {
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
            } else {
                toast.error(inPunching.message, {
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
            toast.error('Punching Failed', {
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
    const [totalWorkingHour, setTotalWorkingHour] = useState(0)
    const updateHour = () => {

        let currentDate = new Date();
        currentDate = Math.abs((new Date(currentDate).getTime() / 1000).toFixed(0))
        let signIntime = punchingData?.attendance?.attendanceDetails?.signIn
        signIntime = signIntime.split(' ')[0]
        console.log('signIntimbjhbve',signIntime);
        signIntime = '2/14/2023, ' + signIntime;
        signIntime = new Date(signIntime)
        signIntime = Math.abs((new Date(signIntime).getTime() / 1000).toFixed(0))

        var diff = currentDate - signIntime
        var hours = Math.floor(diff / 3600) % 24
        var minutes = Math.floor(diff / 60) % 60
        var seconds = diff % 60;
        const totalTime = + hours + ':' + minutes + ':' + seconds
        console.log('totaltime',totalTime);
        setTotalWorkingHour(totalTime)
    }


    useEffect(() => {
        (async () => {
            try {
                const punchingData = await getPunchingData(token);
                if (punchingData.success) {
                    dispatch(setPunchingData(punchingData?.data[0]))
                } else {
                    toast.error(punchingData.message, {
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
                toast.error('Something Went Wrong..!', {
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
        })();
    }, []);
    return (
        <div className="punching">
            <div className="row">
                <div className="col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">TimeSheet
                                <small className='text-muted'>     {new Date().toLocaleDateString()}</small>
                            </h5>
                            <div className="punch-det">
                                <h6>Punch In at</h6>
                                <p>
                                    {punchingData?.attendance?.attendanceDetails.date ? punchingData?.attendance.attendanceDetails?.date : '--/--/----'},&nbsp;&nbsp;
                                    {punchingData?.attendance?.attendanceDetails.signIn ? punchingData?.attendance.attendanceDetails?.signIn : '--:--:-- --'}
                                </p>

                                <h6>Punch Out at</h6>
                                <p>
                                    {punchingData?.attendance?.attendanceDetails.date ? punchingData?.attendance.attendanceDetails?.date : '--/--/----'},&nbsp;&nbsp;
                                    {punchingData?.attendance?.attendanceDetails.signOut ? punchingData?.attendance.attendanceDetails?.signOut : '--:--:-- --'}
                                </p>
                            </div>
                            <div className="punch-info">
                                <div className="punch-hours">
                                    {!punchingData?.attendance?.attendanceDetails?.signOut &&
                                        <>
                                            {punchingData?.attendance?.attendanceDetails?.signIn ?
                                                setInterval(updateHour, 1000) ?
                                                    <span>{totalWorkingHour} </span> : <span>0 </span>
                                                : <span>0 Hrs</span>}
                                        </>
                                    }

                                    {punchingData?.attendance?.attendanceDetails?.signOut &&
                                        <span>{punchingData?.attendance?.attendanceDetails?.totalTime}</span>
                                    }
                                </div>
                            </div>
                            <div className="punch-btn-section">
                            {!punchingData?.attendance?.attendanceDetails?.signOut &&
                            <>
                                {punchingData?.attendance?.attendanceDetails?.signIn &&
                                    <button className="btn btn-primary" onClick={handlePunchOut}>
                                        Puch OUT
                                    </button>}
                                {!punchingData?.attendance?.attendanceDetails?.signIn &&
                                    <button className="btn btn-primary" onClick={handlePunchIn}>
                                        Puch IN
                                    </button>}
                            </>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Attendance