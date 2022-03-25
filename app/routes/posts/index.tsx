import { LoaderFunction, useLoaderData, Link, LinksFunction } from 'remix';
import defaultStyles from '../../default.css';
import * as placeholdersForImages from './placeholders-for-images.mdx';
import * as md5sumInJs from './md5sum-in-js.mdx';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: defaultStyles }];
};

function postsFromModule(mod: any) {
  return {
    slug: mod.filename.replace(/\.mdx?$/, ''),
    ...mod.attributes.meta,
    date: mod.attributes.date,
  };
}

export const loader: LoaderFunction = () => {
  return [postsFromModule(placeholdersForImages), postsFromModule(md5sumInJs)];
};

export default function PostsIndex() {
  const posts = useLoaderData();
  console.log(posts);
  return (
    <div>
      <div>
        {posts.map((post: any) => (
          <div key={post.slug}>
            <Link to={post.slug} className='text-xl link'>
              {post.title}
            </Link>
            {post.date ? (
              <p className='mt-0 mb-1 text-xs'>{post.date}</p>
            ) : null}
            {post.description ? (
              <p className='mt-0 mb-6'>{post.description}</p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
