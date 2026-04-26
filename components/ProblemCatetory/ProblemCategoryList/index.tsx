import { ShareIcon } from "@components/icons";
import RatingCircle, { ColorRating } from "@components/RatingCircle";
import {
  OptionEntry,
  ProgressKeyType,
} from "@hooks/useProgress";
import { hashCode } from "@utils/hash";
import { renderSummaryHtml } from "@src/summaryHtml.mjs";
import Form from "react-bootstrap/esm/Form";

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
  updateProgress,
  removeProgress,
  data,
  showEn,
  showRating,
  showPremium,
}: ProblemCategoryListProps) {
  // Event handlers
  const handleProgressSelectChange = (
    questID: string,
    progress: ProgressKeyType
  ) => {
    if (progress === getOption().key) {
      removeProgress(questID);
    } else {
      updateProgress(questID, progress);
    }
  };

  const filteredChild = (data.leafChild || []).filter(
    (item) => !item.isPremium || showPremium
  );

  return (
    <section className="leaf">
      <h3 className="title" id={`${hashCode(data.title || "")}`}>
        {data.title}
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

            return (
              <li
                data-todo={option.key === getOption().key}
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
                  {item.score && showRating ? (
                    <div className="pb-rating-bg">
                    <RatingCircle rating={rating} />
                    <ColorRating className="rating-text" rating={rating}>
                      {rating.toFixed(0)}
                    </ColorRating>
                    </div>
                  ) : null}
                </div>
                <div className="problem-progress">
                  <Form.Select
                    style={{
                      color: option.color,
                    }}
                    value={option.key}
                    onChange={(e) =>
                      handleProgressSelectChange(id, e.target.value)
                    }
                  >
                    {optionKeys.map((p) => (
                      <option
                        key={p}
                        value={p}
                        style={{ color: getOption(p).color }}
                      >
                        {getOption(p).label}
                      </option>
                    ))}
                    {optionKeys.indexOf(option.key) == -1 && (
                      <option
                        key={option.key}
                        value={option.key}
                        style={{ color: option.color }}
                      >
                        {option.label}
                      </option>
                    )}
                  </Form.Select>
                </div>
              </li>
            );
          })}
      </ul>
    </section>
  );
}

export default ProblemCategoryList;
