import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from 'sonner'
import RichTextEditor from '../RichTextEditor'

const baseCertificate = {
  description: '',
  year: '',
}

function Certificates() {
  const [loading, setLoading] = useState(false)
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const { resumeId } = useParams()
  const [certificates, setCertificates] = useState([])

  if (!resumeInfo) {
    return <div className="text-center p-6">⏳ Loading Personal Details...</div>
  }

  useEffect(() => {
    if (Array.isArray(resumeInfo?.certificates)) {
      const enriched = resumeInfo.certificates.map((item) => ({
        ...item,
        id: item.id || Date.now() + Math.random(),
        version: 0,
      }))
      setCertificates(enriched)
    }
  }, [])

  useEffect(() => {
    setResumeInfo((prev) => ({
      ...prev,
      certificates,
    }))
  }, [certificates])

  const handleChange = (index, key, value) => {
    const updated = [...certificates]
    updated[index][key] = value
    setCertificates(updated)
  }

  const addCertificate = () => {
    setCertificates((prev) => [
      ...prev,
      { ...baseCertificate, id: Date.now() + Math.random(), version: 0 },
    ])
  }

  const removeCertificate = (index) => {
    setCertificates((prev) => prev.filter((_, i) => i !== index))
  }

  const moveUp = (index) => {
    if (index === 0) return
    const updated = [...certificates]
    ;[updated[index - 1], updated[index]] = [updated[index], updated[index - 1]]
    updated[index - 1].version++
    updated[index].version++
    setCertificates(updated)
  }

  const moveDown = (index) => {
    if (index === certificates.length - 1) return
    const updated = [...certificates]
    ;[updated[index], updated[index + 1]] = [updated[index + 1], updated[index]]
    updated[index].version++
    updated[index + 1].version++
    setCertificates(updated)
  }

  const onSave = async () => {
    setLoading(true)
    try {
      await GlobalApi.UpdateResumeDetail(resumeId, {
        data: {
          certificates: certificates.map(({ id, version, ...rest }) => rest),
        },
      })
      toast('Certificates updated!')
    } catch {
      toast('Server Error, Please try again!')
    }
    setLoading(false)
  }

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Certificates</h2>
      <p>Add certifications with optional description and year.</p>

      {certificates.map((item, index) => (
        <div
          key={`${item.id}-${item.version}`}
          className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg"
        >
          <div className="col-span-2">
            <label>Description</label>
            <RichTextEditor
              defaultValue={item.description}
              onRichTextEditorChange={(e) =>
                handleChange(index, 'description', e.target.value)
              }
            />
          </div>
          <div>
            <label>Year</label>
            <Input
              placeholder="e.g. Jan 2024"
              value={item.year}
              onChange={(e) => handleChange(index, 'year', e.target.value)}
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
                disabled={index === certificates.length - 1}
              >
                ↓
              </Button>
            </div>
            <Button
              variant="outline"
              onClick={() => removeCertificate(index)}
              className="text-red-500"
            >
              - Remove
            </Button>
          </div>
        </div>
      ))}

      <div className="flex justify-between">
        <Button variant="outline" onClick={addCertificate} className="text-primary">
          + Add More Certificate
        </Button>
        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
        </Button>
      </div>
    </div>
  )
}

export default Certificates