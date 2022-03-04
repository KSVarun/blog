import { NavLink, LinksFunction } from 'remix';
import indexStyles from '../index.css';
import defaultStyles from '../default.css';
import profileImg from '../assets/profile-img.webp';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: indexStyles },
    { rel: 'stylesheet', href: defaultStyles },
  ];
};

export default function Index() {
  return (
    <div
      style={{
        fontFamily: 'system-ui, sans-serif',
        lineHeight: '1.4',
        height: '100vh',
      }}
    >
      <div className='text-base font-light px-6 pt-6'>
        <NavLink to='/' className='mr-3 font-semibold'>
          Home
        </NavLink>
        <NavLink to='/posts' className='mr-3'>
          Posts
        </NavLink>
      </div>
      <div className='profile-container'>
        <div className='img-container'>
          <img src={profileImg} alt='profile-img' className='profile-img' />
        </div>
        <div className='profile-details '>
          <div>
            Hello 👋, I am{' '}
            <a
              href='https://twitter.com/VarunKS20161856'
              target='_blank'
              className='link'
            >
              Varun
            </a>
          </div>
          <div className='helper-text'>I love to code</div>
        </div>
      </div>
    </div>
  );
}
