const API_URL = '/eventos';
let modalInstance;

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa o modal
    modalInstance = new bootstrap.Modal(document.getElementById('modalEvento'));
    // Carrega os eventos ao iniciar
    carregarEventos();
});

// Read
async function carregarEventos() {
    try {
        const res = await fetch(API_URL);
        const eventos = await res.json();
        renderizarTabela(eventos);
    } catch (error) {
        mostrarNotificacao('Erro ao carregar eventos.', 'danger');
    }
}

// Renderiza o HTML da tabela
function renderizarTabela(eventos) {
    const tbody = document.getElementById('tabelaCorpo');
    tbody.innerHTML = '';

    if (eventos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">Nenhum evento encontrado.</td></tr>';
        return;
    }

    eventos.forEach(evento => {
        const dataFormatada = new Date(evento.data).toLocaleDateString('pt-BR', {timeZone: 'UTC'});
        
        tbody.innerHTML += `
            <tr>
                <td><strong>${evento.titulo}</strong><br><small class="text-muted">${evento.descricao || ''}</small></td>
                <td>${dataFormatada}</td>
                <td>${evento.local}</td>
                <td>R$ ${evento.valor.toFixed(2)}</td>
                <td class="text-end">
                    <button class="btn btn-sm btn-outline-primary me-1" onclick='prepararEdicao(${JSON.stringify(evento)})'>
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="excluirEvento('${evento._id}')">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
}

// Search
async function buscarEventos() {
    const termo = document.getElementById('inputBusca').value;
    try {
        const res = await fetch(`${API_URL}?titulo=${termo}`);
        const eventos = await res.json();
        renderizarTabela(eventos);
    } catch (error) {
        console.error('Erro na busca:', error);
    }
}

document.getElementById('inputBusca').addEventListener('keyup', (e) => {
    if(e.key === 'Enter') buscarEventos();
});


// Create/Update
async function salvarEvento() {
    const id = document.getElementById('eventoId').value;
    const titulo = document.getElementById('titulo').value;
    const descricao = document.getElementById('descricao').value;
    const data = document.getElementById('data').value;
    const local = document.getElementById('local').value;
    const valor = document.getElementById('valor').value;

    if (!titulo || !data || !local || !valor) {
        alert("Preencha todos os campos obrigatórios!");
        return;
    }

    const eventoObjeto = { titulo, descricao, data, local, valor: parseFloat(valor) };

    try {
        let res;
        if (id) {
            res = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(eventoObjeto)
            });
        } else {
            res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(eventoObjeto)
            });
        }

        if (res.ok) {
            mostrarNotificacao(id ? 'Evento atualizado!' : 'Evento criado com sucesso!', 'success');
            modalInstance.hide();
            carregarEventos();
        } else {
            mostrarNotificacao('Erro ao salvar evento.', 'danger');
        }
    } catch (error) {
        console.error(error);
        mostrarNotificacao('Erro de conexão.', 'danger');
    }
}

function prepararEdicao(evento) {
    document.getElementById('eventoId').value = evento._id;
    document.getElementById('titulo').value = evento.titulo;
    document.getElementById('descricao').value = evento.descricao || '';
    document.getElementById('local').value = evento.local;
    document.getElementById('valor').value = evento.valor;

    // Formata a data para o input date (YYYY-MM-DD)
    const dataIso = new Date(evento.data).toISOString().split('T')[0];
    document.getElementById('data').value = dataIso;

    document.getElementById('modalTitulo').innerText = 'Editar Evento';
    modalInstance.show();
}

function limparFormulario() {
    document.getElementById('formEvento').reset();
    document.getElementById('eventoId').value = '';
    document.getElementById('modalTitulo').innerText = 'Novo Evento';
}

// Delete
async function excluirEvento(id) {
    if (confirm('Tem certeza que deseja excluir este evento?')) {
        try {
            const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (res.ok) {
                mostrarNotificacao('Evento excluído.', 'success');
                carregarEventos();
            }
        } catch (error) {
            mostrarNotificacao('Erro ao excluir.', 'danger');
        }
    }
}

// Utilatários
function mostrarNotificacao(msg, tipo) {
    const toastEl = document.getElementById('liveToast');
    const toastBody = document.getElementById('toastMessage');
    
    toastEl.className = `toast align-items-center text-white bg-${tipo} border-0`;
    toastBody.innerText = msg;
    
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}