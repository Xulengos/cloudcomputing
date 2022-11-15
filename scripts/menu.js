async function carregaConteudo(){
    const topics = await fetch("data/topics.json");
    const data = await topics.json()
    criaTopidos(data);
}

function criaTopidos(data){
    var numId = 1;
    data.forEach(umTopico => {
        criaTema(umTopico["titulo"], umTopico["subtitulo"], umTopico["principal"], numId);
        criaCorpoConteudo("topic_"+numId, umTopico["tipoLayout"], umTopico["conteudo"], umTopico["midias"], numId);
        numId++;
    });
}

function criaTema(titulo, subtitulo, principal, numId){
    var divItem = document.createElement("div");
    
    if(!principal){
        divItem.className = "carousel-item";
    }else{
        divItem.className = "carousel-item active";
    }

    var h1 = document.createElement("h1");
    h1.textContent = titulo;
    divItem.appendChild(h1);

    var link = document.createElement("a");
    link.className = "btn btn-lg btn-custom btn-roxo text-white";
    link.textContent = subtitulo;
    link.href = "#topic_"+numId;
    
    divItem.appendChild(link);

    var temas = document.getElementById("temas");
    temas.appendChild(divItem);
}

function criaCorpoConteudo(id, tipoLayout, conteudo, midias, numId){
    var section = document.createElement("section");
    section.style.backgroundColor = conteudo["backgroundColor"];
    section.className = "caixa";
    section.id = id;

    var container = document.createElement("div");
    container.className = "container";
    section.appendChild(container);

    var row = document.createElement("div");
    row.className = "row";
    container.appendChild(row);

    montaSubtopicos(row, tipoLayout, conteudo, midias);

    var body = document.getElementsByTagName("body");
    body[0].insertBefore(section, body[0].children[1+numId]);
}

function montaSubtopicos(row, tipoLayout, conteudo, midias){
    var blocoConteudo = montaBlocoConteudo(conteudo);

    switch (tipoLayout) {
        case "IMAGEM_DIREITA":
            var blocoMidia = montaBlocoMidia(midias);

            row.appendChild(blocoConteudo);
            row.appendChild(blocoMidia);
            break;
        case "IMAGEM_ESQUERDA":
            var blocoMidia = montaBlocoMidia(midias);

            row.appendChild(blocoMidia);
            row.appendChild(blocoConteudo);
            break;
        default:
            row.appendChild(blocoConteudo);
            break;
    }
}

function montaBlocoConteudo(conteudo){
    var divConteudo = document.createElement("div");
    divConteudo.className = conteudo["classeStyle"]
    divConteudo.style.color = conteudo["color"];

    var titulo = document.createElement("h2");
    titulo.textContent = conteudo["titulo"];
    divConteudo.appendChild(titulo);

    conteudo["paragrafos"].forEach(umParagrafo => {
        var subtitulo = document.createElement("h3");
        subtitulo.textContent = umParagrafo["subtitulo"];
        subtitulo.style.color = umParagrafo["subtituloColor"];
        divConteudo.appendChild(subtitulo);

        var corpo = document.createElement("p");
        corpo.textContent = umParagrafo["corpo"];
        corpo.style.color = umParagrafo["corpoColor"];
        divConteudo.appendChild(corpo);
    });
    return divConteudo;
}

function montaBlocoMidia(midias){
    var divMidia = document.createElement("div");
    divMidia.className = midias["classeStyle"];

    midias["agrupamento"].forEach(umAgrupamento => {
        var divAgrupamento = document.createElement("div");
        divAgrupamento.className = umAgrupamento["classeStyle"];

        umAgrupamento["imagens"].forEach(umaImagem => {
            var divImagem = document.createElement("div");
            divImagem.className = umaImagem["classeStyle"];
            
            var img = document.createElement("img");
            img.src = umaImagem["url"];
            img.className = "img-fluid"

            divImagem.appendChild(img);
            divAgrupamento.appendChild(divImagem);
        });
        divMidia.appendChild(divAgrupamento);
    });
    return divMidia;
}

carregaConteudo();

