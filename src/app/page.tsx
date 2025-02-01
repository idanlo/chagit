// import Image from "next/image";
import { Calendar } from '@/components/calendar';
import { connectDB, getShifts } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export default async function Home() {
    await connectDB();
    const shifts = await getShifts();
    const events = JSON.parse(JSON.stringify(shifts));

    return (
        <div>
            <Calendar events={events} />
        </div>
    );
}
