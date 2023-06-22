const database = require("../models");

class NivelController {
  static async listarNiveis(req, res) {
    try {
      const niveisListados = await database.Niveis.findAll();
      res.status(200).json(niveisListados);
    } catch (error) {
      res.status(500).send({ message: "Não foi possível listar niveis!" });
    }
  }
  static async listarNiveisPorID(req, res) {
    try {
      const { id } = req.params;
      const niveisListadosPorId = await database.Niveis.findOne({
        where: { id },
      });
      res.status(200).json(niveisListadosPorId);
    } catch (error) {
      res
        .status(500)
        .send({ message: "Não foi possivel listar niveis por ID!" });
    }
  }
  static async cadastrarNiveis(req, res) {
    try {
      const { descr_nivel } = req.body;
      const nivelCadastrado = await database.Niveis.create({
        descr_nivel,
      });
      res
        .status(200)
        .json({ message: "Nivel cadastrado com sucesso", nivelCadastrado });
    } catch (error) {
      res.status(500).send({ message: "Não foi possível cadastar nivel!" });
    }
  }
  static async atualizarNivel(req, res) {
    try {
      const { id } = req.params;
      const { descr_nivel } = req.body;
      const nivelBody = {
        descr_nivel,
      };
      await database.Niveis.update(nivelBody, { where: { id } });
      const nivelAtualizado = await database.Niveis.findOne({ where: { id } });
      res.status(200).send({ message: "Nivel atualizado com sucesso!" });
    } catch (error) {
      res.status(500).send({ message: "Não foi possivel atualizar nivel!" });
    }
  }
  static async deletarNivel(req, res) {
    try {
      const { id } = req.params;
      const nivelDeletado = await database.Niveis.destroy({ where: { id } });
      res.status(200).send({ message: "Nivel deletado com sucesso!" });
    } catch (error) {
      res.status(500).send({ message: "Não foi possível deletar nível!" });
    }
  }
}

module.exports = NivelController;
