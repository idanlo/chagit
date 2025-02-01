import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import moment from 'moment';

interface CalendarHeaderProps {
    currentDate: Date;
    onNextPeriod: () => void;
    onPreviousPeriod: () => void;
    view: 'month' | 'week';
}

export function CalendarHeader({
    currentDate,
    onNextPeriod,
    onPreviousPeriod,
    view,
}: CalendarHeaderProps) {
    const monthNames = Array.from({ length: 12 }, (_, i) =>
        moment().locale('he').month(i).format('MMMM')
    );

    const formatWeekRange = (date: Date) => {
        const start = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() - date.getDay()
        );
        const end = new Date(
            start.getFullYear(),
            start.getMonth(),
            start.getDate() + 6
        );
        return `${start.getDate()} ${
            monthNames[start.getMonth()]
        } - ${end.getDate()} ${monthNames[end.getMonth()]}`;
    };

    const title =
        view === 'month'
            ? `${
                  monthNames[currentDate.getMonth()]
              } ${currentDate.getFullYear()}`
            : formatWeekRange(currentDate);

    return (
        <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={onPreviousPeriod}
                >
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Previous {view}</span>
                </Button>
                <Button variant="outline" size="icon" onClick={onNextPeriod}>
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Next {view}</span>
                </Button>
            </div>
            <h2 className="text-2xl font-bold">{title}</h2>
        </div>
    );
}
