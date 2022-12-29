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

export default function Index() {
  const [showTagLine, setShowTagLine] = useState(false);

  function shouldShowTagLine() {
    const LSVal = localStorage.getItem('showTagLine') || '';
    if (LSVal === 'true' || !LSVal) {
      return true;
    }
    return false;
  }

  async function handleRemoveTagLine() {
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
      <header className='text-base font-light px-6 pt-6'>
        <NavLink to='/' className='mr-3 font-semibold'>
          Home
        </NavLink>
        <NavLink to='/posts' className='mr-3'>
          Posts
        </NavLink>
      </header>
      <main className='profile-container'>
        <section className='img-container'>
          <img
            src={profileImg}
            alt='profile-img'
            className='profile-img'
            width='inherit'
            height='inherit'
          />
        </section>
        <section className='profile-details'>
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
          <aside className='tag-line-placeholder'>
            {showTagLine ? (
              <div onClick={handleRemoveTagLine} className='tag-line-container'>
                <i className='tag-line'>
                  Tag lines are overrated, click to never see me again
                </i>
              </div>
            ) : null}
          </aside>
        </section>
      </main>
    </div>
  );
}
