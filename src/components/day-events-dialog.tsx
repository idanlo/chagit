'use client';

import type React from 'react';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { EventList } from './event-list';
import { CreateShiftForm } from './create-event-form';
import { Shift } from '@/lib/types';
import moment from 'moment';

interface DayEventsDialogProps {
    date: Date;
    events: Shift[];
    children: React.ReactNode;
}

export function DayEventsDialog({
    date,
    events,
    children,
}: DayEventsDialogProps) {
    const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {moment(date).format('Do MMMM YYYY')}
                    </DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <h3 className="text-lg font-semibold mb-2">משמרות:</h3>
                    <EventList events={events} detailed />
                    <Button
                        className="mt-4"
                        onClick={() => setIsCreateEventOpen(true)}
                    >
                        יצירת משמרת חדשה
                    </Button>
                </div>
            </DialogContent>
            {isCreateEventOpen && (
                <CreateShiftForm
                    date={date}
                    onClose={() => setIsCreateEventOpen(false)}
                />
            )}
        </Dialog>
    );
}
