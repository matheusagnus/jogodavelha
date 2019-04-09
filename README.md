# 🔥 Tic Tac Toe Fire

> João Lucas (16439953), Mariani (16028350), Matheus Ferreira (16806964) e Wesley (16891783)

__Introdução:__
Esse é um projeto acadêmico que visa a criação de uma Inteligência Artificial
introduzindo o conceito e aplicação do algoritmo Minimax. Esse algoritmo vê 
alguns passos à frente e se coloca no lugar de seu oponente, até que haja então
um fim, ou seja, um resultado de empate, vitória ou derrota. Ele escolherá a 
jogada com a pontuação máxima quando for o turno da IA ​​e escolherá a jogada 
com a pontuação mínima quando for o turno do jogador humano. Usando esta 
estratégia, Minimax evita perder para o jogador humano.

Esse projeto foi baseado no artigo de Lorenzo Candiago, sobre inteligência 
artificial. [Clique aqui para saber mais.](https://www.organicadigital.com/seeds/algoritmo-minimax-introducao-a-inteligencia-artificial/)

## Estrutura do Jogo

Para estruturar nosso jogo usaremos html, css e javascript para fazer as 
manipulações na DOM do nosso Jogo da Velha Web. 

```js

  celulas = [0, 1, 2,
            3, 4, 5,
            6, 7, 8];

  renderTabuleiro();

  // desenha o tabuleiro em um estado inicial
  function renderTabuleiro(){
      let html = "<table>";
      let count = 1;

      for(let linhas = 0; linhas < 3; linhas++){
            html += "<tr>";
            for(let colunas = 0; colunas < 3; colunas++){
                html += "<td>" + "<button id=\"" + count +
                "\" onClick=\"clicaButton(this.id)\" type=\"button\" name=\"button\"></button>" + "</td>";
                count++;
            }
            html += "</tr>";
      }
      html += "</table>";

      document.getElementById("gamewindow").innerHTML = html;
  }

```

Dessa forma teremos no nosso browser o esqueleto do nosso Jogo da Velha. Agora
precisaremos dizer para o nosso browser que ele deverá verificar se há algum
vencedor: 

```js 

  // verifica se alguem venceu
  function vence(novoTabuleiro, jogador){
      // checa vitoria de "X" ou "O"
      if(
            // checando horizontal
            novoTabuleiro[0] == jogador && novoTabuleiro[1] == jogador && novoTabuleiro[2] == jogador ||
            novoTabuleiro[3] == jogador && novoTabuleiro[4] == jogador && novoTabuleiro[5] == jogador ||
            novoTabuleiro[6] == jogador && novoTabuleiro[7] == jogador && novoTabuleiro[8] == jogador ||

            // checando vertical
            novoTabuleiro[0] == jogador && novoTabuleiro[3] == jogador && novoTabuleiro[6] == jogador ||
            novoTabuleiro[1] == jogador && novoTabuleiro[4] == jogador && novoTabuleiro[7] == jogador ||
            novoTabuleiro[2] == jogador && novoTabuleiro[5] == jogador && novoTabuleiro[8] == jogador ||

            // checando diagonal
            novoTabuleiro[0] == jogador && novoTabuleiro[4] == jogador && novoTabuleiro[8] == jogador ||
            novoTabuleiro[2] == jogador && novoTabuleiro[4] == jogador && novoTabuleiro[6] == jogador){

            //textoVencedor =  jogador + " venceu!";
            return true;
    }
          return false;
  }


  // retorna um array com os indices das jogadas possiveis no tabuleiro
  function celulasVazias(tabuleiro){
      return  tabuleiro.filter(s => s != "O" && s != "X");
  }

```

E agora vamos desenhar como serão as jogadas. Tendo já a condição para a 
vitória vamos agora fazer a jogada do Humano, verificar a condição de vitória
e passar a jogada para o computador: 

```js 

  // faz a jogada do humano -> verifica condicao de vitoria -> chama a jogada do computador
  function clicaButton(id){

      if(vence(celulas, "X") == false && vence(celulas, "O") == false){
            document.getElementById(id).innerHTML = "O";
            document.getElementById(id).style.backgroundColor = "lightgreen";
            celulas[id - 1] = "O";

            if(vence(celulas, "O") == true){
                document.getElementById("winText").innerHTML = "Humano venceu!";
            } else {
                var vazios = celulasVazias(celulas)
                if(vazios.length === 0){
                      document.getElementById("winText").innerHTML = "Deu velha!";
                } else {
                IAJoga();
                }
            }
      }
  }

```

E o mesmo deve acontecer para o Computador: 

```js

  // faz a jogada do computador -> verifica condicao de vitoria
  function IAJoga(){
      var melhorJogada = minimax(celulas, "X");
      document.getElementById(melhorJogada.index + 1).innerHTML = "X";
      document.getElementById(melhorJogada.index + 1).style.backgroundColor = "lightcoral";
      celulas[melhorJogada.index] = "X";

      if(vence(celulas, "X") == true){
            document.getElementById("winText").innerHTML = "Computador venceu!";
      }
  }

```

Por fim temos a manipulação da função de resetar o tabuleiro para um novo jogo

```js

  // reseta o tabuleiro
  function resetTabuleiro() {
      celulas = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      document.getElementById("winText").innerHTML = "";
      renderTabuleiro();
  }

```

## Minimax em ação

Como o Minimax nós temos com o objetivo de criar um algoritmo que possa
minimizar a possível perda máxima. 

Para jogos como o Xadrez, Damas e Jogo da Velha, podemos representar todas
as possibilidades de jogada em uma Game Tree. Conseguiremos então identificar
qual caminho seguir para ganhar o jogo de uma maneira que o inimigo não 
consiga interferir.

<p align="center">
  <img src="https://i.imgur.com/WPuQ0jK.gif">
</p>

Como exemplificado na imagem o jogo pode ter apenas três resultados:
+1 (Ganhar), 0 (Empatar) ou -1 (Perder). 

Dessa forma iremos mostrar pro algoritmo qual o caminho mais seguro 
para prosseguir com aquela jogada. 

```js

// algoritmo Minimax
function minimax(novoTabuleiro, jogador){
    // armazena em um array as celulas vazias
    var possiveisJogadas = celulasVazias(novoTabuleiro);
    // verifica se tem um estado terminal em que o COMPUTADOR ganha, perde ou empata e retorna uma pontuacao
    if (vence(novoTabuleiro, "O")){
        return {pontuacao:-10};
    }
    else if (vence(novoTabuleiro, "X")){
        return {pontuacao:10};
    }
    else if (possiveisJogadas.length === 0){
        return {pontuacao:0};
    }
    // array que vai guardar todas as jogadas e suas pontuacoes
    var jogadas = [];
    // loop que vai colocar todas as possiveis jogadas no array
    for (var i = 0; i < possiveisJogadas.length; i++){
        // vai criar um objeto para cada um e armazenar o index da celula de cada jogada
        var jogada = {};
        jogada.index = novoTabuleiro[possiveisJogadas[i]];
        // faz uma jogada numa celula vazia
        novoTabuleiro[possiveisJogadas[i]] = jogador;
        // armazena a pontuacao retornada do estado terminal daquela jogada
        if (jogador == "X"){
            var result = minimax(novoTabuleiro, "O");
            jogada.pontuacao = result.pontuacao;
        }
        else{
            var result = minimax(novoTabuleiro, "X");
            jogada.pontuacao = result.pontuacao;
        }
        // desfaz a jogada
        novoTabuleiro[possiveisJogadas[i]] = jogada.index;
        // coloca a jogada no array de jogadas
        jogadas.push(jogada);
    }
    // se for a vez do COMPUTADOR o loop resultara na jogada com a melhor pontuacao
    var melhorJogada;
    if(jogador === "X"){
    var melhorPontuacao = -10000;
        for(var i = 0; i < jogadas.length; i++){
            if(jogadas[i].pontuacao > melhorPontuacao){
                melhorPontuacao = jogadas[i].pontuacao;
                melhorJogada = i;
            }
        }
    }else{
        // se for a vez do HUMANO o loop resultara na jogada com a pior pontuacao
        var melhorPontuacao = 10000;
        for(var i = 0; i < jogadas.length; i++){
            if(jogadas[i].pontuacao < melhorPontuacao){
                melhorPontuacao = jogadas[i].pontuacao;
                melhorJogada = i;
            }
        }
    }
    // retorna a jogada com a maior pontuacao
    return jogadas[melhorJogada];
}

```




