import { useEffect, useRef, useState } from 'react'
import {
  PostImagePayload,
  usePostUploadImageMutation,
} from '@/queries/useUploadMutation'
import { AxiosProgressEvent } from 'axios'

const UploadForm = () => {
  const [file, setFile] = useState<File | null>(null)
  const thumbnailRef = useRef<HTMLImageElement>(null)
  const [percent, setPercent] = useState(0)

  const {
    mutate: uploadImageMutate,
    isPending,
    status,
  } = usePostUploadImageMutation()

  console.log(isPending, status)

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    setFile(files[0])
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return alert('Please choose a file 📁')

    const formData = new FormData()
    formData.append('image', file)

    const payload: PostImagePayload = {
      url: '/upload',
      data: formData,
      options: {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e: AxiosProgressEvent) => {
          if (!e.total) setPercent(0)
          else setPercent(Math.floor((e.loaded / e.total) * 100))
        },
      },
    }
    uploadImageMutate(payload)
  }

  useEffect(() => {
    if (file && thumbnailRef.current) {
      thumbnailRef.current.src = URL.createObjectURL(file)
    }
  }, [file])

  return (
    <form className="flex flex-col my-3" onSubmit={handleSubmit}>
      <label htmlFor="upload" className={styles.label}>
        {file ? (
          <div className="w-full h-full relative">
            <span className={styles.fileName}>{file.name}</span>
            <div className={styles.overlay} />
            <img
              ref={thumbnailRef}
              className={styles.thumbnail}
              alt="thumbnail"
            />
          </div>
        ) : (
          <>
            <div className={styles.choose}>Choose File</div>
            <div className={styles.drop}>or Drop File</div>
          </>
        )}
      </label>
      <input
        id="upload"
        type="file"
        className="hidden"
        onChange={handleChange}
      />
      <button type="submit" className={styles.submitButton}>
        Upload
      </button>
      {isPending && <div>{`${percent}%`}</div>}
    </form>
  )
}

export default UploadForm

const styles = {
  label:
    'w-full h-[225px] flex flex-col justify-center items-center bg-slate-100 rounded-sm cursor-pointer border-2 border-dashed border-indigo-300',
  fileName:
    'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-2 px-4 text-sm text-center text-white bg-slate-500 opacity-70 rounded-md hover:opacity-100 transition-opacity duration-300 ease-in-out z-10',
  overlay: 'absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.2)]',
  thumbnail: 'w-full h-full object-contain',
  choose: 'py-3 px-6 mb-3 text-white bg-indigo-500 font-semibold rounded-md',
  drop: 'text-gray-500 font-semibold text-sm',
  submitButton:
    'w-full py-2 mt-2 bg-indigo-600 text-white rounded-sm hover:bg-indigo-500 transition-colors duration-300 ease-in-out',
}
