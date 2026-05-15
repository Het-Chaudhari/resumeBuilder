import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { Delete, LoaderCircle, Trash, Trash2 } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from 'sonner'

function PersonalDetail({ enabledNext }) {
  const params = useParams()
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)

  // Guard clause: Prevent crash if resumeInfo is undefined (e.g. during initial load)
  if (!resumeInfo) {
    return <div className="text-center p-6">⏳ Loading Personal Details...</div>;
  }

  const [formData, setFormData] = useState(resumeInfo || {})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setFormData({ ...resumeInfo, links: resumeInfo?.links || [] });
  }, [resumeInfo])

  const handleInputChange = (e) => {
    enabledNext(false)
    const { name, value } = e.target

    const updatedData = {
      ...formData,
      [name]: value
    }

    setFormData(updatedData)
    setResumeInfo(updatedData)
  }

  const onSave = (e) => {
    e.preventDefault()
    setLoading(true)

    const inputFields = [
      'firstname',
      'lastname',
      'rollno',
      'branch',
      'phone',
      'email',
      'collegemail',
      'linkedin',
      'links'
    ]

    const filteredData = {}
    inputFields.forEach((key) => {
      if (formData[key] !== undefined) {
        if (key === 'links') {
          // Filter out links with empty or whitespace-only URLs
          filteredData[key] = formData[key].filter(
            (link) => link.url.trim() !== ''
          )
        } else {
          filteredData[key] = formData[key]
        }
      }
    })

    GlobalApi.UpdateResumeDetail(params?.resumeId, { data: filteredData }).then(
      () => {
        setLoading(false)
        toast('Details updated')
        enabledNext(true)
      },
      () => {
        setLoading(false)
      }
    )
  }

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p>Get Started with the basic information</p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input
              name="firstname"
              required
              value={formData?.firstname || ''}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input
              name="lastname"
              required
              value={formData?.lastname || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Roll Number</label>
            <Input
              name="rollno"
              required
              value={formData?.rollno || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Branch</label>
            <Input
              name="branch"
              required
              value={formData?.branch || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Institute</label>
            <Input
              disabled
              value="National Institute Of Technology, Surat"
              className="opacity-80"
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Phone</label>
            <Input
              name="phone"
              required
              value={formData?.phone || ''}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Personal Email</label>
            <Input
              name="email"
              required
              value={formData?.email || ''}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">College Email</label>
            <Input
              name="collegemail"
              required
              value={formData?.collegemail || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">LinkedIn</label>
            <Input
              name="linkedin"
              value={formData?.linkedin || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2 flex flex-col">
            <label className="text-sm">Links</label>
            {formData.links?.map((link, index) => (
              <div key={index} className="flex gap-2 mt-2">
                <Input
                  className="w-[10rem]"
                  placeholder="Title (e.g. Portfolio)"
                  value={link.title}
                  onChange={(e) => {
                    const updatedLinks = [...formData.links];
                    updatedLinks[index].title = e.target.value;
                    const updated = { ...formData, links: updatedLinks };
                    setFormData(updated);
                    setResumeInfo(updated);
                  }}
                />
                <Input
                  placeholder="URL"
                  value={link.url}
                  onChange={(e) => {
                    const updatedLinks = [...formData.links];
                    updatedLinks[index].url = e.target.value;
                    const updated = { ...formData, links: updatedLinks };
                    setFormData(updated);
                    setResumeInfo(updated);
                  }}
                />
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    type="button"
                    disabled={index === 0}
                    onClick={() => {
                      const updatedLinks = [...formData.links];
                      [updatedLinks[index - 1], updatedLinks[index]] = [updatedLinks[index], updatedLinks[index - 1]];
                      const updated = { ...formData, links: updatedLinks };
                      setFormData(updated);
                      setResumeInfo(updated);
                    }}
                  >
                    ↑
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    disabled={index === formData.links.length - 1}
                    onClick={() => {
                      const updatedLinks = [...formData.links];
                      [updatedLinks[index], updatedLinks[index + 1]] = [updatedLinks[index + 1], updatedLinks[index]];
                      const updated = { ...formData, links: updatedLinks };
                      setFormData(updated);
                      setResumeInfo(updated);
                    }}
                  >
                    ↓
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    className="text-red-500"
                    onClick={() => {
                      const updatedLinks = [...formData.links];
                      updatedLinks.splice(index, 1);
                      const updated = { ...formData, links: updatedLinks };
                      setFormData(updated);
                      setResumeInfo(updated);
                    }}
                  >
                    <Trash />
                  </Button>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              className="mt-2 w-[6rem] text-primary"
              type="button"
              onClick={() => {
                const updatedLinks = [...(formData.links || []), { title: '', url: '' }];
                const updated = { ...formData, links: updatedLinks };
                setFormData(updated);
                setResumeInfo(updated);
              }}
            >
              + Add Link
            </Button>
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default PersonalDetail