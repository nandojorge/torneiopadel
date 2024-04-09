document.addEventListener("DOMContentLoaded", function() {
    // Dados de exemplo de resultados de jogos
    let resultados = [];

    // Função para renderizar os resultados na tabela
    function renderizarResultados() {
        const tbody = document.querySelector("#results-table tbody");
        tbody.innerHTML = ""; // Limpa a tabela antes de renderizar os resultados novamente
        resultados.forEach((resultado, index) => {
            const row = `<tr>
                            <td>${resultado.data}</td>
                            <td>${resultado.jogadores1}</td>
                            <td>${resultado.jogadores2}</td>
                            <td>${resultado.resultado || "-"} <button class="add-result-btn" data-index="${index}">Adicionar</button></td>
                            <td><button class="delete-game-btn" data-index="${index}">Excluir</button></td>
                        </tr>`;
            tbody.innerHTML += row;
        });

        // Adicionar evento de escuta para os botões "Adicionar Resultado"
        const addResultButtons = document.querySelectorAll(".add-result-btn");
        addResultButtons.forEach(button => {
            button.addEventListener("click", abrirModalAdicionarResultado);
        });

        // Adicionar evento de escuta para os botões "Excluir"
        const deleteGameButtons = document.querySelectorAll(".delete-game-btn");
        deleteGameButtons.forEach(button => {
            button.addEventListener("click", excluirJogo);
        });
    }

    // Função para abrir o modal de adicionar resultado
    function abrirModalAdicionarResultado(event) {
        const index = event.target.dataset.index;
        const modal = document.getElementById("add-result-modal");
        const closeButton = modal.querySelector(".close");
        const form = modal.querySelector("#add-result-form");

        // Definir ação do formulário de adicionar resultado
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            const result = document.getElementById("result").value;
            resultados[index].resultado = result;
            modal.style.display = "none";
            renderizarResultados();
        });

        // Definir ação do botão de fechar modal
        closeButton.addEventListener("click", function() {
            modal.style.display = "none";
        });

        // Exibir modal
        modal.style.display = "block";
    }

    // Função para lidar com a submissão do formulário de adicionar jogo
    function adicionarJogo(event) {
        event.preventDefault(); // Evita que o formulário seja enviado normalmente (recarregamento da página)
        
        // Obter os valores dos campos do formulário
        const gameDate = document.getElementById("game-date").value;
        const players1 = document.getElementById("players1").value;
        const players2 = document.getElementById("players2").value;

        // Criar um novo objeto de jogo
        const novoJogo = {
            data: gameDate,
            jogadores1: players1,
            jogadores2: players2
        };

        // Adicionar o novo jogo à lista de resultados
        resultados.push(novoJogo);

        // Renderizar os resultados atualizados
        renderizarResultados();

        // Limpar os campos do formulário
        document.getElementById("game-date").value = "";
        document.getElementById("players1").value = "";
        document.getElementById("players2").value = "";
    }

    // Função para excluir um jogo
    function excluirJogo(event) {
        const index = event.target.dataset.index;
        resultados.splice(index, 1);
        renderizarResultados();
    }

    // Chamar a função para renderizar os resultados
    renderizarResultados();

    // Adicionar evento de escuta para a submissão do formulário de adicionar jogo
    document.getElementById("add-game-form").addEventListener("submit", adicionarJogo);
});