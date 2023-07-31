const database = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class TurmasController {
  static async cadastrarTurmas(req, res) {
    try {
      const { data_inicio, docente_id, nivel_id } = req.body;
      const turmaCadastrada = await database.Turmas.create({
        data_inicio,
        docente_id,
        nivel_id,
      });
      res
        .status(200)
        .json({ message: "Turma cadastrada com sucesso", turmaCadastrada });
    } catch (error) {
      res.status(500).send({ message: "Não foi possível cadastrar Turma!" });
    }
  }
  static async listarTurmas(req, res) {
    const { data_inicial, data_final } = req.query;
    const where = {};
    data_inicial || data_final ? (where.data_inicio = {}) : null;
    data_inicial ? (where.data_inicio[Op.gte] = data_inicial) : null;
    data_final ? (where.data_inicio[Op.lte] = data_final) : null;
    try {
      const listarTudo = await database.Turmas.findAll({ where });
      res.status(200).json(listarTudo);
    } catch (error) {
      res.status(500).send({ message: "Não foi possível listar Turmas!" });
    }
  }
  static async listarTurmasPorId(req, res) {
    try {
      const { id } = req.params;
      const turmaListadaPorId = await database.Turmas.findOne({
        where: { id },
      });
      res.status(200).json(turmaListadaPorId);
    } catch (error) {
      res
        .status(500)
        .send({ message: "Não foi possível listar turma por ID!" });
    }
  }
  static async atualizarTurmas(req, res) {
    try {
      const { id } = req.params;
      const { data_inicio, docente_id, nivel_id } = req.body;
      const turmaBody = {
        data_inicio,
        docente_id,
        nivel_id,
      };
      await database.Turmas.update(turmaBody, { where: { id } });
      const turmaAtualizada = await database.Turmas.findOne({ where: { id } });
      res.status(200).send({ message: "Turma atualizada com sucesso!" });
    } catch (error) {
      res.status(500).send({
        message: "Não foi possível atualizar turma!",
        turmaAtualizada,
      });
    }
  }
  static async deletarTurma(req, res) {
    try {
      const { id } = req.params;
      const turmaDeletada = await database.Turmas.destroy({ where: { id } });
      res.status(200).send({ message: "Turma deletada com sucesso!" });
    } catch (error) {
      res.status(500).send({ message: "Não foi possível deletar turma!" });
    }
  }
  static async restauraTurma(req, res) {
    const { id } = req.params;
    try {
      await database.Turmas.restore({ where: { id } });
      res.status(200).json({ message: `Id ${id} restaurado!` });
    } catch (error) {
      res.status(500).send({ message: "Não foi possível restaurar turma!" });
    }
  }
}
module.exports = TurmasController;
