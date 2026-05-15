import SectionHeading from '@/components/custom/SectionHeading'
import renderHtmlWithBoldFix from '@/dashboard/components/renderHtmlWithBoldFix'
import React from 'react'

function SkillsPreview({ resumeInfo }) {
  if (!resumeInfo?.skillsSummary) return null

  return (
    <div className="mt-2">
      <SectionHeading title={'Skills'}/>
      <div
        className="text-[0.77rem] text-justify resume-html"
        dangerouslySetInnerHTML={{
          __html: renderHtmlWithBoldFix(resumeInfo.skillsSummary)
        }}
      />
    </div>
  )
}

export default SkillsPreview
