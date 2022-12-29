import styles from 'highlight.js/styles/github-dark-dimmed.css';
import postStyles from '../posts.css';
import { LinksFunction, Outlet, NavLink } from 'remix';
import { Header } from '~/components/Header';
import { Container } from '~/components/Container';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: postStyles },
  ];
};

export default function Posts() {
  return (
    <Container>
      <Header/>
      <div className='posts-container flex justify-center md:px-6 sm:px-6'>
        <div className='prose lg:prose-l py-10 prose-h1:mb-0 pt-5 prose-h2:mt-0 overflow-hidden'>
          <Outlet />
        </div>
      </div>
    </Container>
  );
}
