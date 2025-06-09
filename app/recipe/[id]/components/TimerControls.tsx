'use client';

interface TimerControlsProps {
    isRunning: boolean;
    onToggle: () => void;
    onReset: () => void;
}

export default function TimerControls({ isRunning, onToggle, onReset }: TimerControlsProps) {
    return (
        <div className="flex justify-center space-x-3">
            <StartPauseButton isRunning={isRunning} onClick={onToggle} />
            <ResetButton onClick={onReset} />
        </div>
    );
}

// 시작/일시정지 버튼 분리 (조건부 스타일링 단순화)
function StartPauseButton({ isRunning, onClick }: { isRunning: boolean; onClick: () => void }) {
    const buttonStyles = isRunning
        ? 'bg-red-500 hover:bg-red-600'
        : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700';

    const buttonText = isRunning ? '일시정지' : '시작';

    return (
        <button
            onClick={onClick}
            className={`px-6 py-3 rounded-full font-medium text-white transition-all transform hover:scale-105 ${buttonStyles}`}
        >
            {buttonText}
        </button>
    );
}

// 리셋 버튼 분리
function ResetButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="px-6 py-3 border-2 border-amber-600 text-amber-700 rounded-full font-medium hover:bg-amber-50 transition-colors"
        >
            리셋
        </button>
    );
}
