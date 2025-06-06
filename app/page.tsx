'use client';

import { useState, useEffect } from 'react';

export default function Page() {
    const [isVisible, setIsVisible] = useState(false);
    const [currentRecipe, setCurrentRecipe] = useState(0);

    const recipes = [
        { name: 'V60 클래식', time: '4분', difficulty: '초급' },
        { name: '케멕스 골드', time: '6분', difficulty: '중급' },
        { name: '에어로프레스', time: '3분', difficulty: '초급' },
    ];

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setCurrentRecipe((prev) => (prev + 1) % recipes.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50"
            data-oid="kvvk.1g"
        >
            {/* Navigation */}
            <nav
                className="px-6 py-4 flex justify-between items-center bg-white/80 backdrop-blur-sm border-b border-amber-100"
                data-oid="2__qkci"
            >
                <div className="flex items-center space-x-2" data-oid="1:_0tu8">
                    <div
                        className="w-8 h-8 bg-gradient-to-br from-amber-600 to-orange-600 rounded-lg flex items-center justify-center"
                        data-oid="bivx.zp"
                    >
                        <span className="text-white text-sm font-bold" data-oid="64bge03">
                            ☕
                        </span>
                    </div>
                    <span className="text-xl font-bold text-amber-900" data-oid="qi763:j">
                        드립마스터
                    </span>
                </div>
                <div className="flex space-x-4" data-oid="whw.zr3">
                    <button
                        className="text-amber-700 hover:text-amber-900 font-medium"
                        data-oid="fro5jy-"
                    >
                        레시피
                    </button>
                    <button
                        className="text-amber-700 hover:text-amber-900 font-medium"
                        data-oid="m54_bvb"
                    >
                        커뮤니티
                    </button>
                    <button
                        className="px-4 py-2 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition-colors"
                        data-oid="460ti_r"
                    >
                        시작하기
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="max-w-6xl mx-auto px-6 py-16" data-oid="25yyh32">
                <div className="grid lg:grid-cols-2 gap-12 items-center" data-oid="fovq0ea">
                    <div
                        className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                        data-oid="4b-f4.7"
                    >
                        <h1
                            className="text-5xl lg:text-6xl font-bold text-amber-900 leading-tight mb-6"
                            data-oid="gct-smv"
                        >
                            완벽한 핸드드립
                            <br data-oid="ft5dhbd" />
                            <span className="text-orange-600" data-oid="u2-09n0">
                                커피의 시작
                            </span>
                        </h1>

                        <p
                            className="text-xl text-amber-700 mb-8 leading-relaxed"
                            data-oid="9zon-_-"
                        >
                            세계 유명 바리스타들의 검증된 레시피와 정밀한 타이머로
                            <br data-oid="j9n66gk" />
                            집에서도 카페 수준의 핸드드립 커피를 만들어보세요.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-12" data-oid="j_0wy2r">
                            <button
                                className="px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full font-semibold hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg"
                                data-oid="s2d:5mf"
                            >
                                무료로 시작하기
                            </button>
                            <button
                                className="px-8 py-4 border-2 border-amber-600 text-amber-700 rounded-full font-semibold hover:bg-amber-50 transition-colors"
                                data-oid="1tk5:j5"
                            >
                                레시피 둘러보기
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6" data-oid=":vk4dxc">
                            <div className="text-center" data-oid="vqpkjer">
                                <div
                                    className="text-3xl font-bold text-amber-900"
                                    data-oid="7y711kt"
                                >
                                    50+
                                </div>
                                <div className="text-amber-600 text-sm" data-oid="q2q_6pf">
                                    검증된 레시피
                                </div>
                            </div>
                            <div className="text-center" data-oid="v4f9nj0">
                                <div
                                    className="text-3xl font-bold text-amber-900"
                                    data-oid="2m0h5yb"
                                >
                                    10K+
                                </div>
                                <div className="text-amber-600 text-sm" data-oid="uqnowze">
                                    활성 사용자
                                </div>
                            </div>
                            <div className="text-center" data-oid="jn.iz1t">
                                <div
                                    className="text-3xl font-bold text-amber-900"
                                    data-oid="tv6vx-3"
                                >
                                    4.9★
                                </div>
                                <div className="text-amber-600 text-sm" data-oid="qxyp3qd">
                                    사용자 평점
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Interactive Recipe Card */}
                    <div
                        className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                        data-oid="z5c68gc"
                    >
                        <div className="relative" data-oid="l5bgzxt">
                            {/* Phone Mockup */}
                            <div
                                className="bg-gray-900 rounded-[3rem] p-2 shadow-2xl"
                                data-oid="pf9idye"
                            >
                                <div
                                    className="bg-white rounded-[2.5rem] overflow-hidden"
                                    data-oid="qu1zshb"
                                >
                                    {/* Status Bar */}
                                    <div
                                        className="bg-gray-100 px-6 py-2 flex justify-between items-center text-xs"
                                        data-oid="o8l49m:"
                                    >
                                        <span data-oid="._:x_ys">9:41</span>
                                        <div className="flex space-x-1" data-oid="3n2fz5b">
                                            <div
                                                className="w-4 h-2 bg-green-500 rounded-sm"
                                                data-oid="gvod.oq"
                                            ></div>
                                            <div
                                                className="w-4 h-2 bg-green-500 rounded-sm"
                                                data-oid="i7x6-v1"
                                            ></div>
                                            <div
                                                className="w-4 h-2 bg-green-500 rounded-sm"
                                                data-oid="-16s7ks"
                                            ></div>
                                        </div>
                                    </div>

                                    {/* App Content */}
                                    <div className="p-6 h-96" data-oid="g7nh3c1">
                                        <div className="text-center mb-6" data-oid="2a.mnfg">
                                            <h3
                                                className="text-2xl font-bold text-amber-900 mb-2"
                                                data-oid="s861j4n"
                                            >
                                                {recipes[currentRecipe].name}
                                            </h3>
                                            <div
                                                className="flex justify-center space-x-4 text-sm text-amber-600"
                                                data-oid=".utzu0i"
                                            >
                                                <span data-oid="2svh:4x">
                                                    ⏱ {recipes[currentRecipe].time}
                                                </span>
                                                <span data-oid="rro32bc">
                                                    📊 {recipes[currentRecipe].difficulty}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Timer Display */}
                                        <div
                                            className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-6 mb-6"
                                            data-oid=":6vsi-o"
                                        >
                                            <div className="text-center" data-oid="t1gqmzx">
                                                <div
                                                    className="text-4xl font-mono font-bold text-amber-900 mb-2"
                                                    data-oid="kkyif7z"
                                                >
                                                    03:24
                                                </div>
                                                <div
                                                    className="w-full bg-amber-200 rounded-full h-2"
                                                    data-oid="ouuidny"
                                                >
                                                    <div
                                                        className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full w-3/4 transition-all duration-1000"
                                                        data-oid="3c2hxom"
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Current Step */}
                                        <div
                                            className="bg-white border border-amber-200 rounded-xl p-4"
                                            data-oid="_x3ncod"
                                        >
                                            <div
                                                className="text-sm text-amber-600 mb-1"
                                                data-oid="km:da.j"
                                            >
                                                3단계 / 5단계
                                            </div>
                                            <div
                                                className="font-semibold text-amber-900"
                                                data-oid="vrij:ai"
                                            >
                                                물을 천천히 부어주세요
                                            </div>
                                            <div
                                                className="text-sm text-amber-700 mt-1"
                                                data-oid=":fw3bf5"
                                            >
                                                30ml씩 원을 그리며 부어주세요
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Elements */}
                            <div
                                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg animate-bounce"
                                data-oid="xe7zp4q"
                            >
                                <span className="text-2xl" data-oid="d283k:h">
                                    ☕
                                </span>
                            </div>
                            <div
                                className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-pulse"
                                data-oid="6v39r-e"
                            >
                                <span className="text-xl" data-oid="fm7k4ql">
                                    ⏰
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Features Section */}
            <section className="bg-white/50 backdrop-blur-sm py-16" data-oid="ovuwpwm">
                <div className="max-w-6xl mx-auto px-6" data-oid="pva3qv7">
                    <h2
                        className="text-3xl font-bold text-center text-amber-900 mb-12"
                        data-oid="peua1ov"
                    >
                        왜 드립마스터를 선택해야 할까요?
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8" data-oid="f1or:-e">
                        <div
                            className="text-center p-6 rounded-2xl bg-white/80 shadow-lg hover:shadow-xl transition-shadow"
                            data-oid="i9u3e5_"
                        >
                            <div
                                className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4"
                                data-oid="7kb_h6v"
                            >
                                <span className="text-2xl text-white" data-oid="m2nbtlb">
                                    🎯
                                </span>
                            </div>
                            <h3
                                className="text-xl font-bold text-amber-900 mb-3"
                                data-oid="-cgmahz"
                            >
                                정밀한 타이머
                            </h3>
                            <p className="text-amber-700" data-oid="kjnzxzq">
                                단계별 정확한 타이밍과 알림으로 완벽한 추출을 도와드립니다.
                            </p>
                        </div>

                        <div
                            className="text-center p-6 rounded-2xl bg-white/80 shadow-lg hover:shadow-xl transition-shadow"
                            data-oid="6g-kl8-"
                        >
                            <div
                                className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4"
                                data-oid="ws1sz1q"
                            >
                                <span className="text-2xl text-white" data-oid="1d-t64_">
                                    🌍
                                </span>
                            </div>
                            <h3
                                className="text-xl font-bold text-amber-900 mb-3"
                                data-oid="5eh8byg"
                            >
                                세계 유명 레시피
                            </h3>
                            <p className="text-amber-700" data-oid="tzf2a0s">
                                전 세계 바리스타들의 검증된 레시피를 한 곳에서 만나보세요.
                            </p>
                        </div>

                        <div
                            className="text-center p-6 rounded-2xl bg-white/80 shadow-lg hover:shadow-xl transition-shadow"
                            data-oid="dsjykjv"
                        >
                            <div
                                className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4"
                                data-oid="-7u10my"
                            >
                                <span className="text-2xl text-white" data-oid=":a5ckqd">
                                    👥
                                </span>
                            </div>
                            <h3
                                className="text-xl font-bold text-amber-900 mb-3"
                                data-oid="vdnq00b"
                            >
                                커뮤니티 공유
                            </h3>
                            <p className="text-amber-700" data-oid="z85625g">
                                나만의 레시피를 공유하고 다른 사용자들과 소통해보세요.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16" data-oid="7eoj3w5">
                <div className="max-w-4xl mx-auto text-center px-6" data-oid="kg9:3d9">
                    <h2 className="text-4xl font-bold text-amber-900 mb-6" data-oid="8wel-fo">
                        지금 바로 완벽한 커피를 시작하세요
                    </h2>
                    <p className="text-xl text-amber-700 mb-8" data-oid="gizavbv">
                        무료로 시작하여 프리미엄 레시피와 고급 기능을 경험해보세요
                    </p>
                    <button
                        className="px-12 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-lg font-semibold rounded-full hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-105 shadow-xl"
                        data-oid="cntciur"
                    >
                        무료 다운로드
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-amber-900 text-amber-100 py-12" data-oid="3cnhkz6">
                <div className="max-w-6xl mx-auto px-6" data-oid="p:bxw62">
                    <div className="grid md:grid-cols-4 gap-8" data-oid="0yu.8zr">
                        <div data-oid="m.qh7e6">
                            <div className="flex items-center space-x-2 mb-4" data-oid="uy5in5h">
                                <div
                                    className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-400 rounded-lg flex items-center justify-center"
                                    data-oid="i3q6k30"
                                >
                                    <span
                                        className="text-amber-900 text-sm font-bold"
                                        data-oid="4wve5rh"
                                    >
                                        ☕
                                    </span>
                                </div>
                                <span className="text-xl font-bold" data-oid="7d.9_m3">
                                    드립마스터
                                </span>
                            </div>
                            <p className="text-amber-300" data-oid="qv167dw">
                                완벽한 핸드드립 커피의 시작
                            </p>
                        </div>

                        <div data-oid="p6y7uf6">
                            <h4 className="font-semibold mb-3" data-oid="cs3ldk2">
                                제품
                            </h4>
                            <ul className="space-y-2 text-amber-300" data-oid="mudo7ni">
                                <li data-oid=".01z46n">레시피</li>
                                <li data-oid="w6x5sp:">타이머</li>
                                <li data-oid="9gnf87f">커뮤니티</li>
                            </ul>
                        </div>

                        <div data-oid="sg-f.t8">
                            <h4 className="font-semibold mb-3" data-oid="9gxvb:_">
                                지원
                            </h4>
                            <ul className="space-y-2 text-amber-300" data-oid="kxazs.k">
                                <li data-oid="0e7xnaj">도움말</li>
                                <li data-oid="ff_-qxc">문의하기</li>
                                <li data-oid="z7pk._3">FAQ</li>
                            </ul>
                        </div>

                        <div data-oid="v.rz:kv">
                            <h4 className="font-semibold mb-3" data-oid="5q1_p2k">
                                연결
                            </h4>
                            <ul className="space-y-2 text-amber-300" data-oid="4rgajq6">
                                <li data-oid="v-:.my.">Instagram</li>
                                <li data-oid="4tr6eof">YouTube</li>
                                <li data-oid="7bfxfbi">블로그</li>
                            </ul>
                        </div>
                    </div>

                    <div
                        className="border-t border-amber-800 mt-8 pt-8 text-center text-amber-300"
                        data-oid="7nybc7w"
                    >
                        <p data-oid="y1zn6qk">&copy; 2024 드립마스터. 모든 권리 보유.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
