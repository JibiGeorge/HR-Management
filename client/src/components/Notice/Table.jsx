import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { getAllNotices } from '../../helper/NoticeHelper';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import { setAllNotices } from '../../redux/features/noticeSlice';
import fileDownload from 'js-file-download'
import MailSendPopUP from './MailSendPopUP';

const Table = () => {
    const { loading } = useSelector(state => state.alerts);
    const { allNotices } = useSelector(state => state.notices);
    const { userDetails } = useSelector(state => state.user);
    let token = userDetails.UserToken;

    const dispatch = useDispatch();

    // Document download
    const handleDownload = async (url) => {
        axios.get(url, {
            responseType: "blob"
        })
            .then((res) => {
                let documentUrl = url;
                documentUrl = documentUrl.split('/')
                let fileName = documentUrl[documentUrl.length - 1];
                fileDownload(res.data, fileName);
            });
    }

    const [mailSendPopUP, setMailSendPopUP] = useState(false);
    const closeMailModal = () => setMailSendPopUP(false);
    const [noticeDetails, setNoticeDetails] = useState('');
    const sendMailPopUp = async (noticeData) => {
        setNoticeDetails(noticeData);
        setMailSendPopUP(true);
    }

    useEffect(() => {
        (async () => {
            try {
                dispatch(showLoading());
                const AllNotices = await getAllNotices(token);
                if (AllNotices.success) {
                    dispatch(setAllNotices(AllNotices.data));
                    dispatch(hideLoading())
                } else {
                    dispatch(setAllNotices());
                    toast.error(allNotices?.message, {
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
                    dispatch(hideLoading())
                }
            } catch (error) {
                toast.error('Something went Wrong', {
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
                dispatch(hideLoading())
            }
        })();
    }, []);

    const column = [
        {
            name: 'Notice Title',
            selector: row => row.title
        },
        {
            name: 'Date',
            selector: (row) => new Date(row.date).toLocaleDateString('en-GB', {
                day: 'numeric', month: 'short', year: 'numeric'
            })
        },
        {
            name: 'Message',
            selector: row => row.message
        },
        {
            name: 'File',
            selector: (row) => (
                <a onClick={() => { handleDownload(row.file) }} style={{ color: '#0714a4' }} >File</a>
            )
        },
        {
            name: "Action",
            cell: (row) => ([<button className='btn editBtn' onClick={() => handleEdit(row._id)}><i class="las la-edit"></i></button>,
            <button className='btn deleteBtn' onClick={() => handleDelete(row._id)} ><i class="las la-trash"></i></button>,
            <button className='btn btn-primary' style={{ fontSize: '10px' }} onClick={() => sendMailPopUp(row)} >Send Mail</button>])
        }
    ]
    return (
        <>
            {loading && <div class="d-flex justify-content-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>}
            {!loading &&
                <DataTable
                    columns={column}
                    data={allNotices}
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight='300px'
                    selectableRowsHighlight
                    highlightOnHover
                />}

            {mailSendPopUP && <MailSendPopUP closeMailModal={closeMailModal} noticeDetails={noticeDetails} />}
        </>
    )
}

export default Table