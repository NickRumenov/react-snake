import {useState} from 'react'

import Board from './components/Board'
import InfoBanner from './components/InfoBanner'

function App() {

  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [appleCount, setAppleCount] = useState<number>(0)
  const [boardKey, setBoardKey] = useState<number>(0)

  const play = () => {
    setBoardKey(new Date().getTime())
    setIsPlaying(true)
  }
  
  return (
    <div className='app'>
      <InfoBanner isPlaying={isPlaying} play={play} appleCount={appleCount}/>
      <Board key={boardKey} isPlaying={isPlaying} setIsPlaying={setIsPlaying} setAppleCount={setAppleCount}/>
    </div>
  )
}

export default App
