import { usePostUploadImageMutation } from '@/queries/useUploadMutation'
import { useState } from 'react'

const styles = {
  label:
    'w-full h-[225px] flex flex-col justify-center items-center bg-slate-100 rounded-sm cursor-pointer border-2 border-dashed border-indigo-300',
  choose: 'py-3 px-6 mb-3 text-white bg-indigo-500 font-semibold rounded-md',
  drop: 'text-gray-500 font-semibold text-sm',
  button:
    'w-full py-2 mt-2 bg-indigo-600 text-white rounded-sm hover:bg-indigo-500 transition-colors duration-300 ease-in-out',
}

const UploadForm = () => {
  const [file, setFile] = useState<File | null>(null)

  const uploadImageMutation = usePostUploadImageMutation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    console.log(files)

    if (!files) return

    setFile(files[0])
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!file) return

    const formData = new FormData()
    formData.append('image', file)

    const payload = {
      url: '/upload',
      data: formData,
      options: { headers: { 'Content-Type': 'multipart/form-data' } },
    }
    uploadImageMutation.mutate(payload)
  }

  return (
    <form className="flex flex-col my-3" onSubmit={handleSubmit}>
      <label htmlFor="upload" className={styles.label}>
        <div className={styles.choose}>Choose File</div>
        <div className={styles.drop}>or Drop File</div>
      </label>
      <input
        id="upload"
        type="file"
        className="hidden"
        onChange={handleChange}
      />
      <button type="submit" className={styles.button}>
        Upload
      </button>
    </form>
  )
}

export default UploadForm
