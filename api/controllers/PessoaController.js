const database = require("../models");

class PessoaController {
  static async pegaTodasAsPessoas(req, res) {
    try {
      const todasAsPessoas = await database.Pessoas.findAll(); //não é o nome do arquivo é oq esta retornando

      res.status(200).json(todasAsPessoas);
    } catch (error) {
      res.status(500).send({ message: "Error ao listas pessoas!" });
    }
  }
  static async listarPessoasPorId(req, res) {
    const { id } = req.params;
    try {
      const pessoasPorId = await database.Pessoas.findOne({ where: { id } });
      res.status(200).json(pessoasPorId);
    } catch (error) {
      res
        .status(500)
        .send({ message: "Não foi possivel listar pessoas por ID!" });
    }
  }
  static async cadastrarPessoas(req, res) {
    try {
      const { nome, ativo, email, role } = req.body;
      const pessoaCadastrada = await database.Pessoas.create({
        nome,
        ativo,
        email,
        role,
      });
      res
        .status(200)
        .json({ message: "Pessoa cadastrada com sucesso", pessoaCadastrada });
    } catch (error) {
      res.status(500).send({ message: "Pessoa não cadastrada no sistema!" });
    }
  }
  static async deletarPessoas(req, res) {
    try {
      const { id } = req.params;
      const pessoaDeletada = await database.Pessoas.destroy({ where: { id } });
      res.status(200).send({ message: "Pessoa deletada com sucesso!" });
    } catch (error) {
      res.status(500).send({ message: "Erro ao deletar pessoa do sistema!" });
    }
  }
  static async atualizarPessoas(req, res) {
    const { id } = req.params;
    const { nome, ativo, email, role } = req.body;
    const pessoaBody = {
      nome,
      ativo,
      email,
      role,
    };
    try {
      await database.Pessoas.update(pessoaBody, { where: { id } });
      const pessoaAtualizada = await database.Pessoas.findOne({
        where: { id },
      });
      res.status(200).json(pessoaAtualizada);
    } catch (error) {
      res.status(500).send({ message: "Pessoa não atualizada!" });
    }
  }
  static async restauraPessoa(req, res) {
    const { id } = req.params;
    try {
      await database.Pessoas.restore({ where: { id } });
      res.status(200).json({ message: `Id ${id} restaurado!` });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Não foi possível listar pessoas deletadas!" });
    }
  }
  static async listarPessoasPorMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      const pessoasPorMatricula = await database.Matriculas.findOne({
        where: { id: Number(matriculaId), estudante_id: Number(estudanteId) },
      });
      res.status(200).json(pessoasPorMatricula);
    } catch (error) {
      res
        .status(500)
        .send({ message: "Não foi possivel listar matricula por ID!" });
    }
  }
  static async cadastrarMatricula(req, res) {
    const { estudanteId } = req.params;
    const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) };
    try {
      const matriculaCadastrada = await database.Matriculas.create(
        novaMatricula
      );
      res.status(200).json({
        message: "Pessoa cadastrada com sucesso",
        matriculaCadastrada,
      });
    } catch (error) {
      res.status(500).send({ message: "Matricula não cadastrada no sistema!" });
    }
  }
  static async atualizarMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    const matriculaBody = req.body;
    try {
      await database.Matriculas.update(matriculaBody, {
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId),
        },
      });
      const matriculaAtualizada = await database.Matriculas.findOne({
        where: { id: Number(matriculaId) },
      });
      res.status(200).json(matriculaAtualizada);
    } catch (error) {
      res.status(500).send({ message: "Matricula não atualizada!" });
    }
  }
  static async deletarMatricula(req, res) {
    try {
      const { estudanteId, matriculaId } = req.params;
      const matriculaDeletada = await database.Matriculas.destroy({
        where: { id: Number(matriculaId) },
      });
      res
        .status(200)
        .send({ message: `Matricula ${matriculaId} deletada com sucesso!` });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Erro ao deletar matricula do sistema!" });
    }
  }
  static async restauraMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      await database.Matriculas.restore({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId),
        },
      });
      res.status(200).json({ message: `Id ${id} restaurado` });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Não foi possível restaurar matrícula!" });
    }
  }
}
module.exports = PessoaController;
