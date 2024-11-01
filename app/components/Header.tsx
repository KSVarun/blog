import { NavLink } from "@remix-run/react";

export function Header() {
  function getClassName({ isActive }: { isActive: boolean }) {
    return isActive ? "mr-3 font-semibold" : "mr-3";
  }

  return (
    <header className="text-base font-light px-6 pt-6">
      <NavLink to="/" className={getClassName}>
        Home
      </NavLink>
      <NavLink to="/posts" className={getClassName}>
        Posts
      </NavLink>
    </header>
  );
}
