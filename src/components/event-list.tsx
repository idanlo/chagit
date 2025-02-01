import { Shift } from '@/lib/types';
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import moment from 'moment';

interface EventListProps {
    events: Shift[];
    detailed?: boolean;
}

export function EventList({ events, detailed }: EventListProps) {
    return (
        <ul className="text-xs space-y-1">
            {events.map((event) =>
                detailed ? (
                    <DetailedEvent key={event._id} event={event} />
                ) : (
                    <li
                        key={event._id}
                        className="bg-primary text-primary-foreground p-1 rounded"
                    >
                        {event.title}
                    </li>
                )
            )}
        </ul>
    );
}

function DetailedEvent({ event }: { event: Shift }) {
    return (
        <Card className="text-lg">
            <CardHeader>
                <CardTitle>{event.title}</CardTitle>
                <CardDescription>
                    {(
                        moment(event.endTime).diff(
                            moment(event.startTime),
                            'minutes'
                        ) / 60
                    ).toFixed(2)}{' '}
                    שעות עבודה
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>₪{event.salary}</p>
            </CardContent>
        </Card>
    );
}
