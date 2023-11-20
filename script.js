(function() {
    'use strict'
  
    var forms = document.querySelectorAll('.needs-validation')
  
    Array.prototype.slice.call(forms)
      .forEach(function(form) {
        form.addEventListener('submit', function(event) {
          if (!form.checkValidity()) {
            form.classList.add('was-validated')
          } else {
            inserir()
            form.classList.remove('was-validated')
            form.reset()
          }
          event.preventDefault()
          event.stopPropagation()
        }, false)
      })
  })()
  
  
  function getLocalStorage() {
    return JSON.parse(localStorage.getItem('bd_celulares')) ?? [];
  }
  
  function setLocalStorage(bd_celulares) {
    localStorage.setItem('bd_celulares', JSON.stringify(bd_celulares));
  }
  
  function limparTabela() {
    var elemento = document.querySelector("#tabela>tbody");
    while (elemento.firstChild) {
      elemento.removeChild(elemento.firstChild);
    }
  }
  
  function atualizarTabela() { // Adaptação da função atualizarTabela (5 pontos)
    limparTabela();
    const bd_celulares = getLocalStorage();
    let index = 0;
    for (celular of bd_celulares) {
      const novaLinha = document.createElement('tr');
      novaLinha.innerHTML = `
          <th scope="row">${index}</th>
          <td>${celular.marca}</td>
          <td>${celular.modelo}</td>
          <td>${celular.tamanhoTela}</td>
          <td>${celular.sistemaOp}</td>
          <td>${celular.capacidadeArm}</td>
          <td>${celular.cor}</td>
          <td>
              <button type="button" class="btn btn-danger" id="${index}" onclick="excluir(${index})">Excluir</button>
          </td>
      `
      document.querySelector('#tabela>tbody').appendChild(novaLinha)
      index++;
    }
  }
  
  function inserir() { // Adaptação da função inserir (10 pontos)
    const celular = {
      marca: document.getElementById('marca').value,
      modelo: document.getElementById('modelo').value,
      tamanhoTela: document.getElementById('tamanhoTela').value,
      sistemaOp: document.getElementById('sistemaOp').value,
      capacidadeArm: document.getElementById('capacidadeArm').value,
      cor: document.getElementById('cor').value
    }
    const bd_celulares = getLocalStorage();
    bd_celulares.push(celular);
    setLocalStorage(bd_celulares);
    atualizarTabela();
  }
  
  function excluir(index) { // Adaptação da função excluir (5 pontos)
    const bd_celulares = getLocalStorage();
    bd_celulares.splice(index, 1);
    setLocalStorage(bd_celulares);
    atualizarTabela();
  }
  
  function validartamanhoTela() {
    const tamanhoTelaInput = document.getElementById('tamanhoTela');
    const feedbacktamanhoTela = document.getElementById('feedbacktamanhoTela');
    const tamanhoTelaPattern = /^\d+(\.\d{1,2})?$/; // Padrão para permitir números decimais com até duas casas decimais
  
    if (!tamanhoTelaPattern.test(tamanhoTelaInput.value)) {
      tamanhoTelaInput.setCustomValidity("Informe um tamanho de tela válido, por exemplo, 0.6, 0.8, 15.0.");
      feedbacktamanhoTela.innerText = "Informe um tamanho de tela válido, por exemplo, 0.6, 0.8, 15.0.";
      return false;
    } else {
      tamanhoTelaInput.setCustomValidity("");
      feedbacktamanhoTela.innerText = "";
      return true;
    }
  }
  
  atualizarTabela();
  // Seleção dos elementos e adição do listener para validação customizada (5 pontos)
  const tamanhoTelaInput = document.getElementById("tamanhoTela");
  tamanhoTelaInput.addEventListener('input', validartamanhoTela);
  