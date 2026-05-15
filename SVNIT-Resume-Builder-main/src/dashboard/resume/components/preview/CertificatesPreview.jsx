import React from 'react'
import SectionHeading from '@/components/custom/SectionHeading'
import renderHtmlWithBoldFix from '@/dashboard/components/renderHtmlWithBoldFix'

function CertificatesPreview({ resumeInfo }) {
  if (resumeInfo.certificates.length === 0) {
    return null
  }

  return (
    <div className="mt-2">
      <SectionHeading title="Certifications" />
      <div className="text-xs flex flex-col gap-1">
        {resumeInfo.certificates.map((cert, index) => (
          <div key={index} className="flex justify-between items-start relative">
            <div
              className="pr-2 resume-html text-[0.77rem]"
              dangerouslySetInnerHTML={{ __html: renderHtmlWithBoldFix(cert.description) }}
            />
            {cert.year && (
              <span className="italic whitespace-nowrap min-w-[60px] text-right pl-3">
                {cert.year}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CertificatesPreview