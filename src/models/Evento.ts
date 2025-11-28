import mongoose, { Schema, Document } from 'mongoose';

export interface IEvento extends Document {
    titulo: string;
    descricao?: string;
    data: Date;
    local: string;
    valor: number;
}

const EventoSchema: Schema = new Schema ({
    titulo: { type: String, required: true }, 
    descricao: { type: String, required: false },
    data: { type: Date, required: true },
    local: { type: String, required: true },
    valor: { type: Number, required: true }
});

export default mongoose.model<IEvento>('Evento', EventoSchema);