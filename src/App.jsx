import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import Navbar from "./components/Navbar/Navbar"
import Hero from './components/Hero/hero'
import Portfolio from './components/Portfolio/Portfolio'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element=<Hero /> />
        <Route exact path='/portfolio' element=<Portfolio /> />
      </Routes>
    </Router>
  )
}

export default App
