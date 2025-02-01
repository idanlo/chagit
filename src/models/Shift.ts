import { Schema, model, models } from 'mongoose';

const shiftSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        startTime: {
            type: Date,
            required: true,
        },
        endTime: {
            type: Date,
            required: true,
        },
        wage: {
            type: Number,
            required: true,
        },
        salary: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Shift = models.Shift || model('Shift', shiftSchema);
