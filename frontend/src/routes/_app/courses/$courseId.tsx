import { createFileRoute } from "@tanstack/react-router";
import { useGetCourseById } from "@/hooks/resources/course/use-course-query.ts";
import Header from "@/components/elements/header.tsx";
import type { JSX } from "react";
import Tabs, { type TabItem } from "@/components/elements/tabs.tsx";
import FluxTab from "@/features/courses/details/flux/flux-tab";
import MaterialsTab from "@/features/courses/details/materials/materials-tab.tsx";
import ParticipantsTab from "@/features/courses/details/participants/participants-tab.tsx";
import GradesTab from "@/features/courses/details/grades/grades-tab.tsx";
import SettingsTab from "@/features/courses/details/settings/settings-tab.tsx";
import { BackButton } from "@/components/elements/back-button.tsx";

export const Route = createFileRoute("/_app/courses/$courseId")({
  component: CourseDetailsPage,
});

function CourseDetailsPage(): JSX.Element | null {
  const { courseId } = Route.useParams();
  const { data: course, isLoading } = useGetCourseById(courseId);

  const courseTabs: TabItem[] = [
    {
      id: "flux",
      name: "Flux",
      component: <FluxTab />,
    },
    {
      id: "materials",
      name: "Materials",
      component: <MaterialsTab />,
    },
    {
      id: "participants",
      name: "Participants",
      component: <ParticipantsTab />,
    },
    {
      id: "grades",
      name: "Grades",
      component: <GradesTab />,
    },
    {
      id: "settings",
      name: "Settings",
      component: <SettingsTab />,
    },
  ];

  if (isLoading || !course) {
    return null;
  }

  return (
    <div className="main-container flex h-screen flex-col">
      <BackButton className="pb-7" />
      <Header title={course.name} subtitle={course.description} />
      <Tabs tabs={courseTabs} defaultTabId="flux" className="pt-10" />
    </div>
  );
}
