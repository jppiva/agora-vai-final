import pg from 'pg';
import 'dotenv/config';
import pkg from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const { PrismaClient } = pkg;
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Resetando tabela aluno...');

    // Remove todos os registros
    // await prisma.aluno.deleteMany();

    console.log('📦 Inserindo novos registros...');

    await prisma.alunos.createMany({
        data: [
            { nome: 'aluno piva', turma: 'c', materia:'matematica', foto: '' },
            { nome: 'aluno nunes', turma: 'a', materia:'matematica', foto: '' },
            { nome: 'aluno henrico', turma: 'a', materia:'matematica', foto: '' },
            { nome: 'aluno kaike', turma: 'c', materia:'matematica', foto: '' },
            { nome: 'aluno lucas', turma: 'a', materia:'matematica', foto: '' },
            { nome: 'aluno luiz', turma: 'a', materia:'matematica', foto: '' },

        ],
    });

    console.log('✅ Seed concluído!');
}

main()
    .catch((e) => {
        console.error('❌ Erro no seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });