import {Directions} from "./models/enums"

const config = {
  "SPEED": 100,
  "BOARD_X": 15,
  "BOARD_Y": 15,
  "INITIAL_DIRECTION": Directions.Down,
  "SNAKE_STARTING_CELLS": [
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