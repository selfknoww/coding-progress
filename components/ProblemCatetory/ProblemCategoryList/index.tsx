import { ShareIcon } from "@components/icons";
import RatingCircle, { ColorRating } from "@components/RatingCircle";
import StudyPlanProgressBadge from "@components/StudyPlanProgressBadge";
import {
  OptionEntry,
  ProgressKeyType,
} from "@hooks/useProgress";
import { hashCode } from "@utils/hash";
import { renderSummaryHtml } from "@src/summaryHtml.mjs";
import {
  formatRelativeActivityTime,
  getProblemUpdatedAt,
} from "@src/progressActivity.mjs";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Dropdown from "react-bootstrap/esm/Dropdown";
import Modal from "react-bootstrap/esm/Modal";

const title2id = (title: string) => {
  // title: number. title
  return title.split(". ")[0];
};

const getProblemHref = (item: ProblemCategory) => {
  if (item.original_src) {
    return item.original_src;
  }
  if (item.src) {
    return "https://leetcode.cn/problems" + item.src;
  }
  return "#";
};

const getEnglishHref = (item: ProblemCategory) => {
  if (!item.src) {
    return null;
  }
  return "https://leetcode.com/problems" + item.src;
};

const getSolutionHref = (solution?: string | null) => {
  if (!solution) {
    return null;
  }
  if (solution.startsWith("http")) {
    return solution;
  }
  return `https://leetcode.cn${solution.startsWith("/") ? solution : `/${solution}`}`;
};

interface ProblemCategory {
  title: string;
  summary?: string;
  src?: string;
  original_src?: string;
  sort?: Number;
  isLeaf?: boolean;
  solution?: string | null;
  score?: Number | null;
  leafChild?: ProblemCategory[];
  nonLeafChild?: ProblemCategory[];
  isPremium?: boolean;
  last_update?: string;
}

interface ProblemCategoryListProps {
  optionKeys: ProgressKeyType[];
  getOption: (key?: ProgressKeyType) => OptionEntry;
  allProgress: Record<string, ProgressKeyType>;
  progressUpdatedAt: Record<string, string>;
  updateProgress: (questID: string, progress: ProgressKeyType) => void;
  removeProgress: (questID: string) => void;
  data: ProblemCategory;
  showEn?: boolean;
  showRating?: boolean;
  showPremium?: boolean;
}

function ProblemCategoryList({
  optionKeys,
  getOption,
  allProgress,
  progressUpdatedAt,
  updateProgress,
  removeProgress,
  data,
  showEn,
  showRating,
  showPremium,
}: ProblemCategoryListProps) {
  const [pendingChange, setPendingChange] = useState<{
    questID: string;
    progress: ProgressKeyType;
  } | null>(null);

  const requestProgressChange = (questID: string, progress: ProgressKeyType) => {
    setPendingChange({ questID, progress });
  };

  const confirmProgressChange = () => {
    if (!pendingChange) {
      return;
    }

    if (pendingChange.progress === getOption().key) {
      removeProgress(pendingChange.questID);
    } else {
      updateProgress(pendingChange.questID, pendingChange.progress);
    }
    setPendingChange(null);
  };

  const filteredChild = (data.leafChild || []).filter(
    (item) => !item.isPremium || showPremium
  );

  return (
    <section className="leaf">
      <h3 className="title" id={`${hashCode(data.title || "")}`}>
        <span>{data.title}</span>
        <StudyPlanProgressBadge data={data} compact />
      </h3>
      {data.summary && (
        <div
          className="summary"
          dangerouslySetInnerHTML={{ __html: renderSummaryHtml(data.summary) }}
        ></div>
      )}
      <ul className="list">
        {filteredChild &&
          filteredChild.map((item) => {
            const id = title2id(item.title);
            const progressKey = allProgress[id];
            const option = getOption(progressKey);
            const rating = Number(item.score);
            const englishHref = getEnglishHref(item);
            const solutionHref = getSolutionHref(item.solution);
            const updatedAt = getProblemUpdatedAt(progressUpdatedAt, id);
            const lastAcLabel = updatedAt
              ? formatRelativeActivityTime(updatedAt)
              : null;

            return (
              <li
                data-todo={option.key === getOption().key}
                data-status={option.key}
                className="problem-row"
                key={hashCode(item.title || "")}
              >
                <div className="problem-main">
                  <a
                    className="problem-title"
                    href={getProblemHref(item)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.title + (item.isPremium ? " (会员题)" : "")}
                  </a>
                  <span className="problem-links">
                    {solutionHref && (
                      <a
                        className="solution-link"
                        href={solutionHref}
                        target="_blank"
                        rel="noreferrer"
                      >
                        题解
                      </a>
                    )}
                    {showEn && englishHref && (
                      <a
                        className="english-link"
                        href={englishHref}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="英文题面"
                      >
                        <ShareIcon height={16} width={16} />
                      </a>
                    )}
                  </span>
                </div>
                <div className="problem-meta">
                  {option.key === "AC" && lastAcLabel && (
                    <span
                      className="last-ac-time"
                      title={`Last AC ${lastAcLabel}`}
                    >
                      Last AC {lastAcLabel}
                    </span>
                  )}
                  {item.score && showRating ? (
                    <div className="pb-rating-bg">
                    <RatingCircle rating={rating} />
                    <ColorRating className="rating-text" rating={rating}>
                      {rating.toFixed(0)}
                    </ColorRating>
                    </div>
                  ) : null}
                  <div className="problem-progress">
                  <Dropdown align="end">
                    <Dropdown.Toggle
                      className="status-menu-toggle"
                      style={{
                        color: option.color,
                      }}
                      variant="outline-secondary"
                    >
                      {option.label || "Set"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                    {optionKeys.map((p) => (
                      <Dropdown.Item
                        key={p}
                        active={p === option.key}
                        disabled={p === option.key}
                        onClick={() => requestProgressChange(id, p)}
                        style={{ color: getOption(p).color }}
                      >
                        {getOption(p).label || "待做"}
                      </Dropdown.Item>
                    ))}
                    {optionKeys.indexOf(option.key) == -1 && (
                      <Dropdown.Item
                        key={option.key}
                        active
                        onClick={() => requestProgressChange(id, option.key)}
                        style={{ color: option.color }}
                      >
                        {option.label}
                      </Dropdown.Item>
                    )}
                    </Dropdown.Menu>
                  </Dropdown>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
      <Modal
        centered
        show={Boolean(pendingChange)}
        onHide={() => setPendingChange(null)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm status change</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This will update the problem status and refresh its updated time.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setPendingChange(null)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmProgressChange}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}

export default ProblemCategoryList;
