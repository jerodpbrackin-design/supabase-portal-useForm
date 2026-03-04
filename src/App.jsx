import { useState } from 'react'
import './App.css'
import SupabaseForm from './components/SupabaseForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SupabaseForm />
    </>
  )
}

export default App
