import { Container, Header } from "~/components";
import PostsIndex from "./posts/index";

export { loader } from "./posts/index";

export default function Index() {
  return (
    <Container>
      <Header />
      <main className="posts-container flex justify-center md:px-6 sm:px-6">
        <div className="prose w-full lg:prose-l py-10 prose-h1:mb-0 pt-5 prose-h2:mt-0 overflow-hidden">
          <PostsIndex />
        </div>
      </main>
    </Container>
  );
}
