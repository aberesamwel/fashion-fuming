import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom'
import Events from './components/Events'
import Footer from './components/Footer'

import './App.css'


function App() {
  return( 
  <Router>
      <div className="App">
       
      <main className="container mx-auto px-4">
          <Routes>
            <Route path="/events" element={<Events />} />
          </Routes>
        </main>
      <Footer />
    </div>
  </Router>
  
  )
}

export default App
