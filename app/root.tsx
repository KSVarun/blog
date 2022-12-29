import { useEffect } from 'react';
import {
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'remix';
import defaultStyles from './default.css';
import indexStyles from './index.css';
import postStyles from './posts.css';
import styles from './tailwind.css';
declare global {
  interface Window {
    dataLayer: any;
  }
}

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: styles, as: 'style' },
    { rel: 'stylesheet', href: indexStyles, as: 'style' },
    { rel: 'stylesheet', href: postStyles, as: 'style' },
    { rel: 'stylesheet', href: defaultStyles, as: 'style' },
  ];
};

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'A blog by Varun KS',
  viewport: 'width=device-width, initial-scale=1',
});

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
