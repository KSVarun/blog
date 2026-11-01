import { Link, useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/server-runtime";
import { posts } from "~/models/posts.server";

export const loader: LoaderFunction = () => posts;

export default function PostsIndex() {
  const posts = useLoaderData();

  return (
    <div>
      <div>
        {posts.map((post: any) => (
          <div key={post.slug}>
            <Link to={`/posts/${post.slug}`} className="text-xl link">
              {post.title}
            </Link>
            {post.date ? (
              <p className="mt-0 mb-1 text-xs">{post.date}</p>
            ) : null}
            {post.description ? (
              <p className="mt-0 mb-6">{post.description}</p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
