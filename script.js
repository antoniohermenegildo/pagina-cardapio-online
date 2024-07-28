//iniciando variáveis que pega os elementos do documento
const menu = document.querySelector("#menu");
const funcionamento = document.querySelector("#hora-funcionamento");
const carrinhoModal = document.querySelector("#carrinho-modal");
const itensCarrinho = document.querySelector("#cart-items");
const valorTotalCarrinho = document.querySelector("#cart-total");
const campoEndereco = document.querySelector("#endereco");
const campoEnderecoErro = document.querySelector("#endereco-erro");
const fecharModalBtn = document.querySelector("#fechar-modal-btn");
const finalizarPedidoBtn = document.querySelector("#finalizar-pedido-btn");
const carrinhoBtn = document.querySelector("#cart-btn");
const quantidadeItensCarrinho = document.querySelector("#cart-count");

//iniciando array do carrinho vazio
let carrinho = [];

//Abrir modal do carrinho
carrinhoBtn.addEventListener("click", function () {
	atualizarCarrinhoModal();
  carrinhoModal.style.display = "flex";
});

//Fechar modal do carrinho Clicando fora da estrutura do modal
carrinhoModal.addEventListener("click", function (evento) {
  if (evento.target === carrinhoModal) {
    carrinhoModal.style.display = "none";
  }
});

//Fechar modal do carrinho no btn Fechar
fecharModalBtn.addEventListener("click", function () {
  carrinhoModal.style.display = "none";
});

//Funcionalidade do btn dos itens para add ao carrinho
menu.addEventListener("click", (e) => {
  //identificando o click no Btn
  let itemBtn = e.target.closest(".add-to-cart-btn");
  //pegando nome e preço do item
  if (itemBtn) {
    const nomeDoItem = itemBtn.getAttribute("data-name");
    const precoDoItem = parseFloat(itemBtn.getAttribute("data-price"));
    adicionarItemNoCarrinho(nomeDoItem, precoDoItem);
  };
});

//Função de add item no carrinho
function adicionarItemNoCarrinho(nome, preco) {
  //Verificar se já existe o item no carrinho
  const existeItemNoCarrinho = carrinho.find((item) => item.nome === nome);

  if (existeItemNoCarrinho) {
    //existindo o item somar mais um na quantidade existente
    existeItemNoCarrinho.quantidade += 1;
  } else {
    //add no carrinho
    carrinho.push({
      nome,
      preco,
      quantidade: 1,
    });
  }
	atualizarCarrinhoModal();
};

//atualizar o carrinho no Modal
function atualizarCarrinhoModal() {
  itensCarrinho.innerHTML = "";
  let total = 0;
  //Estrutura que vai criando os itens do carrinho
	carrinho.forEach(item => {
    //criando o elemento do item no carrinho
		const itemCarrinhoEl = document.createElement("div");
		itemCarrinhoEl.classList.add("flex", "justify-between", "mb-4", "flex-col")
		//cria a estrutura do item do carrinho
		itemCarrinhoEl.innerHTML = `
			<div class="flex items-center justify-between">
				<div>
					<p class="font-bold">${item.nome}</p>
					<p>Qtd: ${item.quantidade}</p>
					<p class="font-medium mt-2">R$ ${item.preco.toFixed(2)}</p>
				</div>

				<button class="remove-item-carrinho-btn" data-name="${item.nome}">
					Remover
				</button>

			</div>
		`;
		//somando valor total dos itens do carrinho item a item
		total += item.preco * item.quantidade;
		//inclui no modal a estrutura do item que foi criado
		itensCarrinho.appendChild(itemCarrinhoEl);
  });
	//colocando o valor total dos itens do carrinho no campo
	valorTotalCarrinho.textContent = total.toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL"
	});
	//atualizando a quantidade de itens que tem no carrinho 
	quantidadeItensCarrinho.innerHTML = carrinho.length;
};

//Escutando evento de click no botao de remover
itensCarrinho.addEventListener("click", (evento) =>{
	if (evento.target.classList.contains("remove-item-carrinho-btn")) {
		const nome = evento.target.getAttribute("data-name");
		removeItemCarrinho(nome);	
	};
});

//Função para remover item do carrinho
function removeItemCarrinho(nome){
	//pega o indice do item no array
	const index = carrinho.findIndex(item => item.nome === nome);
	//verifica se o findIndex encontrou o indice do item sendo diferene de -1
	//porque quando ele é -1 é pq o indece não foi encontrado
	if (index !== -1) {
		const item = carrinho[index];
		//verifica se a quantidade do item é maior que 1
		if(item.quantidade > 1){
			//maior que um só diminui a quantidade do item que esta no carrinho
			item.quantidade -= 1;
			atualizarCarrinhoModal();
			return;
		}else{
			//a quantidade sendo só um o item é removido do carrinho
			carrinho.splice(index, 1);
			atualizarCarrinhoModal();
		};
	};
};

//Verificar se o restaurante esta aberto
function verificarRestauranteFuncionando() {
	const data = new Date();
	const hora = data.getHours();
	return hora >= 18 && hora < 22;
	// retorna True se estiver dentro do horario
};

//variavel armazena resultado de restaurante aberto (true)
const restauranteAberto = verificarRestauranteFuncionando();

//Verificação de funcionamento pra mudar cor do elemento de hora de funcionamento
if (restauranteAberto){
	funcionamento.classList.remove("bg-red-500");
	funcionamento.classList.add("bg-green-600");
}else{
	funcionamento.classList.remove("bg-green-600");
	funcionamento.classList.add("bg-red-500");
}

//Escuta o campo do input de endereco
campoEndereco.addEventListener("input", (evento) => {
	//pega o valor que esta no input do endereco
	let valorCampoEndero = evento.target.value;
	//verifica se o campo esta diferente de vazio se sim ele tira a msg de erro e a borda vermelha
	if (valorCampoEndero !== "") {
		campoEnderecoErro.classList.add("hidden");
		campoEndereco.classList.remove("border-red-500");
		return;
	}
});

//Escuta o evendo de click do botao finalizar pedido
finalizarPedidoBtn.addEventListener("click", () => {
	//verificar se o restaurante esta aberto
	if (!restauranteAberto) {
		Toastify({
			text: "O restaurante esta fechado no momento, volte a partir das 18h!",
			duration: 3000,
			close: true,
			gravity: "top", // `top` or `bottom`
			position: "right", // `left`, `center` or `right`
			stopOnFocus: true, // Prevents dismissing of toast on hover
			style: {
				background: "#ef4444",
			},
		}).showToast();
		return;
	};
	//Verifica se o carrinho esta zerado e se estiver nao faz nada
	if (carrinho.length === 0) return;
	//Verifica se o campo endereco esta vazio e inclui a mensagem de preencher o campo 
	if (campoEndereco.value === ""){
		campoEnderecoErro.classList.remove("hidden");
		campoEndereco.classList.add("border-red-500");
		return;
	};
	//Enviar o pedido para o whatsapp usando a API
	const itensPedidos = carrinho.map((item) => {
		return (
			`Item: ${item.nome}, Quantidade: (${item.quantidade}), Preço: R$${item.preco} | ` 
		);
	}).join("");

	const mensagem = encodeURIComponent(itensPedidos);
	const telefone = "XXXXXXXXXXX";

	window.open(`https://wa.me/${telefone}?text=${mensagem} Endereço: ${campoEndereco.value}`, "_blank");

	carrinho = [];

	atualizarCarrinhoModal();
});