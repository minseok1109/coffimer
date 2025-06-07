import { useEffect, useRef } from 'react';
import { NOTIFICATION_SOUND } from '../constants';

export const useNotification = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const isInitializedRef = useRef(false);

    // 오디오 초기화 및 권한 요청
    useEffect(() => {
        if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }

        // 오디오 사전 로드
        if (typeof window !== 'undefined') {
            audioRef.current = new Audio(NOTIFICATION_SOUND);
            audioRef.current.preload = 'auto';
            
            // 볼륨 설정
            audioRef.current.volume = 0.8;
        }
    }, []);

    // 사용자 상호작용으로 오디오 활성화
    const initializeAudio = () => {
        if (audioRef.current && !isInitializedRef.current) {
            // 무음으로 한 번 재생해서 오디오 컨텍스트 활성화
            audioRef.current.volume = 0;
            audioRef.current.play().then(() => {
                isInitializedRef.current = true;
                if (audioRef.current) {
                    audioRef.current.volume = 0.8;
                }
            }).catch(() => {});
        }
    };

    const sendNotification = (title: string, body: string) => {
        // 사운드 알림 시도
        if (audioRef.current) {
            // 현재 시간을 리셋해서 처음부터 재생
            audioRef.current.currentTime = 0;
            
            const playPromise = audioRef.current.play();
            
            if (playPromise !== undefined) {
                playPromise.catch((error) => {
                    console.log('오디오 재생 실패:', error);
                });
            }
        }
    };

    return { sendNotification, initializeAudio };
};