import type { Metadata } from 'next';
import './globals.css';
import { PostHogProvider } from './_components/PostHogProvider';
import { Analytics } from '@vercel/analytics/next';
export const metadata: Metadata = {
    title: 'Coffimer',
    description: '커피 추출 타이머 앱으로, 다양한 레시피를 따라 완벽한 커피를 추출해보세요.',
    manifest: '/favicon/manifest.json',
    icons: {
        icon: [
            { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
            { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
            { url: '/favicon/android-icon-192x192.png', sizes: '192x192', type: 'image/png' },
        ],
        shortcut: '/favicon/favicon.ico',
        apple: [
            { url: '/favicon/apple-icon-57x57.png', sizes: '57x57', type: 'image/png' },
            { url: '/favicon/apple-icon-60x60.png', sizes: '60x60', type: 'image/png' },
            { url: '/favicon/apple-icon-72x72.png', sizes: '72x72', type: 'image/png' },
            { url: '/favicon/apple-icon-76x76.png', sizes: '76x76', type: 'image/png' },
            { url: '/favicon/apple-icon-114x114.png', sizes: '114x114', type: 'image/png' },
            { url: '/favicon/apple-icon-120x120.png', sizes: '120x120', type: 'image/png' },
            { url: '/favicon/apple-icon-144x144.png', sizes: '144x144', type: 'image/png' },
            { url: '/favicon/apple-icon-152x152.png', sizes: '152x152', type: 'image/png' },
            { url: '/favicon/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' },
        ],
        other: [
            {
                rel: 'apple-touch-icon-precomposed',
                url: '/favicon/apple-icon-precomposed.png',
            },
            {
                rel: 'msapplication-TileImage',
                url: '/favicon/ms-icon-144x144.png',
            },
        ],
    },
    other: {
        'msapplication-TileColor': '#ffffff',
        'msapplication-config': '/favicon/browserconfig.xml',
    },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="ko">
            <head>
                <script
                    type="text/javascript"
                    dangerouslySetInnerHTML={{
                        __html: `
                    (function(c,l,a,r,i,t,y){
                        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                    })(window, document, "clarity", "script", "rvsqy2z045");
                    `,
                    }}
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
            (function(){var w=window;if(w.ChannelIO){return w.console.error("ChannelIO script included twice.");}var ch=function(){ch.c(arguments);};ch.q=[];ch.c=function(args){ch.q.push(args);};w.ChannelIO=ch;function l(){if(w.ChannelIOInitialized){return;}w.ChannelIOInitialized=true;var s=document.createElement("script");s.type="text/javascript";s.async=true;s.src="https://cdn.channel.io/plugin/ch-plugin-web.js";var x=document.getElementsByTagName("script")[0];if(x.parentNode){x.parentNode.insertBefore(s,x);}}if(document.readyState==="complete"){l();}else{w.addEventListener("DOMContentLoaded",l);w.addEventListener("load",l);}})();
            ChannelIO('boot', {
              "pluginKey": "e2e09203-17ec-4a8c-98a3-d1eb81a456af"
            });
          `,
                    }}
                />
            </head>
            <body className="">
                <PostHogProvider>{children}</PostHogProvider>
                <Analytics />
            </body>
        </html>
    );
}
