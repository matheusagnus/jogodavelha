celulas = [0, 1, 2,
           3, 4, 5,
           6, 7, 8];

renderTabuleiro();

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

function clicaButton(id){

     if(vence(celulas, "X") == false && vence(celulas, "O") == false){
          document.getElementById(id).innerHTML = "O";
          document.getElementById(id).style.backgroundColor = "lightgreen";
          celulas[id - 1] = "O";

          if(vence(celulas, "O") == true){
               //console.log("humano venceu");
               document.getElementById("winText").innerHTML = "Humano venceu!";
          } else {
               var vazios = celulasVazias(celulas)
               if(vazios.length === 0){
                    //console.log("deu velha");
                    document.getElementById("winText").innerHTML = "Deu velha!";
               } else {
               IAJoga();
               }
          }
     }
}

function IAJoga(){
     var melhorJogada = minimax(celulas, "X");
     document.getElementById(melhorJogada.index + 1).innerHTML = "X";
     document.getElementById(melhorJogada.index + 1).style.backgroundColor = "lightcoral";
     celulas[melhorJogada.index] = "X";

     if(vence(celulas, "X") == true){
          //console.log("computador venceu");
          document.getElementById("winText").innerHTML = "Computador venceu!";
     }
}

function minimax(novoTabuleiro, jogador){
    var possiveisJogadas = celulasVazias(novoTabuleiro);
    if (vence(novoTabuleiro, "O")){
        return {pontuacao:-10};
    }
    else if (vence(novoTabuleiro, "X")){
        return {pontuacao:10};
    }
    else if (possiveisJogadas.length === 0){
        return {pontuacao:0};
    }
    var jogadas = [];
    for (var i = 0; i < possiveisJogadas.length; i++){
        var jogada = {};
        jogada.index = novoTabuleiro[possiveisJogadas[i]];
        novoTabuleiro[possiveisJogadas[i]] = jogador;
        if (jogador == "X"){
            var result = minimax(novoTabuleiro, "O");
            jogada.pontuacao = result.pontuacao;
        }
        else{
            var result = minimax(novoTabuleiro, "X");
            jogada.pontuacao = result.pontuacao;
        }
        novoTabuleiro[possiveisJogadas[i]] = jogada.index;
        jogadas.push(jogada);
    }
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
        var melhorPontuacao = 10000;
        for(var i = 0; i < jogadas.length; i++){
            if(jogadas[i].pontuacao < melhorPontuacao){
                melhorPontuacao = jogadas[i].pontuacao;
                melhorJogada = i;
            }
        }
    }
    return jogadas[melhorJogada];
}

function vence(novoTabuleiro, jogador){
    if(
           novoTabuleiro[0] == jogador && novoTabuleiro[1] == jogador && novoTabuleiro[2] == jogador ||
           novoTabuleiro[3] == jogador && novoTabuleiro[4] == jogador && novoTabuleiro[5] == jogador ||
           novoTabuleiro[6] == jogador && novoTabuleiro[7] == jogador && novoTabuleiro[8] == jogador ||

           novoTabuleiro[0] == jogador && novoTabuleiro[3] == jogador && novoTabuleiro[6] == jogador ||
           novoTabuleiro[1] == jogador && novoTabuleiro[4] == jogador && novoTabuleiro[7] == jogador ||
           novoTabuleiro[2] == jogador && novoTabuleiro[5] == jogador && novoTabuleiro[8] == jogador ||

           novoTabuleiro[0] == jogador && novoTabuleiro[4] == jogador && novoTabuleiro[8] == jogador ||
           novoTabuleiro[2] == jogador && novoTabuleiro[4] == jogador && novoTabuleiro[6] == jogador){

           return true;
   }
        return false;
}

function celulasVazias(tabuleiro){
     return  tabuleiro.filter(s => s != "O" && s != "X");
}

function resetTabuleiro() {
    celulas = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    document.getElementById("winText").innerHTML = "";
    renderTabuleiro();
}
