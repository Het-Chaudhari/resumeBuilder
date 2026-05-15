import React from 'react'
import SectionHeading from '@/components/custom/SectionHeading'
import renderHtmlWithBoldFix from '@/dashboard/components/renderHtmlWithBoldFix'

function KeyCoursesPreview({ resumeInfo }) {
  if (!resumeInfo?.keyCourses?.length) return null

  return (
    <div className="mt-2">
      <SectionHeading title="Key Courses Taken" />
      <div className="text-xs">
        {resumeInfo.keyCourses.map((course, index) => (
          <div key={index} className="text-justify">
            <div className='resume-html text-[0.77rem]' dangerouslySetInnerHTML={{ __html: renderHtmlWithBoldFix(course.description) }} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default KeyCoursesPreview