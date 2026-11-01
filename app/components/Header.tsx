import profileImg from "../assets/profile-img.webp";

export function Header() {
  return (
    <header className="px-6 pt-6">
      <div className="mx-auto flex max-w-prose justify-end">
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
    </header>
  );
}
