'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// 상수 정의
const PRIVACY_LAST_UPDATED = '2025년 7월 3일';
const DEVELOPER_NAME = 'Bang Minseok';
const DEVELOPER_EMAIL = 'minseok32@gmail.com';
const RESPONSE_TIME = '영업일 기준 48시간 이내';

// Header 컴포넌트
function PrivacyHeader() {
    return (
        <header className="bg-white/80 backdrop-blur-sm border-b border-amber-100 px-6 py-4">
            <div className="flex items-center max-w-4xl mx-auto">
                <Link
                    href="/"
                    className="flex items-center space-x-2 text-amber-700 hover:text-amber-900 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>홈으로 돌아가기</span>
                </Link>
            </div>
        </header>
    );
}

// 제목 섹션 컴포넌트
function TitleSection() {
    return (
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-amber-900 mb-4">개인정보 보호정책</h1>
            <p className="text-amber-600 text-lg">
                최종 업데이트: <span className="font-semibold">{PRIVACY_LAST_UPDATED}</span>
            </p>
            <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-amber-800 text-sm">
                    Coffimer (&quot;당사&quot;, &quot;우리&quot;, &quot;앱&quot;)는 사용자의
                    개인정보를 보호하고 존중합니다. 이 개인정보 보호정책은 Coffimer 앱을 사용할 때
                    당사가 수집, 사용, 공유하는 정보와 사용자의 선택권에 대해 설명합니다.
                </p>
            </div>
        </div>
    );
}

// 섹션 제목 컴포넌트
interface SectionTitleProps {
    children: React.ReactNode;
}

function SectionTitle({ children }: SectionTitleProps) {
    return (
        <h2 className="text-2xl font-bold text-amber-900 mb-6 pb-2 border-b-2 border-amber-200">
            {children}
        </h2>
    );
}

// 서브섹션 제목 컴포넌트
interface SubSectionTitleProps {
    children: React.ReactNode;
}

function SubSectionTitle({ children }: SubSectionTitleProps) {
    return <h3 className="text-xl font-semibold text-amber-800 mb-4 mt-8">{children}</h3>;
}

// 리스트 아이템 컴포넌트
interface ListItemProps {
    children: React.ReactNode;
}

function ListItem({ children }: ListItemProps) {
    return <li className="text-amber-700 mb-2 pl-2">{children}</li>;
}

// 연락처 카드 컴포넌트
function ContactCard() {
    return (
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-6 border border-amber-200">
            <h3 className="text-xl font-semibold text-amber-900 mb-4">📞 연락처 및 문의</h3>
            <p className="text-amber-800 mb-4">
                개인정보 보호정책에 관한 문의사항이 있으시면 연락해 주세요:
            </p>
            <div className="space-y-2 text-amber-700">
                <p>
                    <strong>이메일:</strong> {DEVELOPER_EMAIL}
                </p>
                <p>
                    <strong>개발자:</strong> {DEVELOPER_NAME}
                </p>
                <p>
                    <strong>응답 시간:</strong> {RESPONSE_TIME}
                </p>
            </div>
        </div>
    );
}

// 메인 개인정보 보호정책 컴포넌트
export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
            <PrivacyHeader />

            <main className="max-w-4xl mx-auto px-6 py-12">
                <TitleSection />

                <div className="space-y-12">
                    {/* 1. 수집하는 정보 */}
                    <section className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                        <SectionTitle>1. 수집하는 정보</SectionTitle>

                        <SubSectionTitle>1.1 사용자가 직접 제공하는 정보</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>
                                <strong>계정 정보</strong>: 이메일 주소, 비밀번호 (암호화 저장)
                            </ListItem>
                            <ListItem>
                                <strong>프로필 정보</strong>: 표시명 (선택사항)
                            </ListItem>
                            <ListItem>
                                <strong>사용자 생성 콘텐츠</strong>: 커피 레시피, 단계별 지침,
                                유튜브 링크
                            </ListItem>
                        </ul>

                        <SubSectionTitle>1.2 자동으로 수집되는 정보</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>
                                <strong>사용 분석 데이터</strong>: 앱 사용 패턴, 화면 조회, 기능
                                사용 빈도
                            </ListItem>
                            <ListItem>
                                <strong>레시피 상호작용</strong>: 레시피 조회, 좋아요, 타이머 사용
                                기록
                            </ListItem>
                            <ListItem>
                                <strong>기기 정보</strong>: 운영체제 버전, 앱 버전, 기기 유형, 언어
                                설정
                            </ListItem>
                            <ListItem>
                                <strong>세션 정보</strong>: 로그인 상태, 자동 로그인 설정, 세션 토큰
                            </ListItem>
                            <ListItem>
                                <strong>알림 토큰</strong>: 푸시 알림 전송을 위한 기기 식별자
                            </ListItem>
                        </ul>

                        <SubSectionTitle>1.3 제3자 서비스를 통해 수집되는 정보</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>
                                <strong>Google 로그인</strong>: 이메일 주소, 기본 프로필 정보
                                (Google 계정 사용 시)
                            </ListItem>
                            <ListItem>
                                <strong>분석 서비스</strong>: 앱 사용 통계, 오류 보고서, 성능 지표
                            </ListItem>
                        </ul>

                        <SubSectionTitle>1.4 수집하지 않는 정보</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2">
                            <ListItem>정확한 위치 정보</ListItem>
                            <ListItem>연락처 정보</ListItem>
                            <ListItem>카메라 또는 마이크 데이터</ListItem>
                            <ListItem>기타 개인 파일이나 민감한 정보</ListItem>
                            <ListItem>
                                생체 인식 데이터 (저장되지 않으며, 기기 내에서만 인증 목적으로 사용)
                            </ListItem>
                        </ul>
                    </section>

                    {/* 2. 정보 사용 목적 */}
                    <section className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                        <SectionTitle>2. 정보 사용 목적</SectionTitle>

                        <p className="text-amber-800 mb-6">
                            당사는 수집된 정보를 다음 목적으로만 사용합니다:
                        </p>

                        <SubSectionTitle>2.1 핵심 서비스 제공</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>계정 생성 및 관리</ListItem>
                            <ListItem>로그인 및 인증 서비스</ListItem>
                            <ListItem>레시피 저장 및 관리</ListItem>
                            <ListItem>타이머 및 알림 기능</ListItem>
                        </ul>

                        <SubSectionTitle>2.2 사용자 경험 개선</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>개인화된 레시피 추천</ListItem>
                            <ListItem>앱 성능 최적화</ListItem>
                            <ListItem>오류 해결 및 버그 수정</ListItem>
                            <ListItem>새로운 기능 개발</ListItem>
                        </ul>

                        <SubSectionTitle>2.3 커뮤니케이션</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>타이머 완료 알림</ListItem>
                            <ListItem>서비스 업데이트 알림</ListItem>
                            <ListItem>중요한 정책 변경 사항 통지</ListItem>
                            <ListItem>고객 지원 및 문의 응답</ListItem>
                        </ul>

                        <SubSectionTitle>2.4 분석 및 연구</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2">
                            <ListItem>사용 패턴 분석</ListItem>
                            <ListItem>앱 성능 모니터링</ListItem>
                            <ListItem>사용자 만족도 조사</ListItem>
                            <ListItem>서비스 개선을 위한 통계 생성</ListItem>
                        </ul>
                    </section>

                    {/* 3. 제3자 서비스 및 정보 공유 */}
                    <section className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                        <SectionTitle>3. 제3자 서비스 및 정보 공유</SectionTitle>

                        <SubSectionTitle>3.1 사용하는 제3자 서비스</SubSectionTitle>

                        <div className="mb-6">
                            <h4 className="font-semibold text-amber-800 mb-2">
                                Supabase (Backend Infrastructure)
                            </h4>
                            <ul className="list-disc list-inside space-y-1 text-amber-700 ml-4">
                                <li>
                                    <strong>제공 서비스</strong>: 데이터베이스, 사용자 인증, 실시간
                                    데이터 동기화
                                </li>
                                <li>
                                    <strong>공유 정보</strong>: 암호화된 사용자 데이터, 레시피 정보
                                </li>
                                <li>
                                    <strong>데이터 위치</strong>: 클라우드 데이터센터 (암호화 저장)
                                </li>
                                <li>
                                    <strong>개인정보보호정책</strong>:{' '}
                                    <a
                                        href="https://supabase.com/privacy"
                                        className="text-amber-600 underline"
                                    >
                                        Supabase Privacy Policy
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="mb-6">
                            <h4 className="font-semibold text-amber-800 mb-2">
                                Expo Services (Development Platform)
                            </h4>
                            <ul className="list-disc list-inside space-y-1 text-amber-700 ml-4">
                                <li>
                                    <strong>제공 서비스</strong>: 푸시 알림, 앱 업데이트, 오류 보고
                                </li>
                                <li>
                                    <strong>공유 정보</strong>: 기기 토큰, 앱 사용 통계, 오류 로그
                                </li>
                                <li>
                                    <strong>개인정보보호정책</strong>:{' '}
                                    <a
                                        href="https://expo.dev/privacy"
                                        className="text-amber-600 underline"
                                    >
                                        Expo Privacy Policy
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="mb-6">
                            <h4 className="font-semibold text-amber-800 mb-2">
                                Microsoft Clarity (사용자 행동 분석)
                            </h4>
                            <ul className="list-disc list-inside space-y-1 text-amber-700 ml-4">
                                <li>
                                    <strong>제공 서비스</strong>: 앱 사용 패턴 분석, 사용자 경험
                                    개선
                                </li>
                                <li>
                                    <strong>공유 정보</strong>: 익명화된 사용 통계, 화면 상호작용
                                    데이터
                                </li>
                                <li>
                                    <strong>개인정보보호정책</strong>:{' '}
                                    <a
                                        href="https://privacy.microsoft.com/privacystatement"
                                        className="text-amber-600 underline"
                                    >
                                        Microsoft Privacy Statement
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="mb-6">
                            <h4 className="font-semibold text-amber-800 mb-2">
                                PostHog (제품 분석)
                            </h4>
                            <ul className="list-disc list-inside space-y-1 text-amber-700 ml-4">
                                <li>
                                    <strong>제공 서비스</strong>: 기능 사용 통계, 앱 성능 분석
                                </li>
                                <li>
                                    <strong>공유 정보</strong>: 익명화된 이벤트 데이터, 사용 패턴
                                </li>
                                <li>
                                    <strong>개인정보보호정책</strong>:{' '}
                                    <a
                                        href="https://posthog.com/privacy"
                                        className="text-amber-600 underline"
                                    >
                                        PostHog Privacy Policy
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="mb-6">
                            <h4 className="font-semibold text-amber-800 mb-2">
                                Google Sign-In (선택적 인증)
                            </h4>
                            <ul className="list-disc list-inside space-y-1 text-amber-700 ml-4">
                                <li>
                                    <strong>제공 서비스</strong>: 소셜 로그인 기능
                                </li>
                                <li>
                                    <strong>공유 정보</strong>: 이메일 주소, 기본 프로필 정보
                                    (사용자 동의 시에만)
                                </li>
                                <li>
                                    <strong>개인정보보호정책</strong>:{' '}
                                    <a
                                        href="https://policies.google.com/privacy"
                                        className="text-amber-600 underline"
                                    >
                                        Google Privacy Policy
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <SubSectionTitle>3.2 정보 공유 원칙</SubSectionTitle>
                        <p className="text-amber-800 mb-4">
                            당사는 다음의 경우를 제외하고는 개인정보를 제3자와 공유하지 않습니다:
                        </p>
                        <ul className="list-disc list-inside space-y-2">
                            <ListItem>
                                <strong>명시적 동의</strong>: 사용자가 명시적으로 동의한 경우
                            </ListItem>
                            <ListItem>
                                <strong>법적 요구</strong>: 법원 명령이나 법적 절차에 따른 경우
                            </ListItem>
                            <ListItem>
                                <strong>서비스 제공</strong>: 위에 명시된 제3자 서비스 제공업체와의
                                필수적 데이터 공유
                            </ListItem>
                            <ListItem>
                                <strong>안전 보호</strong>: 사용자나 타인의 안전을 보호하기 위해
                                필요한 경우
                            </ListItem>
                        </ul>
                    </section>

                    {/* 4. 데이터 보안 */}
                    <section className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                        <SectionTitle>4. 데이터 보안</SectionTitle>

                        <SubSectionTitle>4.1 보안 조치</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>
                                <strong>전송 암호화</strong>: 모든 데이터는 HTTPS/TLS를 통해 암호화
                                전송
                            </ListItem>
                            <ListItem>
                                <strong>저장 암호화</strong>: 개인정보는 데이터베이스에서 암호화
                                저장
                            </ListItem>
                            <ListItem>
                                <strong>토큰 보안</strong>: 인증 토큰은 기기의
                                Keychain(iOS)/Keystore(Android)에 안전하게 저장
                            </ListItem>
                            <ListItem>
                                <strong>접근 제어</strong>: 필요한 권한을 가진 직원만 제한된 접근
                                권한 보유
                            </ListItem>
                        </ul>

                        <SubSectionTitle>4.2 보안 관리</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2">
                            <ListItem>
                                <strong>정기 보안 검토</strong>: 보안 시스템의 정기적인 점검 및
                                업데이트
                            </ListItem>
                            <ListItem>
                                <strong>취약점 모니터링</strong>: 보안 위협에 대한 지속적인 모니터링
                            </ListItem>
                            <ListItem>
                                <strong>사고 대응</strong>: 보안 사고 발생 시 즉시 대응 체계 운영
                            </ListItem>
                        </ul>
                    </section>

                    {/* 5. 사용자 권리 */}
                    <section className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                        <SectionTitle>5. 사용자 권리</SectionTitle>

                        <SubSectionTitle>5.1 개인정보 접근권</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>수집된 개인정보에 대한 접근 요청</ListItem>
                            <ListItem>개인정보 처리 현황에 대한 설명 요구</ListItem>
                        </ul>

                        <SubSectionTitle>5.2 개인정보 수정권</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>부정확한 정보의 수정 요청</ListItem>
                            <ListItem>프로필 정보 직접 수정 (앱 내에서)</ListItem>
                        </ul>

                        <SubSectionTitle>5.3 개인정보 삭제권 (잊혀질 권리)</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>
                                <strong>계정 삭제</strong>: 앱 내 설정에서 계정 영구 삭제 가능
                            </ListItem>
                            <ListItem>
                                <strong>데이터 삭제</strong>: 계정 삭제 시 모든 관련 데이터 30일 내
                                완전 삭제
                            </ListItem>
                            <ListItem>
                                <strong>부분 삭제</strong>: 특정 개인정보의 선별적 삭제 요청
                            </ListItem>
                        </ul>

                        <SubSectionTitle>5.4 개인정보 이동권</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>개인정보의 표준화된 형식으로의 이동 요청</ListItem>
                            <ListItem>다른 서비스로의 데이터 전송 지원</ListItem>
                        </ul>

                        <SubSectionTitle>5.5 개인정보 처리 제한권</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>개인정보 처리에 대한 제한 요청</ListItem>
                            <ListItem>분석 데이터 수집 거부 (앱 설정에서)</ListItem>
                        </ul>

                        <SubSectionTitle>5.6 권리 행사 방법</SubSectionTitle>
                        <p className="text-amber-800 mb-4">
                            권리 행사를 위해서는 <strong>{DEVELOPER_EMAIL}</strong>으로 연락해
                            주세요.
                        </p>
                        <ul className="list-disc list-inside space-y-2">
                            <ListItem>
                                <strong>응답 시간</strong>: 영업일 기준 7일 이내 1차 응답, 30일 이내
                                처리 완료
                            </ListItem>
                            <ListItem>
                                <strong>신원 확인</strong>: 권리 행사 시 본인 확인 절차 필요
                            </ListItem>
                            <ListItem>
                                <strong>수수료</strong>: 개인정보 처리 관련 권리 행사는 무료
                            </ListItem>
                        </ul>
                    </section>

                    {/* 6. 데이터 보존 및 삭제 */}
                    <section className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                        <SectionTitle>6. 데이터 보존 및 삭제</SectionTitle>

                        <SubSectionTitle>6.1 보존 기간</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>
                                <strong>계정 데이터</strong>: 계정 삭제 요청 시까지 보존
                            </ListItem>
                            <ListItem>
                                <strong>사용 기록</strong>: 최대 2년간 보존 후 자동 삭제
                            </ListItem>
                            <ListItem>
                                <strong>분석 데이터</strong>: 익명화 처리 후 최대 3년간 보존
                            </ListItem>
                            <ListItem>
                                <strong>법정 의무</strong>: 관련 법률에 따른 최소 보존 기간 준수
                            </ListItem>
                        </ul>

                        <SubSectionTitle>6.2 삭제 절차</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2">
                            <ListItem>
                                <strong>즉시 삭제</strong>: 계정 삭제 요청 시 개인 식별 정보 즉시
                                삭제
                            </ListItem>
                            <ListItem>
                                <strong>완전 삭제</strong>: 30일 내에 모든 시스템 및 백업에서 완전
                                삭제
                            </ListItem>
                            <ListItem>
                                <strong>복구 불가</strong>: 삭제된 데이터는 복구할 수 없음
                            </ListItem>
                        </ul>
                    </section>

                    {/* 7. 아동의 개인정보 보호 */}
                    <section className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                        <SectionTitle>7. 아동의 개인정보 보호</SectionTitle>
                        <ul className="list-disc list-inside space-y-2">
                            <ListItem>
                                Coffimer는 만 13세 미만의 아동으로부터 의도적으로 개인정보를
                                수집하지 않습니다
                            </ListItem>
                            <ListItem>
                                만 13세 미만 아동의 정보가 수집된 것을 발견하면 즉시 삭제합니다
                            </ListItem>
                            <ListItem>
                                부모 또는 보호자는 자녀의 개인정보 처리에 대해 문의할 수 있습니다
                            </ListItem>
                        </ul>
                    </section>

                    {/* 8. 국제적 데이터 전송 */}
                    <section className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                        <SectionTitle>8. 국제적 데이터 전송</SectionTitle>

                        <SubSectionTitle>8.1 데이터 전송</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>
                                사용자의 정보는 Supabase 및 기타 제3자 서비스의 글로벌 데이터 센터에
                                저장될 수 있습니다
                            </ListItem>
                            <ListItem>
                                모든 국제 전송은 적절한 보안 조치와 함께 이루어집니다
                            </ListItem>
                        </ul>

                        <SubSectionTitle>8.2 법적 근거</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2">
                            <ListItem>
                                <strong>적정성 결정</strong>: EU 적정성 결정이 있는 국가로의 전송
                            </ListItem>
                            <ListItem>
                                <strong>표준 계약 조항</strong>: 적절한 보호 수준을 보장하는 계약적
                                보호 조치
                            </ListItem>
                            <ListItem>
                                <strong>인증 메커니즘</strong>: 국제적으로 인정받는 인증 프로그램
                                준수
                            </ListItem>
                        </ul>
                    </section>

                    {/* 9. 알림 및 권한 관리 */}
                    <section className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                        <SectionTitle>9. 알림 및 권한 관리</SectionTitle>

                        <SubSectionTitle>9.1 푸시 알림</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>
                                <strong>타이머 알림</strong>: 커피 추출 단계별 알림
                            </ListItem>
                            <ListItem>
                                <strong>서비스 알림</strong>: 중요한 업데이트 및 정책 변경 사항
                            </ListItem>
                            <ListItem>
                                <strong>제어 방법</strong>: 앱 설정 또는 기기 설정에서 언제든지
                                비활성화 가능
                            </ListItem>
                        </ul>

                        <SubSectionTitle>9.2 앱 권한</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2">
                            <ListItem>
                                <strong>오디오 재생</strong>: 타이머 완료 시 알림음 재생
                            </ListItem>
                            <ListItem>
                                <strong>알림 권한</strong>: 푸시 알림 전송
                            </ListItem>
                            <ListItem>
                                <strong>보안 저장소</strong>: 로그인 정보 안전한 저장
                            </ListItem>
                            <ListItem>
                                <strong>네트워크 접근</strong>: 서버와의 데이터 동기화
                            </ListItem>
                        </ul>
                    </section>

                    {/* 10. 쿠키 및 유사 기술 */}
                    <section className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                        <SectionTitle>10. 쿠키 및 유사 기술</SectionTitle>

                        <SubSectionTitle>10.1 사용하는 기술</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>
                                <strong>세션 토큰</strong>: 로그인 상태 유지
                            </ListItem>
                            <ListItem>
                                <strong>로컬 저장소</strong>: 앱 설정 및 캐시 데이터
                            </ListItem>
                            <ListItem>
                                <strong>분석 도구</strong>: 사용 패턴 분석을 위한 익명 식별자
                            </ListItem>
                        </ul>

                        <SubSectionTitle>10.2 관리 방법</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2">
                            <ListItem>대부분의 데이터는 앱 재설치 시 삭제됩니다</ListItem>
                            <ListItem>계정 삭제 시 모든 관련 데이터가 완전히 제거됩니다</ListItem>
                        </ul>
                    </section>

                    {/* 11. 정책 변경 */}
                    <section className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                        <SectionTitle>11. 정책 변경</SectionTitle>

                        <SubSectionTitle>11.1 변경 절차</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>
                                개인정보 보호정책이 변경될 경우 최소 30일 전 사전 통지
                            </ListItem>
                            <ListItem>
                                <strong>통지 방법</strong>: 앱 내 알림, 이메일 통지, 정책 페이지
                                업데이트
                            </ListItem>
                            <ListItem>
                                <strong>중요한 변경</strong>: 사용자 동의가 필요한 변경사항은 별도
                                동의 절차 진행
                            </ListItem>
                        </ul>

                        <SubSectionTitle>11.2 변경 내용 확인</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2">
                            <ListItem>
                                정책 상단의 &quot;최종 업데이트&quot; 날짜를 통해 변경 여부 확인
                                가능
                            </ListItem>
                            <ListItem>주요 변경사항은 요약 형태로 별도 공지</ListItem>
                        </ul>
                    </section>

                    {/* 12. 연락처 및 문의 */}
                    <section>
                        <SectionTitle>12. 연락처 및 문의</SectionTitle>
                        <ContactCard />

                        <div className="mt-8 bg-amber-50 rounded-lg p-6 border border-amber-200">
                            <SubSectionTitle>12.2 문의 가능 사항</SubSectionTitle>
                            <ul className="list-disc list-inside space-y-2 text-amber-700">
                                <ListItem>개인정보 처리에 관한 질문</ListItem>
                                <ListItem>개인정보 권리 행사 요청</ListItem>
                                <ListItem>보안 사고 신고</ListItem>
                                <ListItem>정책 관련 의견 및 제안</ListItem>
                            </ul>
                        </div>
                    </section>

                    {/* 13. 추가 정보 */}
                    <section className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                        <SectionTitle>13. 추가 정보</SectionTitle>

                        <SubSectionTitle>13.1 관련 법령</SubSectionTitle>
                        <p className="text-amber-800 mb-4">
                            이 개인정보 보호정책은 다음 법령을 준수하여 작성되었습니다:
                        </p>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>
                                <strong>한국</strong>: 개인정보보호법, 정보통신망 이용촉진 및
                                정보보호 등에 관한 법률
                            </ListItem>
                            <ListItem>
                                <strong>유럽연합</strong>: 일반 개인정보보호규정 (GDPR)
                            </ListItem>
                            <ListItem>
                                <strong>미국</strong>: 캘리포니아 소비자 개인정보보호법 (CCPA)
                            </ListItem>
                            <ListItem>
                                <strong>기타</strong>: 서비스 제공 지역의 관련 개인정보보호 법령
                            </ListItem>
                        </ul>

                        <SubSectionTitle>13.2 분쟁 해결</SubSectionTitle>
                        <ol className="list-decimal list-inside space-y-2 mb-6">
                            <li className="text-amber-700 pl-2">
                                <strong>1차</strong>: 개발자에게 직접 문의 ({DEVELOPER_EMAIL})
                            </li>
                            <li className="text-amber-700 pl-2">
                                <strong>2차</strong>: 개인정보보호위원회 개인정보 침해신고센터
                                (privacy.go.kr)
                            </li>
                            <li className="text-amber-700 pl-2">
                                <strong>3차</strong>: 관할 법원을 통한 법적 구제
                            </li>
                        </ol>

                        <SubSectionTitle>13.3 데이터 보호 영향 평가</SubSectionTitle>
                        <p className="text-amber-800">
                            당사는 정기적으로 데이터 보호 영향 평가를 실시하여 개인정보 처리의
                            적정성과 보안성을 검토합니다.
                        </p>
                    </section>

                    {/* 마무리 문구 */}
                    <div className="text-center py-8">
                        <div className="bg-amber-100 rounded-lg p-6 border border-amber-200">
                            <p className="text-amber-800 font-medium mb-4">
                                <strong>효력 발생일</strong>: {PRIVACY_LAST_UPDATED}
                                <br />
                                <strong>작성자</strong>: {DEVELOPER_NAME}
                                <br />
                                <strong>버전</strong>: v2.0
                            </p>
                            <p className="text-amber-800">
                                이 개인정보 보호정책에 관한 질문이나 우려사항이 있으시면 언제든지{' '}
                                <strong>{DEVELOPER_EMAIL}</strong>으로 연락해 주세요.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
