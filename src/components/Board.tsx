import {FC, useEffect, useState} from "react"

import config from "../config.json"
import {Cords} from "../models/types"
import {Directions} from "../models/enums"
import useInterval from "../hooks/useInterval"
import useKeyPress from "../hooks/useKeyPress"
import {
  buildMatrix,
  getFrontCell,
  isOccupiedBySnake,
  createApple,
  isCollision,
  isAppleCell,
  isAppleEaten,
  getAdditionCell
} from "../utils/utils"

interface Props {
  isPlaying: boolean
  setIsPlaying: (isPlaying: boolean) => void
}

const {BOARD_X_CELL, BOARD_Y_CELL, INITIAL_DIRECTION, SNAKE_STARTING_CELLS} = config
const {Up, Down, Right, Left} = Directions

const matrix = buildMatrix(BOARD_X_CELL, BOARD_Y_CELL)

const Board: FC<Props> = ({isPlaying, setIsPlaying}) => {

  const [direction, setDirection] = useState<string>(INITIAL_DIRECTION)
  const [snake, setSnake] = useState<Cords[]>(SNAKE_STARTING_CELLS)
  const [apple, setApple] = useState<Cords>({row: -1, col: -1})

  const pressedKey = useKeyPress([Up, Down, Right, Left])
  const snakeHead = snake[0]

  useEffect(() => {
    if (pressedKey) {
      setDirection(pressedKey)
    }
  }, [pressedKey])

  useEffect(() => {
    const appleCords = createApple(BOARD_X_CELL, BOARD_Y_CELL)
    setApple(appleCords)
  }, [])
  
  useEffect(() => {
    if (isAppleEaten(snakeHead, apple)) {
      setSnake([...snake, getAdditionCell(snake, direction)])
      const appleCords = createApple(BOARD_X_CELL, BOARD_Y_CELL)
      setApple(appleCords)
    }
  }, [snakeHead, apple, direction, snake])


  useEffect(() => {
    if (isCollision(snakeHead, BOARD_X_CELL, BOARD_Y_CELL, snake)) {
      setIsPlaying(false)
    }
  }, [snakeHead, setIsPlaying])

  
  useInterval(
    () => {
      setSnake(() => [getFrontCell(snakeHead, direction), ...snake.slice(0, -1)])
    },
    isPlaying ? 200 : null
  )

  return (
    <div className='board'>
      {matrix.map((row: Cords[]) => {
        return <div key={row[0].row} className='board-row'>
          {row.map((cell: Cords) => (
            <span
              key={cell.row + cell.col}
              className={
                `cell
                 ${isOccupiedBySnake({row: cell.row, col: cell.col}, snake) ? ' snake' : ''}
                 ${isAppleCell({row: cell.row, col: cell.col}, apple) ? ' apple' : ''}
                `
              }
            >
            </span>
          ))
        }</div>
      })}
    </div>
  )
}

export default Board
