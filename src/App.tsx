import './App.css'

import Header from './components/Header'
import Button from './components/Button'

function App() {
  document.title = "CSGO Predictions™"

  return (
    <div className = "App">
      <Header title = "CSGO Pickems" textColor = "blue"/>
      <Button text = 'PRESS' color = '#00BFFF'/>

      <Header />
      <Button />
    </div>
  )
}

export default App;