import Layout from '@/components/Layout'
import UploadForm from '@/components/UploadForm'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <>
      <Layout>
        <h1 className="text-2xl font-bold text-center">Opti Album</h1>
        <UploadForm />
      </Layout>
      <ToastContainer />
    </>
  )
}

export default App
