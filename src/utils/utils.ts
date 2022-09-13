import {Cords} from "../models/types"
import {Directions} from "../models/enums"

const buildBoardMatrix = (rows: number, cols: number): Cords[][] => {
  const matrix: Cords[][] = []

  for (let i = 0; i < rows; i++) {

    matrix[i] = []

    for (let j = 0; j < cols; j++) {
      matrix[i].push({row: i, col: j})
    }
  }

  return matrix
}


// In order the snake to grow, we need to get the cell in front of the snake and populate it
const getSnakeFrontCell = ({row, col}: Cords, direction: Directions): Cords => {

  if (direction === Directions.Right) {
    return {
      row,
      col: col + 1
    }
  } else if (direction === Directions.Left) {
    return {
      row,
      col: col - 1
    }
  } else if (direction === Directions.Up) {
    return {
      row: row - 1,
      col
    }
  }

  return {
    row: row + 1,
    col
  }
}

const isOccupiedBySnake = (currCell: Cords, snakeCells: Cords[]): boolean => {
  return snakeCells.some(snakeCell => {
    return snakeCell.row === currCell.row && snakeCell.col === currCell.col;
  })
}

const isAppleCell = (currCell: Cords, apple: Cords): boolean => {
  return currCell.row === apple.row && currCell.col === apple.col
}

const isCollision = (snake: Cords[], BoardCords: Cords): boolean => {
  const {row, col} = snake[0] // SnakeHead Coordinates

  const isSnakeSelfOverlapped = snake.slice(1).some(cell => row === cell.row && col === cell.col)

  return isSnakeSelfOverlapped || row < 0 || col < 0 || col >= BoardCords.row || row >= BoardCords.col
}

const getRandomNumber = (max: number): number => {
  return Math.floor(Math.random() * max);
}

const createApple = (newCords: Cords): Cords => {
  // TODO Add additional check, the apple shouldn't overlap with the snake
  return {row: getRandomNumber(newCords.row), col: getRandomNumber(newCords.col)}
}

const isAppleEaten = (snakeHead: Cords, apple: Cords): boolean => {
  return snakeHead.row === apple.row && snakeHead.col === apple.col
}

// If snake moves left, players shouldn't be allowed to change to direction to right or same direction
// or to change it to left, this is
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

const getClassByOccupier = ({row, col}: Cords, snake: Cords[], apple: Cords): string => {

  if (isOccupiedBySnake({row, col}, snake)) {
    return 'snake'
  } else if (isAppleCell({row, col}, apple)) {
    return 'apple'
  }

  return ''
}

export {
  buildBoardMatrix,
  getSnakeFrontCell,
  isOccupiedBySnake,
  isAppleCell,
  isCollision,
  getRandomNumber,
  createApple,
  isAppleEaten,
  getClassByOccupier,
  getAllowedDirection
}