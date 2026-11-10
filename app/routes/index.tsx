import { Container, Header } from "~/components";
import { Link, useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/server-runtime";
import { posts } from "~/models/posts.server";

export const loader: LoaderFunction = () => posts;

export default function Index() {
  const posts = useLoaderData();

  return (
    <Container>
      <Header />
      <main className="posts-container flex justify-center md:px-6 sm:px-6">
        <div className="prose dark:prose-invert w-full lg:prose-l py-10 prose-h1:mb-0 pt-5 prose-h2:mt-0 overflow-hidden">
          <div>
            <div>
              {posts.map((post: any) => (
                <div key={post.slug}>
                  {/* Native history avoids showing the old post while back-navigation loaders run. */}
                  <Link to={`/posts/${post.slug}`} reloadDocument className="text-xl link">
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
        </div>
      </main>
    </Container>
  );
}
