'use client';

import { useEffect, useCallback } from 'react';
import { overlay } from 'overlay-kit';
import AppLaunchModal from './AppLaunchModal';

const STORAGE_KEY = 'coffimer_app_launch_modal_hidden_until';
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function shouldShowModal(): boolean {
    if (typeof window === 'undefined') return false;

    const hiddenUntil = localStorage.getItem(STORAGE_KEY);
    if (!hiddenUntil) return true;

    const hiddenUntilTime = parseInt(hiddenUntil, 10);
    if (isNaN(hiddenUntilTime)) return true;

    return Date.now() > hiddenUntilTime;
}

function hideModalForToday(): void {
    const hiddenUntil = Date.now() + ONE_DAY_MS;
    localStorage.setItem(STORAGE_KEY, hiddenUntil.toString());
}

export function useAppLaunchModal() {
    const openModal = useCallback(() => {
        const overlayId = overlay.open(({ isOpen, close }) => (
            <AppLaunchModal
                isOpen={isOpen}
                onClose={close}
                onHideForToday={() => {
                    hideModalForToday();
                    close();
                }}
            />
        ));

        return overlayId;
    }, []);

    useEffect(() => {
        // 클라이언트 사이드에서만 실행
        if (typeof window === 'undefined') return;

        // 약간의 딜레이 후 모달 표시 (페이지 로딩 후)
        const timer = setTimeout(() => {
            if (shouldShowModal()) {
                openModal();
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [openModal]);

    return { openModal };
}

