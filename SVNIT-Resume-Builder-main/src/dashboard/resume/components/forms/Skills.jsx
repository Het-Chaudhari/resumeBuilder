import { Button } from '@/components/ui/button'
import React, { useContext, useEffect, useState } from 'react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from './../../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { LoaderCircle } from 'lucide-react'
import RichTextEditor from '../RichTextEditor'

function Skills() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const [skillsSummary, setSkillsSummary] = useState('')
  const [editorAdded, setEditorAdded] = useState(false)
  const [loading, setLoading] = useState(false)
  const { resumeId } = useParams()

  useEffect(() => {
    if (resumeInfo) {
      const summary = resumeInfo.skillsSummary
      if (summary && summary.length > 0) {
        setSkillsSummary(resumeInfo.skillsSummary)
        setEditorAdded(true)
      }
    }
  }, [resumeInfo])

  useEffect(() => {
    setResumeInfo((prev) => ({
      ...prev,
      skillsSummary,
    }))
  }, [skillsSummary])

  const handleSave = async () => {
    setLoading(true)
    try {
      await GlobalApi.UpdateResumeDetail(resumeId, {
        data: {
          skills: skillsSummary,
        },
      })
      setResumeInfo((prev) => ({
        ...prev,
        skillsSummary,
      }))
      toast('Skills summary updated!')
    } catch {
      toast('Error saving skills, try again!')
    }
    setLoading(false)
  }

  const handleRemove = () => {
    setSkillsSummary('')
    setEditorAdded(false)
    setResumeInfo((prev) => ({
      ...prev,
      skillsSummary: '',
    }))
  }

  if (!resumeInfo) {
    return <div className="text-center p-6">⏳ Loading Personal Details...</div>
  }

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Skills Summary</h2>
      <p>Optionally add a short summary of your skills</p>

      {!editorAdded ? (
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => setEditorAdded(true)}
            className="text-primary"
          >
            + Add Skills Summary
          </Button>
          <Button disabled={loading} onClick={handleSave}>
            {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
          </Button>
        </div>
      ) : (
        <>
          <div className="my-4">
            <RichTextEditor
              defaultValue={skillsSummary}
              onRichTextEditorChange={(e) => setSkillsSummary(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={handleRemove} className="text-red-500">
              Remove
            </Button>
            <Button disabled={loading} onClick={handleSave}>
              {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default Skills