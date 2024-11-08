const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        score: document.querySelector("#score"),
        timeLeft: document.querySelector("#time-left"),
        lives: document.querySelector("#lives"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        currentLives: 10,
        gameOver: false,
    },
    actions: {
        timerId: setInterval(randomSquare, 600),
        countDownTimerId: setInterval(countDown, 1000),
    },
};

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime === 0 || state.values.currentLives === 0) {
        state.values.gameOver = true;
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);

        const jogarNovamente = confirm(
            `Game Over! O seu resultado foi: ${state.values.result}\n\nDeseja jogar novamente?`
        );

        if (jogarNovamente) {
            window.location.reload();
        } else {
            playSound("gameOver");
        }
    }
}

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (
                square.id === state.values.hitPosition &&
                state.values.gameOver === false
            ) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            } else if (
                square.id !== state.values.hitPosition &&
                state.values.gameOver === false
            ) {
                state.values.currentLives--;
                state.view.lives.textContent = state.values.currentLives;
                state.values.hitPosition = null;
            }
        });
    });
}

function initialize() {
    addListenerHitBox();
}

initialize();
