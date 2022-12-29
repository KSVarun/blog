import { LinksFunction } from 'remix';
import indexStyles from '../index.css';
import defaultStyles from '../default.css';
import profileImg from '../assets/profile-img.webp';
import { useEffect, useState } from 'react';
import { Header } from '~/components/Header';
import { Container } from '~/components/Container';

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
    <Container>
      <Header/>
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
    </Container>
  );
}
