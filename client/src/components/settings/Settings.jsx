import React from 'react'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { getCompanyProfile } from '../../helper/CompanySettingsHelper'
import { hideLoading, showLoading } from '../../redux/features/alertSlice'
import { setCompanyProfileData } from '../../redux/features/companyProfileSlice'
import Form from './Form'
import PageHeader from './PageHeader'
import './Style.css'

const Settings = () => {
  const { userDetails } = useSelector(state => state.user);
  const { companyProfileData } = useSelector(state => state.companyProfile);
  const token = userDetails.UserToken;
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      dispatch(showLoading());
      try {
        const data = await getCompanyProfile(token);
        if (data.success) {
          dispatch(setCompanyProfileData(data.details));
          dispatch(hideLoading());
        } else {
          toast.error(data.message, {
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
          dispatch(setCompanyProfileData());
          dispatch(hideLoading());
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
        dispatch(hideLoading());
      }
    })();
  }, []);
  return (
    <div className="section-body">
      <PageHeader />
      <Form companyProfileData={companyProfileData} />
    </div>
  )
}

export default Settings