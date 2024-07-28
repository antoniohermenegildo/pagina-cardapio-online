Projeto Cardapio

Foi usado HTML, CSS, JS, NODE, TAILWIND
Utilizado o VsCode para codar 
Extensões do VsCode para auxiliar:
Dracula - tema 
Live Server - visualização em tempo real do que esta desenvolvendo
Tailwind CSS IntelliSense - Ajuda na condificação do Tailwind

Estruturação 

1 - Criação de pasta do projeto no Windows Explorer
2 - Criação de arquivo index.html
3 - Criação da pasta assets com as imagens do projeto
4 - Criação a pasta styles com o arquivo css
5 - instalação do nodeJS
6 - Abre o CMD na pasta criada do projeto
7 - inicialização do Node
comando: (npm init -y)
8 - instalação do modulo tailwindcss do Node
comando: (npm install -D tailwindcss)
9 - iniciando o tailwindcss no projeto
comando: (npx tailwindcss init)
10 - abre o arquivo tailwind.config.js criado na raiz do projeto
incluir codigo ("./**/*.{html,js}") no campo "content: [],"
11 - importar para o arquivo css os modulos do tailwind
codigos para incluir no arquivo css: 
"@tailwind base;
@tailwind components;
@tailwind utilities;"
12 - inlcuir o script do tailwind no arquivo package.json
codigo: "dev": "npx tailwindcss -i ./styles/estilos.css -o ./styles/output.css --watch"
13 - rodar o script pelo cmd
comando: npm run dev

fim da Estruturação

Começando a Criação do Projeto

-criação de cabeçalho
-criação do Menu
-criação das seções Hamburguers e Bebidas
-criação do Rodapé
-criação do modal carrinho
-criar e atribuir as funcionalidades
    *Listar os produtos
    *Adicionar produtos ao carrinho
    *Verificar itens no carrinho pela home
    *Acessar detalhes do carrinho
    *Remover itens do carrinho
    *Adicionar e verificar endereço
    *Validar se o restaurante está aberto
    *Enviar pedido para o whatsapp

Fim do Projeto