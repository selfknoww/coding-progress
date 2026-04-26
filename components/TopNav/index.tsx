import GitHubRepoLink from "@components/GitHubRepoLink";
import ProgressBackup from "@components/ProgressBackup";
import Link from "next/link";

export default function TopNav() {
  return (
    <header className="top-nav">
      <div className="container-fluid px-3 py-2">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
          <Link className="navbar-brand fw-bold text-body" href="/">
            LC Coding
          </Link>
          <div className="top-actions">
            <GitHubRepoLink />
            <ProgressBackup />
          </div>
        </div>
      </div>
    </header>
  );
}
