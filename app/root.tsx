import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";
import { LinksFunction, MetaFunction } from "@remix-run/server-runtime";
import { useEffect } from "react";
import defaultStyles from "./default.css";
import indexStyles from "./index.css";
import postStyles from "./posts.css";
import { getCanonicalUrl, getSocialMeta } from "./social-meta";
import styles from "./tailwind.css";
import { Container, Header } from "./components";
declare global {
  interface Window {
    dataLayer: any;
  }
}
declare global {
  interface Window {
    dataLayer: any;
  }
}

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles, as: "style" },
    { rel: "stylesheet", href: indexStyles, as: "style" },
    { rel: "stylesheet", href: postStyles, as: "style" },
    { rel: "stylesheet", href: defaultStyles, as: "style" },
  ];
};

export const meta: MetaFunction = ({ location }) => ({
  charset: "utf-8",
  viewport: "width=device-width, initial-scale=1",
  ...getSocialMeta({ pathname: location.pathname }),
});

export default function App() {
  const location = useLocation();
  useEffect(() => {
    if (typeof document !== "undefined") {
      const script = document.createElement("script");
      script.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', 'G-9PRELERZXT');`;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Meta />
        <link rel="canonical" href={getCanonicalUrl(location.pathname)} />
        <Links />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.classList.add(theme);
              })()
            `,
          }}
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-9PRELERZXT"
        ></script>
        <script></script>
      </head>
      <body className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <Container>
          <Header />
          <Outlet />
        </Container>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
