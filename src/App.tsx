import {useState} from 'react'

import Board from './components/Board'
import InfoBanner from './components/InfoBanner'

function App() {
  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const [appleCounter, setAppleCounter] = useState<number>(0)

  const increaseAppleCount = () => {
    setAppleCounter(appleCounter + 1)
  }

  const onRestart = () => {
    setIsPlaying(true)
  }

  return (
    <div className='app'>
      <InfoBanner isPlaying={isPlaying} appleCounter={appleCounter}/>
      {isPlaying ?
        <Board isPlaying={isPlaying} setIsPlaying={setIsPlaying} increaseAppleCount={increaseAppleCount}/> :
        <button className='play-button' onClick={onRestart}>Play</button>
      }
    </div>
  )
}

export default App
