import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import '../App.css'

import { appTheme } from '../theme';
import ContactList from './contact_list';
import ContacForm from './contact_form';
import { Routes, Route } from 'react-router-dom'

function MainApp() {
   const [count, setCount] = useState(0)

   return (
      <main css={appTheme.gridParent}>
         <Routes>
            <Route path='/*' element={<ContactList />} />
         </Routes>
         <Routes>
            <Route path='/:id' element={<ContacForm />} />
         </Routes>
      </main>
   )
}

export default MainApp
