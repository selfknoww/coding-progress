import { studyPlans, StudyPlanSlug } from "@/config/studyPlans";
import List from "@components/containers/List";
import TopNav from "@components/TopNav";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return Object.keys(studyPlans).map((slug) => ({ slug }));
}

export default function StudyPlanPage({
  params,
}: {
  params: { slug: StudyPlanSlug };
}) {
  const plan = studyPlans[params.slug];

  if (!plan) {
    notFound();
  }

  return (
    <>
      <TopNav />
      <List data={plan.data} />
    </>
  );
}
