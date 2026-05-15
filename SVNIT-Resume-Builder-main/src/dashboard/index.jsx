import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import GlobalApi from './../../service/GlobalApi';
import ResumeCardItem from './components/ResumeCardItem';
import { useAuth } from '@/auth/Auth';
import Header from '@/components/custom/Header';

function Dashboard() {
  const { userDetails, IsUserLoggedIn } = useAuth()
  const [resumeList, setResumeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (IsUserLoggedIn) {
      GetResumesList();
    }
  }, [userDetails]);

  const GetResumesList = () => {
    setIsLoading(true);
    GlobalApi.GetUserResumes(userDetails.email)
      .then(resp => {
        setResumeList(resp.data?.data || []);
      })
      .catch(error => {
        console.error("Error fetching resumes:", error);
        setResumeList([]);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div>
      <Header />
      <div className='p-10 md:px-20 lg:px-32'>
        <h2 className='font-bold text-3xl'>My Resume</h2>
        <p>Start Creating SVNIT resume to your next Job role</p>
        <div className='grid grid-cols-2 
      md:grid-cols-3 lg:grid-cols-5 gap-5
      mt-10
      '>
          <AddResume />
          {resumeList.length > 0 ? resumeList.map((resume, index) => (
            <ResumeCardItem resume={resume} key={index} refreshData={GetResumesList} />
          )) :
            [1, 2, 3, 4].map((item, index) => (
              <div key={index} className='h-[325px] rounded-lg bg-slate-200 animate-pulse'>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Dashboard