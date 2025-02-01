import { EventList } from './event-list';
import { DayEventsDialog } from './day-events-dialog';
import { Shift } from '@/lib/types';

interface CalendarGridProps {
    currentDate: Date;
    events: Shift[];
}

export function CalendarGrid({ currentDate, events }: CalendarGridProps) {
    const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    ).getDate();
    const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
    ).getDay();

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

    return (
        <div className="grid grid-cols-7 gap-2" style={{ direction: 'ltr' }}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center font-semibold p-2">
                    {day}
                </div>
            ))}
            {emptyDays.map((_, index) => (
                <div key={`empty-${index}`} className="p-2"></div>
            ))}
            {days.map((day) => (
                <DayEventsDialog
                    key={day}
                    date={
                        new Date(
                            currentDate.getFullYear(),
                            currentDate.getMonth(),
                            day
                        )
                    }
                    events={events.filter(
                        (event) =>
                            new Date(event.date).getDate() === day &&
                            new Date(event.date).getMonth() ===
                                currentDate.getMonth() &&
                            new Date(event.date).getFullYear() ===
                                currentDate.getFullYear()
                    )}
                >
                    <div className="border rounded-lg p-2 min-h-[100px] cursor-pointer hover:bg-muted">
                        <div className="font-semibold mb-1">{day}</div>
                        <EventList
                            events={events.filter(
                                (event) =>
                                    new Date(event.date).getDate() === day &&
                                    new Date(event.date).getMonth() ===
                                        currentDate.getMonth() &&
                                    new Date(event.date).getFullYear() ===
                                        currentDate.getFullYear()
                            )}
                        />
                    </div>
                </DayEventsDialog>
            ))}
        </div>
    );
}
