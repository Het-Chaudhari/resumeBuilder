import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from 'sonner'
import RichTextEditor from '../RichTextEditor'

function Position() {
  const [loading, setLoading] = useState(false)
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const { resumeId } = useParams()
  const [porList, setPorList] = useState([
    {
      id: Date.now(),
      role: '',
      date: '',
      version: 0,
    },
  ])
  if (!resumeInfo) {
    return <div className="text-center p-6">⏳ Loading Personal Details...</div>;
  }

  useEffect(() => {
    const existing = resumeInfo?.positionOfResponsibility
    if (Array.isArray(existing)) {
      const enriched = existing.map((item) => ({
        id: item.id || Date.now() + Math.random(),
        role: item.role || '',
        date: item.date || '',
        version: 0,
      }))
      setPorList(enriched)
    } else if (typeof existing === 'string' && existing.trim()) {
      setPorList([
        {
          id: Date.now(),
          role: existing,
          date: '',
          version: 0,
        },
      ])
    }
  }, [])

  useEffect(() => {
    setResumeInfo((prev) => ({
      ...prev,
      positionOfResponsibility: porList,
    }))
  }, [porList])

  const handleChange = (index, key, value) => {
    const updated = [...porList]
    updated[index][key] = value
    setPorList(updated)
  }

  const addPor = () => {
    setPorList((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), role: '', date: '', version: 0 },
    ])
  }

  const removePor = (index) => {
    setPorList((prev) => prev.filter((_, i) => i !== index))
  }

  const moveUp = (index) => {
    if (index === 0) return
    const updated = [...porList]
    ;[updated[index - 1], updated[index]] = [updated[index], updated[index - 1]]
    updated[index - 1].version++
    updated[index].version++
    setPorList(updated)
  }

  const moveDown = (index) => {
    if (index === porList.length - 1) return
    const updated = [...porList]
    ;[updated[index + 1], updated[index]] = [updated[index], updated[index + 1]]
    updated[index + 1].version++
    updated[index].version++
    setPorList(updated)
  }

  const onSave = async () => {
    setLoading(true)
    try {
      await GlobalApi.UpdateResumeDetail(resumeId, {
        data: {
          positionOfResponsibility: porList.map(({ id, version, ...rest }) => rest),
        },
      })
      toast('Position of Responsibility updated!')
    } catch {
      toast('Server Error, Please try again!')
    }
    setLoading(false)
  }

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Position of Responsibility</h2>
      <p>Add leadership roles or responsibilities with optional description and dates.</p>

      {porList.map((item, index) => (
        <div key={`${item.id}-${item.version}`} className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
          <div className="col-span-2">
            <label>Description</label>
            <RichTextEditor
              defaultValue={item.role}
              onRichTextEditorChange={(e) => handleChange(index, 'role', e.target.value)}
            />
          </div>
          <div>
            <label>Date</label>
            <Input
              placeholder="e.g. Jan 2023 - Dec 2023"
              value={item.date}
              onChange={(e) => handleChange(index, 'date', e.target.value)}
            />
          </div>
          <div className="w-full h-full flex items-end justify-end gap-2">
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="text-primary"
                onClick={() => moveUp(index)}
                disabled={index === 0}
              >
                ↑
              </Button>
              <Button
                variant="outline"
                className="text-primary"
                onClick={() => moveDown(index)}
                disabled={index === porList.length - 1}
              >
                ↓
              </Button>
            </div>
            <Button
              variant="outline"
              onClick={() => removePor(index)}
              className="text-red-500"
            >
              - Remove
            </Button>
          </div>
        </div>
      ))}

      <div className="flex justify-between">
        <Button variant="outline" onClick={addPor} className="text-primary">
          + Add More Position
        </Button>
        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
        </Button>
      </div>
    </div>
  )
}

export default Position