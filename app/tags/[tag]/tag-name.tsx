"use client";

import { useParams } from "next/navigation";

export function TagName() {
  const params = useParams<{ tag: string }>();
  return params.tag || null;
}