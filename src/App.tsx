import {useState} from 'react'

import Board from './components/Board'
import InfoBanner from './components/InfoBanner'

function App() {
  const [isPlaying, setIsPlaying] = useState<boolean>(true)

  return (
    <div className='app'>
      <Board isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
      <InfoBanner isPlaying={isPlaying}/>
    </div>
  )
}

export default App
