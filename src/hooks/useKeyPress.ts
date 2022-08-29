import {useEffect, useState} from "react"

const useKeyPress = (targetKeys: string[]) => {
  const [keyPressed, setKeyPressed] = useState(null)

  const downHandler = ({ key }: any) => {
    if (targetKeys.includes(key)) {
      setKeyPressed(key)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', downHandler)

    return () => {
      window.removeEventListener('keydown', downHandler)
    }
  }, [downHandler])

  return keyPressed
}

export default useKeyPress
