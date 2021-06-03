document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const scoreDisplay = document.querySelector("#score");
  const width = 8;
  const squareArray = [];
  const candyColors = ["red", "blue", "green", "yellow", "purple", "orange"];
  let score = 0;

  //create your board
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.setAttribute("id", i);
      square.setAttribute("draggable", true);
      let randomColor = Math.floor(Math.random() * candyColors.length);
      square.style.backgroundColor = candyColors[randomColor];
      grid.appendChild(square);
      squareArray.push(square);
    }
  }

  createBoard();

  //Dragging the candy
  let colorBeingDragged;
  let colorBeingReplaced;
  let squareIdBeingDragged;
  let squareIdBeingReplaced;

  squareArray.forEach((square) =>
    square.addEventListener("dragstart", dragStart)
  );
  squareArray.forEach((square) => square.addEventListener("dragend", dragEnd));
  squareArray.forEach((square) =>
    square.addEventListener("dragover", dragOver)
  );
  squareArray.forEach((square) =>
    square.addEventListener("dragenter", dragEnter)
  );
  squareArray.forEach((square) =>
    square.addEventListener("dragleave", dragLeave)
  );
  squareArray.forEach((square) => square.addEventListener("drop", dragDrop));

  function dragStart() {
    colorBeingDragged = this.style.backgroundColor;
    squareIdBeingDragged = parseInt(this.id);
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function dragEnter(e) {
    e.preventDefault();
  }

  function dragLeave() {}

  function dragDrop() {
    colorBeingReplaced = this.style.backgroundColor;
    squareIdBeingReplaced = parseInt(this.id);
    this.style.backgroundColor = colorBeingDragged;
    squareArray[
      squareIdBeingDragged
    ].style.backgroundColor = colorBeingReplaced;
  }

  function dragEnd() {
    //What is valid move??
    let validMoves = [
      squareIdBeingDragged - 1,
      squareIdBeingDragged - width,
      squareIdBeingDragged + 1,
      squareIdBeingDragged + width,
    ];
    console.log(validMoves);
    let validMove = validMoves.includes(squareIdBeingReplaced);
    console.log(validMove);

    if (squareIdBeingReplaced && validMove) {
      squareIdBeingReplaced = null;
    } else if (squareIdBeingReplaced && !validMove) {
      squareArray[
        squareIdBeingDragged
      ].style.backgroundColor = colorBeingDragged;
      squareArray[
        squareIdBeingReplaced
      ].style.backgroundColor = colorBeingReplaced;
    } else if (!squareIdBeingReplaced && squareIdBeingReplaced != 0) {
      squareArray[
        squareIdBeingDragged
      ].style.backgroundColor = colorBeingDragged;
    }
  }

  //drop candies when some have cleared
  function moveIntoSquaresBelow() {
    for (let i = 0; i < 56; i++) {
      if (squareArray[i + width].style.backgroundColor === "") {
        squareArray[i + width].style.backgroundColor =
          squareArray[i].style.backgroundColor;
        squareArray[i].style.backgroundColor = "";
        // const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
        // const isFirstRow = firstRow.includes(i);
        // if (isFirstRow && squareArray[i].style.backgroundColor === "") {
        //   let randomColor = Math.floor(Math.random() * candyColors.length);
        //   squareArray[i].style.backgroundColor = candyColors[randomColor];
        //  }
      }
    }
    for (let i = 0; i < 8; i++) {
      if (squareArray[i].style.backgroundColor === "") {
        let randomColor = Math.floor(Math.random() * candyColors.length);
        squareArray[i].style.backgroundColor = candyColors[randomColor];
      }
    }
  }

  //Checking for matches
  //for row of four
  function checkRowForFour() {
    for (let i = 0; i < 61; i++) {
      let rowOfFour = [i, i + 1, i + 2, i + 3];
      let decidedColor = squareArray[i].style.backgroundColor;
      const isBlank = squareArray[i].style.backgroundColor === "";

      const notValid = [
        5,
        6,
        7,
        13,
        14,
        15,
        21,
        22,
        23,
        29,
        30,
        31,
        37,
        38,
        39,
        45,
        46,
        47,
        53,
        54,
        55,
      ];
      if (notValid.includes(i)) continue;

      if (
        rowOfFour.every(
          (index) =>
            squareArray[index].style.backgroundColor === decidedColor &&
            !isBlank
        )
      ) {
        score += 4;
        scoreDisplay.innerHTML = score;
        rowOfFour.forEach(
          (index) => (squareArray[index].style.backgroundColor = "")
        );
      }
    }
  }
  checkRowForFour();

  //for column of four
  function checkColumnForFour() {
    for (let i = 0; i < 40; i++) {
      let columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      let decidedColor = squareArray[i].style.backgroundColor;
      const isBlank = squareArray[i].style.backgroundColor === "";

      if (
        columnOfFour.every(
          (index) =>
            squareArray[index].style.backgroundColor === decidedColor &&
            !isBlank
        )
      ) {
        score += 4;
        scoreDisplay.innerHTML = score;
        columnOfFour.forEach(
          (index) => (squareArray[index].style.backgroundColor = "")
        );
      }
    }
  }
  checkColumnForFour();

  //for row of three
  function checkRowForThree() {
    for (let i = 0; i < 62; i++) {
      let rowOfThree = [i, i + 1, i + 2];
      let decidedColor = squareArray[i].style.backgroundColor;
      const isBlank = squareArray[i].style.backgroundColor === "";

      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];
      if (notValid.includes(i)) continue;

      if (
        rowOfThree.every(
          (index) =>
            squareArray[index].style.backgroundColor === decidedColor &&
            !isBlank
        )
      ) {
        score += 3;
        scoreDisplay.innerHTML = score;
        rowOfThree.forEach(
          (index) => (squareArray[index].style.backgroundColor = "")
        );
      }
    }
  }
  checkRowForThree();

  //for column of three
  function checkColumnForThree() {
    for (let i = 0; i < 48; i++) {
      let columnOfThree = [i, i + width, i + width * 2];
      let decidedColor = squareArray[i].style.backgroundColor;
      const isBlank = squareArray[i].style.backgroundColor === "";

      if (
        columnOfThree.every(
          (index) =>
            squareArray[index].style.backgroundColor === decidedColor &&
            !isBlank
        )
      ) {
        score += 3;
        scoreDisplay.innerHTML = score;
        columnOfThree.forEach(
          (index) => (squareArray[index].style.backgroundColor = "")
        );
      }
    }
  }
  checkColumnForThree();

  window.setInterval(function () {
    checkRowForFour();
    checkColumnForFour();
    checkRowForThree();
    checkColumnForThree();
    moveIntoSquaresBelow();
  }, 100);
});
