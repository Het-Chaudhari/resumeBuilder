import React from 'react'
import SectionHeading from '@/components/custom/SectionHeading'
import renderHtmlWithBoldFix from '@/dashboard/components/renderHtmlWithBoldFix'

function AchievementsPreview({ resumeInfo }) {
  const achievements = Array.isArray(resumeInfo?.achievement)
    ? resumeInfo.achievement
    : [{ description: resumeInfo?.achievement || '', date: '' }]

  if (!achievements.length || !achievements[0].description) return null

  return (
    <div className="mt-2">
      <SectionHeading title="Achievements" />
      <div className='text-xs'>
        {achievements.map((item, index) => (
          <div key={index} className="flex justify-between gap-4">
            <div
              className="w-full resume-html text-[0.77rem]"
              dangerouslySetInnerHTML={{ __html: renderHtmlWithBoldFix(item.description) }}
            />
            {item.date && (
              <p className="whitespace-nowrap italic text-right min-w-fit">
                {item.date}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AchievementsPreview
