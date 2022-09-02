import {useState} from 'react'

import Board from './components/Board'
import InfoBanner from './components/InfoBanner'

function App() {

  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [appleCounter, setAppleCounter] = useState<number>(0)
  const [boardKey, setBoardKey] = useState<number>(0)

  const increaseAppleCount = () => {
    setAppleCounter(currAppleCount => currAppleCount + 1)
  }

  const play = () => {
    setBoardKey(new Date().getTime())
    setIsPlaying(true)
  }
  
  return (
    <div className='app'>
      <InfoBanner isPlaying={isPlaying} appleCounter={appleCounter} play={play}/>
      <Board key={boardKey} isPlaying={isPlaying} setIsPlaying={setIsPlaying} increaseAppleCount={increaseAppleCount}/>
    </div>
  )
}

export default App
