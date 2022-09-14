import {Coords} from "../models/types"
import {Directions} from "../models/enums"

const buildBoardMatrix = (rows: number, cols: number): Coords[][] => {
  const matrix: Coords[][] = []

  for (let i = 0; i < rows; i++) {

    matrix[i] = []

    for (let j = 0; j < cols; j++) {
      matrix[i].push({row: i, col: j})
    }
  }

  return matrix
}


// We need to get the cell in front of the snake and populate it when moving
const getSnakeFrontCell = ({row, col}: Coords, direction: Directions): Coords => {
  const {Up, Left, Right} = Directions

  switch (direction) {
    case Right:
      return {row, col: col + 1}
    case Left:
      return {row, col: col - 1}
    case Up:
      return {row: row - 1, col}
    default:
      return {row: row + 1, col}
  }
}

const isCollision = (snake: Coords[], Board: Coords): boolean => {
  const {row, col} = snake[0] // SnakeHead Coordinates

  const isSnakeSelfOverlapped = snake.slice(1).some(cell => row === cell.row && col === cell.col)

  return isSnakeSelfOverlapped || row < 0 || col < 0 || col >= Board.row || row >= Board.col
}

const createApple = ({row, col}: Coords): Coords => {
  // TODO Add additional check, the apple shouldn't overlap with the snake
  return {row: Math.floor(Math.random() * row), col: Math.floor(Math.random() * col)}
}

const isAppleEaten = (snakeHead: Coords, apple: Coords): boolean => {
  return snakeHead.row === apple.row && snakeHead.col === apple.col
}

// If snake moves left, players shouldn't be allowed to set new direction to right and left
// same for Up and Down
const getAllowedDirection = (currDirection: Directions, newDirection: Directions): Directions => {
  const {Up, Down, Left, Right} = Directions

  if ([Up, Down].includes(currDirection) && [Up, Down].includes(newDirection)) {
    return currDirection
  }

  if ([Left, Right].includes(currDirection) && [Left, Right].includes(newDirection)) {
    return currDirection
  }

  return newDirection
}

const getClassByOccupier = ({row, col}: Coords, snake: Coords[], apple: Coords): string => {

  const isSnakeOver = snake.some(s => s.row === row && s.col === col)

  if (isSnakeOver) {
    return 'snake'
  }

  const isAppleOver = row === apple.row && col === apple.col

  return isAppleOver ? 'apple' : ''
}

export {
  buildBoardMatrix,
  getSnakeFrontCell,
  isCollision,
  createApple,
  isAppleEaten,
  getClassByOccupier,
  getAllowedDirection
}