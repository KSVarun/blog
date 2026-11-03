import { Link } from "@remix-run/react";
import profileImg from "../assets/profile-img.webp";

export function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white px-6 pb-4 pt-6">
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
          <span>by</span>
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
        </div>
      </div>
    </header>
  );
}
