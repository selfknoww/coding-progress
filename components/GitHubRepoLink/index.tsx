"use client";

import { useEffect, useState } from "react";
import { FaGithub, FaStar } from "react-icons/fa";

const REPO_URL = "https://github.com/selfknoww/coding-progress";
const REPO_API_URL = "https://api.github.com/repos/selfknoww/coding-progress";

const formatStarCount = (count: number) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(count >= 10000 ? 0 : 1)}k`;
  }
  return count.toString();
};

export default function GitHubRepoLink() {
  const [stars, setStars] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(REPO_API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load GitHub repository metadata");
        }
        return response.json() as Promise<{ stargazers_count?: number }>;
      })
      .then((data) => {
        if (!cancelled && typeof data.stargazers_count === "number") {
          setStars(formatStarCount(data.stargazers_count));
        }
      })
      .catch(() => {
        if (!cancelled) {
          setStars(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <a
      className="github-repo-link"
      href={REPO_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="GitHub repository"
    >
      <FaGithub aria-hidden="true" />
      <FaStar aria-hidden="true" />
      <span className="github-repo-stars" aria-live="polite">
        {stars ?? "Star"}
      </span>
    </a>
  );
}
