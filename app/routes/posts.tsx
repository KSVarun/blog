import styles from 'highlight.js/styles/github-dark-dimmed.css';
import { LinksFunction, Outlet } from 'remix';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export default function Posts() {
  return (
    <div className='flex justify-center'>
      <div className='prose lg:prose-l py-10'>
        <Outlet />
      </div>
    </div>
  );
}
