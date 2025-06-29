'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Constants
const TERMS_LAST_UPDATED = 'June 28, 2025';
const DEVELOPER_NAME = 'Bang Minseok';
const DEVELOPER_EMAIL = 'minseok32@gmail.com';
const RESPONSE_TIME = 'Within 48 hours on business days';

// Header Component
function TermsHeader() {
    return (
        <header className="bg-white/80 backdrop-blur-sm border-b border-amber-100 px-6 py-4">
            <div className="flex items-center max-w-4xl mx-auto">
                <Link
                    href="/"
                    className="flex items-center space-x-2 text-amber-700 hover:text-amber-900 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back to Home</span>
                </Link>
            </div>
        </header>
    );
}

// Title Section Component
function TitleSection() {
    return (
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-amber-900 mb-4">Terms of Service</h1>
            <p className="text-amber-600 text-lg">
                Last Updated: <span className="font-semibold">{TERMS_LAST_UPDATED}</span>
            </p>
            <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-amber-800 text-sm">
                    Thank you for using the Coffimer app (&quot;Service&quot;). These Terms of Service govern the use of the Coffimer mobile application provided by{' '}
                    {DEVELOPER_NAME}
                    {' '}(&quot;we&quot;, &quot;us&quot;, &quot;developer&quot;).
                </p>
            </div>
        </div>
    );
}

// Section Title Component
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

// Sub-section Title Component
interface SubSectionTitleProps {
    children: React.ReactNode;
}

function SubSectionTitle({ children }: SubSectionTitleProps) {
    return <h3 className="text-xl font-semibold text-amber-800 mb-4 mt-8">{children}</h3>;
}

// List Item Component
interface ListItemProps {
    children: React.ReactNode;
}

function ListItem({ children }: ListItemProps) {
    return <li className="text-amber-700 mb-2 pl-2">{children}</li>;
}

// Contact Card Component
function ContactCard() {
    return (
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-6 border border-amber-200">
            <h3 className="text-xl font-semibold text-amber-900 mb-4">📞 Contact</h3>
            <p className="text-amber-800 mb-4">
                If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2 text-amber-700">
                <p>
                    <strong>Email:</strong> {DEVELOPER_EMAIL}
                </p>
                <p>
                    <strong>Developer:</strong> {DEVELOPER_NAME}
                </p>
                <p>
                    <strong>Response Time:</strong> {RESPONSE_TIME}
                </p>
            </div>
        </div>
    );
}

// Main Terms Component
export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
            <TermsHeader />

            <main className="max-w-4xl mx-auto px-6 py-12">
                <TitleSection />

                <div className="space-y-12">
                    {/* 1. Application of Terms */}
                    <section className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                        <SectionTitle>1. Application of Terms</SectionTitle>

                        <SubSectionTitle>1.1 Effectiveness of Terms</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>
                                These terms apply to all users who download or use the Service
                            </ListItem>
                            <ListItem>By using the Service, you are deemed to have agreed to these terms</ListItem>
                            <ListItem>
                                If you do not agree to these terms, you must stop using the Service
                            </ListItem>
                        </ul>

                        <SubSectionTitle>1.2 Amendment of Terms</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2">
                            <ListItem>We may modify these terms when necessary</ListItem>
                            <ListItem>
                                Modified terms become effective 7 days after notification within the app
                            </ListItem>
                            <ListItem>
                                Continued use after modification is deemed as agreement to the modified terms
                            </ListItem>
                        </ul>
                    </section>

                    {/* 2. Service Description */}
                    <section className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                        <SectionTitle>2. Service Description</SectionTitle>

                        <SubSectionTitle>2.1 Provided Services</SubSectionTitle>
                        <p className="text-amber-800 mb-4">
                            Coffimer provides the following features:
                        </p>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>Coffee extraction recipe guides</ListItem>
                            <ListItem>Step-by-step timer functionality</ListItem>
                            <ListItem>Personal recipe storage and management</ListItem>
                            <ListItem>Notification and sound features</ListItem>
                        </ul>

                        <SubSectionTitle>2.2 Service Environment</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2">
                            <ListItem>Available on iOS and Android mobile devices</ListItem>
                            <ListItem>Some features require internet connection</ListItem>
                            <ListItem>More features available when creating an account</ListItem>
                        </ul>
                    </section>

                    {/* 3. Account and User Responsibilities */}
                    <section className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                        <SectionTitle>3. Account and User Responsibilities</SectionTitle>

                        <SubSectionTitle>3.1 Account Creation</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>You must provide accurate and up-to-date information</ListItem>
                            <ListItem>Only one account can be created per email address</ListItem>
                        </ul>

                        <SubSectionTitle>3.2 Account Security</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>You are responsible for maintaining the confidentiality of your account information</ListItem>
                            <ListItem>You must immediately report any unauthorized use of your account</ListItem>
                            <ListItem>You are responsible for all activities through your account</ListItem>
                        </ul>

                        <SubSectionTitle>3.3 Prohibited Activities</SubSectionTitle>
                        <p className="text-amber-800 mb-4">The following activities are prohibited:</p>
                        <ul className="list-disc list-inside space-y-2">
                            <ListItem>Reverse engineering, hacking, or security breaches of the Service</ListItem>
                            <ListItem>Providing false information or stealing others&apos; information</ListItem>
                            <ListItem>Unauthorized commercial use</ListItem>
                            <ListItem>Activities that harm other users</ListItem>
                            <ListItem>Activities that violate laws and regulations</ListItem>
                        </ul>
                    </section>

                    {/* 4. Intellectual Property Rights */}
                    <section className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                        <SectionTitle>4. Intellectual Property Rights</SectionTitle>

                        <SubSectionTitle>4.1 Our Intellectual Property Rights</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>
                                All content in the Service is protected by our or our licensors&apos; intellectual property rights
                            </ListItem>
                            <ListItem>
                                Users may use the Service only for personal, non-commercial purposes
                            </ListItem>
                            <ListItem>
                                Content may not be copied or distributed without our prior written consent
                            </ListItem>
                        </ul>

                        <SubSectionTitle>4.2 User Content</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2">
                            <ListItem>
                                Content created by users, such as recipes, belongs to the users
                            </ListItem>
                            <ListItem>
                                We use user content only to the extent necessary for providing the Service
                            </ListItem>
                            <ListItem>Users are responsible for all their content</ListItem>
                        </ul>
                    </section>

                    {/* 5. Service Usage Restrictions */}
                    <section className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                        <SectionTitle>5. Service Usage Restrictions</SectionTitle>

                        <SubSectionTitle>5.1 Service Suspension</SubSectionTitle>
                        <p className="text-amber-800 mb-4">
                            We may restrict or suspend service usage in the following cases:
                        </p>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>When these terms are violated</ListItem>
                            <ListItem>When technical failures or maintenance is required</ListItem>
                            <ListItem>When there are legal requirements or government orders</ListItem>
                        </ul>

                        <SubSectionTitle>5.2 Account Termination</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2">
                            <ListItem>Users may delete their account at any time</ListItem>
                            <ListItem>
                                We may terminate accounts after prior notice in case of terms violations
                            </ListItem>
                            <ListItem>
                                Upon account termination, all data will be processed according to our Privacy Policy
                            </ListItem>
                        </ul>
                    </section>

                    {/* 6. Disclaimer */}
                    <section className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                        <SectionTitle>6. Disclaimer</SectionTitle>

                        <SubSectionTitle>6.1 Limitations of Service Provision</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>The Service is provided &quot;as is&quot;</ListItem>
                            <ListItem>We do not guarantee the accuracy, completeness, or reliability of the Service</ListItem>
                            <ListItem>
                                We are not responsible for service interruptions due to internet connection failures or device issues
                            </ListItem>
                        </ul>

                        <SubSectionTitle>6.2 Limitation of Liability</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2">
                            <ListItem>
                                We are not liable for direct or indirect damages arising from the use of the Service
                            </ListItem>
                            <ListItem>
                                Liability for damages is limited to the maximum extent permitted by applicable law
                            </ListItem>
                            <ListItem>
                                We are not responsible for accidents or damages occurring during the coffee extraction process
                            </ListItem>
                        </ul>
                    </section>

                    {/* 7. Privacy Protection */}
                    <section className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                        <SectionTitle>7. Privacy Protection</SectionTitle>
                        <ul className="list-disc list-inside space-y-2">
                            <ListItem>
                                A separate Privacy Policy applies to personal information processing
                            </ListItem>
                            <ListItem>The Privacy Policy is considered part of these terms</ListItem>
                            <ListItem>
                                By using the Service, you are deemed to have agreed to the Privacy Policy as well
                            </ListItem>
                        </ul>
                    </section>

                    {/* 8. Dispute Resolution */}
                    <section className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                        <SectionTitle>8. Dispute Resolution</SectionTitle>

                        <SubSectionTitle>8.1 Governing Law</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>These terms are interpreted according to the laws of the Republic of Korea</ListItem>
                            <ListItem>
                                For international users, local laws may also be considered
                            </ListItem>
                        </ul>

                        <SubSectionTitle>8.2 Dispute Resolution Process</SubSectionTitle>
                        <ol className="list-decimal list-inside space-y-2 mb-6">
                            <li className="text-amber-700 pl-2">
                                <strong>Direct Negotiation</strong>: First attempt direct communication with the developer
                            </li>
                            <li className="text-amber-700 pl-2">
                                <strong>Mediation</strong>: If negotiation is impossible, attempt resolution through mediation agencies
                            </li>
                            <li className="text-amber-700 pl-2">
                                <strong>Arbitration or Litigation</strong>: As a last resort, proceed with arbitration or court litigation
                            </li>
                        </ol>

                        <SubSectionTitle>8.3 Jurisdiction</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2">
                            <ListItem>
                                In case of litigation, Seoul Central District Court of the Republic of Korea shall be the court of first instance
                            </ListItem>
                        </ul>
                    </section>

                    {/* 9. Other Provisions */}
                    <section className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                        <SectionTitle>9. Other Provisions</SectionTitle>

                        <SubSectionTitle>9.1 Severability of Terms</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>
                                If any part of these terms is deemed invalid, the remaining provisions remain valid
                            </ListItem>
                            <ListItem>
                                Invalid provisions shall be interpreted to preserve their intent to the maximum extent valid
                            </ListItem>
                        </ul>

                        <SubSectionTitle>9.2 Entire Agreement</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>These terms constitute the complete agreement regarding the use of the Service</ListItem>
                            <ListItem>Oral or written promises outside these terms have no effect</ListItem>
                        </ul>

                        <SubSectionTitle>9.3 Waiver of Rights</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2">
                            <ListItem>
                                Our failure to immediately act on terms violations does not constitute a waiver of rights
                            </ListItem>
                        </ul>
                    </section>

                    {/* 10. Contact */}
                    <section>
                        <SectionTitle>10. Contact</SectionTitle>
                        <ContactCard />
                    </section>

                    {/* Closing Statement */}
                    <div className="text-center py-8">
                        <div className="bg-amber-100 rounded-lg p-6 border border-amber-200">
                            <p className="text-amber-800 font-medium">
                                These Terms of Service have been prepared to provide fair and transparent service and comply with relevant laws and regulations.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}