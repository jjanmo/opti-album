import { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-100 py-3 px-2">
      {children}
    </div>
  )
}

export default Layout
