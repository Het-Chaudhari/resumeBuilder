import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from 'sonner'
import RichTextEditor from '../RichTextEditor'

function Publications() {
  const [loading, setLoading] = useState(false)
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const { resumeId } = useParams()

  const [publications, setPublications] = useState([])
  if (!resumeInfo) {
    return <div className="text-center p-6">⏳ Loading Personal Details...</div>;
  }
  useEffect(() => {
    if (Array.isArray(resumeInfo?.publications)) {
      const enriched = resumeInfo.publications.map((p) => ({
        ...p,
        id: p.id || Date.now() + Math.random(),
        version: 0,
      }))
      setPublications(enriched)
    }
  }, [])

  useEffect(() => {
    setResumeInfo((prev) => ({
      ...prev,
      publications,
    }))
  }, [publications])

  const handleChange = (index, key, value) => {
    const updated = [...publications]
    updated[index][key] = value
    setPublications(updated)
  }

  const addPublication = () => {
    setPublications((prev) => [
      ...prev,
      { description: '', date: '', id: Date.now() + Math.random(), version: 0 },
    ])
  }

  const removePublication = (index) => {
    setPublications((prev) => prev.filter((_, i) => i !== index))
  }

  const moveUp = (index) => {
    if (index === 0) return
    const updated = [...publications]
    ;[updated[index - 1], updated[index]] = [updated[index], updated[index - 1]]
    updated[index - 1].version++
    updated[index].version++
    setPublications(updated)
  }

  const moveDown = (index) => {
    if (index === publications.length - 1) return
    const updated = [...publications]
    ;[updated[index], updated[index + 1]] = [updated[index + 1], updated[index]]
    updated[index].version++
    updated[index + 1].version++
    setPublications(updated)
  }

  const onSave = async () => {
    setLoading(true)
    try {
      await GlobalApi.UpdateResumeDetail(resumeId, {
        data: {
          publications: publications.map(({ id, version, ...rest }) => rest),
        },
      })
      toast('Publications updated!')
    } catch {
      toast('Server Error, Please try again!')
    }
    setLoading(false)
  }

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Publications</h2>
      <p>Add your published papers, articles, or presentations with date.</p>

      {publications.map((item, index) => (
        <div key={`${item.id}-${item.version}`} className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
          <div className="col-span-2">
            <label>Description</label>
            <RichTextEditor
              defaultValue={item.description}
              onRichTextEditorChange={(e) => handleChange(index, 'description', e.target.value)}
            />
          </div>
          <div>
            <label>Date</label>
            <Input
              placeholder="e.g., Jan 2024"
              value={item.date}
              onChange={(e) => handleChange(index, 'date', e.target.value)}
              className="w-full"
            />
          </div>
          <div className="w-full h-full flex items-end justify-end gap-2">
            <div className="flex gap-2">
              <Button variant="outline" className="text-primary" onClick={() => moveUp(index)} disabled={index === 0}>
                ↑
              </Button>
              <Button
                variant="outline"
                className="text-primary"
                onClick={() => moveDown(index)}
                disabled={index === publications.length - 1}
              >
                ↓
              </Button>
            </div>
            <Button variant="outline" onClick={() => removePublication(index)} className="text-red-500">
              - Remove
            </Button>
          </div>
        </div>
      ))}

      <div className="flex justify-between">
        <Button variant="outline" onClick={addPublication} className="text-primary">
          + Add More Publication
        </Button>
        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
        </Button>
      </div>
    </div>
  )
}

export default Publications