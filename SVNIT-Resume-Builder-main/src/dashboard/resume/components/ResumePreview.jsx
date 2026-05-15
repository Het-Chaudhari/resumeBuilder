import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillsPreview from './preview/SkillsPreview'
import ProjectsPreview from './preview/ProjectsPreview'
import PositionPreview from './preview/PositionPreview'
import AchievementsPreview from './preview/AchievementsPreview'
import CertificatesPreview from './preview/CertificatesPreview'  // ✅ NEW import
import KeyCoursesPreview from './preview/KeyCoursesPreview'
import PublicationsPreview from './preview/PublicationsPreview'

function ResumePreview() {
  const { resumeInfo } = useContext(ResumeInfoContext)
  if (!resumeInfo) {
    return <div className="text-center p-6">⏳ Loading Personal Details...</div>;
  }
  return (
    <div className="h-full font-lmroman p-2">
      <PersonalDetailPreview resumeInfo={resumeInfo} />
      {resumeInfo?.education?.length > 0 && <EducationalPreview resumeInfo={resumeInfo} />}
      {resumeInfo?.experience?.length > 0 && <ExperiencePreview resumeInfo={resumeInfo} />}
      {resumeInfo?.projects?.length > 0 && <ProjectsPreview resumeInfo={resumeInfo} />}
      {resumeInfo?.keyCourses?.length>0 && <KeyCoursesPreview resumeInfo={resumeInfo}/>}
      {resumeInfo?.skillsSummary?.length > 0 && <SkillsPreview resumeInfo={resumeInfo} />}
      {resumeInfo?.achievement?.length > 0 && <AchievementsPreview resumeInfo={resumeInfo} />}
      {resumeInfo?.positionOfResponsibility?.length > 0 && <PositionPreview resumeInfo={resumeInfo} />}
      {resumeInfo?.publications?.length>0 && <PublicationsPreview resumeInfo={resumeInfo}/>}
      {resumeInfo?.certificates?.length > 0 && <CertificatesPreview resumeInfo={resumeInfo} />}
    </div>
  )
}

export default ResumePreview
