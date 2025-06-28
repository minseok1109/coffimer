'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// 상수 정의
const TERMS_LAST_UPDATED = '2024년 12월 27일';
const DEVELOPER_NAME = 'Bang Minseok';
const DEVELOPER_EMAIL = 'minseok32@gmail.com';
const RESPONSE_TIME = '영업일 기준 48시간 이내';

// Header 컴포넌트
function TermsHeader() {
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
            <h1 className="text-4xl font-bold text-amber-900 mb-4">서비스 이용약관</h1>
            <p className="text-amber-600 text-lg">
                최종 업데이트: <span className="font-semibold">{TERMS_LAST_UPDATED}</span>
            </p>
            <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-amber-800 text-sm">
                    Coffimer 앱(&quot;서비스&quot;)을 이용해 주셔서 감사합니다. 본 이용약관은{' '}
                    {DEVELOPER_NAME}
                    (&quot;당사&quot;, &quot;개발자&quot;)이 제공하는 Coffimer 모바일 애플리케이션의
                    이용 조건을 규정합니다.
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
            <h3 className="text-xl font-semibold text-amber-900 mb-4">📞 연락처</h3>
            <p className="text-amber-800 mb-4">
                서비스 이용약관에 관한 문의사항이 있으시면 연락해 주세요:
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

// 메인 약관 컴포넌트
export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
            <TermsHeader />

            <main className="max-w-4xl mx-auto px-6 py-12">
                <TitleSection />

                <div className="space-y-12">
                    {/* 1. 약관의 적용 */}
                    <section className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                        <SectionTitle>1. 약관의 적용</SectionTitle>

                        <SubSectionTitle>1.1 약관의 효력</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>
                                본 약관은 서비스를 다운로드하거나 사용하는 모든 사용자에게
                                적용됩니다
                            </ListItem>
                            <ListItem>서비스 이용 시 본 약관에 동의한 것으로 간주됩니다</ListItem>
                            <ListItem>
                                본 약관에 동의하지 않는 경우 서비스 이용을 중단해야 합니다
                            </ListItem>
                        </ul>

                        <SubSectionTitle>1.2 약관의 변경</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2">
                            <ListItem>당사는 필요 시 본 약관을 변경할 수 있습니다</ListItem>
                            <ListItem>
                                변경된 약관은 앱 내 공지 후 7일 후 효력이 발생합니다
                            </ListItem>
                            <ListItem>
                                변경 후 계속 이용 시 변경된 약관에 동의한 것으로 간주됩니다
                            </ListItem>
                        </ul>
                    </section>

                    {/* 2. 서비스 설명 */}
                    <section className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                        <SectionTitle>2. 서비스 설명</SectionTitle>

                        <SubSectionTitle>2.1 제공 서비스</SubSectionTitle>
                        <p className="text-amber-800 mb-4">
                            Coffimer는 다음과 같은 기능을 제공합니다:
                        </p>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>커피 추출 레시피 가이드</ListItem>
                            <ListItem>단계별 타이머 기능</ListItem>
                            <ListItem>개인 레시피 저장 및 관리</ListItem>
                            <ListItem>알림 및 사운드 기능</ListItem>
                        </ul>

                        <SubSectionTitle>2.2 서비스 이용 환경</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2">
                            <ListItem>iOS 및 Android 모바일 기기에서 이용 가능</ListItem>
                            <ListItem>인터넷 연결이 필요한 기능 있음</ListItem>
                            <ListItem>계정 생성 시 더 많은 기능 이용 가능</ListItem>
                        </ul>
                    </section>

                    {/* 3. 계정 및 사용자 책임 */}
                    <section className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                        <SectionTitle>3. 계정 및 사용자 책임</SectionTitle>

                        <SubSectionTitle>3.1 계정 생성</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>정확하고 최신의 정보를 제공해야 합니다</ListItem>
                            <ListItem>하나의 이메일 주소로 하나의 계정만 생성 가능합니다</ListItem>
                        </ul>

                        <SubSectionTitle>3.2 계정 보안</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>계정 정보의 기밀성을 유지할 책임이 있습니다</ListItem>
                            <ListItem>계정의 무단 사용을 발견 시 즉시 신고해야 합니다</ListItem>
                            <ListItem>계정을 통한 모든 활동에 대해 책임을 집니다</ListItem>
                        </ul>

                        <SubSectionTitle>3.3 금지 행위</SubSectionTitle>
                        <p className="text-amber-800 mb-4">다음 행위는 금지됩니다:</p>
                        <ul className="list-disc list-inside space-y-2">
                            <ListItem>서비스의 역공학, 해킹, 또는 보안 침해</ListItem>
                            <ListItem>허위 정보 제공 또는 타인의 정보 도용</ListItem>
                            <ListItem>상업적 목적의 무단 사용</ListItem>
                            <ListItem>다른 사용자에게 피해를 주는 행위</ListItem>
                            <ListItem>법령에 위반되는 행위</ListItem>
                        </ul>
                    </section>

                    {/* 4. 지적재산권 */}
                    <section className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                        <SectionTitle>4. 지적재산권</SectionTitle>

                        <SubSectionTitle>4.1 당사의 지적재산권</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>
                                서비스의 모든 콘텐츠는 당사 또는 라이선서의 지적재산권으로
                                보호됩니다
                            </ListItem>
                            <ListItem>
                                사용자는 개인적, 비상업적 목적으로만 서비스를 이용할 수 있습니다
                            </ListItem>
                            <ListItem>
                                당사의 사전 서면 동의 없이 콘텐츠를 복제, 배포할 수 없습니다
                            </ListItem>
                        </ul>

                        <SubSectionTitle>4.2 사용자 콘텐츠</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2">
                            <ListItem>
                                사용자가 생성한 레시피 등의 콘텐츠는 사용자의 소유입니다
                            </ListItem>
                            <ListItem>
                                당사는 서비스 제공을 위해 필요한 범위에서만 사용자 콘텐츠를
                                이용합니다
                            </ListItem>
                            <ListItem>사용자는 자신의 콘텐츠에 대한 모든 책임을 집니다</ListItem>
                        </ul>
                    </section>

                    {/* 5. 서비스 이용 제한 */}
                    <section className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                        <SectionTitle>5. 서비스 이용 제한</SectionTitle>

                        <SubSectionTitle>5.1 서비스 중단</SubSectionTitle>
                        <p className="text-amber-800 mb-4">
                            다음의 경우 서비스 이용을 제한하거나 중단할 수 있습니다:
                        </p>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>본 약관 위반 시</ListItem>
                            <ListItem>기술적 장애나 점검이 필요한 경우</ListItem>
                            <ListItem>법적 요구나 정부 명령이 있는 경우</ListItem>
                        </ul>

                        <SubSectionTitle>5.2 계정 해지</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2">
                            <ListItem>사용자는 언제든지 계정을 삭제할 수 있습니다</ListItem>
                            <ListItem>
                                당사는 약관 위반 시 사전 통지 후 계정을 해지할 수 있습니다
                            </ListItem>
                            <ListItem>
                                계정 해지 시 모든 데이터는 개인정보 보호정책에 따라 처리됩니다
                            </ListItem>
                        </ul>
                    </section>

                    {/* 6. 면책 조항 */}
                    <section className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                        <SectionTitle>6. 면책 조항</SectionTitle>

                        <SubSectionTitle>6.1 서비스 제공의 한계</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>서비스는 &quot;있는 그대로&quot; 제공됩니다</ListItem>
                            <ListItem>서비스의 정확성, 완전성, 신뢰성을 보장하지 않습니다</ListItem>
                            <ListItem>
                                인터넷 연결 장애나 기기 문제로 인한 서비스 중단에 대해 책임지지
                                않습니다
                            </ListItem>
                        </ul>

                        <SubSectionTitle>6.2 손해 배상의 제한</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2">
                            <ListItem>
                                서비스 이용으로 인한 직접적, 간접적 손해에 대해 책임을 지지 않습니다
                            </ListItem>
                            <ListItem>
                                손해 배상 책임은 관련 법령이 허용하는 최대 범위로 제한됩니다
                            </ListItem>
                            <ListItem>
                                커피 추출 과정에서 발생하는 사고나 손상에 대해 책임지지 않습니다
                            </ListItem>
                        </ul>
                    </section>

                    {/* 7. 개인정보 보호 */}
                    <section className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                        <SectionTitle>7. 개인정보 보호</SectionTitle>
                        <ul className="list-disc list-inside space-y-2">
                            <ListItem>
                                개인정보 처리에 관해서는 별도의 개인정보 보호정책이 적용됩니다
                            </ListItem>
                            <ListItem>개인정보 보호정책은 본 약관의 일부로 간주됩니다</ListItem>
                            <ListItem>
                                서비스 이용 시 개인정보 보호정책에도 동의한 것으로 간주됩니다
                            </ListItem>
                        </ul>
                    </section>

                    {/* 8. 분쟁 해결 */}
                    <section className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                        <SectionTitle>8. 분쟁 해결</SectionTitle>

                        <SubSectionTitle>8.1 준거법</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>본 약관은 대한민국 법률에 따라 해석됩니다</ListItem>
                            <ListItem>
                                국제 사용자의 경우 현지 법률도 함께 고려될 수 있습니다
                            </ListItem>
                        </ul>

                        <SubSectionTitle>8.2 분쟁 해결 절차</SubSectionTitle>
                        <ol className="list-decimal list-inside space-y-2 mb-6">
                            <li className="text-amber-700 pl-2">
                                <strong>직접 협의</strong>: 먼저 개발자와 직접 소통을 시도합니다
                            </li>
                            <li className="text-amber-700 pl-2">
                                <strong>조정</strong>: 협의가 불가능한 경우 조정 기관을 통한 해결을
                                시도합니다
                            </li>
                            <li className="text-amber-700 pl-2">
                                <strong>중재 또는 소송</strong>: 최후의 수단으로 중재나 법정 소송을
                                진행합니다
                            </li>
                        </ol>

                        <SubSectionTitle>8.3 관할법원</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2">
                            <ListItem>
                                소송이 필요한 경우 대한민국 서울중앙지방법원을 제1심 관할법원으로
                                합니다
                            </ListItem>
                        </ul>
                    </section>

                    {/* 9. 기타 조항 */}
                    <section className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                        <SectionTitle>9. 기타 조항</SectionTitle>

                        <SubSectionTitle>9.1 약관의 분리 가능성</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>
                                본 약관의 일부가 무효로 판정되어도 나머지 조항은 유효합니다
                            </ListItem>
                            <ListItem>
                                무효인 조항은 유효한 범위 내에서 최대한 그 의도를 살려 해석됩니다
                            </ListItem>
                        </ul>

                        <SubSectionTitle>9.2 완전 합의</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>본 약관은 서비스 이용에 관한 완전한 합의사항입니다</ListItem>
                            <ListItem>본 약관 외의 구두나 서면 약속은 효력이 없습니다</ListItem>
                        </ul>

                        <SubSectionTitle>9.3 권리의 포기</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2">
                            <ListItem>
                                당사가 약관 위반에 대해 즉시 조치하지 않는다고 해서 권리를 포기한
                                것은 아닙니다
                            </ListItem>
                        </ul>
                    </section>

                    {/* 10. 연락처 */}
                    <section>
                        <SectionTitle>10. 연락처</SectionTitle>
                        <ContactCard />
                    </section>

                    {/* 마무리 문구 */}
                    <div className="text-center py-8">
                        <div className="bg-amber-100 rounded-lg p-6 border border-amber-200">
                            <p className="text-amber-800 font-medium">
                                본 이용약관은 공정하고 투명한 서비스 제공을 위해 작성되었으며, 관련
                                법령을 준수합니다.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
