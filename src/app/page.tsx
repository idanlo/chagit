// import Image from "next/image";
import { Calendar } from '@/components/calendar';
import { connectDB } from '@/lib/mongodb';
import { Shift } from '@/models/Shift';

// const events = [
//     {
//         date: new Date(new Date().getFullYear(), new Date().getMonth(), 5),
//         title: 'Team Meeting',
//     },
//     {
//         date: new Date(new Date().getFullYear(), new Date().getMonth(), 5),
//         title: 'Team Meeting2',
//     },
//     {
//         date: new Date(new Date().getFullYear(), new Date().getMonth(), 5),
//         title: 'Team Meeting3',
//     },
//     {
//         date: new Date(new Date().getFullYear(), new Date().getMonth(), 10),
//         title: 'Project Deadline',
//     },
//     {
//         date: new Date(new Date().getFullYear(), new Date().getMonth(), 15),
//         title: 'Birthday Party',
//     },
//     {
//         date: new Date(new Date().getFullYear(), new Date().getMonth(), 20),
//         title: 'Conference Call',
//     },
// ];

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
