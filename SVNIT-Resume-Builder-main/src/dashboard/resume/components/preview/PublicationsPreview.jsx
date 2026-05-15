import SectionHeading from '@/components/custom/SectionHeading'
import renderHtmlWithBoldFix from '@/dashboard/components/renderHtmlWithBoldFix'
import React from 'react'

function PublicationsPreview({ resumeInfo }) {
  if (!resumeInfo?.publications?.length) return null

  return (
    <div className="mt-2">
      <SectionHeading title="Publications" />
      <div className="text-xs">
        {resumeInfo.publications.map((item, index) => (
          <div key={index} className="flex justify-between items-start">
            <div
              className="text-justify pr-2 resume-html text-[0.77rem]"
              dangerouslySetInnerHTML={{ __html: renderHtmlWithBoldFix(item.description) }}
            />
            {item.date && (
              <p className="italic text-right whitespace-nowrap min-w-[80px] pl-3">
                {item.date}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PublicationsPreview