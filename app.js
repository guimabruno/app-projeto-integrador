// Função para carregar todos os times apenas na página de 'consultarTime.html'
window.onload = function() {
    // Verifica se a página atual é 'consultarTime.html'
    if (window.location.pathname.includes('consultarTime.html')) {
        carregarTimes();
    }
}

// Função para carregar os times da API
function carregarTimes() {
    fetch('http://localhost/projeto-integrador-api/api/easyStats/')
        .then(response => {
            // Verifica se a resposta é ok (status 2xx)
            if (!response.ok) {
                throw new Error('Erro ao carregar os times. Status: ' + response.status);
            }
            return response.json(); // Tenta transformar a resposta em JSON
        })
        .then(data => {
            const select = document.getElementById('time-select');
            if (data.status === 'success') {
                // Preenche o <select> com os times obtidos da API
                data.data.forEach(time => {
                    const option = document.createElement('option');
                    option.value = time.idTime;
                    option.textContent = time.nomeTime;
                    select.appendChild(option);
                });
            } else {
                alert('Erro ao carregar os times.');
            }
        })
        .catch(error => {
            console.error('Erro ao carregar os times:', error);
            alert('Erro ao carregar os times');
        });
}

// Função para consultar um time específico ou todos os times
function consultarTime() {
    const idTime = document.getElementById('time-select').value;
    const url = idTime === 'todos' 
        ? 'http://localhost/projeto-integrador-api/api/easyStats/'  // Consulta todos os times
        : `http://localhost/projeto-integrador-api/api/easyStats/${idTime}`;  // Consulta um time específico

    fetch(url)
        .then(response => {
            // Verifica se a resposta é ok (status 2xx)
            if (!response.ok) {
                throw new Error('Erro ao consultar o time. Status: ' + response.status);
            }
            return response.json();  // Tenta transformar a resposta em JSON
        })
        .then(data => {
            const infoDiv = document.getElementById('informacoes-time');
            if (data.status === 'success') {
                if (idTime === 'todos') {
                    // Exibe todos os times
                    infoDiv.innerHTML = '<h3>Todos os Times</h3>';
                    data.data.forEach(time => {
                        infoDiv.innerHTML += `
                            <p><strong>Nome:</strong> ${time.nomeTime}</p>
                            <p><strong>Títulos:</strong> ${time.titulos}</p>
                            <p><strong>Gols Acumulados:</strong> ${time.golsAcumulados}</p>
                            <p><strong>Cartões Amarelos Acumulados:</strong> ${time.cartoesAmarelosAcumulados}</p>
                            <p><strong>Cartões Vermelhos Acumulados:</strong> ${time.cartoesVermelhosAcumulados}</p>
                            <hr>
                        `;
                    });
                } else {
                    // Exibe informações de um time específico
                    const time = data.data;
                    infoDiv.innerHTML = `
                        <h3>Informações do Time</h3>
                        <p><strong>Nome:</strong> ${time.nomeTime}</p>
                        <p><strong>Títulos:</strong> ${time.titulos}</p>
                        <p><strong>Gols Acumulados:</strong> ${time.golsAcumulados}</p>
                        <p><strong>Cartões Amarelos Acumulados:</strong> ${time.cartoesAmarelosAcumulados}</p>
                        <p><strong>Cartões Vermelhos Acumulados:</strong> ${time.cartoesVermelhosAcumulados}</p>
                    `;
                }
            } else {
                infoDiv.innerHTML = 'Nenhuma informação encontrada.';
            }
        })
        .catch(error => {
            console.error('Erro ao consultar o time:', error);
            alert('Erro ao consultar o time');
        });
}




// Função para inserir uma nova partida
function inserirPartida(event) {
    event.preventDefault(); // Previne o envio do formulário para processar os dados no JS

    const timeCasa = document.getElementById("time-casa").value;
    const timeVisitante = document.getElementById("time-visitante").value;
    const dataPartida = document.getElementById("data-partida").value;
    const resultado = document.getElementById("resultado").value;
    const escanteiosCasa = document.getElementById("escanteios-casa").value;
    const escanteiosVisitante = document.getElementById("escanteios-visitante").value;
    const cartoesAmarelosCasa = document.getElementById("cartoes-amarelos-casa").value;
    const cartoesAmarelosVisitante = document.getElementById("cartoes-amarelos-visitante").value;
    const cartoesVermelhosCasa = document.getElementById("cartoes-vermelhos-casa").value;
    const cartoesVermelhosVisitante = document.getElementById("cartoes-vermelhos-visitante").value;
    const golsCasa = document.getElementById("gols-casa").value;
    const golsVisitante = document.getElementById("gols-visitante").value;
    const penalidadeCasa = document.getElementById("penalidade-casa").value;
    const penalidadeVisitante = document.getElementById("penalidade-visitante").value;
    const jogadoresGolsCasa = document.getElementById("jogadores-gols-casa").value;
    const jogadoresGolsVisitante = document.getElementById("jogadores-gols-visitante").value;
    const jogadoresCartoesAmarelosCasa = document.getElementById("jogadores-cartoes-amarelos-casa").value;
    const jogadoresCartoesAmarelosVisitante = document.getElementById("jogadores-cartoes-amarelos-visitante").value;
    const jogadoresCartoesVermelhosCasa = document.getElementById("jogadores-cartoes-vermelhos-casa").value;
    const jogadoresCartoesVermelhosVisitante = document.getElementById("jogadores-cartoes-vermelhos-visitante").value;

    const novaPartida = {
        idTimeCasa: timeCasa,
        idTimeVisitante: timeVisitante,
        dataPartida: dataPartida,
        resultado: resultado,
        escanteiosCasa: escanteiosCasa,
        escanteiosVisitante: escanteiosVisitante,
        cartoesAmarelosCasa: cartoesAmarelosCasa,
        cartoesAmarelosVisitante: cartoesAmarelosVisitante,
        cartoesVermelhosCasa: cartoesVermelhosCasa,
        cartoesVermelhosVisitante: cartoesVermelhosVisitante,
        golsCasa: golsCasa,
        golsVisitante: golsVisitante,
        penalidadeCasa: penalidadeCasa,
        penalidadeVisitante: penalidadeVisitante,
        jogadoresGolsCasa: jogadoresGolsCasa,
        jogadoresGolsVisitante: jogadoresGolsVisitante,
        jogadoresCartoesAmarelosCasa: jogadoresCartoesAmarelosCasa,
        jogadoresCartoesAmarelosVisitante: jogadoresCartoesAmarelosVisitante,
        jogadoresCartoesVermelhosCasa: jogadoresCartoesVermelhosCasa,
        jogadoresCartoesVermelhosVisitante: jogadoresCartoesVermelhosVisitante
    };

    fetch('http://localhost/projeto-integrador-api/api/easyStats', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaPartida),
    })
    .then(response => response.text()) // Modificado para ler como texto primeiro
    .then(data => {
        console.log('Resposta da API:', data); // Verifica a resposta da API
        // Tenta extrair o JSON da resposta
        try {
            // Remove o texto "Partida inserida com sucesso!" da resposta
            let jsonResponse = data.replace('Partida inserida com sucesso!', '');
            jsonResponse = JSON.parse(jsonResponse); // Tenta converter o restante para JSON

            alert('Partida inserida com sucesso!');
            document.getElementById('form-inserir-partida').reset(); // Reseta o formulário
        } catch (error) {
            console.error('Erro ao analisar JSON:', error);
            alert('Erro ao inserir a partida. Verifique os dados.');
        }
    })
    .catch(error => {
        console.error('Erro ao inserir partida:', error);
        alert('Erro ao inserir a partida. Tente novamente.');
    });
}



// Adicionando o listener para o formulário
document.getElementById('form-inserir-partida').addEventListener('submit', inserirPartida);

document.addEventListener('DOMContentLoaded', function() {
    // Carregar as partidas na lista
    carregarPartidas();

    // Função para carregar todas as partidas
    function carregarPartidas() {
        const partidasLista = document.getElementById('partidas-lista');

        // Requisição GET para buscar as partidas
        fetch('http://localhost/projeto-integrador-api/api/easyStats/partidas')
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success' && data.data.length > 0) {
                    // Se houver partidas, exibe na lista
                    data.data.forEach(partida => {
                        const partidaElement = document.createElement('div');
                        partidaElement.classList.add('partida');
                        partidaElement.innerHTML = `
                            <p><strong>Data:</strong> ${new Date(partida.dataPartida).toLocaleString()}</p>
                            <p><strong>Resultado:</strong> ${partida.resultado}</p>
                            <button class="deletar-btn" data-id="${partida.idPartida}">Deletar</button>
                        `;
                        partidasLista.appendChild(partidaElement);
                    });

                    // Adiciona evento de deletar a cada botão
                    const botoesDeletar = document.querySelectorAll('.deletar-btn');
                    botoesDeletar.forEach(botao => {
                        botao.addEventListener('click', function() {
                            const idPartida = botao.getAttribute('data-id');
                            deletarPartida(idPartida);
                        });
                    });
                } else {
                    partidasLista.innerHTML = '<p>Nenhuma partida encontrada.</p>';
                }
            })
            .catch(error => {
                console.error('Erro ao carregar partidas:', error);
            });
    }

    // Função para deletar uma partida
    function deletarPartida(idPartida) {
        // Confirmação antes de deletar
        if (confirm('Tem certeza que deseja deletar esta partida?')) {
            // Requisição DELETE para a API
            fetch(`http://localhost/projeto-integrador-api/api/easyStats/partida/${idPartida}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    alert('Partida deletada com sucesso!');
                    // Atualiza a lista de partidas após a exclusão
                    carregarPartidas();
                } else {
                    alert('Erro ao deletar a partida.');
                }
            })
            .catch(error => {
                console.error('Erro ao deletar partida:', error);
                alert('Ocorreu um erro ao tentar deletar a partida.');
            });
        }
    }
});
