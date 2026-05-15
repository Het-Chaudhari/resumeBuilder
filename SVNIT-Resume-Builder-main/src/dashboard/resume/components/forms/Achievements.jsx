import React, { useContext, useEffect, useState } from 'react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from '../../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { LoaderCircle } from 'lucide-react'
import RichTextEditor from '../RichTextEditor'

function Achievements() {
  const { resumeId } = useParams()
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const [achievements, setAchievements] = useState([{ id: Date.now() + Math.random(), version: 0, description: '', date: '' }])
  const [loading, setLoading] = useState(false)

  if (!resumeInfo) {
    return <div className="text-center p-6">⏳ Loading Personal Details...</div>
  }

  useEffect(() => {
    const existing = resumeInfo?.achievement
    if (Array.isArray(existing)) {
      const enriched = existing.map((item) => ({
        ...item,
        id: item.id || Date.now() + Math.random(),
        version: 0,
      }))
      setAchievements(enriched)
    } else if (typeof existing === 'string' && existing.trim()) {
      setAchievements([{ id: Date.now() + Math.random(), version: 0, description: existing, date: '' }])
    }
  }, [])

  useEffect(() => {
    setResumeInfo((prev) => ({
      ...prev,
      achievement: achievements,
    }))
  }, [achievements])

  const handleChange = (index, key, value) => {
    const updated = [...achievements]
    updated[index][key] = value
    setAchievements(updated)
  }

  const addAchievement = () => {
    setAchievements((prev) => [...prev, { id: Date.now() + Math.random(), version: 0, description: '', date: '' }])
  }

  const removeAchievement = (index) => {
    setAchievements((prev) => prev.filter((_, i) => i !== index))
  }

  const moveUp = (index) => {
    if (index === 0) return
    const updated = [...achievements]
    ;[updated[index - 1], updated[index]] = [updated[index], updated[index - 1]]
    updated[index - 1].version++
    updated[index].version++
    setAchievements(updated)
  }

  const moveDown = (index) => {
    if (index === achievements.length - 1) return
    const updated = [...achievements]
    ;[updated[index + 1], updated[index]] = [updated[index], updated[index + 1]]
    updated[index + 1].version++
    updated[index].version++
    setAchievements(updated)
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      await GlobalApi.UpdateResumeDetail(resumeId, {
        data: {
          achievement: achievements.map(({ id, version, ...rest }) => rest),
        },
      })
      toast('Achievements updated!')
    } catch {
      toast('Error saving achievements, try again!')
    }
    setLoading(false)
  }

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Achievements</h2>
      <p>List academic, technical, or extra-curricular achievements with optional date</p>

      {achievements.map((item, index) => (
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
              placeholder="e.g. Mar 2024"
              value={item.date}
              onChange={(e) => handleChange(index, 'date', e.target.value)}
            />
          </div>
          <div className="w-full h-full flex items-end justify-end gap-2">
            <div className="flex gap-2">
              <Button variant="outline" className="text-primary" onClick={() => moveUp(index)} disabled={index === 0}>
                ↑
              </Button>
              <Button variant="outline" className="text-primary" onClick={() => moveDown(index)} disabled={index === achievements.length - 1}>
                ↓
              </Button>
            </div>
            <Button variant="outline" onClick={() => removeAchievement(index)} className="text-red-500">
              - Remove
            </Button>
          </div>
        </div>
      ))}

      <div className="flex justify-between">
        <Button variant="outline" onClick={addAchievement} className="text-primary">
          + Add More Achievement
        </Button>
        <Button disabled={loading} onClick={handleSave}>
          {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
        </Button>
      </div>
    </div>
  )
}

export default Achievements