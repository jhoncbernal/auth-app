import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "./main.css";
import "primereact/resources/themes/lara-light-green/theme.css";
import type { Metadata } from "next";
import ReduxProvider from "@/providers/Redux";
import AuthProvider, { Session } from "@/providers/Auth";
import { ToastProvider } from "@/providers/Toast";
import Script from "next/script";

export const metadata: Metadata = {
  title: "auth app",
  description:
    " We are Weather and Information Networks; From dominating the Canadian weather information space, to breaking new ground in data solutions.",
  keywords:
    ""
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Script id="hotjar">
          {`(function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:3671029,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
                })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
        </Script>
        <Script
          id="import-gtag"
          src="https://www.googletagmanager.com/gtag/js?id=GTM-W5LN3LXV"
        />
        <Script id="gtag">
          {` window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GTM-W5LN3LXV');`}
        </Script>
      </head>
      <body className={`bg-gray-200`}>
        <ReduxProvider>
          <AuthProvider>
            <ToastProvider>
              <Session />
              {children}
            </ToastProvider>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
