import prisma from '../lib/services/prismaClient.js';

export default class AlunoModel {
    constructor({ id = null, nome, materia = true, turma = null, foto = null } = {}) {
        this.id = id;
        this.nome = nome;
        this.materia = materia;
        this.turma = turma;
        this.foto = foto;
    }

    async criar() {
        return prisma.alunos.create({
            data: {
                nome: this.nome,
                materia: this.materia,
                turma: this.turma,
                foto: this.foto,
            },
        });
    }

    async atualizar() {
        return prisma.alunos.update({
            where: { id: this.id },
            data: { nome: this.nome, materia: this.materia, turma: this.turma, foto: this.foto },
        });
    }

    async deletar() {
        return prisma.alunos.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.nome) {
            where.nome = { contains: filtros.nome, mode: 'insensitive' };
        }
        if (filtros.materia !== undefined) {
            where.materia = filtros.materia === 'true';
        }
        if (filtros.turma !== undefined) {
            where.turma = parseFloat(filtros.turma);
        }
        if (filtros.foto !== undefined) {
            where.foto = parseFloat(filtros.foto);
        }

        return prisma.alunos.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.alunos.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new AlunoModel(data);
    }
}