'use client';

import { useState } from 'react';
import { CalendarHeader } from './calendar-header';
import { CalendarGrid } from './calendar-grid';
import { WeeklyView } from './weekly-view';
import { Button } from '@/components/ui/button';
import moment from 'moment';
import { Shift } from '@/lib/types';

type CalendarView = 'month' | 'week';

moment.locale('he');

export function Calendar({ events }: { events: Shift[] }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [view, setView] = useState<CalendarView>('month');

    const goToNextPeriod = () => {
        if (view === 'month') {
            setCurrentDate(
                new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() + 1,
                    1
                )
            );
        } else {
            setCurrentDate(
                new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    currentDate.getDate() + 7
                )
            );
        }
    };

    const goToPreviousPeriod = () => {
        if (view === 'month') {
            setCurrentDate(
                new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() - 1,
                    1
                )
            );
        } else {
            setCurrentDate(
                new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    currentDate.getDate() - 7
                )
            );
        }
    };

    const toggleView = () => {
        setView(view === 'month' ? 'week' : 'month');
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <CalendarHeader
                    currentDate={currentDate}
                    onNextPeriod={goToNextPeriod}
                    onPreviousPeriod={goToPreviousPeriod}
                    view={view}
                />
                <Button onClick={toggleView}>
                    {view === 'month'
                        ? 'החלף לצפייה שבועית'
                        : 'החלף לצפייה חודשית'}
                </Button>
            </div>
            {view === 'month' ? (
                <CalendarGrid currentDate={currentDate} events={events} />
            ) : (
                <WeeklyView currentDate={currentDate} events={events} />
            )}
        </div>
    );
}
