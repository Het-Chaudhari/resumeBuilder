import SectionHeading from '@/components/custom/SectionHeading'
import React from 'react'

function EducationalPreview({ resumeInfo }) {
    return (
        <div className="mt-4">
            <SectionHeading title='Education' />
            <div className="overflow-x-auto mt-2">
                <table className="w-full table-fixed border border-black text-[0.77rem]">
                    <thead>
                        <tr className="bg-white text-center lm-extrabold">
                            <th className="w-[18%] border border-black">Degree/Certificate</th>
                            <th className="w-[53%] border border-black">Institute/Board</th>
                            <th className="w-[18%] border border-black">CGPA/Percentage</th>
                            <th className="w-[11%] border border-black">Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resumeInfo?.education.map((edu, index) => (
                            <tr key={index} className='text-center'>
                                <td className="border border-black px-2">{edu.major != '' ? edu.degree + ' (' + edu.major + ')' : edu.degree}</td>
                                <td className="border border-black px-2">{edu.universityName}</td>
                                <td className="border border-black px-2">{edu.grade}</td>
                                <td className="border border-black px-2">
                                    {edu.startDate === edu.endDate
                                        ? edu.startDate
                                        : `${edu.startDate}-${edu.endDate}`}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default EducationalPreview