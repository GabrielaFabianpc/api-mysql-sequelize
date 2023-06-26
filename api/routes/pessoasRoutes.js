const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController");
const router = Router();

router.get("/pessoas", PessoaController.pegaTodasAsPessoas);
router.get("/pessoas/:id", PessoaController.listarPessoasPorId);
router.post("/pessoas", PessoaController.cadastrarPessoas);
router.delete("/pessoas/:id", PessoaController.deletarPessoas);
router.put("/pessoas/:id", PessoaController.atualizarPessoas);
router.post("/pessoas/:id/restaura", PessoaController.restauraPessoa);
router.get(
  "/pessoas/:estudanteId/matriculas/:matriculaId",
  PessoaController.listarPessoasPorMatricula
);
router.post(
  "/pessoas/:estudanteId/matriculas",
  PessoaController.cadastrarMatricula
);
router.put(
  "/pessoas/:estudanteId/matriculas/:matriculaId",
  PessoaController.atualizarMatricula
);
router.delete(
  "/pessoas/:estudanteId/matriculas/:matriculaId",
  PessoaController.deletarMatricula
);
router.post(
  "/pessoas/:estudanteId/:matriculaId/restaura",
  PessoaController.restauraMatricula
);
module.exports = router;
