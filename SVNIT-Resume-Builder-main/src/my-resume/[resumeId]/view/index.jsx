import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../service/GlobalApi'
import { Download, Share2 } from 'lucide-react'

function ViewResume() {

    const [resumeInfo, setResumeInfo] = useState();
    const { resumeId } = useParams();

    const GetResumeInfo = () => {
        GlobalApi.GetResumeById(resumeId).then(resp => {
            setResumeInfo(resp.data.data);
        })
    }

    useEffect(() => {
        GetResumeInfo();
    }, [])

    if (!resumeInfo) {
        return (
            <div className="flex justify-center items-center h-screen">
                <img src="/logo.png" alt="Logo" className="w-32 h-32" />
            </div>
        )
    }

    const HandleDownload = () => {
        const originalTitle = document.title;
        document.title = `${resumeInfo?.firstname || ''}_${resumeInfo?.lastname || ''}_Resume`;
        window.print();
        setTimeout(() => {
            document.title = originalTitle;
        }, 1000);
    }

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }} >
            <div id="no-print">
                <Header />

                <div className='flex justify-between my-10 mx-10 md:mx-20 lg:mx-36'>
                    <div>
                        <h2 className='text-left text-2xl font-medium'>
                            {resumeInfo?.firstname + " " + resumeInfo?.lastname + "'s Resume"}
                        </h2>
                        <p className='text-left text-gray-400'>You can download the resume, or also share the link</p>
                    </div>
                    <div className='flex'>
                        <Button variant="link" onClick={HandleDownload}>
                            <Download className="w-4 h-4 mr-2" />
                            Download
                        </Button>

                        <Button
                            variant='outline'
                            onClick={() => {
                                if (navigator.share) {
                                    navigator
                                        .share({
                                            title: 'Resume',
                                            text: 'This is my resume. Please open the URL to view it.',
                                            url: import.meta.env.VITE_BASE_URL + "/my-resume/" + resumeId + "/view",
                                        })
                                } else {
                                    alert('Web Share API not supported on this device');
                                }
                            }}
                        >
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                        </Button>
                    </div>
                </div>

            </div>
            <div className='my-5 mx-10 md:mx-20 lg:mx-36'>
                <div id="print-area" >
                    <ResumePreview />
                </div>
            </div>
        </ResumeInfoContext.Provider>
    )
}

export default ViewResume