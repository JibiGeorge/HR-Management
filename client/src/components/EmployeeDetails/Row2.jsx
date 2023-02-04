import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getBankAccount } from '../../helper/Employeehelper';
import BankAccountModal from './BankAccountModal';
import { setBankAccount } from '../../redux/features/bankAccountSlice'

function Row2(props) {
    const empID = props.profile._id;
    const dispatch = useDispatch()

    const { empBankAccount } = useSelector(state => state.empBankAccount)

    const [showModalBankAccount, setShowModalBankAccount] = useState(false);
    const closeBankAccountModal = () => setShowModalBankAccount(false)

    useEffect(()=>{
        (async()=>{
            try {
                const accountDetails = await getBankAccount(empID);
                if(accountDetails.success){
                    dispatch(setBankAccount(accountDetails.account))
                }else{
                    toast.error(accountDetails.message, {
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
                toast.error('Something Went Problem..!', {
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
    },[]);

    return (
        <>
            <div className="row box">
                <div className="col-lg-6 box1">
                    <div className='row2'>
                        <div className="edit">
                            <button className='edit-btn' onClick={() => setShowModalBankAccount(true)}>
                                <i className='fa fa-pencil'></i>
                            </button>
                        </div>
                        <h3 className='title'>Bank Account</h3>
                        <tbody className='personal-info-data'>
                            <tr className="information">
                                <td className="title">Bank Holder Name:</td>
                                <td className="text">{empBankAccount? empBankAccount.holderName : 'Nil'}</td>
                            </tr>
                            <tr className="information">
                                <td className="title">Account Number:</td>
                                <td className="text">{empBankAccount? empBankAccount.accountNumber : 'Nil'}</td>
                            </tr>
                            <tr className="information">
                                <td className="title">Bank Name:</td>
                                <td className="text">{empBankAccount? empBankAccount.bankName : 'Nil'}</td>
                            </tr>
                            <tr className="information">
                                <td className="title">Branch Name:</td>
                                <td className="text">{empBankAccount? empBankAccount.branchName : 'Nil'}</td>
                            </tr>
                            <tr className="information">
                                <td className="title">IFSC Code:</td>
                                <td className="text">{empBankAccount? empBankAccount.ifscCode : 'Nil'}</td>
                            </tr>
                        </tbody>
                    </div>
                </div>
                <div className="col-lg-6 box2">
                    <div className='row2'>
                        <div className="edit">
                            <a href="" className='edit-btn'>
                                <i className='fa fa-pencil'></i>
                            </a>
                        </div>
                        <h3 className='title'>Emergency Contact</h3>
                        <div className="permanent-address">
                            <h4 className="sub-title">Primary</h4>
                            <tbody className='personal-info-data'>
                                <tr className="information">
                                    <td className="title">Name:</td>
                                    <td className="text">Lini Mol</td>
                                </tr>
                                <tr className="information">
                                    <td className="title">Relation:</td>
                                    <td className="text">MOM</td>
                                </tr>
                                <tr className="information">
                                    <td className="title">Contact No:</td>
                                    <td className="text">8893482860</td>
                                </tr>
                            </tbody>
                        </div>
                        <div className="permanent-address">
                            <h4 className="sub-title">Seconday</h4>
                            <tbody className='personal-info-data'>
                                <tr className="information">
                                    <td className="title">Name:</td>
                                    <td className="text">Lini Mol</td>
                                </tr>
                                <tr className="information">
                                    <td className="title">Relation:</td>
                                    <td className="text">MOM</td>
                                </tr>
                                <tr className="information">
                                    <td className="title">Contact No:</td>
                                    <td className="text">8893482860</td>
                                </tr>
                            </tbody>
                        </div>
                    </div>
                </div>
            </div>
            {showModalBankAccount && <BankAccountModal closeModal={closeBankAccountModal} id={empID} />}
        </>
    )
}

export default Row2