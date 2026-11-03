import { Container, Header } from "~/components";
import { Link, useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/server-runtime";
import * as rustCliForFileTransferFromAndroidToMac from "./posts/adb-file-transfer-from-android-mac-using-rust.mdx";
import * as dontTossThatThinSoapSliver from "./posts/dont-toss-that-thin-soap-sliver.mdx";
import * as md5sumInJs from "./posts/md5sum-in-js.mdx";
import * as mosquitoBatUpgrade from "./posts/mosquito-bat-upgrade.mdx";
import * as placeholdersForImages from "./posts/placeholders-for-images.mdx";
import * as postureDetectionSystem from "./posts/posture-detection-system.mdx";

function postsFromModule(mod: any) {
  return {
    slug: mod.filename.replace(/\.mdx?$/, ""),
    ...mod.attributes.meta,
    date: mod.attributes.date,
  };
}

export const loader: LoaderFunction = () => {
  return [
    postsFromModule(dontTossThatThinSoapSliver),
    postsFromModule(mosquitoBatUpgrade),
    postsFromModule(rustCliForFileTransferFromAndroidToMac),
    postsFromModule(postureDetectionSystem),
    postsFromModule(md5sumInJs),
    postsFromModule(placeholdersForImages),
  ];
};

export default function Index() {
  const posts = useLoaderData();

  return (
    <Container>
      <Header />
      <main className="posts-container flex justify-center md:px-6 sm:px-6">
        <div className="prose w-full lg:prose-l py-10 prose-h1:mb-0 pt-5 prose-h2:mt-0 overflow-hidden">
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
