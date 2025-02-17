import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v20.0&appId=621349598876900" nonce="ksOmmSrC"></script>
        
      </Head>
      <body>
      <div id="fb-root"></div>
       {/* Google Tag Manager (noscript) */}
       <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-MCDV2KCK"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>
          {/* End Google Tag Manager (noscript) */}
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
