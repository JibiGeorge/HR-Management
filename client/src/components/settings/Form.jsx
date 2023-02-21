import React, { useState } from 'react'
import { useFormik } from 'formik'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux';
import { getCompanyProfile, updateDetails } from '../../helper/CompanySettingsHelper';
import { setCompanyProfileData } from '../../redux/features/companyProfileSlice';

const Form = ({ companyProfileData }) => {
  const [image, setImage] = useState('');
  const dispatch = useDispatch();
  const { userDetails } = useSelector(state => state.user);
  const token = userDetails.UserToken;

  const imageView = (image) => {
    setImage(image);
  }

  const onSubmit = async (values) => {
    try {
      const updateCompanyDetails = await updateDetails(token, values);
      const data = await getCompanyProfile(token);
      if (updateCompanyDetails.success) {
        dispatch(setCompanyProfileData(data.details))
        toast.success(updateCompanyDetails.message, {
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
        toast.error(updateCompanyDetails.message, {
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
  }
  const { values, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues: {
      logo: companyProfileData?.logo,
      companyName: companyProfileData?.companyName,
      description: companyProfileData?.description,
      address: companyProfileData?.address,
      email: companyProfileData?.email
    },
    onSubmit
  })
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="company-profile">
            {/* Company Logo */}
            <div className="logo mb-2">
              <div className='title'>
                <span>Upload Site Logo</span>
              </div>
              <div className="mb-2">

                {values?.logo ?
                  <img className='logo-image' src={!image ?
                    values?.logo : URL.createObjectURL(image)} alt="1st" />
                  : image ? <img className='logo-image' src={URL.createObjectURL(image)} alt="change" /> : ''
                }

                {/* {image && <img className='logo-image' src={URL.createObjectURL(image)} alt="" />} */}
              </div>
              <input type="file" id='logo' onChange={(e) => { setFieldValue('logo', e.target.files[0]); imageView(e.target.files[0]) }} />
            </div>
            {/* Company Name */}
            <div id='company-name' className='mb-2 mt-3'>
              <div className="title">
                <span>Site Title / Company Name</span>
              </div>
              <input className='form-control' type="text" id='companyName' value={values.companyName} onChange={handleChange} />
            </div>
            {/* Descriptions */}
            <div id='description' className='mb-2 mt-3'>
              <div className="title">
                <span>Descriptions</span>
              </div>
              <textarea className='form-control' name="" id="description" cols="30" rows="5" value={values.description} onChange={handleChange}></textarea>
            </div>
            {/* Address */}
            <div id='address' className='mb-2 mt-3'>
              <div className="title">
                <span>Address</span>
              </div>
              <textarea className='form-control' name="" id="address" cols="30" rows="5" value={values.address} onChange={handleChange}></textarea>
            </div>
            {/* Email */}
            <div id='email' className='mb-2 mt-3'>
              <div className="title">
                <span>Email</span>
              </div>
              <input className='form-control' type="text" id='email' value={values.email} onChange={handleChange} />
            </div>
            {/* Time Zone */}
            <div className='col-lg-3 col-sm-12 mb-2 mt-3' id='email'>
              <div className="title">
                <span>Time Zone</span>
                <span className='text-danger ms-2' style={{fontSize:'12px'}}>Time zone can't change</span>
              </div>
              <input className='form-control' type="text" value={companyProfileData.timeZone} style={{pointerEvents:'none'}} />
            </div>
            <div className="sub-btn mt-3 mb-3">
              <button className="btn" onClick={handleSubmit}>SAVE</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Form