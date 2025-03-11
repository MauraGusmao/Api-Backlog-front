import express from "express";
import filmeController from "../controllers/filmeController.js";

const router = express.Router();
const filme = new filmeController();

router.get('/', (req, res) => {
    try {
        filme.BuscarTodosOsFilmes(req, res);
    } catch(err){
        res.status(500).json({erro: err.message});
    }

});

router.get("/:id", (req, res) => {
    try{
        filme.BuscarFilmePorId(req, res);
    }
    catch(err){
        res.status(500).json({erro: err.message});
    }
});

router.post('/', (req, res) => {
    try{
        filme.CadastrarFilme(req, res);
    }
    catch(err){
        res.status(500).json({erro: err.message});
    }
});

router.post('/pesquisar', (req, res) => {
    try{
        filme.BuscarGeneroEAnoFilme(req, res);
    }
    catch(err){
        res.status(500).json({erro: err.message});
    }
});


router.put('/:id', (req, res) => {
    try{
        filme.AtualizarFilme(req, res);
    }catch(err){
        res.status(500).json({erro: err.message});
    }
});

router.delete('/:id', (req, res) => {
    try{
        filme.DeletarFilme(req, res);
    }catch(err){
        res.status(500).json({ erro: err.message });
    }

});


export default router;
