import styles from 'highlight.js/styles/github-dark-dimmed.css';
import { LinksFunction, Outlet, NavLink } from 'remix';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export default function Posts() {
  return (
    <div>
      <div className='text-base font-light px-6 pt-6'>
        <NavLink to='/' className='mr-3'>
          Home
        </NavLink>
        <NavLink to='/posts' className='mr-3 font-semibold'>
          Posts
        </NavLink>
      </div>
      <div className='flex justify-center'>
        <div className='prose lg:prose-l py-10 prose-h1:mb-0 pt-0 prose-h2:mt-5'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
