import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from 'sonner'

function Education() {
  const [loading, setLoading] = useState(false)
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const params = useParams()

  const [educationalList, setEducationalList] = useState([]) // <-- no default blank entry
  if (!resumeInfo) {
    return <div className="text-center p-6">⏳ Loading Personal Details...</div>;
  }
  useEffect(() => {
    if (resumeInfo?.education?.length > 0) {
      setEducationalList(resumeInfo.education)
    }
  }, [])

  const handleChange = (event, index) => {
    const newEntries = [...educationalList]
    const { name, value } = event.target
    newEntries[index][name] = value
    setEducationalList(newEntries)
  }

  const AddNewEducation = () => {
    setEducationalList([
      ...educationalList,
      {
        universityName: '',
        degree: '',
        major: '',
        grade: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ])
  }

  const RemoveEducation = (index) => {
    setEducationalList((educationalList) =>
      educationalList.filter((_, i) => i !== index)
    )
  }

  const moveEducationUp = (index) => {
    if (index === 0) return
    const newList = [...educationalList]
    ;[newList[index - 1], newList[index]] = [newList[index], newList[index - 1]]
    setEducationalList(newList)
  }

  const moveEducationDown = (index) => {
    if (index === educationalList.length - 1) return
    const newList = [...educationalList]
    ;[newList[index], newList[index + 1]] = [newList[index + 1], newList[index]]
    setEducationalList(newList)
  }

  const onSave = () => {
    setLoading(true)
    const data = {
      data: {
        education: educationalList.map(({ id, ...rest }) => rest)
      }
    }

    GlobalApi.UpdateResumeDetail(params.resumeId, data).then(
      (resp) => {
        setLoading(false)
        toast('Details updated !')
      },
      (error) => {
        setLoading(false)
        toast('Server Error, Please try again!')
      }
    )
  }

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      education: educationalList
    })
  }, [educationalList])

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add Your educational details</p>

      {educationalList.length === 0 && (
        <p className="text-sm text-muted-foreground italic mt-4">No education added yet.</p>
      )}

      <div>
        {educationalList.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div className="col-span-2">
                <label>University Name</label>
                <Input
                  name="universityName"
                  onChange={(e) => handleChange(e, index)}
                  value={item?.universityName || ''}
                />
              </div>
              <div>
                <label>Degree</label>
                <Input
                  name="degree"
                  onChange={(e) => handleChange(e, index)}
                  value={item?.degree || ''}
                />
              </div>
              <div>
                <label>Major</label>
                <Input
                  name="major"
                  onChange={(e) => handleChange(e, index)}
                  value={item?.major || ''}
                />
              </div>
              <div>
                <label>Start Year</label>
                <select
                  name="startDate"
                  onChange={(e) => handleChange(e, index)}
                  value={item?.startDate || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="">Select Year</option>
                  {Array.from({ length: 80 }, (_, i) => {
                    const year = 2000 + i
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    )
                  })}
                </select>
              </div>
              <div>
                <label>End Year</label>
                <select
                  name="endDate"
                  onChange={(e) => handleChange(e, index)}
                  value={item?.endDate || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="">Select Year</option>
                  {Array.from({ length: 80 }, (_, i) => {
                    const year = 2000 + i
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    )
                  })}
                </select>
              </div>
              <div>
                <label>Grade</label>
                <Input
                  name="grade"
                  onChange={(e) => handleChange(e, index)}
                  value={item?.grade || ''}
                  placeholder="e.g. 8.21 / 88%"
                />
              </div>
              <div className="w-full h-full flex items-end justify-end gap-2">
                <div className="flex gap-2">
                  <Button variant="outline" className="text-primary hover:border-black" onClick={() => moveEducationUp(index)} disabled={index === 0}>
                    ↑
                  </Button>
                  <Button variant="outline" className="text-primary hover:border-black" onClick={() => moveEducationDown(index)} disabled={index === educationalList.length - 1}>
                    ↓
                  </Button>
                </div>
                <Button variant="outline" onClick={() => RemoveEducation(index)} className="text-red-500">
                  - Remove
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" onClick={AddNewEducation} className="text-primary">
            + Add More Education
          </Button>
        </div>
        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
        </Button>
      </div>
    </div>
  )
}

export default Education