const { Router } = require("express");
const NivelController = require("../controllers/NivelController");
const router = Router();

router.get("/niveis", NivelController.listarNiveis);
router.get("/niveis/:id", NivelController.listarNiveisPorID);
router.post("/niveis", NivelController.cadastrarNiveis);
router.put("/niveis/:id", NivelController.atualizarNivel);
router.delete("/niveis/:id", NivelController.deletarNivel);
router.post("/niveis/:id/restaura", NivelController.restauraNivel);
module.exports = router;
