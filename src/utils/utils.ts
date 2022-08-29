import {Cords} from "../models/types"
import {Directions} from "../models/enums"

const buildMatrix = (x: number, y: number): Cords[][] => {
  const matrix = []

  for (let i = 0; i < x; i++) {
    const row = []

    for (let j = 0; j < y; j++) {
      row.push({row: i, col: j})
    }

    matrix.push(row)
  }

  return matrix
}

const getFrontCell = ({row, col}: Cords, direction: string): Cords => {

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

const isOccupiedBySnake = (cell: Cords, snakeCells: Cords[]): boolean => {
  return snakeCells.some(snakeCell => {
    return snakeCell.row === cell.row && snakeCell.col === cell.col;
  })
}

const isAppleCell = (cell: Cords, apple: Cords): boolean => {
  return cell.row === apple.row && cell.col === apple.col
}

const isCollision = ({row, col}: Cords, BOARD_X: number, BOARD_Y: number, snake: Cords[]): boolean => {

  const isSnakeSelfOverlapped = snake.slice(1).some(cell => {
    return row === cell.row && col === cell.col;
  })

  return isSnakeSelfOverlapped || row < 0 || col < 0 || col >= BOARD_X || row >= BOARD_Y;
}

const getRandomNumber = (max: number): number => {
  return Math.floor(Math.random() * max);
}

const createApple = (maxRow: number, maxCol: number): Cords => {
  const appleRow = getRandomNumber(maxRow)
  const appleCol = getRandomNumber(maxCol)
  return {row: appleRow, col: appleCol}
}

const isAppleEaten = (snakeHead: Cords, apple: Cords): boolean => {
  return snakeHead.row === apple.row && snakeHead.col === apple.col
}

const getAdditionCell = (snake: Cords[], direction: string): Cords => {
  const lastCell = snake[snake.length - 1]

  if (direction === Directions.Right) {
    return {row: lastCell.row, col: lastCell.col - 1}
  } else if (direction === Directions.Left) {
    return {row: lastCell.row, col: lastCell.col + 1}
  } else if (direction === Directions.Down) {
    return {row: lastCell.row - 1, col: lastCell.col}
  }

  return {row: lastCell.row + 1, col: lastCell.col}
}

// If snake's direction is right, you shouldn't press right or left
// same as Up and Down, this functions checks for that
const isAllowedDirection = (currDirection: any, newDirection: any): boolean => {
  const {Up, Down, Left, Right} = Directions
  const xDirections = [Up, Down]
  const yDirections = [Right, Left]

  return !(xDirections.includes(currDirection) && xDirections.includes(newDirection)) &&
    !(yDirections.includes(currDirection) && yDirections.includes(newDirection))
}

export {
  buildMatrix,
  getFrontCell,
  isOccupiedBySnake,
  isAppleCell,
  isCollision,
  getRandomNumber,
  createApple,
  isAppleEaten,
  getAdditionCell,
  isAllowedDirection
}