const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController");
const router = Router();

router.get("/pessoas", PessoaController.pegaTodasAsPessoas);
router.get("/pessoas/:id", PessoaController.listarPessoasPorId);
router.post("/pessoas", PessoaController.cadastrarPessoas);
router.delete("/pessoas/:id", PessoaController.deletarPessoas);
router.put("/pessoas/:id", PessoaController.atualizarPessoas);
module.exports = router;
