import { LoaderFunction, useLoaderData, Link, LinksFunction } from 'remix';
import defaultStyles from '../../default.css';
import * as placeholdersForImages from './placeholders-for-images.mdx';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: defaultStyles }];
};

function postsFromModule(mod: any) {
  return {
    slug: mod.filename.replace(/\.mdx?$/, ''),
    ...mod.attributes.meta,
  };
}

export const loader: LoaderFunction = () => {
  return [postsFromModule(placeholdersForImages)];
};

export default function PostsIndex() {
  const posts = useLoaderData();
  return (
    <div>
      <h2>Posts</h2>
      <div>
        {posts.map((post: any) => (
          <div key={post.slug}>
            <Link to={post.slug} className='text-xl link'>
              {post.title}
            </Link>
            {post.description ? (
              <p className='m-0 lg:m-0 mt-2'>{post.description}</p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
