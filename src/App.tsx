import {useState} from 'react'

import Board from './components/Board'
import InfoBanner from './components/InfoBanner'

function App() {

  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [appleCount, setAppleCount] = useState<number>(0)
  const [boardKey, setBoardKey] = useState<number>(0)

  const increaseAppleCount = () => {
    setAppleCount(currAppleCount => currAppleCount + 1)
  }

  const play = () => {
    setBoardKey(new Date().getTime())
    setIsPlaying(true)
    setAppleCount(0)
  }
  
  return (
    <div className='app'>
      <InfoBanner isPlaying={isPlaying} appleCount={appleCount} play={play}/>
      <Board key={boardKey} isPlaying={isPlaying} setIsPlaying={setIsPlaying} increaseAppleCount={increaseAppleCount}/>
    </div>
  )
}

export default App
