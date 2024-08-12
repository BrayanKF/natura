// Classe Produto
class Produto {
    constructor(nome, preco, img) {
      this.nome = nome;
      this.preco = preco;
      this.img = img;
    }
  
    // Métodos Getter
    getnome() {
      return this.nome;
    }
  
    getpreco() {
      return this.preco;
    }
  
    getimg() {
      return this.img;
    }
  
  
    // Métodos Setter
    setnome(novoNome) {
      this.nome = novoNome;
    }
  
    setpreco(novoPreco) {
      this.preco = novoPreco;
    }
  
    setimg(novoImg) {
      this.img = novoImg;
    }
  
    
    exibir() {
      return `Nome: ${this.nome}, Preço: ${this.preco}, img: ${this.img}`;
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    carregarPedidos('true');
  });
  
  
  function res() {
    let nome = document.getElementById("nome").value;
    let telefone = document.getElementById("tel").value;
    let select = document.getElementById("cardapio").value;
    
    console.log("Nome: " + nome + " Telefone: " + telefone + " Produtos: " + select);
  }

  let  divPedidos= document.getElementById('divPedidos')
  divPedidos.style.display="none"
  
  function abrirPedidos(){
    divPedidos.style.display="block"
    divPedidos.classList.add("#divPedidos")
  }

  let  produtosAdicionar= document.getElementById('divAdicionarProdutos')
  produtosAdicionar.style.display="none"
  
  function divAdicionarPedidos() {
    let senha = prompt("Insira a senha de acesso");
    if (senha === "") {
        document.getElementById('divAdicionarProdutos').style.display = "block";
        let excluir = document.querySelectorAll('.excluir');

        for (let i = 0; i < excluir.length; i++) {
            excluir[i].style.display = "flex";
            excluir[i].addEventListener('click', (e) => {
                excluirProduto(e.target.name);
            });
        }
    } else {
        alert("Você não está autorizado para executar essa função pois não é um desenvolvedor.");
    }
  }
  
  let imagemProduto = document.getElementById('imagemProduto');
  let adicionar = document.querySelector('.adicionar');
  let cardapio2  = document.getElementById('divAdicionarProdutos');
  let imgAdicionadaSrc = '';
  
  function add() {
    let nomeProduto = document.getElementById("nomeProduto").value;
    let precoProduto = document.getElementById("precoProduto").value;
  
    const imgAdicionada = document.createElement("img");
    imgAdicionada.src = imgAdicionadaSrc;

    try {
      let produto = new Produto(nomeProduto, precoProduto, imgAdicionadaSrc);
      let listaProdutos = JSON.parse(localStorage.getItem('produtos'));
      if (!listaProdutos) {
        listaProdutos = [];
      }
      listaProdutos.push(produto);
      console.log(listaProdutos)
      localStorage.setItem('produtos', JSON.stringify(listaProdutos));
    } catch (error) {
      console.log(error);
    }

    carregarPedidos('false');
  }

  function carregarPedidos(str) {
    adicionar.innerHTML = '';
    let pedidos = JSON.parse(localStorage.getItem('produtos'));
    if (pedidos) {
      pedidos.forEach((pedido) => {
        const btnExcluir = document.createElement("button");
        btnExcluir.name = pedido.nome;
        btnExcluir.textContent = "Excluir";
        const divExcluir = document.createElement("div");
        divExcluir.appendChild(btnExcluir);

        if(str == 'true'){
          divExcluir.style.display = "none";
        } else {
          divExcluir.style.display = "flex";
        }

        btnExcluir.addEventListener('click', (e) => {
          excluirProduto(e.target.name);
        });

        divExcluir.style.justifyContent = "center";
        divExcluir.style.cursor = "pointer";
        divExcluir.style.flexDirection = "row";
        divExcluir.style.alignItems = "center";
        divExcluir.style.gap = "6px";
        divExcluir.className = 'excluir';
        const img = document.createElement("img");
        img.src = pedido.img;
        let divDaProduto = document.createElement('div');
        divDaProduto.setAttribute('class', 'produto');
        let br=document.createElement('br')
        let h3 = document.createElement('h3');
        h3.appendChild(document.createTextNode(pedido.nome));
        let h4 = document.createElement('h4');
        let strong=document.createElement('strong')
        strong.appendChild(document.createTextNode("R$ "));
        strong.appendChild(document.createTextNode(pedido.preco));
        h4.appendChild(strong);
        let divDaImg = document.createElement('div');
        divDaImg.setAttribute('class', 'imagem-produto');
        divDaImg.appendChild(img);
        divDaProduto.appendChild(divDaImg);
        divDaProduto.appendChild(h3);
        divDaProduto.appendChild(h4);
        divDaProduto.appendChild(divExcluir);
        adicionar.appendChild(divDaProduto)
        adicionar.appendChild(br);
      });
    }
  }
  
  imagemProduto.addEventListener('change', (e) => {
    const inputTarget = e.target;
    const file = inputTarget.files[0];
    if (file) {
      const reader = new FileReader();
  
      reader.addEventListener('load', (e) => {
        imgAdicionadaSrc = e.target.result; 
      });
  
      reader.readAsDataURL(file);
    }
  });

function excluirProduto(nomeProduto) {
  let produtos = JSON.parse(localStorage.getItem('produtos'));
  let index = produtos.findIndex((produto) => produto.nome === nomeProduto);
  produtos.splice(index, 1);
  localStorage.setItem('produtos', JSON.stringify(produtos));
  carregarPedidos('false');
}

  
   
    
  
   
   
   
  
  
  