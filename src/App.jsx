import { useState } from 'react'
import './App.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import ItemListContainer from './components/itemListContainer/ItemListContainer'
import StockListContainer from './components/stockListContainer/StockListContainer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <Header/>
    <ItemListContainer/>
    <StockListContainer/>
      
      <div>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    
    <Footer/>
    </>
  )
}

export default App
