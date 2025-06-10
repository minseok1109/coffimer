'use client';

import Image from 'next/image';
import { useState } from 'react';

interface YoutubeVideoProps {
    youtubeUrl: string;
    title: string;
}

export default function YoutubeVideo({ youtubeUrl, title }: YoutubeVideoProps) {
    const [imageError, setImageError] = useState(false);

    // 유튜브 URL에서 비디오 ID 추출 (개선된 버전)
    const getYoutubeId = (url: string) => {
        // youtu.be 형식 처리
        let match = url.match(/youtu\.be\/([^?&]+)/);
        if (match) return match[1];

        // youtube.com 형식 처리
        match = url.match(
            /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
        );
        return match?.[1] || '';
    };

    const videoId = getYoutubeId(youtubeUrl);
    // maxresdefault가 없을 경우를 대비해 hqdefault 사용
    const thumbnailUrl = imageError
        ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
        : `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    return (
        <div className="bg-white rounded-3xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-amber-900 mb-6 text-center">관련 영상</h3>

            <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="block group">
                <div className="relative overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-[1.02]">
                    <div className="relative aspect-video bg-gray-100">
                        {videoId ? (
                            <Image
                                src={thumbnailUrl}
                                alt={`${title} 유튜브 영상`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                onError={() => setImageError(true)}
                                priority
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-gray-500">썸네일을 불러올 수 없습니다</p>
                            </div>
                        )}

                        {/* 재생 버튼 오버레이 */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300 group-hover:bg-black/30">
                            <div className="bg-red-600 rounded-full p-4 transition-transform duration-300 group-hover:scale-110">
                                <svg
                                    width="40"
                                    height="40"
                                    viewBox="0 0 24 24"
                                    fill="white"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* 제목 */}
                    <div className="p-4 bg-gradient-to-t from-amber-50 to-white">
                        <p className="text-center text-gray-700 font-medium">{title} 영상 보기</p>
                    </div>
                </div>
            </a>
        </div>
    );
}
