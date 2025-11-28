import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Evento from './models/Evento';
import path from 'path';

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

mongoose.connect('mongodb://localhost:27017/evento')
    .then(() => console.log('Conectado ao MongoDB'))
    .catch((err) => console.error('Erro ao conectar no MongoDB:', err));

// Create
app.post('/eventos', async (req: Request, res: Response) => {
    try {
        const evento = await Evento.create(req.body);
        res.status(201).json({ message: 'Evento criado com sucesso!', evento });
    } catch (error) {
        res.status(400).json({ error: 'Erro ao criar evento', details: error });
    }
});

// Read
app.get('/eventos', async (req: Request, res: Response) => {
    try {
        const { titulo } = req.query;
        let query = {};
        
        if (titulo) {
            query = { titulo: { $regex: titulo, $options: 'i' } };
        }

        const eventos = await Evento.find(query);
        res.json(eventos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar eventos' });
    }
});

// Update
app.put('/eventos/:id', async (req: Request, res: Response) => {
    try {
        const evento = await Evento.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!evento) return res.status(404).json({ error: 'Evento não encontrado' });
        
        res.json({ message: 'Evento atualizado com sucesso!', evento });
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar evento' });
    }
});

// Delete
app.delete('/eventos/:id', async (req: Request, res: Response) => {
    try {
        const evento = await Evento.findByIdAndDelete(req.params.id);
        if (!evento) return res.status(404).json({ error: 'Evento não encontrado' });
        
        res.json({ message: 'Evento excluído com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir evento' });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});