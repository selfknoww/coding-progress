import { hashCode } from "@utils/hash";
import ProblemCategoryList from "./ProblemCategoryList";
import StudyPlanProgressBadge from "@components/StudyPlanProgressBadge";
import { useProgressOptions, useQuestProgress } from "@hooks/useProgress";
import { renderSummaryHtml } from "@src/summaryHtml.mjs";

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

interface ProblemCategoryProps {
  title?: string;
  summary?: string;
  data?: ProblemCategory[];
  className?: string;
  level?: number;
  showEn?: boolean;
  showRating?: boolean;
  showPremium?: boolean;
}

function ProblemCategory({
  title,
  summary,
  data,
  className = "",
  level = 0,
  showEn,
  showRating,
  showPremium,
}: ProblemCategoryProps) {
  const { optionKeys, getOption } = useProgressOptions();
  const { allProgress, updateProgress, removeProgress } = useQuestProgress();
  const shouldShowHeadingProgress = level > 0 && data && data.length > 0;

  return (
    <div className={`pb-container level-${level} ${className}`}>
      {title && (
        <h3 className="title" id={`${hashCode(title || "")}`}>
          <span dangerouslySetInnerHTML={{ __html: title || "" }}></span>
          {shouldShowHeadingProgress ? (
            <StudyPlanProgressBadge
              data={{ title, leafChild: [], nonLeafChild: data }}
              compact
            />
          ) : null}
        </h3>
      )}
      {summary && (
        <div
          className="summary"
          dangerouslySetInnerHTML={{ __html: renderSummaryHtml(summary) }}
        ></div>
      )}
      <div className={`pb-children level-${level}`}>
        {data &&
          data.map((item) => {
            const leafChild = item.leafChild || [];
            const nonLeafChild = item.nonLeafChild || [];
            let summary = leafChild.length == 0 ? item.summary : "";
            let title = leafChild.length == 0 ? item.title : "";
            return (
              <div className="pb-node" key={hashCode(item.title || "") + "head"}>
                {leafChild.length > 0 ? (
                  <ProblemCategoryList
                    optionKeys={optionKeys}
                    getOption={getOption}
                    allProgress={allProgress}
                    updateProgress={updateProgress}
                    removeProgress={removeProgress}
                    showEn={showEn}
                    showRating={showRating}
                    showPremium={showPremium}
                    data={item}
                    key={hashCode(item.title || "") + "leaf"}
                  />
                ) : <></>}
                <ProblemCategory
                  showEn={showEn}
                  showRating={showRating}
                  showPremium={showPremium}
                  level={level + 1}
                  title={title}
                  data={nonLeafChild}
                  summary={summary}
                  key={hashCode(item.title || "") + "nonLeaf"}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ProblemCategory;
