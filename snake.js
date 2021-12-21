
function Snake() {
    const boardBg = '#D8E022';
    const snakeBodyColor = '#7C64BC';

    let snakebody = [
        { x: 140, y: 200 },
        { x: 130, y: 200 },
        { x: 120, y: 200 },
        { x: 110, y: 200 },
        { x: 100, y: 200 },
    ]
    let changeDirection = false;
    let dx = 10;
    let dy = 0;

    let timer = 300;

    const snakeboard = document.getElementById("CanvasScreen");
    const snakeBoarder = snakeboard.getContext("2d");
    const overlay = document.getElementById("overlay");
    const close = document.getElementById("close-overlay");

    main();
    document.addEventListener("keydown", change_direction);

    function main() {

        if (has_game_ended()) {
            overlay.style.visibility = "visible";
            console.log("hasgame", has_game_ended)
            return;

        }
        changeDirection = false;

        setTimeout(function onTick() {
            clear_board();
            move_snake();
            drawSnake();
            main();
            timer > 20 ? timer -= 2 : timer -= 0;
        }, timer)
    }
    function clear_board() {
        snakeBoarder.fillStyle = boardBg;
        snakeBoarder.strokestyle = snakeBodyColor;
        snakeBoarder.fillRect(0, 0, snakeboard.width, snakeboard.height);
        snakeBoarder.strokeRect(0, 0, snakeboard.width, snakeboard.height);
    }

    function drawSnake() {
        snakebody.forEach(draw);
    }
    function draw(snakePart) {
        snakeBoarder.strokestyle = snakeBodyColor;
        snakeBoarder.fillStyle = snakeBodyColor;
        snakeBoarder.fillRect(snakePart.x, snakePart.y, 10, 10);
        snakeBoarder.strokeRect(snakePart.x, snakePart.y, 10, 10);
    }

    function has_game_ended() {
        for (let i = 4; i < snakebody.length; i++) {
            if (snakebody[i].x === snakebody[0].x && snakebody[i].y === snakebody[0].y)
                return true;
        }
        const hitLeftWall = snakebody[0].x < 0;
        const hitRightWall = snakebody[0].x > snakeboard.width - 10;
        const hitTopWall = snakebody[0].y < 0;
        const hitBotomWall = snakebody[0].y > snakeboard.height - 10;
        return hitLeftWall || hitRightWall || hitTopWall || hitBotomWall
    }

    function change_direction(event) {

        const LEFT_KEY = 65; //a
        const RIGHT_KEY = 68; //d
        const UP_KEY = 87; //w
        const DOWN_KEY = 83; //s

        if (changeDirection) return;
        changeDirection = true;
        const keypress = event.keyCode;
        const goingUp = dy === -10;
        const goingDown = dy
            === 10;
        const goingRight = dx === 10;
        const goingLeft = dx === -10;

        if (keypress === LEFT_KEY && !goingRight) {
            dx = -10;
            dy = 0;
        }
        if (keypress === UP_KEY && !goingDown) {
            dx = 0;
            dy = -10;
        }
        if (keypress === RIGHT_KEY && !goingLeft) {
            dx = 10;
            dy = 0;
        }
        if (keypress === DOWN_KEY && !goingUp) {
            dx = 0;
            dy = 10;
        }
    }

    function move_snake() {
        const head = { x: snakebody[0].x + dx, y: snakebody[0].y + dy };
        snakebody.unshift(head);
        snakebody.pop();
    }
    close.addEventListener("click", function (event) {
        event.preventDefault();
        overlay.style.visibility = "hidden";
        Snake();
    });
}

Snake();