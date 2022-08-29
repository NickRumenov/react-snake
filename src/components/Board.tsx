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
  getAdditionCell,
  isAllowedDirection
} from "../utils/utils"

interface Props {
  isPlaying: boolean
  setIsPlaying: (isPlaying: boolean) => void
  increaseAppleCount: () => void
}

const {BOARD_X, BOARD_Y, INITIAL_DIRECTION, SNAKE_STARTING_CELLS, SPEED} = config
const {Up, Down, Right, Left} = Directions

const matrix = buildMatrix(BOARD_X, BOARD_Y)

const Board: FC<Props> = ({isPlaying, setIsPlaying, increaseAppleCount}) => {

  const [direction, setDirection] = useState<string>(INITIAL_DIRECTION)
  const [snake, setSnake] = useState<Cords[]>(SNAKE_STARTING_CELLS)
  const [apple, setApple] = useState<Cords>({row: -1, col: -1})

  const pressedKey = useKeyPress([Up, Down, Right, Left])
  const snakeHead = snake[0]

  useEffect(() => {
    if (pressedKey && isAllowedDirection(direction, pressedKey)) {
      setDirection(pressedKey)
    }
  }, [pressedKey, direction])

  useEffect(() => {
    const appleCords = createApple(BOARD_X, BOARD_Y)
    setApple(appleCords)
  }, [])
  
  useEffect(() => {
    if (isAppleEaten(snakeHead, apple)) {
      setSnake([...snake, getAdditionCell(snake, direction)])
      const appleCords = createApple(BOARD_X, BOARD_Y)
      setApple(appleCords)
      increaseAppleCount()
    }
  }, [snakeHead, apple, direction, snake, increaseAppleCount])


  useEffect(() => {
    if (isCollision(snakeHead, BOARD_X, BOARD_Y, snake)) {
      setIsPlaying(false)
    }
  }, [snakeHead, snake, setIsPlaying])

  
  useInterval(
    () => {
      setSnake(() => [getFrontCell(snakeHead, direction), ...snake.slice(0, -1)])
    },
    isPlaying ? SPEED : null
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
