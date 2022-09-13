import {Directions} from "./models/enums"

const config = {
  "SPEED": 100,
  "BOARD_ROWS": 15,
  "BOARD_COLUMNS": 15,
  "INITIAL_DIRECTION": Directions.Down,
  "SNAKE_INITIAL_CELLS": [
    {
      "row": 4,
      "col": 7
    }, {
      "row": 3,
      "col": 7
    }, {
      "row": 2,
      "col": 7
    }, {
      "row": 1,
      "col": 7
    }, {
      "row": 0,
      "col": 7
    }
  ]
}

export default config