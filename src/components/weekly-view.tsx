import { DayEventsDialog } from './day-events-dialog';
import { Shift } from '@/lib/types';

interface WeeklyViewProps {
    currentDate: Date;
    events: Shift[];
}

export function WeeklyView({ currentDate, events }: WeeklyViewProps) {
    const weekStart = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay()
    );
    const weekDays = Array.from(
        { length: 7 },
        (_, i) =>
            new Date(
                weekStart.getFullYear(),
                weekStart.getMonth(),
                weekStart.getDate() + i
            )
    );

    return (
        <div className="grid grid-cols-7 gap-2" style={{ direction: 'ltr' }}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center font-semibold p-2">
                    {day}
                </div>
            ))}
            {weekDays.map((day) => (
                <DayEventsDialog
                    key={day.toISOString()}
                    date={day}
                    events={events.filter(
                        (event) =>
                            new Date(event.date).toDateString() ===
                            day.toDateString()
                    )}
                >
                    <div className="border rounded-lg p-2 min-h-[200px] cursor-pointer hover:bg-muted">
                        <div className="font-semibold mb-1">
                            {day.getDate()}
                        </div>
                        <ul className="text-xs space-y-1">
                            {events
                                .filter(
                                    (event) =>
                                        new Date(event.date).toDateString() ===
                                        day.toDateString()
                                )
                                .map((event, index) => (
                                    <li
                                        key={index}
                                        className="bg-primary text-primary-foreground p-1 rounded"
                                    >
                                        {event.title}
                                    </li>
                                ))}
                        </ul>
                    </div>
                </DayEventsDialog>
            ))}
        </div>
    );
}
