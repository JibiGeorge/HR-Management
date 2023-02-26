import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import { getCompanyIcon, getCompanyProfile } from './helper/CompanySettingsHelper';
import { setCompanyIcon } from './redux/features/companyProfileSlice';
import Routelinks from './Routes/Routelinks'

function App() {
  const dispatch = useDispatch();
  const { companyIcon } = useSelector(state => state.companyProfile)

  useEffect(() => {
    (async () => {
      try {
        const data = await getCompanyIcon();
        if (data.success) {
          dispatch(setCompanyIcon(data.icon))
          const link = document.querySelector("link[rel~='icon']");
          if (!link) {
            // If the <link> tag for favicon does not exist, create it
            const head = document.querySelector('head');
            const newLink = document.createElement('link');
            newLink.rel = 'icon';
            newLink.href = companyIcon;
            head.appendChild(newLink);
          } else {
            // If the <link> tag for favicon already exists, update its href attribute
            link.href = companyIcon;
          }
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
  }, [])

  return (
    <BrowserRouter>
      <Routelinks />
    </BrowserRouter>
  )
}

export default App
