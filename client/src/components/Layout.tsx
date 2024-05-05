import { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-white py-3 px-6">
      {children}
    </div>
  )
}

export default Layout
