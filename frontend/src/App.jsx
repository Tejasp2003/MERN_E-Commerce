import {Outlet} from 'react-router-dom'

import {Toaster} from 'react-hot-toast'
import Navigation from './pages/Auth/Navigation'

const App = () => {
  return (
    <>
   
    <Toaster />
    <Navigation />
    <main className='py-3'>
      <Outlet />
    </main>
    </>
  )
}

export default App