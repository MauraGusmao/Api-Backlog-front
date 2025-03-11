 interface Filme{
    id: number;
    titulo: string;
    diretor: string;
    genero: string;
    ano: number;
 }

 const apiURL = 'http://localhost:3000';

 async function BuscarFilmes(): Promise<Filme[]>{
    const response = await fetch(apiURL);
    if(!response.ok){
        throw new Error('erro ao buscar filmes!');
    }
    return response.json();
 }

 async function RenderizarFilmes(){
    try {
        const filmes = await BuscarFilmes();
        const lista = document.getElementById('lista-filmes') as HTMLUListElement;
        lista.innerHTML = '';

        filmes.forEach((filme) =>{
            const item = document.createElement('li');
            item.textContent = `${filme.titulo} - ${filme.diretor} - ${filme.genero} - ${filme.ano}`;

            const btnDeletar = document.createElement('button');
            btnDeletar.textContent = "deletar";
            btnDeletar.style.marginLeft = '15px';

            btnDeletar.addEventListener("click",()=> deletarFilme(filme.id));

            item.appendChild(btnDeletar);
            lista.appendChild(item);
            
        });
    } catch (error) {
        console.error(error);
        
    }

}

async function cadastrarFilme(filme: Omit<Filme, "id">) {
    const response = await fetch(apiURL,{
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(filme),
    });
    if(!response.ok){
        throw new Error("Erro ao cadastrar filme");
    }
    await RenderizarFilmes();
    
}
async function deletarFilme(id:number) {
    const response = await fetch(`${apiURL}/${id}` ,{method:"DELETE"});

    if (!response.ok) {
        throw new Error("Erro ao deletar o filme.");
    }
    await RenderizarFilmes();
}

const formFilme = document.getElementById("form-filme") as HTMLFormElement;
formFilme.addEventListener("submit", async (event)=>{

    const titulo = (document.getElementById("titulo")as HTMLInputElement).value;
    const diretor = (document.getElementById("diretor")as HTMLInputElement).value;
    const genero = (document.getElementById("genero")as HTMLInputElement).value;
});