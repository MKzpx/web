async function registrarVisita() {
  try {
    // Obtém IP público
    const resposta = await fetch("https://api.ipify.org?format=json");
    const dados = await resposta.json();
    const ip = dados.ip;
    const agora = new Date().toLocaleString();

    // Busca logs antigos no navegador (localStorage)
    const armazenado = JSON.parse(localStorage.getItem("visitas") || "[]");

    // Adiciona a nova visita
    armazenado.unshift({ data: agora, ip });

    // Mantém só os últimos 20 registros (opcional)
    const max = 20;
    if (armazenado.length > max) armazenado.length = max;

    // Salva novamente
    localStorage.setItem("visitas", JSON.stringify(armazenado));

    // Atualiza tabela
    atualizarTabela(armazenado);
  } catch (err) {
    console.error("Erro ao registrar visita:", err);
  }
}

function atualizarTabela(lista) {
  const tbody = document.getElementById("tbody");
  if (!lista.length) {
    tbody.innerHTML = "<tr><td colspan='2'>Nenhum acesso ainda.</td></tr>";
    return;
  }

  tbody.innerHTML = lista
    .map(v => `<tr><td>${v.data}</td><td>${v.ip}</td></tr>`)
    .join("");
}

// Executa ao carregar a página
registrarVisita();
