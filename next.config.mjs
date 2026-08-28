import nextra from "nextra";

const withNextra = nextra({});

const nextConfig = withNextra({
  turbopack: {},
});

nextConfig.turbopack.resolveAlias["next-mdx-import-source-file"] =
  "./mdx-components.tsx";

export default nextConfig;