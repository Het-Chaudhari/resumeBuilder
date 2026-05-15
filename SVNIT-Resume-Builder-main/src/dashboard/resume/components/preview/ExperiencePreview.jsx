import SectionHeading from '@/components/custom/SectionHeading'
import renderHtmlWithBoldFix from '@/dashboard/components/renderHtmlWithBoldFix'
import React from 'react'

function formatMonthYear(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}

function ExperiencePreview({ resumeInfo }) {
  return (
    <div className="mt-2">
      <SectionHeading title="Experience" />
      <div className="text-xs flex flex-col gap-2">
        {resumeInfo?.experience?.map((experience, index) => (
          <div key={index}>
            {/* Company Name and Date Row */}
            <div className="flex justify-between items-start">
              <div>
                <p className="lm-extrabold text-[0.8rem] leading-tight">
                  {experience?.companyName || 'Company Name'}
                </p>
                {experience?.title && (
                  <p className="text-[0.78rem] italic leading-tight">{experience.title}</p>
                )}
              </div>
              <div className="text-right text-xs italic whitespace-nowrap leading-tight">
                <p>
                  {formatMonthYear(experience?.startDate)}{' '}
                  {experience?.currentlyWorking
                    ? ' - Present'
                    : ` - ${formatMonthYear(experience?.endDate)}`}
                </p>
                {(experience?.city || experience?.state) && (
                  <p>
                    {experience?.city}
                    {experience?.state ? `, ${experience?.state}` : ''}
                  </p>
                )}
              </div>
            </div>

            {/* Work Summary */}
            {experience?.workSummery && (
              <div
                className="text-[0.77rem] text-justify leading-tight pl-2 resume-html"
                dangerouslySetInnerHTML={{
                  __html: renderHtmlWithBoldFix(experience.workSummery),
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExperiencePreview