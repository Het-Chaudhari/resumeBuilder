import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../components/FormSection.jsx';
import ResumePreview from '../../components/ResumePreview.jsx';
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext';
import GlobalApi from './../../../../../service/GlobalApi';
import Header from '@/components/custom/Header.jsx';

function EditResume() {
  const { resumeId } = useParams();
  const [resumeInfo, setResumeInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetResumeInfo();
  }, [])

  const GetResumeInfo = () => {
    setLoading(true);
    GlobalApi.GetResumeById(resumeId).then(resp => {
      setResumeInfo(resp.data.data);
      setLoading(false);
    }).catch(err => {
      console.error('Failed to fetch resume:', err);
      setLoading(false);
    });
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src="/logo.png" alt="Logo" className="w-32 h-32" />
      </div>
    );
  }

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <Header />
      <div className='grid grid-cols-1 md:grid-cols-2 p-5 gap-10'>
        {/* Form Section */}
        <div id="no-print">
          <FormSection />
        </div>

        {/* Preview Section */}
        <div className='mx-5'>
          <div id="print-area">
            <ResumePreview />
          </div>
        </div>
      </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume