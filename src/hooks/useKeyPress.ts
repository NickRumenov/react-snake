import {useCallback, useEffect, useState} from "react"

import { Directions } from "../models/enums"

const useKeyPress = (targetKeys: Directions[]) => {
  const [keyPressed, setKeyPressed] = useState<Directions>(Directions.Down)

  const downHandler = useCallback(({ key }: any) => {
    if (targetKeys.includes(key)) {
      setKeyPressed(key)
    }
  }, [setKeyPressed, targetKeys])


  useEffect(() => {
    window.addEventListener('keydown', downHandler)

    return () => {
      window.removeEventListener('keydown', downHandler)
    }
  }, [downHandler])

  return keyPressed
}

export default useKeyPress
