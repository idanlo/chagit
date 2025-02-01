import { clsx, type ClassValue } from 'clsx';
import moment from 'moment';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function calculateSalary(
    startTime: string | Date,
    endTime: string | Date,
    wage: string | number
) {
    return (moment(endTime).diff(moment(startTime), 'minutes') / 60) * +wage;
}
