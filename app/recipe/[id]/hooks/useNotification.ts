import { useEffect } from 'react';
import { NOTIFICATION_SOUND } from '../constants';

export const useNotification = () => {
    // 알림 권한 요청
    useEffect(() => {
        if (Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }, []);

    const sendNotification = (title: string, body: string) => {
        // 브라우저 알림
        if (Notification.permission === 'granted') {
            new Notification(title, {
                body,
                icon: '/favicon.ico',
            });
        }

        // 사운드 알림
        const audio = new Audio(NOTIFICATION_SOUND);
        audio.play().catch(() => {}); // 에러 무시
    };

    return { sendNotification };
};