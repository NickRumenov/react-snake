import {FC, useEffect, useState} from "react"

import config from "../config"
import {Cords} from "../models/types"
import {Directions} from "../models/enums"
import useInterval from "../hooks/useInterval"
import useKeyPress from "../hooks/useKeyPress"
import {
  buildBoardMatrix,
  getSnakeFrontCell,
  createApple,
  isCollision,
  isAppleEaten,
  isAllowedDirection,
  getClassByOccupier
} from "../utils/utils"

interface Props {
  isPlaying: boolean
  setIsPlaying: (isPlaying: boolean) => void
  increaseAppleCount: () => void
}

const {BOARD_X, BOARD_Y, INITIAL_DIRECTION, SNAKE_STARTING_CELLS, SPEED} = config

const matrixBoard = buildBoardMatrix(BOARD_X, BOARD_Y)


const Board: FC<Props> = ({isPlaying, setIsPlaying, increaseAppleCount}) => {

  const [direction, setDirection] = useState<Directions>(INITIAL_DIRECTION)
  const [snake, setSnake] = useState<Cords[]>(SNAKE_STARTING_CELLS)
  const [apple, setApple] = useState<Cords>({row: -1, col: -1})
  const pressedKey = useKeyPress(Object.values({...Directions}))
  const snakeHead = snake[0]

  useEffect(() => {
    if (pressedKey && isAllowedDirection(direction, pressedKey)) {
      setDirection(pressedKey)
    }
  }, [pressedKey, direction])

  useEffect(() => {
    isPlaying && setApple(createApple(BOARD_X, BOARD_Y))
  }, [isPlaying])

  useEffect(() => {
    if (isAppleEaten(snakeHead, apple)) {
      setSnake([...snake, getSnakeFrontCell(snakeHead, direction)])
      setApple(createApple(BOARD_X, BOARD_Y))
      increaseAppleCount()
    }
  }, [snakeHead, apple, direction, snake, increaseAppleCount])


  useEffect(() => {
    if (isCollision(snake, BOARD_X, BOARD_Y)) {
      setIsPlaying(false)
    }
  }, [snakeHead, snake, setIsPlaying])


  useInterval(
    () => setSnake(() => [getSnakeFrontCell(snakeHead, direction), ...snake.slice(0, -1)]),
    isPlaying ? SPEED : null
  )

  return (
    <div className='board'>
      {matrixBoard.map((line: Cords[], row: number) => (
        <div key={row} className='board-row'>
          {line.map(({col}: Cords) => (
            <span key={`${row}${col}`} className={`cell ${getClassByOccupier({row, col}, snake, apple)}`}/>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Board
