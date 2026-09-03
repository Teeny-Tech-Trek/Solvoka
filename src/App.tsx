import './App.css'
import Navbar from './components/layout/Navbar'
import Hero from './components/layout/Hero'
import Capabilities from './components/layout/Capabilities'
import CoordinationModel from './components/layout/Coordinationmodel'

function App() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Hero />
      <Capabilities />
      <CoordinationModel />
    </div>
  )
}

export default App
