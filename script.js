let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake_len = [];
snake_len[0] = {
    x: 8 * box,
    y: 8 * box
}
let direcao = "right";
let food = {
    x: Math.floor(Math.random()* 15 + 1) * box,
    y: Math.floor(Math.random() * 15 +1) * box
}

function criarBG(){
    context.fillStyle = "darkblue";
    context.fillRect(0, 0, 16*box, 16*box);
}

function snake(){
    for(i = 0; i < snake_len.length; i++){
        context.fillStyle = "white";
        context.fillRect(snake_len[i].x,snake_len[i].y,box,box);
    }
}

function pfood (){
    context.fillStyle = "red";
    context.fillRect(food.x,food.y, box, box);
}

document.addEventListener('keydown',update);

function update (event){
    if(event.keyCode == 37 && direcao != "right") direcao = "left";
    if(event.keyCode == 38 && direcao != "down") direcao = "up";
    if(event.keyCode == 39 && direcao != "left") direcao = "right";
    if(event.keyCode == 40  && direcao != "up") direcao = "down";
}


function startGame(){



    if(snake_len[0].x > 15 * box && direcao == "right") snake_len[0].x = 0;
    if(snake_len[0].x < 0 && direcao == "left") snake_len[0].x = 16 * box;
    if(snake_len[0].y > 15 * box && direcao == "down") snake_len[0].y = 0;
    if(snake_len[0].y < 0 && direcao == "up") snake_len[0].y = 16 * box;

    for(i = 1; i < snake_len.length; i++){
        if(snake_len[0].x == snake_len[i].x && snake_len[0].y == snake_len[i].y){
            clearInterval(jogo);
            alert("Fim de Jogo !");
        }
    }
    criarBG();
    snake();
    pfood();

    let snakeX = snake_len[0].x;
    let snakeY = snake_len[0].y;

    if(direcao == "right") snakeX += box;
    if(direcao == "left") snakeX -= box;
    if (direcao == "up") snakeY -= box;
    if(direcao =="down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake_len.pop();
    }
    else{food.x = Math.floor(Math.random()* 15 +   1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;

    }

    
    let cabeca = {
        x: snakeX,
        y: snakeY
    }

    snake_len.unshift(cabeca);
}

let jogo = setInterval(startGame, 100);