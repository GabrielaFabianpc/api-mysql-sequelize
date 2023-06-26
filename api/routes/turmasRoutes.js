const { Router } = require("express");
const TurmasController = require("../controllers/TurmasController");

const router = Router();

router.get("/turmas", TurmasController.listarTurmas);
router.get("/turmas/:id", TurmasController.listarTurmasPorId);
router.post("/turmas", TurmasController.cadastrarTurmas);
router.put("/turmas/:id", TurmasController.atualizarTurmas);
router.delete("/turmas/:id", TurmasController.deletarTurma);
router.post("/turmas/:id/restaura", TurmasController.restauraTurma);

module.exports = router;
