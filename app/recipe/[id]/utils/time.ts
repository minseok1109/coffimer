import { TIME_PAD_LENGTH, TIME_PAD_CHARACTER } from '../constants';

export const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(TIME_PAD_LENGTH, TIME_PAD_CHARACTER)}:${secs
        .toString()
        .padStart(TIME_PAD_LENGTH, TIME_PAD_CHARACTER)}`;
};

export const calculateProgress = (currentTime: number, totalTime: number): number => {
    if (totalTime === 0) return 0;
    return (currentTime / totalTime) * 100;
};