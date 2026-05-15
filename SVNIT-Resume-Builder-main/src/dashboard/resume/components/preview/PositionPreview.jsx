import SectionHeading from '@/components/custom/SectionHeading'
import renderHtmlWithBoldFix from '@/dashboard/components/renderHtmlWithBoldFix'
import React from 'react'

function PostionPreview({ resumeInfo }) {
  const porList = Array.isArray(resumeInfo?.positionOfResponsibility)
    ? resumeInfo.positionOfResponsibility
    : [{ role: resumeInfo?.positionOfResponsibility || '', date: '' }]

  if (!porList.length || !porList[0].role) return null

  return (
    <div className="mt-2">
      <SectionHeading title={'Positions of Responsibility'} />
      <div className='text-xs'>
        {porList.map((item, index) => (
          <div key={index} className="flex justify-between gap-4">
            <div className="w-full resume-html text-[0.77rem]" dangerouslySetInnerHTML={{ __html: renderHtmlWithBoldFix(item.role) }} />
            {item.date && (
              <p className="whitespace-nowrap text-xs text-right min-w-fit italic">
                {item.date}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostionPreview
