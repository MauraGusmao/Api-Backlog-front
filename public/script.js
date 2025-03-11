"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const apiURL = 'http://localhost:3000';
function BuscarFilmes() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(apiURL);
        if (!response.ok) {
            throw new Error('erro ao buscar filmes!');
        }
        return response.json();
    });
}
function RenderizarFilmes() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const filmes = yield BuscarFilmes();
            const lista = document.getElementById('lista-filmes');
            lista.innerHTML = '';
            filmes.forEach((filme) => {
                const item = document.createElement('li');
                item.textContent = `${filme.titulo} - ${filme.diretor} - ${filme.genero} - ${filme.ano}`;
                const btnDeletar = document.createElement('button');
                btnDeletar.textContent = "deletar";
                btnDeletar.style.marginLeft = '15px';
                btnDeletar.addEventListener("click", () => deletarFilme(filme.id));
                item.appendChild(btnDeletar);
                lista.appendChild(item);
            });
        }
        catch (error) {
            console.error(error);
        }
    });
}
function cadastrarFilme(filme) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(apiURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(filme),
        });
        if (!response.ok) {
            throw new Error("Erro ao cadastrar filme");
        }
        yield RenderizarFilmes();
    });
}
function deletarFilme(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${apiURL}/${id}`, { method: "DELETE" });
        if (!response.ok) {
            throw new Error("Erro ao deletar o filme.");
        }
        yield RenderizarFilmes();
    });
}
const formFilme = document.getElementById("form-filme");
formFilme.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    const titulo = document.getElementById("titulo").value;
    const diretor = document.getElementById("diretor").value;
    const genero = document.getElementById("genero").value;
}));
