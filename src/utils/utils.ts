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
const getSnakeFrontCell = ({row, col}: Cords, direction: string): Cords => {

  if (direction === Directions.Right) {
    return {
      row: row,
      col: col + 1
    }
  } else if (direction === Directions.Left) {
    return {
      row: row,
      col: col -1
    }
  } else if (direction === Directions.Up) {
    return {
      row: row - 1,
      col: col
    }
  }

  return {
    row: row + 1,
    col: col
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

const isCollision = (snake: Cords[], BOARD_X: number, BOARD_Y: number): boolean => {
  const {row, col} = snake[0] // SnakeHead

  const isSnakeSelfOverlapped = snake.slice(1).some(cell => {
    return row === cell.row && col === cell.col;
  })

  return isSnakeSelfOverlapped || row < 0 || col < 0 || col >= BOARD_X || row >= BOARD_Y;
}

const getRandomNumber = (max: number): number => {
  return Math.floor(Math.random() * max);
}

const createApple = (maxRow: number, maxCol: number): Cords => {
  return {row: getRandomNumber(maxRow), col: getRandomNumber(maxCol)}
}

const isAppleEaten = (snakeHead: Cords, apple: Cords): boolean => {
  return snakeHead.row === apple.row && snakeHead.col === apple.col
}

// If snake's direction is right, players shouldn't be allowed to press right or left
// same as Up and Down, this functions checks for that
const isAllowedDirection = (currDirection: any, newDirection: any): boolean => {
  const {Up, Down, Left, Right} = Directions
  const xDirections = [Up, Down]
  const yDirections = [Right, Left]

  return !(xDirections.includes(currDirection) && xDirections.includes(newDirection)) &&
    !(yDirections.includes(currDirection) && yDirections.includes(newDirection))
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
  isAllowedDirection,
  getClassByOccupier
}