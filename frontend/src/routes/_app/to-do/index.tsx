import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/elements/header.tsx";
import { useState } from "react";
import TabFilters from "@/components/elements/tabs-filter.tsx";
import { useGetAllAssignments } from "@/hooks/resources/assignment/use-assignment-query.ts";
import SearchBar from "@/components/elements/search-bar.tsx";
import NotFound from "@/components/elements/not-found.tsx";
import type { Assignment } from "@/types/resources/assignment.ts";
import { ResourceType } from "@/types/resources/resource-type.ts";
import { ClassworkItem } from "@/components/elements/classwork-item.tsx";
import { useAuth } from "@/providers/auth/use-auth.ts";

export const Route = createFileRoute("/_app/to-do/")({
  component: ToDoPage,
});

function ToDoPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("assigned");

  const { data: assignments, filters } = useGetAllAssignments({
    filters: {
      assigned_to: user?.id ?? "",
      status: "assigned",
    },
    include: "course",
  });

  const tabItems = [
    {
      id: "assigned",
      title: "Assigned",
      onChange: () => {
        setActiveTab("assigned");
        filters.setFilter("status", "assigned");
      },
    },
    {
      id: "missing",
      title: "Missing",
      onChange: () => {
        setActiveTab("missing");
        filters.setFilter("status", "missing");
      },
    },
    {
      id: "done",
      title: "Done",
      onChange: () => {
        setActiveTab("done");
        filters.setFilter("status", "submitted");
      },
    },
  ];

  return (
    <div className="main-container flex h-screen flex-col">
      <Header className="pb-10" title="To Do" subtitle="View and manage your assignments" />

      <TabFilters items={tabItems} activeId={activeTab} />

      <div className="mx-auto w-3xl flex-1 overflow-hidden">
        <div className="flex items-center gap-6 py-6">
          <SearchBar
            onSearch={(value) => filters.setFilter("title", value)}
            placeholder="Search..."
          />
        </div>

        {assignments?.length === 0 ? (
          <NotFound message="No assignments found" />
        ) : (
          <div className="no-scrollbar flex flex-1 flex-col gap-3 overflow-y-auto">
            {assignments.map((assignment: Assignment) => (
              <ClassworkItem
                key={assignment.id}
                className="p-3"
                variant="assignment"
                classwork={assignment}
                courseId={assignment.course?.id ?? ""}
                href={`/${ResourceType.Course}/${assignment.course?.id}/${ResourceType.Assignment}/${assignment.id}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
