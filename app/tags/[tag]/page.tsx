import Link from "next/link";

const posts = [
  {
    title: "Markdown Examples - My 1st Post",
    description: "View examples of all possible Markdown options.",
    date: "2025-05-14",
    route: "/posts/markdown",
    tags: ["web development"],
  },
  {
    title: "Next.js Pages - My 2nd Post",
    description: "Learn more about Next.js pages.",
    date: "2025-05-14",
    route: "/posts/pages",
    tags: ["web development"],
  },
];

export function generateStaticParams() {
  return [{ tag: "web development" }];
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const matchingPosts = posts.filter((post) => post.tags.includes(tag));

  return (
    <div className="tag-page">
      <p className="back-link">
        <Link href="/posts">← All posts</Link>
      </p>
      <h1>Posts Tagged with “{tag}”</h1>
      <div className="post-list">
        {matchingPosts.map((post) => (
          <article className="post-item" key={post.route}>
            <h2>
              <Link href={post.route}>{post.title}</Link>
            </h2>
            <p className="post-description">
              {post.description}
              <Link className="post-item-more" href={post.route}>
                Read More →
              </Link>
            </p>
            <time dateTime={post.date}>Wed May 14 2025</time>
          </article>
        ))}
      </div>
    </div>
  );
}