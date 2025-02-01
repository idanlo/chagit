// import Image from "next/image";
import { Calendar } from '@/components/calendar';
import { connectDB } from '@/lib/mongodb';
import { Shift } from '@/models/Shift';

export const dynamic = 'force-dynamic';

export default async function Home() {
    await connectDB();
    let events = await Shift.find();
    events = JSON.parse(JSON.stringify(events));

    return (
        <div>
            <Calendar events={events} />
        </div>
    );
}
