import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from '../../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'
import RichTextEditor from '../RichTextEditor'
import React, { useContext, useEffect, useState } from 'react'

function KeyCourses() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const { resumeId } = useParams()
  const [courses, setCourses] = useState([{ id: Date.now(), description: '', version: 0 }])
  const [loading, setLoading] = useState(false)
  if (!resumeInfo) {
    return <div className="text-center p-6">⏳ Loading Personal Details...</div>;
  }
  useEffect(() => {
    if (Array.isArray(resumeInfo?.keyCourses)) {
      const enriched = resumeInfo.keyCourses.map((course) => ({
        id: course.id || Date.now() + Math.random(),
        description: course.description || '',
        version: 0,
      }))
      setCourses(enriched)
    }
  }, [])

  useEffect(() => {
    setResumeInfo((prev) => ({
      ...prev,
      keyCourses: courses,
    }))
  }, [courses])

  const handleChange = (index, value) => {
    const updated = [...courses]
    updated[index].description = value
    setCourses(updated)
  }

  const addCourse = () => {
    setCourses([
      ...courses,
      { id: Date.now() + Math.random(), description: '', version: 0 },
    ])
  }

  const removeCourse = (index) => {
    setCourses((prev) => prev.filter((_, i) => i !== index))
  }

  const moveUp = (index) => {
    if (index === 0) return
    const updated = [...courses]
    ;[updated[index - 1], updated[index]] = [updated[index], updated[index - 1]]
    updated[index - 1].version++
    updated[index].version++
    setCourses(updated)
  }

  const moveDown = (index) => {
    if (index === courses.length - 1) return
    const updated = [...courses]
    ;[updated[index + 1], updated[index]] = [updated[index], updated[index + 1]]
    updated[index + 1].version++
    updated[index].version++
    setCourses(updated)
  }

  const onSave = async () => {
    setLoading(true)
    try {
      await GlobalApi.UpdateResumeDetail(resumeId, {
        data: { keyCourses: courses.map(({ id, description }) => ({ id, description })) },
      })
      toast('Key Courses updated!')
    } catch {
      toast('Error saving courses!')
    }
    setLoading(false)
  }

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Key Courses Taken</h2>
      <p>Add key courses you’ve taken that are relevant to your field.</p>

      {courses.map((item, index) => (
        <div key={`${item.id}-${item.version}`} className="border p-3 my-4 rounded-lg grid gap-3">
          <RichTextEditor
            defaultValue={item.description}
            onRichTextEditorChange={(e) => handleChange(index, e.target.value)}
          />
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => moveUp(index)} disabled={index === 0}>
                ↑
              </Button>
              <Button
                variant="outline"
                onClick={() => moveDown(index)}
                disabled={index === courses.length - 1}
              >
                ↓
              </Button>
              <Button
                variant="outline"
                onClick={() => removeCourse(index)}
                className="text-red-500"
              >
                - Remove
              </Button>
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-between">
        <Button variant="outline" onClick={addCourse} className="text-primary">
          + Add Course
        </Button>
        <Button onClick={onSave} disabled={loading}>
          {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
        </Button>
      </div>
    </div>
  )
}

export default KeyCourses