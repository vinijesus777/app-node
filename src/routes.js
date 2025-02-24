const express = require('express');
const pool = require('./db');
const router = express.Router();

// Rota inicial
router.get('/', (req, res) => {
    res.send('🚀 API rodando com sucesso!');
});

// Criar um usuário
router.post('/users', async (req, res) => {
    try {
        const { name, email } = req.body;
        const newUser = await pool.query(
            'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
            [name, email]
        );
        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
});

// Listar usuários
router.get('/users', async (req, res) => {
    try {
        const users = await pool.query('SELECT * FROM users');
        res.json(users.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
});

module.exports = router;
