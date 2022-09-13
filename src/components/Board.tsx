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
  getClassByOccupier,
  getAllowedDirection
} from "../utils/utils"

interface Props {
  isPlaying: boolean
  setIsPlaying: (isPlaying: boolean) => void
  setAppleCount: (appleCount: number) => void
}

const {BOARD_ROWS, BOARD_COLUMNS, INITIAL_DIRECTION, SNAKE_INITIAL_CELLS, SPEED} = config

const matrixBoard = buildBoardMatrix(BOARD_ROWS, BOARD_COLUMNS)
const initialApple = createApple({row: BOARD_ROWS, col: BOARD_COLUMNS})

const Board: FC<Props> = ({isPlaying, setIsPlaying, setAppleCount}) => {

  const [direction, setDirection] = useState<Directions>(INITIAL_DIRECTION)
  const [snake, setSnake] = useState<Cords[]>(SNAKE_INITIAL_CELLS)
  const [apple, setApple] = useState<Cords>(initialApple)
  const pressedKey = useKeyPress(Object.values({...Directions}))
  const snakeHead = snake[0]


  useEffect(() => {
    isCollision(snake, {row: BOARD_ROWS, col: BOARD_COLUMNS}) && setIsPlaying(false)
  }, [snake, setIsPlaying])

  useEffect(() => {
    setAppleCount(snake.length - SNAKE_INITIAL_CELLS.length)
  }, [snake, setAppleCount])
  
  useInterval(
    () => {
      const newDirection = getAllowedDirection(direction, pressedKey)
      setDirection(newDirection)

      if (!isAppleEaten(snakeHead, apple)) {
        setSnake([getSnakeFrontCell(snakeHead, newDirection), ...snake.slice(0, -1)])
      } else {
        setSnake([getSnakeFrontCell(snakeHead, newDirection), ...snake])
        setApple(createApple({row: BOARD_ROWS, col: BOARD_COLUMNS}))
      }
    },
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
