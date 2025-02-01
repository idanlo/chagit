'use server';

import { connectDB } from '@/lib/mongodb';
import { calculateSalary } from '@/lib/utils';
import { Shift } from '@/models/Shift';
import { revalidatePath } from 'next/cache';

import { z } from 'zod';

const createShiftSchema = z.object({
    title: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    wage: z.number(),
    date: z.string(),
});

export async function createShift(formData: FormData) {
    const shift = {
        title: formData.get('title'),
        startTime: formData.get('startTime'),
        endTime: formData.get('endTime'),
        wage: +formData.get('wage')!,
        date: formData.get('date'),
    };

    const validatedFields = createShiftSchema.safeParse(shift);

    if (!validatedFields.success) {
        throw new Error(
            JSON.stringify(validatedFields.error.flatten().fieldErrors)
        );
    }

    await connectDB();

    // Create the shift with all required fields
    await Shift.create({
        ...shift,
        salary: calculateSalary(
            validatedFields.data.startTime,
            validatedFields.data.endTime,
            validatedFields.data.wage
        ),
    });

    revalidatePath('/');
}
