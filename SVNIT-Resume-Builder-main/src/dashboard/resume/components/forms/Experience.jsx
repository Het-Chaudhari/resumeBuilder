import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../RichTextEditor'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from 'sonner'
import { LoaderCircle } from 'lucide-react'

const baseFormField = {
  title: '',
  companyName: '',
  city: '',
  state: '',
  startDate: '',
  endDate: '',
  workSummery: '',
}

function Experience() {
  const [experinceList, setExperinceList] = useState([])
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const params = useParams()
  const [loading, setLoading] = useState(false)
  if (!resumeInfo) {
    return <div className="text-center p-6">⏳ Loading Personal Details...</div>;
  }
  useEffect(() => {
    if (resumeInfo?.experience?.length > 0) {
      const enriched = resumeInfo.experience.map((item) => ({
        ...item,
        id: item.id || Date.now() + Math.random(),
        version: 0,
      }))
      setExperinceList(enriched)
    }
  }, [])

  useEffect(() => {
    setResumeInfo((prev) => ({
      ...prev,
      experience: experinceList,
    }))
  }, [experinceList])

  const handleChange = (index, event) => {
    const newEntries = [...experinceList]
    const { name, value } = event.target
    newEntries[index][name] = value
    setExperinceList(newEntries)
  }

  const handleRichTextEditor = (e, name, index) => {
    const newEntries = [...experinceList]
    newEntries[index][name] = e.target.value
    setExperinceList(newEntries)
  }

  const AddNewExperience = () => {
    setExperinceList((prev) => [
      ...prev,
      { ...baseFormField, id: Date.now() + Math.random(), version: 0 },
    ])
  }

  const RemoveExperience = (index) => {
    setExperinceList((prev) => prev.filter((_, i) => i !== index))
  }

  const moveExperienceUp = (index) => {
    if (index === 0) return
    const newList = [...experinceList]
    ;[newList[index - 1], newList[index]] = [newList[index], newList[index - 1]]
    newList[index - 1].version++
    newList[index].version++
    setExperinceList(newList)
  }

  const moveExperienceDown = (index) => {
    if (index === experinceList.length - 1) return
    const newList = [...experinceList]
    ;[newList[index], newList[index + 1]] = [newList[index + 1], newList[index]]
    newList[index].version++
    newList[index + 1].version++
    setExperinceList(newList)
  }

  const onSave = () => {
    setLoading(true)
    const data = {
      data: {
        experience: experinceList.map(({ id, version, ...rest }) => rest),
      },
    }

    GlobalApi.UpdateResumeDetail(params?.resumeId, data)
      .then(() => {
        setResumeInfo((prev) => ({
          ...prev,
          experience: experinceList,
        }))
        setLoading(false)
        toast('Details updated!')
      })
      .catch(() => {
        setLoading(false)
        toast('Error updating experience!')
      })
  }

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Professional Experience</h2>
      <p>Add your previous job experience</p>

      {experinceList.map((item, index) => (
        <div key={`${item.id}-${item.version}`} className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
          <label className="text-xs">
            Position Title
            <Input name="title" value={item.title} onChange={(e) => handleChange(index, e)} />
          </label>
          <label className="text-xs">
            Company Name
            <Input name="companyName" value={item.companyName} onChange={(e) => handleChange(index, e)} />
          </label>
          <label className="text-xs">
            City
            <Input name="city" value={item.city} onChange={(e) => handleChange(index, e)} />
          </label>
          <label className="text-xs">
            State
            <Input name="state" value={item.state} onChange={(e) => handleChange(index, e)} />
          </label>
          <label className="text-xs">
            Start Date
            <Input type="date" name="startDate" value={item.startDate} onChange={(e) => handleChange(index, e)} />
          </label>
          <label className="text-xs">
            End Date
            <Input type="date" name="endDate" value={item.endDate} onChange={(e) => handleChange(index, e)} />
          </label>
          <div className="col-span-2">
            <RichTextEditor
              defaultValue={item.workSummery}
              onRichTextEditorChange={(e) => handleRichTextEditor(e, 'workSummery', index)}
            />
          </div>
          <div className="col-span-2 flex justify-end items-end gap-2">
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="text-primary hover:border-black"
                onClick={() => moveExperienceUp(index)}
                disabled={index === 0}
              >
                ↑
              </Button>
              <Button
                variant="outline"
                className="text-primary hover:border-black"
                onClick={() => moveExperienceDown(index)}
                disabled={index === experinceList.length - 1}
              >
                ↓
              </Button>
            </div>
            <Button variant="outline" onClick={() => RemoveExperience(index)} className="text-red-500">
              - Remove
            </Button>
          </div>
        </div>
      ))}

      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" onClick={AddNewExperience} className="text-primary">
            + Add More Experience
          </Button>
        </div>
        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
        </Button>
      </div>
    </div>
  )
}

export default Experience