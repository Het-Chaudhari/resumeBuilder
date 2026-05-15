import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from 'sonner'
import { LoaderCircle } from 'lucide-react'
import RichTextEditor from '../RichTextEditor'

const baseFormField = {
  title: '',
  techStack: '',
  duration: '',
  liveLink: '',
  githubLink: '',
  description: '',
}

function Projects() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const [projectList, setProjectList] = useState([])
  const { resumeId } = useParams()
  const [loading, setLoading] = useState(false)
  if (!resumeInfo) {
    return <div className="text-center p-6">⏳ Loading Personal Details...</div>;
  }
  useEffect(() => {
    if (resumeInfo?.projects?.length > 0) {
      const enriched = resumeInfo.projects.map((p) => ({
        ...p,
        id: p.id || Date.now() + Math.random(),
        version: 0,
      }))
      setProjectList(enriched)
    }
  }, [])

  useEffect(() => {
    setResumeInfo((prev) => ({
      ...prev,
      projects: projectList,
    }))
  }, [projectList])

  const handleChange = (index, e) => {
    const updated = [...projectList]
    updated[index][e.target.name] = e.target.value
    setProjectList(updated)
  }

  const handleRichTextChange = (e, index) => {
    const updated = [...projectList]
    updated[index].description = e.target.value
    setProjectList(updated)
  }

  const addNewProject = () =>
    setProjectList((prev) => [
      ...prev,
      { ...baseFormField, id: Date.now() + Math.random(), version: 0 },
    ])

  const removeProject = (index) => {
    setProjectList((prev) => prev.filter((_, i) => i !== index))
  }

  const moveProjectUp = (index) => {
    if (index === 0) return
    const newList = [...projectList]
    ;[newList[index - 1], newList[index]] = [newList[index], newList[index - 1]]
    newList[index - 1].version++
    newList[index].version++
    setProjectList(newList)
  }

  const moveProjectDown = (index) => {
    if (index === projectList.length - 1) return
    const newList = [...projectList]
    ;[newList[index], newList[index + 1]] = [newList[index + 1], newList[index]]
    newList[index].version++
    newList[index + 1].version++
    setProjectList(newList)
  }

  const onSave = () => {
    setLoading(true)
    const data = {
      data: {
        projects: projectList.map(({ id, version, ...rest }) => rest),
      },
    }
    GlobalApi.UpdateResumeDetail(resumeId, data)
      .then(() => {
        toast('Projects updated!')
        setLoading(false)
      })
      .catch(() => {
        toast('Error saving projects.')
        setLoading(false)
      })
  }

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Projects</h2>
      <p>Include projects you've built or contributed to</p>

      {projectList.map((item, index) => (
        <div key={`${item.id}-${item.version}`} className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
          <label className="text-xs col-span-1">
            Project Title
            <Input name="title" value={item.title} onChange={(e) => handleChange(index, e)} />
          </label>
          <label className="text-xs col-span-1">
            Month and Year
            <Input name="duration" value={item.duration} onChange={(e) => handleChange(index, e)} />
          </label>

          <label className="text-xs col-span-2">
            Summary
            <Input name="techStack" value={item.techStack} onChange={(e) => handleChange(index, e)} />
          </label>

          <label className="text-xs col-span-1">
            Live Link
            <Input name="liveLink" value={item.liveLink} onChange={(e) => handleChange(index, e)} />
          </label>

          <label className="text-xs col-span-1">
            GitHub Link
            <Input name="githubLink" value={item.githubLink} onChange={(e) => handleChange(index, e)} />
          </label>

          <div className="col-span-2">
            <RichTextEditor
              defaultValue={item.description}
              onRichTextEditorChange={(e) => handleRichTextChange(e, index)}
            />
          </div>

          <div className="col-span-2 flex justify-end items-end gap-2">
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="text-primary hover:border-black"
                onClick={() => moveProjectUp(index)}
                disabled={index === 0}
              >
                ↑
              </Button>
              <Button
                variant="outline"
                className="text-primary hover:border-black"
                onClick={() => moveProjectDown(index)}
                disabled={index === projectList.length - 1}
              >
                ↓
              </Button>
            </div>
            <Button variant="outline" onClick={() => removeProject(index)} className="text-red-500">
              - Remove
            </Button>
          </div>
        </div>
      ))}

      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button className='text-primary' variant="outline" onClick={addNewProject}>
            + Add Project
          </Button>
        </div>
        <Button onClick={onSave} disabled={loading}>
          {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
        </Button>
      </div>
    </div>
  )
}

export default Projects