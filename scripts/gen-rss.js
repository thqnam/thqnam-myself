const { promises: fs } = require("fs");
const path = require("path");
const RSS = require("rss");
const matter = require("gray-matter");

async function getPostFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) return getPostFiles(entryPath);
      if (entry.isFile() && /\.mdx?$/.test(entry.name)) return [entryPath];
      return [];
    }),
  );

  return files.flat();
}

async function generate() {
  const feed = new RSS({
    title: "Thiều Huỳnh Quang Nam",
    site_url: "https://thqnam-myself.vercel.app/",
    feed_url: "https://thqnam-myself.vercel.app/feed.xml",
  });

  const projectRoot = path.join(__dirname, "..");
  const postsDirectory = path.join(projectRoot, "app", "posts");
  const postFiles = await getPostFiles(postsDirectory);

  await Promise.all(
    postFiles.map(async (filePath) => {
      if (path.relative(postsDirectory, filePath) === "page.mdx") return;

      const content = await fs.readFile(filePath);
      const frontmatter = matter(content);
      const relativePath = path.relative(postsDirectory, filePath);
      const urlPath = relativePath
        .replace(/\\/g, "/")
        .replace(/\/page\.mdx?$/, "")
        .replace(/\.mdx?$/, "");

      feed.item({
        title: frontmatter.data.title,
        url: "/posts/" + urlPath,
        date: frontmatter.data.date,
        description: frontmatter.data.description,
        categories: frontmatter.data.tag
          ? frontmatter.data.tag.split(", ")
          : undefined,
        author: frontmatter.data.author,
      });
    }),
  );

  await fs.writeFile(path.join(projectRoot, "public", "feed.xml"), feed.xml({ indent: true }));
}

generate();
