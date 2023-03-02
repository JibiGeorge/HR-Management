import React, { useEffect } from 'react'
import DiscipinaryList from './DiscipinaryList'
import PageHeader from './PageHeader'
import './Disciplinary.css'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { getDisciplinaryData } from '../../helper/Employeehelper'
import { hideLoading, showLoading } from '../../redux/features/alertSlice'
import { setDisciplinaryData } from '../../redux/features/disciplinarySlice'

const Body = () => {
  const { userDetails } = useSelector(state => state.user);
  const { loading } = useSelector(state => state.alerts);
  const dispatch = useDispatch();
  const token = userDetails.UserToken;

  const getAllDisciplinaryData = async () => {
    dispatch(showLoading());
    try {
      const disciplinaryData = await getDisciplinaryData(token);
      if (disciplinaryData.success) {
        dispatch(setDisciplinaryData(disciplinaryData?.data));
        dispatch(hideLoading());
      } else {
        dispatch(hideLoading());
        toast.error(disciplinaryData.message, {
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
      dispatch(hideLoading());
      toast.error('Something went wrong. Try Again...!', {
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

  useEffect(() => {
    getAllDisciplinaryData();
  }, []);

  return (
    <div className="section-body">
      <PageHeader />
      {loading && <div class="d-flex justify-content-center">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>}
      {!loading &&
        <DiscipinaryList />}
    </div>
  )
}

export default Body