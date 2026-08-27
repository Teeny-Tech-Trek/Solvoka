import './App.css'
import Navbar from './components/layout/Navbar'
import Hero from './components/layout/Hero'
import Capabilities from './components/layout/Capabilities'

function App() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Hero />
      <Capabilities />
    </div>
  )
}

export default App
