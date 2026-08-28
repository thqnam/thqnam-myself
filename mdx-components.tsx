import {
  useMDXComponents as getNextraComponents,
  type MDXComponents,
} from "nextra/mdx-components";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...getNextraComponents(), ...components };
}