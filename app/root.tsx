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
import styles from "./tailwind.css";
import { getCanonicalUrl, getSocialMeta } from "./social-meta";
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
    <html lang="en">
      <head>
        <Meta />
        <link rel="canonical" href={getCanonicalUrl(location.pathname)} />
        <Links />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-9PRELERZXT"
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
