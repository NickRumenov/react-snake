import {FC, useEffect, useState} from "react"

import config from "../config"
import {Coords} from "../models/types"
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
  isGameOver: boolean
  setIsGameOver: (isGameOver: boolean) => void
  setAppleCount: (appleCount: number) => void
}

const {BOARD_ROWS, BOARD_COLUMNS, INITIAL_DIRECTION, SNAKE_INITIAL_CELLS, SPEED} = config

const matrixBoard = buildBoardMatrix(BOARD_ROWS, BOARD_COLUMNS)
const initialApple = createApple({row: BOARD_ROWS, col: BOARD_COLUMNS})

const Board: FC<Props> = ({isGameOver, setIsGameOver, setAppleCount}) => {

  const [direction, setDirection] = useState<Directions>(INITIAL_DIRECTION)
  const [snake, setSnake] = useState<Coords[]>(SNAKE_INITIAL_CELLS)
  const [apple, setApple] = useState<Coords>(initialApple)
  const pressedKey = useKeyPress(Object.values({...Directions}))


  useEffect(() => {
    isCollision(snake, {row: BOARD_ROWS, col: BOARD_COLUMNS}) && setIsGameOver(false)
  }, [snake, setIsGameOver])

  useEffect(() => {
    setAppleCount(snake.length - SNAKE_INITIAL_CELLS.length)
  }, [snake, setAppleCount])
  
  useInterval(
    () => {
      const newDirection = getAllowedDirection(direction, pressedKey)
      setDirection(newDirection)

      if (!isAppleEaten(snake[0], apple)) {
        setSnake([getSnakeFrontCell(snake[0], newDirection), ...snake.slice(0, -1)])
      } else {
        setSnake([getSnakeFrontCell(snake[0], newDirection), ...snake])
        setApple(createApple({row: BOARD_ROWS, col: BOARD_COLUMNS}))
      }
    },
    isGameOver ? SPEED : null
  )
  
  return (
    <div className='board'>
      {matrixBoard.map((line: Coords[], row: number) => (
        <div key={row} className='board-row'>
          {line.map(({col}: Coords) => (
            <div key={`${row}${col}`} className={`cell ${getClassByOccupier({row, col}, snake, apple)}`}/>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Board
