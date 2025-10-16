// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from "./components/dashboard";

const App: React.FC = () => {
  // const [count, setCount] = useState(0)

  return (
    <>
        <div className="min-h-screen bg-white flex justify-center items-start">
      <Dashboard/>
    </div>
    </>
  )
}

export default App
