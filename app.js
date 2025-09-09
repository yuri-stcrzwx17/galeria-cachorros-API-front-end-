
window.onload = function() {
  
    const racaInicial = 'labrador';
    buscarEExibirImagens(racaInicial);
};

const formulario = document.getElementById('form-busca');
formulario.addEventListener('submit', function(evento) {
   
    evento.preventDefault();

  
    const campoDeBusca = document.getElementById('input-busca');
    const racaBuscada = campoDeBusca.value.toLowerCase();

   
    buscarEExibirImagens(racaBuscada);
});

function buscarEExibirImagens(raca) {
  
    const container = document.getElementById('container-galeria');
    container.innerHTML = '<p>Carregando fotos...</p>';
    const url = `https://dog.ceo/api/breed/${raca}/images/random/9`;
    
    fetch(url)
        .then(function(resposta) {
           
            if (!resposta.ok) {
                container.innerHTML = `<p>Não foi possível encontrar fotos para a raça "${raca}".</p>`;
                return;
            }
    
            return resposta.json();
            
        })
        .then(function(dados) {
     
            container.innerHTML = '';

            
            const listaDeFotos = dados.message;

          
            listaDeFotos.forEach(function(urlFoto) {
              
                const divFoto = document.createElement('div');
                divFoto.classList.add('item-galeria');

                const imagem = document.createElement('img');
                imagem.src = urlFoto;
                imagem.alt = `Foto de cachorro da raça ${raca}`;

                divFoto.appendChild(imagem);
                container.appendChild(divFoto);
            });
        })
        .catch(function(erro) {
            
            console.error('Ops, algo deu errado:', erro);
            container.innerHTML = '<p>Erro ao carregar as fotos. Tente novamente mais tarde.</p>';
        });
}