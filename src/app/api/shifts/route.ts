import { connectDB } from '@/lib/mongodb';
import { Shift } from '@/models/Shift';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await connectDB();
        const shifts = await Shift.find().sort({ date: -1 });
        return NextResponse.json(shifts);
    } catch (error) {
        console.error('Failed to fetch shifts:', error);
        return NextResponse.json(
            { error: 'Failed to fetch shifts' },
            { status: 500 }
        );
    }
}
