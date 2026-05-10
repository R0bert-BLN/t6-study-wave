import { createFileRoute } from "@tanstack/react-router";
import { useGetMaterialById } from "@/hooks/resources/material/use-material-query.ts";
import type { JSX } from "react";
import { BackButton } from "@/components/elements/back-button.tsx";
import Header from "@/components/elements/header.tsx";
import MaterialDetails from "@/features/materials/material-details.tsx";

export const Route = createFileRoute("/_app/courses/$courseId/materials/$materialId")({
  component: MaterialDetailsPage,
});

function MaterialDetailsPage(): JSX.Element | null {
  const { materialId } = Route.useParams();
  const { data: material, isLoading } = useGetMaterialById(materialId);

  if (isLoading || !material) {
    return null;
  }

  return (
    <div className="main-container flex h-screen w-full flex-col">
      <BackButton className="mb-4" />
      <Header
        title={material.title}
        subtitle={material.course?.name}
        className="mb-2 border-b border-gray-200 pb-7"
      />
      <MaterialDetails material={material} />
    </div>
  );
}
