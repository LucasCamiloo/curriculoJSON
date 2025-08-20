// Função para carregar currículo específico
async function carregarCurriculo(arquivo) {
    try {
        // Fazendo a requisição para o arquivo JSON especificado
        const resposta = await fetch(arquivo);
        
        // Verificando se a requisição foi bem sucedida
        if (!resposta.ok) {
            throw new Error(`Erro ao carregar o arquivo ${arquivo}`);
        }
        
        // Convertendo a resposta para JSON
        const dados = await resposta.json();
        
        // Chamando a função para preencher o HTML
        preencherHTML(dados);
        
        // Atualizando o estado dos botões
        atualizarEstadoBotoes(arquivo);
        
    } catch (erro) {
        console.error('Erro:', erro);
        alert(`Erro ao carregar o currículo de ${arquivo === 'Douglas.json' ? 'Douglas' : 'Lucas'}`);
    }
}

// Função para atualizar o estado visual dos botões
function atualizarEstadoBotoes(arquivoAtivo) {
    const btnDouglas = document.querySelector('button[onclick="carregarCurriculo(\'Douglas.json\')"]');
    const btnLucas = document.querySelector('button[onclick="carregarCurriculo(\'dados.json\')"]');
    
    // Removendo classes ativas de todos os botões
    btnDouglas.classList.remove('btn-primary', 'btn-outline-primary');
    btnLucas.classList.remove('btn-success', 'btn-outline-success');
    
    // Aplicando classes ativas ao botão selecionado
    if (arquivoAtivo === 'Douglas.json') {
        btnDouglas.classList.add('btn-primary');
        btnLucas.classList.add('btn-outline-success');
    } else {
        btnDouglas.classList.add('btn-outline-primary');
        btnLucas.classList.add('btn-success');
    }
}

// Função principal que carrega os dados (mantida para compatibilidade)
async function carregarDados() {
    // Por padrão, carrega o currículo do Lucas
    await carregarCurriculo('dados.json');
}

// Função para preencher o HTML com os dados
function preencherHTML(dados) {
    // Preenchendo o nome completo
    const nomeElemento = document.getElementById('nomeCompleto');
    nomeElemento.textContent = dados.nomeCompleto;
    
    // Preenchendo a foto
    const fotoElemento = document.getElementById('profileImage');
    
    if (dados.fotoBase64) {
        fotoElemento.src = dados.fotoBase64;
        fotoElemento.style.display = 'block';
    } else {
        fotoElemento.style.display = 'none';
    }
    
    // Preenchendo as informações gerais
    const infoGerais = document.getElementById('infoGerais');
    infoGerais.innerHTML = `
        <div class="info-item">
            <i class="bi bi-calendar-event"></i>
            <span>${dados.dataNascimento}</span>
        </div>
        <div class="info-item">
            <i class="bi bi-envelope"></i>
            <span>${dados.email}</span>
        </div>
        <div class="info-item">
            <i class="bi bi-telephone"></i>
            <span>${dados.telefone}</span>
        </div>
        <div class="info-item">
            <i class="bi bi-linkedin"></i>
            <span>${dados.linkedin}</span>
        </div>
        <div class="info-item">
            <i class="bi bi-github"></i>
            <span>${dados.github}</span>
        </div>
    `;
    
    // Preenchendo os conhecimentos
    const conhecimentosElemento = document.getElementById('conhecimentos');
    conhecimentosElemento.innerHTML = '';
    
    dados.conhecimentos.forEach(conhecimento => {
        const tag = document.createElement('span');
        tag.className = 'skill-tag';
        tag.textContent = conhecimento;
        conhecimentosElemento.appendChild(tag);
    });
    
    // Preenchendo as experiências profissionais
    const experienciasElemento = document.getElementById('experiencias');
    experienciasElemento.innerHTML = '';
    
    dados.experiencias.forEach(experiencia => {
        const divExperiencia = document.createElement('div');
        divExperiencia.className = 'experience-card';
        
        divExperiencia.innerHTML = `
            <h5 class="text-primary">${experiencia.cargo}</h5>
            <h6 class="text-muted">${experiencia.empresa}</h6>
            <p class="mb-2">${experiencia.descricao}</p>
            <small class="text-muted">
                <i class="bi bi-calendar-range me-1"></i>
                ${experiencia.dataInicio} - ${experiencia.dataTermino}
            </small>
        `;
        
        experienciasElemento.appendChild(divExperiencia);
    });
    
    // Preenchendo a formação acadêmica
    const formacaoElemento = document.getElementById('formacao');
    formacaoElemento.innerHTML = '';
    
    dados.formacao.forEach(formacao => {
        const divFormacao = document.createElement('div');
        divFormacao.className = 'education-card';
        
        divFormacao.innerHTML = `
            <h5 class="text-info">${formacao.curso}</h5>
            <h6 class="text-muted">${formacao.instituicao}</h6>
            <small class="text-muted">
                <i class="bi bi-calendar-check me-1"></i>
                Conclusão: ${formacao.dataTermino}
            </small>
        `;
        
        formacaoElemento.appendChild(divFormacao);
    });
}

// Executando a função quando a página carregar
document.addEventListener('DOMContentLoaded', carregarDados);
