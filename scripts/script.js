const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const restartButton = document.querySelector("#restart");
const overlay = document.querySelector("#overlay");

const jump = () => {
  if (isJumping) return; // Evita múltiplos pulos simultâneos

  isJumping = true;
  mario.classList.add("jump");
  //Adiciona a classe jump ao elemento mario, fazendo ele pular.

  setTimeout(() => {
    mario.classList.remove("jump");
    isJumping = false;
  }, 800);
  //Remove a classe jump do elemento mario após 800 milissegundos.
};

let gameLoop;

const startGame = () => {
  gameLoop = setInterval(() => {
    //Define um intervalo que executa a função a cada 10 milissegundos.
    const pipePosition = pipe.offsetLeft; //Obtém a posição horizontal do pipe em relação ao viewport
    const marioPosition = +window
      .getComputedStyle(mario)
      .bottom.replace("px", "");
    //Obtém a posição vertical do mario a partir do estilo computado do elemento e converte para número.

    //window.getComputedStyle(mario): Obtém todos os estilos CSS aplicados ao elemento mario.
    //o + no inicio é para converter a string para numero

    if (pipePosition < 120 && pipePosition > 0 && marioPosition < 100) {
      pipe.style.animation = "none";
      pipe.style.left = `${pipePosition}px`;

      mario.style.animation = "none";
      mario.style.bottom = `${marioPosition}px`;
      mario.src = "imagens/game-over.png";
      mario.style.width = "75px";
      mario.style.marginLeft = "50px";

      clearInterval(gameLoop);
      overlay.style.display = "block";
      restartButton.style.display = "block";
    }
  }, 10);
};

document.addEventListener("keydown", (event) => {
  //Adiciona um ouvinte de evento para quando qualquer tecla é pressionada.
  if (event.code === "Space") {
    //Verifica se a tecla pressionada é a tecla "Espaço".
    jump();
  }
});

document.addEventListener("click", (event) => { // Adiciona um ouvinte de evento para quando a tela é tocada.
  if (event.target !== restartButton) {
    jump();
  }
});

restartButton.addEventListener("click", () => {
  // Reiniciando o jogo aqui
  pipe.style.animation = "";
  pipe.style.left = "";

  mario.style.animation = "";
  mario.style.bottom = "";
  mario.src = "imagens/mario.gif"; // ou o caminho da imagem original do mario
  mario.style.width = "";
  mario.style.marginLeft = "";

  overlay.style.display = "none";
  restartButton.style.display = "none";

  // Reinicia a posição inicial do pipe para evitar detecção de colisão incorreta
  pipe.style.left = "initial";

  // Reinicia a animação do pipe
  pipe.style.animation = "pipe-animation 1.5s infinite linear";

  startGame();
});



// Inicia o jogo pela primeira vez
startGame();


