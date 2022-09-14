import {useState} from 'react'

import Board from './components/Board'
import InfoBanner from './components/InfoBanner'

function App() {

  const [isGameOver, setIsGameOver] = useState<boolean>(false)
  const [appleCount, setAppleCount] = useState<number>(0)
  const [boardKey, setBoardKey] = useState<number>(0)

  const play = () => {
    setBoardKey(new Date().getTime()) // in order to rerender the component
    setIsGameOver(true)
  }
  
  return (
    <div className='app'>
      <InfoBanner isGameOver={isGameOver} play={play} appleCount={appleCount}/>
      <Board key={boardKey} isGameOver={isGameOver} setIsGameOver={setIsGameOver} setAppleCount={setAppleCount}/>
    </div>
  )
}

export default App
