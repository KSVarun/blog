import { NavLink, LinksFunction } from 'remix';
import indexStyles from '../index.css';
import defaultStyles from '../default.css';
import profileImg from '../assets/profile-img.webp';
import { useEffect, useState } from 'react';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: indexStyles },
    { rel: 'stylesheet', href: defaultStyles },
  ];
};

const stuffILoveToDo = ['code', 'build things'];

export default function Index() {
  useEffect(() => {
    let count = 0;
    let index = 0;
    let currentTxt = '';
    let letter = '';

    (function type() {
      if (count === stuffILoveToDo.length) {
        count = 0;
      }
      currentTxt = stuffILoveToDo[count];
      letter = currentTxt.slice(0, ++index);

      const el = document.querySelector('.typing');
      if (el) {
        el.textContent = letter;
      }
      if (letter.length === currentTxt.length) {
        count++;
        index = 0;
      }
      setTimeout(type, 300);
    })();
  }, []);

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
          <div className='helper-text'>
            <span>I love to </span>
            <span className='typing'></span>
          </div>
        </div>
      </div>
    </div>
  );
}
