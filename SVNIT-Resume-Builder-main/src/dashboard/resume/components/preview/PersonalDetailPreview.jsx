import React from 'react'

function PersonalDetailPreview({ resumeInfo }) {
    const formattedLinks = (resumeInfo?.links || [])
        .filter(link => link?.url?.trim() !== '')
        .map((link, index, arr) => {
            const url = link.url.startsWith('http') ? link.url : `https://${link.url}`
            return (
                <a key={index} href={url} target="_blank" rel="noopener noreferrer" className="truncate max-w-[120px]">
                    {link.title || 'Link'}
                </a>
            )
        })

    return (
        <div className="flex flex-wrap justify-between items-start gap-4">
            {/* Left Section: Logo and College Info */}
            <div className="flex items-center gap-4 max-w-full md:max-w-[60%] flex-shrink">
                <img
                    src="logo.png"
                    alt="SVNIT Logo"
                    className="w-20 h-20 flex-shrink-0"
                />
                <div className="text-left text-sm leading-tight">
                    <h2 className="font-bold text-[1.3rem]">{resumeInfo?.firstname} {resumeInfo?.lastname}</h2>
                    <div className='flex'>
                        <p>Roll No.:&nbsp;</p>
                        <p className="uppercase">
                            {resumeInfo?.rollno || 'XXXXXX'}
                        </p>
                    </div>
                    <p>Bachelor of Technology</p>
                    <p>{resumeInfo?.branch || 'Branch is Required'}</p>
                    <p>National Institute of Technology, Surat</p>
                </div>
            </div>

            {/* Right Section: Contact Info */}
            <div className="text-right text-sm leading-tight max-w-full md:max-w-[40%] flex flex-col mt-2">
                <p>{resumeInfo?.phone || '+91-8252xxxxxxx'}</p>
                <p>{resumeInfo?.email || 'youremail@email.com'}</p>
                <p>{resumeInfo?.collegemail || 'collegeemail@svnit.ac.in'}</p>
                <div className="flex gap-1 flex-wrap justify-end">
                    {formattedLinks.map((element, index) => (
                        <React.Fragment key={index}>
                            {index > 0 && <span>|</span>}
                            {element}
                        </React.Fragment>
                    ))}
                </div>
                <a
                    href={
                        resumeInfo?.linkedin?.startsWith('http')
                            ? resumeInfo.linkedin
                            : `https://${resumeInfo?.linkedin}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {(resumeInfo?.linkedin || 'linkedin.com/in/linkedinuser')
                        .replace(/^(https?:\/\/)?(www\.)?/, '')}
                </a>
            </div>
        </div>
    )
}

export default PersonalDetailPreview