import type React from 'react';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createShift } from '@/app/actions';
import moment from 'moment';
import { useToast } from '@/hooks/use-toast';
import { DateTimePicker24h } from './ui/date-time-picker';
import { useState } from 'react';
import { calculateSalary } from '@/lib/utils';

interface CreateShiftFormProps {
    date: Date;
    onClose: () => void;
}

export function CreateShiftForm({ date, onClose }: CreateShiftFormProps) {
    const { toast } = useToast();
    const [startTime, setStartTime] = useState(date);
    const [endTime, setEndTime] = useState(date);
    const [wage, setWage] = useState('0');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            formData.set('date', date.toISOString());
            formData.set('startTime', startTime.toISOString());
            formData.set('endTime', endTime.toISOString());
            await createShift(formData);
            toast({
                title: 'משמרת נוצרה בהצלחה',
            });
        } catch (e) {
            toast({
                title: 'שגיאה ביצירת משמרת',
                description: e?.toString() || JSON.stringify(e),
            });
            onClose();
        } finally {
            onClose();
        }
    };

    const calculatedSalary = calculateSalary(startTime, endTime, wage).toFixed(
        3
    );

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        צור משמרת חדשה ל{moment(date).format('Do [ב]MMMM YYYY')}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="title">כותרת</Label>
                        <Input id="title" name="title" required />
                    </div>
                    <div>
                        <Label htmlFor="startTime">זמן התחלה</Label>
                        <DateTimePicker24h
                            date={startTime}
                            setDate={setStartTime}
                        />
                    </div>
                    <div>
                        <Label htmlFor="endTime">זמן סיום</Label>
                        <DateTimePicker24h
                            date={endTime}
                            setDate={setEndTime}
                        />
                    </div>
                    <div>
                        <Label htmlFor="wage">שכר שעתי</Label>
                        <Input
                            id="wage"
                            name="wage"
                            type="number"
                            step="0.01"
                            min="0"
                            required
                            value={wage}
                            onChange={(e) => setWage(e.target.value)}
                        />
                    </div>

                    <div>שכר משוער: {calculatedSalary}₪</div>
                    <Button type="submit">יצירת משמרת</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
