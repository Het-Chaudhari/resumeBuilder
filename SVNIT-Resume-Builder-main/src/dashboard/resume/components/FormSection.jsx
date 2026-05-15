import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Download, Home, LayoutGrid, Share2 } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import PersonalDetail from './forms/PersonalDetail'
import Experience from './forms/Experience'
import Education from './forms/Education'
import Skills from './forms/Skills'
import Projects from './forms/Projects'
import Position from './forms/Position'
import Achievements from './forms/Achievements'
import Certificates from './forms/Certificates'
import KeyCourses from './forms/KeyCourses'
import Publications from './forms/Publications'
import { useAuth } from '@/auth/Auth'

const formComponents = [
  { label: "Personal Detail", component: PersonalDetail },
  { label: "Education", component: Education },
  { label: "Experience", component: Experience },
  { label: "Projects", component: Projects },
  { label: "Key Courses", component: KeyCourses },
  { label: "Skills", component: Skills },
  { label: "Achievements", component: Achievements },
  { label: "Position of Responsibility", component: Position },
  { label: "Publications", component: Publications },
  { label: "Certifications", component: Certificates },
];

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(0); // start at 0
  const [enableNext, setEnableNext] = useState(true);
  const [showSectionList, setShowSectionList] = useState(false);
  const { resumeId } = useParams();
  const ActiveComponent = formComponents[activeFormIndex]?.component;
  const { userDetails } = useAuth()
  const handleDownload = () => {
    alert("Please select 'Save as PDF' in the print dialog.");
    const originalTitle = document.title;
    document.title = `Resume_${userDetails.email}`;
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  }


  if (!ActiveComponent) {
    return <div>⚠️ Error: Component not found</div>
  }

  return (
    <div>
      {/* Top Navigation Bar */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-3 items-center">
          <Link to="/dashboard">
            <Button variant="outline"><Home /></Button>
          </Link>
          <Button variant="outline" onClick={() => setShowSectionList(true)}>
            <LayoutGrid className="w-4 h-4 mr-2" />
            All Sections
          </Button>
          <Button
            variant='outline'
            onClick={() => {
              if (navigator.share) {
                navigator
                  .share({
                    title: 'Resume',
                    text: 'This is my resume. Please open the URL to view it.',
                    url: import.meta.env.VITE_BASE_URL + "/my-resume/" + resumeId + "/view",
                  })
              } else {
                alert('Web Share API not supported on this device');
              }
            }}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="link" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
        <div className="flex gap-2">
          {activeFormIndex > 0 && (
            <Button
              size="sm"
              onClick={() => setActiveFormIndex((prev) => prev - 1)}
              variant="secondary"
            >
              <ArrowLeft />
            </Button>
          )}
          {activeFormIndex < formComponents.length - 1 && (
            <Button
              size="sm"
              onClick={() => setActiveFormIndex((prev) => prev + 1)}
              disabled={!enableNext}
              className="flex gap-2"
            >
              Next
              <ArrowRight />
            </Button>
          )}
        </div>
      </div>

      {/* Section List View */}
      {showSectionList ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {formComponents.map((form, index) => (
            <Button
              key={form.label}
              variant={index === activeFormIndex ? 'default' : 'outline'}
              onClick={() => {
                setActiveFormIndex(index);
                setShowSectionList(false);
              }}
            >
              {form.label}
            </Button>
          ))}
        </div>
      ) : (
        // Render the currently selected form
        ActiveComponent && <ActiveComponent enabledNext={(v) => setEnableNext(v)} />
      )}
    </div>
  );
}

export default FormSection;