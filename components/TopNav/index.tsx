import ProgressBackup from "@components/ProgressBackup";
import { studyPlans } from "@/config/studyPlans";
import Link from "next/link";

export default function TopNav() {
  return (
    <header className="top-nav">
      <div className="container-fluid px-3 py-2">
        <div className="d-flex flex-column gap-2">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
            <Link className="navbar-brand fw-bold text-body" href="/">
              LC Coding
            </Link>
            <ProgressBackup />
          </div>
          <nav className="d-flex flex-wrap gap-2 small">
            {Object.entries(studyPlans).map(([slug, plan]) => (
              <Link
                key={slug}
                className="link-secondary text-nowrap"
                href={plan.href}
              >
                {plan.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
