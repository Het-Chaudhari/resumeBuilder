import SectionHeading from '@/components/custom/SectionHeading'
import renderHtmlWithBoldFix from '@/dashboard/components/renderHtmlWithBoldFix'
import React from 'react'

function ProjectsPreview({ resumeInfo }) {
  if (!resumeInfo?.projects?.length) return null

  return (
    <div className="mt-2">
      <SectionHeading title="Projects" />
      <div className="text-xs flex flex-col gap-2">
        {resumeInfo.projects.map((project, index) => (
          <div key={index}>
            {/* Title and Duration */}
            <div className="flex justify-between items-start">
              <div>
                <p className="lm-extrabold text-[0.8rem]">
                  {project?.title || 'Project Title'}
                </p>
                {project?.techStack && (
                  <p className="italic leading-tight text-[0.77rem] mt-0.5">
                    {project.techStack}
                  </p>
                )}
              </div>
              <div className="text-right flex flex-col italic whitespace-nowrap pl-2">
                {project?.duration && <p>{project.duration}</p>}
                {/* Links */}
                {(project?.liveLink || project?.githubLink) && (
                  <div className="flex justify-end gap-3 pl-2">
                    {project?.liveLink && (
                      <a
                        href={
                        project?.liveLink?.startsWith('http')
                            ? project.liveLink
                            : `https://${project?.liveLink}`
                    }
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline"
                      >
                        Live
                      </a>
                    )}
                    {project?.githubLink && (
                      <a
                        href={
                        project?.githubLink?.startsWith('http')
                            ? project.githubLink
                            : `https://${project?.githubLink}`
                    }
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {project?.description && (
              <div
                className="text-justify pl-2 leading-snug resume-html text-[0.77rem]"
                dangerouslySetInnerHTML={{ __html: renderHtmlWithBoldFix(project.description) }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectsPreview