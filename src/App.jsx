import React from 'react'
import About from './components/About/About.jsx'
import Gallery from './components/Gallery.jsx';



function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4 mb-6">
        <h1 className="text-3xl font-bold text-center text-purple-600">Fashion Fuming Gallery</h1>
      </header>
      <main className="container mx-auto px-4">
        <Gallery />
         <About/>
      </main>
    </div>
  );
}

export default App;




