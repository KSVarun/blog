import { Link } from "@remix-run/react";
import { useState, useEffect } from "react";
import profileImg from "../assets/profile-img.webp";

export function Header() {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    setTheme(storedTheme || preferredTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
  };

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-slate-900 px-6 pb-4 pt-6 transition-colors duration-300">
      <div className="mx-auto flex max-w-prose items-center justify-between">
        <Link
          to="/"
          reloadDocument
          style={{ color: "#318ce7", fontSize: 16, fontWeight: 700, textDecoration: "none" }}
          className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
        >
          Blog
        </Link>
        <div className="flex items-center gap-2">
          <span className="dark:text-slate-300">by</span>
          <a
            href="https://twitter.com/VarunKS20161856"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Varun on Twitter"
            className="block rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
          >
            <img
              src={profileImg}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
          </a>
          <button
            onClick={toggleTheme}
            className="ml-2 rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
            aria-label="Toggle theme"
          >
            <div className="relative h-5 w-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 h-5 w-5 hidden text-slate-700 dark:text-slate-200 dark:block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 h-5 w-5 text-slate-700 dark:hidden"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
