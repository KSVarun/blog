import { LoaderFunction, useLoaderData, Link } from 'remix';
import * as placeholdersForImages from './placeholders-for-images.mdx';

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
            <Link to={post.slug}>{post.title}</Link>
            {post.description ? (
              <p className='m-0 lg:m-0'>{post.description}</p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
