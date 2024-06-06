import { useState } from 'react';
import './App.css'
import MainContent from './components/MainContent'

function App() {
  const [userData, setUserData] = useState(null);

  return (
    <div>
      <MainContent setUserData={setUserData} userData={userData}/>
    </div>  )
}

export default App
