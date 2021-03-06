import { useEffect } from 'react';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  LinksFunction,
  MetaFunction,
} from 'remix';
import styles from './tailwind.css';

declare global {
  interface Window {
    dataLayer: any;
  }
}

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const meta: MetaFunction = () => {
  return { title: 'A blog by Varun KS' };
};

export default function App() {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const script = document.createElement('script');
      script.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', 'G-9PRELERZXT');`;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <meta
          name='description'
          content='A blog about the stuff I find interesting'
        />
        <meta property='og:title' content='varunks.dev' />
        <meta property='og:url' content='https://www.varunks.dev' />
        <Meta />
        <Links />
        <script
          async
          src='https://www.googletagmanager.com/gtag/js?id=G-9PRELERZXT'
        ></script>
        <script></script>
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
