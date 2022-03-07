'use strict';

const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco));

const criarItem = (tarefa, status = '', indice) => {
    const item = document.createElement('label'); // Cria a label
    item.classList.add('todo__item'); // Cria a classe do label
    item.innerHTML = ` 
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}>
    ` // Cria o bloco interno

    document.getElementById('todoList').appendChild(item);
}

const limparTarefas = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

const atualizarTela = () => { // Mostra os dados na tela
    limparTarefas();
    const banco = getBanco();
    banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice)); // Capta os itens do array e mostra na tela
}

const inserirItem = (evento) => {
    const tecla = evento.key; // Captura a tecla precionada
    const texto = evento.target.value; // Captura o texto da caixinha
    if (tecla === 'Enter') {
        const banco = getBanco();
        banco.push({ 'tarefa': texto, 'status': '' })
        setBanco(banco);
        atualizarTela(); // Executa a função
        evento.target.value=''; // Limpa a caixinha
    }
}

const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice(indice, 1);
    setBanco(banco);
    atualizarTela();
}

const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked': '';
    setBanco(banco);
    atualizarTela();
}

const clickItem = (evento) => {
    const elemento = evento.target; // Captura o indice para remover
    if(elemento.type === 'button'){
        const indice = elemento.dataset.indice;
        removerItem(indice);
    }else if(elemento.type === 'checkbox'){
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
    }
}

document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);

atualizarTela(); // Executa a função