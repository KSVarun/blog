import { Outlet } from "@remix-run/react";
import {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/server-runtime";
import styles from "highlight.js/styles/github-dark-dimmed.css";
import { Container, Header } from "~/components";
import { posts } from "~/models/posts.server";
import { getSocialMeta } from "~/social-meta";

export const loader: LoaderFunction = () => posts;

export const meta: MetaFunction = ({ data, location }) => {
  const pathname = location.pathname.replace(/\/+$/, "");
  const post = data?.find(
    (post: { slug: string }) => pathname === `/posts/${post.slug}`
  );

  return post ? getSocialMeta({ ...post, pathname, type: "article" }) : {};
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export default function Posts() {
  return (
    <Container>
      <Header />
      <div className="posts-container flex justify-center md:px-6 sm:px-6">
        <div className="prose dark:prose-invert w-full lg:prose-l py-10 prose-h1:mb-0 pt-5 prose-h2:mt-0 overflow-hidden">
          <Outlet />
        </div>
      </div>
    </Container>
  );
}
