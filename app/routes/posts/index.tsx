import { Link, useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/server-runtime";
import * as md5sumInJs from "./md5sum-in-js.mdx";
import * as placeholdersForImages from "./placeholders-for-images.mdx";
import * as postureDetectionSystem from "./posture-detection-system.mdx";

function postsFromModule(mod: any) {
  return {
    slug: mod.filename.replace(/\.mdx?$/, ""),
    ...mod.attributes.meta,
    date: mod.attributes.date,
  };
}

export const loader: LoaderFunction = () => {
  return [
    postsFromModule(placeholdersForImages),
    postsFromModule(md5sumInJs),
    postsFromModule(postureDetectionSystem),
  ];
};

export default function PostsIndex() {
  const posts = useLoaderData();

  return (
    <div>
      <div>
        {posts.map((post: any) => (
          <div key={post.slug}>
            <Link to={post.slug} className="text-xl link">
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
