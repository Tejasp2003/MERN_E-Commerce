import {Outlet} from 'react-router-dom'

import {Toaster} from 'react-hot-toast'
import Navigation from './pages/Auth/Navigation'

const App = () => {
  return (
    <>
   
    <Toaster />
    <div className="">
      <Navigation />
      <main className='py-3 overflow-x-hidden'>
        <Outlet />
      </main>
    </div>
    </>
  )
}

export default App