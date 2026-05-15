import { Loader2, PlusSquare } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { v4 as uuidv4 } from 'uuid';
import GlobalApi from './../../../service/GlobalApi'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false)
  const [resumeTitle, setResumeTitle] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const decoded = jwtDecode(token)
        setUserEmail(decoded.email)
        setUserName(decoded.name || decoded.email.split('@')[0])
      } catch (err) {
        console.error("Invalid token", err)
      }
    }
  }, [])

  const onCreate = async () => {
    setLoading(true)
    const uuid = uuidv4()
    const data = {
      title: resumeTitle,
      resumeId: uuid,
      userEmail,
      userName
    }

    GlobalApi.CreateNewResume(data).then(resp => {
      if (resp.data.data.documentId) {
        setLoading(false)
        navigate('/dashboard/resume/' + resp.data.data.documentId + "/edit")
      }
    }).catch(error => {
      console.error("Create failed:", error)
      setLoading(false)
    })
  }

  return (
    <div>
      <div className='p-14 py-24 border 
        items-center flex 
        justify-center bg-secondary
        rounded-lg h-[325px]
        hover:scale-105 transition-all hover:shadow-md
        cursor-pointer border-dashed'
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p>Add a title for your new resume</p>
            </DialogDescription>
            {/* FORM START */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                onCreate()
              }}
            >
              <Input
                className="my-2"
                placeholder="Ex. Full Stack resume"
                onChange={(e) => setResumeTitle(e.target.value)}
                value={resumeTitle}
              />
              <div className='flex justify-end gap-5 mt-4'>
                <Button type="button" onClick={() => setOpenDialog(false)} variant="ghost">Cancel</Button>
                <Button
                  type="submit"
                  disabled={!resumeTitle || loading}
                >
                  {loading
                    ? <Loader2 className='animate-spin' />
                    : 'Create'}
                </Button>
              </div>
            </form>
            {/* FORM END */}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddResume
