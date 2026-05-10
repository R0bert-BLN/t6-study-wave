import { createFileRoute } from "@tanstack/react-router";
import { useGetCourseById } from "@/hooks/resources/course/use-course-query.ts";
import Header from "@/components/elements/header.tsx";
import type { JSX } from "react";
import Tabs, { type TabItem } from "@/components/elements/tabs.tsx";
import FluxTab from "@/features/courses/details/flux/flux-tab.tsx";
import ClassworkTab from "@/features/courses/details/classwork/list/classwork-tab.tsx";
import ParticipantsTab from "@/features/courses/details/participants/participants-tab.tsx";
import GradesTab from "@/features/courses/details/grades/grades-tab.tsx";
import SettingsTab from "@/features/courses/details/settings/settings-tab.tsx";
import { BackButton } from "@/components/elements/back-button.tsx";
import { useAuth } from "@/providers/auth/use-auth.ts";

export const Route = createFileRoute("/_app/courses/$courseId/")({
  component: CourseDetailsPage,
});

function CourseDetailsPage(): JSX.Element | null {
  const { isProfessor } = useAuth();
  const { courseId } = Route.useParams();
  const { data: course, isLoading } = useGetCourseById(courseId);

  if (isLoading || !course) {
    return null;
  }

  const courseTabs: TabItem[] = [
    {
      id: "flux",
      name: "Flux",
      component: <FluxTab isArchived={course.isArchived} />,
    },
    {
      id: "classwork",
      name: "Classwork",
      component: <ClassworkTab isArchived={course.isArchived} />,
    },
    {
      id: "participants",
      name: "Participants",
      component: (
        <ParticipantsTab isArchived={course.isArchived} participants={course.participants || []} />
      ),
    },
    ...(isProfessor
      ? [
          {
            id: "grades",
            name: "Grades",
            component: <GradesTab />,
          },
          {
            id: "settings",
            name: "Settings",
            component: <SettingsTab course={course} />,
          },
        ]
      : []),
  ];

  return (
    <div className="main-container flex h-screen w-full flex-col">
      <BackButton className="mb-4" />
      <Header title={course.name} subtitle={course.description} />
      <Tabs tabs={courseTabs} defaultTabId="flux" className="flex-1 overflow-hidden pt-8" />
    </div>
  );
}
