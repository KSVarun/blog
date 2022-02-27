import React from 'react';
import { NavLink, Link, LinksFunction } from 'remix';
import indexStyles from './index.css';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: indexStyles }];
};

export default function Index() {
  function imageLoadHander(e: React.SyntheticEvent<HTMLImageElement, Event>) {
    const img = e.target as HTMLImageElement;
    img.parentElement?.classList.add('image-loaded');
    img.style.opacity = '1';
  }

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
          <img
            src='https://my-public-imgs.s3.amazonaws.com/profile-img.webp'
            alt='profile-img'
            className='profile-img'
            onLoad={imageLoadHander}
            onError={imageLoadHander}
          />
        </div>
        <div className='profile-details '>
          <div>
            Hello 👋, I am{' '}
            <Link to='https://twitter.com/VarunKS20161856' className='name'>
              Varun
            </Link>
          </div>
          <div className='helper-text'>I love to code</div>
        </div>
      </div>
    </div>
  );
}
