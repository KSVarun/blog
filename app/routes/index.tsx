import { NavLink, LinksFunction } from 'remix';
import indexStyles from '../index.css';
import defaultStyles from '../default.css';
import profileImg from '../assets/profile-img.webp';
import puffSoundEffect from '../assets/puff-sound-effect.mp3';
import { useEffect, useState } from 'react';
import { sleep } from '~/utils';

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: indexStyles },
    { rel: 'stylesheet', href: defaultStyles },
  ];
};

const stuffILoveToDo = ['code', 'build things'];

export default function Index() {
  const [showTagLine, setShowTagLine] = useState(false);

  function shouldShowTagLine() {
    const LSVal = localStorage.getItem('showTagLine') || '';
    if (LSVal === 'true' || !LSVal) {
      return true;
    }
    return false;
  }

  function startStrikeOutAnimation() {
    const ele = document.querySelector('.tag-line-container');
    ele?.classList.add('strike');
  }

  async function handleRemoveTagLine() {
    const puffAudio = new Audio(puffSoundEffect);
    puffAudio.play();
    startStrikeOutAnimation();
    await sleep(3500);
    localStorage.setItem('showTagLine', 'false');
    setShowTagLine(false);
  }

  useEffect(() => {
    const res = shouldShowTagLine();
    setShowTagLine(res);
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
          <img
            src={profileImg}
            alt='profile-img'
            className='profile-img'
            width='inherit'
            height='inherit'
          />
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
          <div className='tag-line-placeholder'>
            {showTagLine ? (
              <div onClick={handleRemoveTagLine} className='tag-line-container'>
                <i className='tag-line'>
                  Tag lines are overrated, click to never see me again
                </i>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
