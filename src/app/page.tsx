// import Image from "next/image";
import { Calendar } from '@/components/calendar';

export const dynamic = 'force-dynamic';

async function getShifts() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_APP_URL}/api/shifts`,
            {
                cache: 'no-store',
            }
        );

        if (!res.ok) {
            throw new Error('Failed to fetch shifts');
        }

        return res.json();
    } catch (error) {
        console.error('Error fetching shifts:', error);
        return [];
    }
}

export default async function Home() {
    const events = await getShifts();

    return (
        <div>
            <Calendar events={events} />
        </div>
    );
}
