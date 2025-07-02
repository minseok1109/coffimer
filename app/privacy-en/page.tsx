'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Constants
const PRIVACY_LAST_UPDATED = 'January 2, 2025';
const DEVELOPER_NAME = 'Bang Minseok';
const DEVELOPER_EMAIL = 'minseok32@gmail.com';
const RESPONSE_TIME = 'Within 48 hours on business days';

// Header Component
function PrivacyHeader() {
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
            <h1 className="text-4xl font-bold text-amber-900 mb-4">Privacy Policy</h1>
            <p className="text-amber-600 text-lg">
                Last Updated: <span className="font-semibold">{PRIVACY_LAST_UPDATED}</span>
            </p>
            <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-amber-800 text-sm">
                    Coffimer (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;, &quot;app&quot;) protects and respects your privacy. 
                    This Privacy Policy explains what information we collect, use, and share when you use the Coffimer app, 
                    and describes your choices regarding this information.
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
            <h3 className="text-xl font-semibold text-amber-900 mb-4">📞 Contact & Inquiries</h3>
            <p className="text-amber-800 mb-4">
                If you have any questions about this Privacy Policy, please contact us:
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

// Main Privacy Policy Component
export default function PrivacyEnPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
            <PrivacyHeader />

            <main className="max-w-4xl mx-auto px-6 py-12">
                <TitleSection />

                <div className="space-y-12">
                    {/* 1. Information We Collect */}
                    <section className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                        <SectionTitle>1. Information We Collect</SectionTitle>

                        <SubSectionTitle>1.1 Information You Provide Directly</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem><strong>Account Information</strong>: Email address, password (encrypted storage)</ListItem>
                            <ListItem><strong>Profile Information</strong>: Display name (optional)</ListItem>
                            <ListItem><strong>User-Generated Content</strong>: Coffee recipes, step-by-step instructions, YouTube links</ListItem>
                        </ul>

                        <SubSectionTitle>1.2 Information Collected Automatically</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem><strong>Usage Analytics Data</strong>: App usage patterns, screen views, feature usage frequency</ListItem>
                            <ListItem><strong>Recipe Interactions</strong>: Recipe views, likes, timer usage records</ListItem>
                            <ListItem><strong>Device Information</strong>: Operating system version, app version, device type, language settings</ListItem>
                            <ListItem><strong>Session Information</strong>: Login status, auto-login settings, session tokens</ListItem>
                            <ListItem><strong>Notification Tokens</strong>: Device identifiers for push notification delivery</ListItem>
                        </ul>

                        <SubSectionTitle>1.3 Information Collected Through Third-Party Services</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem><strong>Google Sign-In</strong>: Email address, basic profile information (when using Google account)</ListItem>
                            <ListItem><strong>Analytics Services</strong>: App usage statistics, error reports, performance metrics</ListItem>
                        </ul>

                        <SubSectionTitle>1.4 Information We Do Not Collect</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2">
                            <ListItem>Precise location information</ListItem>
                            <ListItem>Contact information</ListItem>
                            <ListItem>Camera or microphone data</ListItem>
                            <ListItem>Other personal files or sensitive information</ListItem>
                            <ListItem>Biometric data (not stored; used only within device for authentication purposes)</ListItem>
                        </ul>
                    </section>

                    {/* 2. How We Use Information */}
                    <section className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                        <SectionTitle>2. How We Use Information</SectionTitle>
                        
                        <p className="text-amber-800 mb-6">We use the collected information only for the following purposes:</p>

                        <SubSectionTitle>2.1 Core Service Provision</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>Account creation and management</ListItem>
                            <ListItem>Login and authentication services</ListItem>
                            <ListItem>Recipe storage and management</ListItem>
                            <ListItem>Timer and notification features</ListItem>
                        </ul>

                        <SubSectionTitle>2.2 User Experience Improvement</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>Personalized recipe recommendations</ListItem>
                            <ListItem>App performance optimization</ListItem>
                            <ListItem>Error resolution and bug fixes</ListItem>
                            <ListItem>New feature development</ListItem>
                        </ul>

                        <SubSectionTitle>2.3 Communication</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>Timer completion notifications</ListItem>
                            <ListItem>Service update notifications</ListItem>
                            <ListItem>Important policy change notifications</ListItem>
                            <ListItem>Customer support and inquiry responses</ListItem>
                        </ul>

                        <SubSectionTitle>2.4 Analytics and Research</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2">
                            <ListItem>Usage pattern analysis</ListItem>
                            <ListItem>App performance monitoring</ListItem>
                            <ListItem>User satisfaction surveys</ListItem>
                            <ListItem>Statistics generation for service improvement</ListItem>
                        </ul>
                    </section>

                    {/* 3. Third-Party Services and Information Sharing */}
                    <section className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                        <SectionTitle>3. Third-Party Services and Information Sharing</SectionTitle>

                        <SubSectionTitle>3.1 Third-Party Services We Use</SubSectionTitle>
                        
                        <div className="mb-6">
                            <h4 className="font-semibold text-amber-800 mb-2">Supabase (Backend Infrastructure)</h4>
                            <ul className="list-disc list-inside space-y-1 text-amber-700 ml-4">
                                <li><strong>Services Provided</strong>: Database, user authentication, real-time data synchronization</li>
                                <li><strong>Information Shared</strong>: Encrypted user data, recipe information</li>
                                <li><strong>Data Location</strong>: Cloud data centers (encrypted storage)</li>
                                <li><strong>Privacy Policy</strong>: <a href="https://supabase.com/privacy" className="text-amber-600 underline">Supabase Privacy Policy</a></li>
                            </ul>
                        </div>

                        <div className="mb-6">
                            <h4 className="font-semibold text-amber-800 mb-2">Expo Services (Development Platform)</h4>
                            <ul className="list-disc list-inside space-y-1 text-amber-700 ml-4">
                                <li><strong>Services Provided</strong>: Push notifications, app updates, error reporting</li>
                                <li><strong>Information Shared</strong>: Device tokens, app usage statistics, error logs</li>
                                <li><strong>Privacy Policy</strong>: <a href="https://expo.dev/privacy" className="text-amber-600 underline">Expo Privacy Policy</a></li>
                            </ul>
                        </div>

                        <div className="mb-6">
                            <h4 className="font-semibold text-amber-800 mb-2">Microsoft Clarity (User Behavior Analytics)</h4>
                            <ul className="list-disc list-inside space-y-1 text-amber-700 ml-4">
                                <li><strong>Services Provided</strong>: App usage pattern analysis, user experience improvement</li>
                                <li><strong>Information Shared</strong>: Anonymized usage statistics, screen interaction data</li>
                                <li><strong>Privacy Policy</strong>: <a href="https://privacy.microsoft.com/privacystatement" className="text-amber-600 underline">Microsoft Privacy Statement</a></li>
                            </ul>
                        </div>

                        <div className="mb-6">
                            <h4 className="font-semibold text-amber-800 mb-2">PostHog (Product Analytics)</h4>
                            <ul className="list-disc list-inside space-y-1 text-amber-700 ml-4">
                                <li><strong>Services Provided</strong>: Feature usage statistics, app performance analysis</li>
                                <li><strong>Information Shared</strong>: Anonymized event data, usage patterns</li>
                                <li><strong>Privacy Policy</strong>: <a href="https://posthog.com/privacy" className="text-amber-600 underline">PostHog Privacy Policy</a></li>
                            </ul>
                        </div>

                        <div className="mb-6">
                            <h4 className="font-semibold text-amber-800 mb-2">Google Sign-In (Optional Authentication)</h4>
                            <ul className="list-disc list-inside space-y-1 text-amber-700 ml-4">
                                <li><strong>Services Provided</strong>: Social login functionality</li>
                                <li><strong>Information Shared</strong>: Email address, basic profile information (only with user consent)</li>
                                <li><strong>Privacy Policy</strong>: <a href="https://policies.google.com/privacy" className="text-amber-600 underline">Google Privacy Policy</a></li>
                            </ul>
                        </div>

                        <SubSectionTitle>3.2 Information Sharing Principles</SubSectionTitle>
                        <p className="text-amber-800 mb-4">We do not share personal information with third parties except in the following cases:</p>
                        <ul className="list-disc list-inside space-y-2">
                            <ListItem><strong>Explicit Consent</strong>: When you have explicitly consented</ListItem>
                            <ListItem><strong>Legal Requirements</strong>: In response to court orders or legal processes</ListItem>
                            <ListItem><strong>Service Provision</strong>: Essential data sharing with third-party service providers mentioned above</ListItem>
                            <ListItem><strong>Safety Protection</strong>: When necessary to protect the safety of you or others</ListItem>
                        </ul>
                    </section>

                    {/* 4. Data Security */}
                    <section className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                        <SectionTitle>4. Data Security</SectionTitle>

                        <SubSectionTitle>4.1 Security Measures</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem><strong>Transmission Encryption</strong>: All data is transmitted encrypted via HTTPS/TLS</ListItem>
                            <ListItem><strong>Storage Encryption</strong>: Personal information is encrypted in the database</ListItem>
                            <ListItem><strong>Token Security</strong>: Authentication tokens are securely stored in device Keychain(iOS)/Keystore(Android)</ListItem>
                            <ListItem><strong>Access Control</strong>: Only authorized personnel with necessary permissions have limited access rights</ListItem>
                        </ul>

                        <SubSectionTitle>4.2 Security Management</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2">
                            <ListItem><strong>Regular Security Reviews</strong>: Regular inspection and updates of security systems</ListItem>
                            <ListItem><strong>Vulnerability Monitoring</strong>: Continuous monitoring for security threats</ListItem>
                            <ListItem><strong>Incident Response</strong>: Immediate response system in case of security incidents</ListItem>
                        </ul>
                    </section>

                    {/* 5. Your Rights */}
                    <section className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                        <SectionTitle>5. Your Rights</SectionTitle>

                        <SubSectionTitle>5.1 Right to Access Personal Information</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>Request access to collected personal information</ListItem>
                            <ListItem>Request explanation of personal information processing status</ListItem>
                        </ul>

                        <SubSectionTitle>5.2 Right to Rectification</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>Request correction of inaccurate information</ListItem>
                            <ListItem>Direct modification of profile information (within the app)</ListItem>
                        </ul>

                        <SubSectionTitle>5.3 Right to Erasure (Right to be Forgotten)</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem><strong>Account Deletion</strong>: Permanent account deletion available in app settings</ListItem>
                            <ListItem><strong>Data Deletion</strong>: Complete deletion of all related data within 30 days of account deletion</ListItem>
                            <ListItem><strong>Partial Deletion</strong>: Request selective deletion of specific personal information</ListItem>
                        </ul>

                        <SubSectionTitle>5.4 Right to Data Portability</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>Request personal information in standardized format</ListItem>
                            <ListItem>Support for data transfer to other services</ListItem>
                        </ul>

                        <SubSectionTitle>5.5 Right to Restrict Processing</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>Request restriction of personal information processing</ListItem>
                            <ListItem>Opt-out of analytics data collection (in app settings)</ListItem>
                        </ul>

                        <SubSectionTitle>5.6 How to Exercise Your Rights</SubSectionTitle>
                        <p className="text-amber-800 mb-4">To exercise your rights, please contact us at <strong>{DEVELOPER_EMAIL}</strong>.</p>
                        <ul className="list-disc list-inside space-y-2">
                            <ListItem><strong>Response Time</strong>: Initial response within 7 business days, processing completed within 30 days</ListItem>
                            <ListItem><strong>Identity Verification</strong>: Identity verification process required when exercising rights</ListItem>
                            <ListItem><strong>Fees</strong>: Exercise of personal information processing rights is free of charge</ListItem>
                        </ul>
                    </section>

                    {/* 6. Data Retention and Deletion */}
                    <section className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                        <SectionTitle>6. Data Retention and Deletion</SectionTitle>

                        <SubSectionTitle>6.1 Retention Periods</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem><strong>Account Data</strong>: Retained until account deletion request</ListItem>
                            <ListItem><strong>Usage Records</strong>: Automatically deleted after maximum 2 years</ListItem>
                            <ListItem><strong>Analytics Data</strong>: Retained for maximum 3 years after anonymization</ListItem>
                            <ListItem><strong>Legal Obligations</strong>: Compliance with minimum retention periods required by applicable laws</ListItem>
                        </ul>

                        <SubSectionTitle>6.2 Deletion Process</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2">
                            <ListItem><strong>Immediate Deletion</strong>: Immediate deletion of personally identifiable information upon account deletion request</ListItem>
                            <ListItem><strong>Complete Deletion</strong>: Complete deletion from all systems and backups within 30 days</ListItem>
                            <ListItem><strong>Irreversible</strong>: Deleted data cannot be recovered</ListItem>
                        </ul>
                    </section>

                    {/* 7. Children's Privacy Protection */}
                    <section className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                        <SectionTitle>7. Children&apos;s Privacy Protection</SectionTitle>
                        <ul className="list-disc list-inside space-y-2">
                            <ListItem>Coffimer does not intentionally collect personal information from children under 13 years of age</ListItem>
                            <ListItem>If we discover that information from children under 13 has been collected, we will delete it immediately</ListItem>
                            <ListItem>Parents or guardians may inquire about their children&apos;s personal information processing</ListItem>
                        </ul>
                    </section>

                    {/* 8. International Data Transfers */}
                    <section className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                        <SectionTitle>8. International Data Transfers</SectionTitle>

                        <SubSectionTitle>8.1 Data Transfers</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>Your information may be stored in global data centers of Supabase and other third-party services</ListItem>
                            <ListItem>All international transfers are made with appropriate security measures</ListItem>
                        </ul>

                        <SubSectionTitle>8.2 Legal Basis</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2">
                            <ListItem><strong>Adequacy Decisions</strong>: Transfers to countries with EU adequacy decisions</ListItem>
                            <ListItem><strong>Standard Contractual Clauses</strong>: Contractual safeguards ensuring appropriate level of protection</ListItem>
                            <ListItem><strong>Certification Mechanisms</strong>: Compliance with internationally recognized certification programs</ListItem>
                        </ul>
                    </section>

                    {/* 9. Notifications and Permission Management */}
                    <section className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                        <SectionTitle>9. Notifications and Permission Management</SectionTitle>

                        <SubSectionTitle>9.1 Push Notifications</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem><strong>Timer Notifications</strong>: Step-by-step coffee brewing alerts</ListItem>
                            <ListItem><strong>Service Notifications</strong>: Important updates and policy changes</ListItem>
                            <ListItem><strong>Control Methods</strong>: Can be disabled anytime in app settings or device settings</ListItem>
                        </ul>

                        <SubSectionTitle>9.2 App Permissions</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2">
                            <ListItem><strong>Audio Playback</strong>: Notification sound playback when timer completes</ListItem>
                            <ListItem><strong>Notification Permission</strong>: Push notification delivery</ListItem>
                            <ListItem><strong>Secure Storage</strong>: Safe storage of login information</ListItem>
                            <ListItem><strong>Network Access</strong>: Data synchronization with server</ListItem>
                        </ul>
                    </section>

                    {/* 10. Cookies and Similar Technologies */}
                    <section className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                        <SectionTitle>10. Cookies and Similar Technologies</SectionTitle>

                        <SubSectionTitle>10.1 Technologies We Use</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem><strong>Session Tokens</strong>: Maintaining login status</ListItem>
                            <ListItem><strong>Local Storage</strong>: App settings and cache data</ListItem>
                            <ListItem><strong>Analytics Tools</strong>: Anonymous identifiers for usage pattern analysis</ListItem>
                        </ul>

                        <SubSectionTitle>10.2 Management Methods</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2">
                            <ListItem>Most data is deleted when the app is reinstalled</ListItem>
                            <ListItem>All related data is completely removed when account is deleted</ListItem>
                        </ul>
                    </section>

                    {/* 11. Policy Changes */}
                    <section className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                        <SectionTitle>11. Policy Changes</SectionTitle>

                        <SubSectionTitle>11.1 Change Process</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem>Advance notice at least 30 days before privacy policy changes</ListItem>
                            <ListItem><strong>Notification Methods</strong>: In-app notifications, email notices, policy page updates</ListItem>
                            <ListItem><strong>Significant Changes</strong>: Separate consent process for changes requiring user consent</ListItem>
                        </ul>

                        <SubSectionTitle>11.2 Checking Changes</SubSectionTitle>
                        <ul className="list-disc list-inside space-y-2">
                            <ListItem>Changes can be confirmed through the &quot;Last Updated&quot; date at the top of the policy</ListItem>
                            <ListItem>Major changes will be announced separately in summary form</ListItem>
                        </ul>
                    </section>

                    {/* 12. Contact and Inquiries */}
                    <section>
                        <SectionTitle>12. Contact and Inquiries</SectionTitle>
                        <ContactCard />
                        
                        <div className="mt-8 bg-amber-50 rounded-lg p-6 border border-amber-200">
                            <SubSectionTitle>12.2 Types of Inquiries</SubSectionTitle>
                            <ul className="list-disc list-inside space-y-2 text-amber-700">
                                <ListItem>Questions about personal information processing</ListItem>
                                <ListItem>Requests for exercising personal information rights</ListItem>
                                <ListItem>Security incident reports</ListItem>
                                <ListItem>Policy-related opinions and suggestions</ListItem>
                            </ul>
                        </div>
                    </section>

                    {/* 13. Additional Information */}
                    <section className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                        <SectionTitle>13. Additional Information</SectionTitle>

                        <SubSectionTitle>13.1 Applicable Laws</SubSectionTitle>
                        <p className="text-amber-800 mb-4">This Privacy Policy has been written in compliance with the following laws:</p>
                        <ul className="list-disc list-inside space-y-2 mb-6">
                            <ListItem><strong>South Korea</strong>: Personal Information Protection Act, Act on Promotion of Information and Communications Network Utilization and Information Protection</ListItem>
                            <ListItem><strong>European Union</strong>: General Data Protection Regulation (GDPR)</ListItem>
                            <ListItem><strong>United States</strong>: California Consumer Privacy Act (CCPA)</ListItem>
                            <ListItem><strong>Others</strong>: Relevant privacy protection laws in service regions</ListItem>
                        </ul>

                        <SubSectionTitle>13.2 Dispute Resolution</SubSectionTitle>
                        <ol className="list-decimal list-inside space-y-2 mb-6">
                            <li className="text-amber-700 pl-2">
                                <strong>First</strong>: Direct inquiry to developer ({DEVELOPER_EMAIL})
                            </li>
                            <li className="text-amber-700 pl-2">
                                <strong>Second</strong>: Personal Information Protection Commission Privacy Violation Report Center (privacy.go.kr)
                            </li>
                            <li className="text-amber-700 pl-2">
                                <strong>Third</strong>: Legal remedy through competent courts
                            </li>
                        </ol>

                        <SubSectionTitle>13.3 Data Protection Impact Assessment</SubSectionTitle>
                        <p className="text-amber-800">
                            We regularly conduct data protection impact assessments to review the appropriateness and security of personal information processing.
                        </p>
                    </section>

                    {/* Closing Statement */}
                    <div className="text-center py-8">
                        <div className="bg-amber-100 rounded-lg p-6 border border-amber-200">
                            <p className="text-amber-800 font-medium mb-4">
                                <strong>Effective Date</strong>: {PRIVACY_LAST_UPDATED}<br />
                                <strong>Author</strong>: {DEVELOPER_NAME}<br />
                                <strong>Version</strong>: v2.0
                            </p>
                            <p className="text-amber-800">
                                If you have any questions or concerns about this Privacy Policy, please contact us at{' '}
                                <strong>{DEVELOPER_EMAIL}</strong> anytime.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}