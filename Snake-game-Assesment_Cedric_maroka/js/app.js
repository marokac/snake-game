(function (window, document, undefined) {

  var mycanvas = document.getElementById('mycanvas');
  var ctx = mycanvas.getContext('2d');
  var snakeSize = 10;
  var w = 350;
  var h = 350;
  var score = 0;
  var snake;
  var snakeSize = 10;
  var food;
  var pole1;
  var pole2;
  var pole3;
  var cake2;
  var btn = document.getElementById('btn');
  btn.addEventListener("click", function () { init(); });

  document.onkeydown = function (event) {

    keyCode = window.event.keyCode;
    keyCode = event.keyCode;

    switch (keyCode) {

      case 100:
        if (direction != 'right') {
          direction = 'left';
        }
        console.log('left');
        break;

      case 102:
        if (direction != 'left') {
          direction = 'right';
          console.log('right');
        }
        break;

      case 101:
        if (direction != 'down') {
          direction = 'up';
          console.log('up');
        }
        break;

      case 98:
        if (direction != 'up') {
          direction = 'down';
          console.log('down');
        }
        break;
    }
  }



  var bodySnake = function (x, y) {
    ctx.fillStyle = 'green';
    ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
    ctx.strokeStyle = 'darkgreen';
    ctx.strokeRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
  }

  var pizza = function (x, y) {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
    ctx.fillStyle = 'red';
    ctx.fillRect(x * snakeSize + 1, y * snakeSize + 1, snakeSize - 2, snakeSize - 2);
  }
  var cake = function (x, y) {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
    ctx.fillStyle = 'white';
    ctx.fillRect(x * snakeSize + 1, y * snakeSize + 1, snakeSize - 2, snakeSize - 2);
  }
  var scoreText = function () {
    var score_text = "Score: " + score;
    ctx.fillStyle = 'white';
    ctx.fillText(score_text, 145, h - 5);
  }

  var drawSnake = function () {
    var length = 4;
    snake = [];
    for (var i = length - 1; i >= 0; i--) {
      snake.push({ x: i, y: 0 });
    }
  }

  var drawPoles = function () {
    poleLen = 80 / snakeSize;
    buildPoles("red", 20, 0, snakeSize, 80);
    pole1 = [];
    for (var i = poleLen; i >= 0; i--) {
      pole1.push({ x: 20, y: i });
    }


    buildPoles("red", 0, 20, 80, snakeSize);
    pole2 = [];
    for (var i = poleLen; i >= 0; i--) {
      pole2.push({ x: i, y: 20 });
    }
    buildPoles("red", 30, 20, snakeSize, 80);
    pole3 = [];
    for (var i = poleLen; i >= 20; i--) {
      pole3.push({ x: 30, y: i });
    }

  }
  var buildPoles = function (color, x, y, w1, h1) {
    ctx.fillStyle = color;
    ctx.fillRect(x * snakeSize, y * snakeSize, w1, h1);
  }

  var paint = function () {

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(0, 0, w, h);

    btn.setAttribute('disabled', true);

    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    if (direction == 'right') {
      snakeX++;
    }
    else if (direction == 'left') {
      snakeX--;
    }
    else if (direction == 'up') {
      snakeY--;
    } else if (direction == 'down') {
      snakeY++;
    }

    if (snakeX == -1 || snakeX == w / snakeSize || snakeY == -1 || snakeY == h / snakeSize || checkCollision(snakeX, snakeY, snake)) {
      var text = "Game over";
      ctx.fillStyle = 'red';
      ctx.fillText(text, 145, h * 0.5);
      gameloop = clearInterval(gameloop);
      setTimeout(() => {
        ctx.clearRect(0, 0, w, h);
        score = 0;
        btn.removeAttribute('disabled', true);
      },2000)


      return;
    }

    if (snakeX == food.x && snakeY == food.y) {
      var tail = { x: snakeX, y: snakeY };
      score++;
      if (score % 5 == 0) {
        createCake();
      }
      createFood();
    }

    else if (snakeX == cake2.x && snakeX == cake2.y) {
      score = score = 2;
      var tail = snake.pop();
      cake2.x = -10; cake2.y = -10;
      tail.x = snakeX;
      tail.y = snakeY;
    }
    else {
      var tail = snake.pop();
      tail.x = snakeX;
      tail.y = snakeY;
    }

    snake.unshift(tail);

    for (var i = 0; i < snake.length; i++) {
      bodySnake(snake[i].x, snake[i].y);
    }

    pizza(food.x, food.y);
    cake(cake2.x, cake2.y);
    drawPoles();
    scoreText();


  }

  var createFood = function () {
    food = {
      x: Math.floor((Math.random() * 30) + 1),
      y: Math.floor((Math.random() * 30) + 1)
    }

    for (var i = 0; i > snake.length; i++) {
      var snakeX = snake[i].x;
      var snakeY = snake[i].y;

      if (food.x === snakeX && food.y === snakeY || food.y === snakeY && food.x === snakeX) {
        food.x = Math.floor((Math.random() * 30) + 1);
        food.y = Math.floor((Math.random() * 30) + 1);
      }
    }
  }
  var createCake = function () {
    cake2 = { x: -20, y: -20 }
    if (score % 5 == 0 && score != 0) {
      cake2.x = Math.floor((Math.random() * 30) + 1);
      cake2.y = Math.floor((Math.random() * 30) + 1);
      for (var i = 0; i > snake.length; i++) {
        var snakeX = snake[i].x;
        var snakeY = snake[i].y;

        if (cake2.x === snakeX && cake2.y === snakeY || cake2.y === snakeY && cake2.x === snakeX) {
          cake2.x = -8;
          cake2.y = -8;
        }
      }
    }
  }
  var checkCollision = function (x, y, array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].x === x && array[i].y === y) {
        return true;
      }
      if (poleColusion(array[i].x, array[i].y, pole1) || poleColusion(array[i].x, array[i].y, pole2) || poleColusion(array[i].x, array[i].y, pole3)) {
        return true;
      }

    }
    return false;
  }
  var poleColusion = function (x, y, array) {
    for (var j = 0; j < array.length; j++) {
      if (x == array[j].x && y == array[j].y) {
        return true;
      }
    }
    return false;
  }
  var init = function () {
    direction = 'down';
    drawSnake();
    createFood();
    drawPoles();
    createCake();
    gameloop = setInterval(paint, 80);
  }


  return {
    init: init
  };






})(window, document);
