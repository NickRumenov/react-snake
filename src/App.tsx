import {useState} from 'react'

import Board from './components/Board'
import InfoBanner from './components/InfoBanner'

function App() {
  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const [appleCounter, setAppleCounter] = useState<number>(0)

  const [boardKey, setBoardKey] = useState<number>(0)

  const increaseAppleCount = () => {
    setAppleCounter(appleCounter + 1)
  }

  const restartGame = () => {
    setBoardKey(new Date().getTime())
    setIsPlaying(true)
  }

  return (
    <div className='app'>
      <InfoBanner isPlaying={isPlaying} appleCounter={appleCounter} restartGame={restartGame}/>
      <Board key={boardKey} isPlaying={isPlaying} setIsPlaying={setIsPlaying} increaseAppleCount={increaseAppleCount}/>
    </div>
  )
}

export default App
