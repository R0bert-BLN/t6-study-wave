import type { JSX } from "react";
import Header from "@/components/elements/header.tsx";
import { useModal } from "@/providers/modal/use-modal.ts";
import { ClassworkForm } from "@/features/courses/details/classwork/create/form.tsx";
import { Route } from "@/routes/_app/courses/$courseId";
import { useGetClasswork } from "@/hooks/resources/classwork/use-classwork-query.ts";
import Accordion from "@/components/elements/accordion.tsx";
import { ClassworkItem } from "@/components/elements/classwork-item.tsx";
import { ClassworkType } from "@/types/resources/classwork.ts";
import { ResourceType } from "@/types/resources/resource-type.ts";
import { useAuth } from "@/providers/auth/use-auth.ts";

interface ClassworkTabProps {
  isArchived: boolean;
}

export default function ClassworkTab({ isArchived }: ClassworkTabProps): JSX.Element | null {
  const { openModal } = useModal();
  const { isProfessor } = useAuth();
  const { courseId } = Route.useParams();
  const { data: classwork, isLoading } = useGetClasswork(courseId as string);

  if (isLoading) {
    return null;
  }

  return (
    <div className="animate-in fade-in mx-auto flex h-[calc(100vh-250px)] max-w-3xl flex-col py-8 duration-500">
      {isProfessor && !isArchived && (
        <Header
          className="mb-6 border-b border-zinc-200/70 pb-2"
          titleClassName="text-[20px]"
          title="Classwork"
          buttonText="Create"
          onButtonClick={() => openModal(<ClassworkForm courseId={courseId} />, "!max-w-2xl")}
        />
      )}

      <div className="no-scrollbar flex-1 space-y-3 overflow-y-auto pb-10">
        {Object.entries(classwork || {}).map(([category, content]) => (
          <Accordion key={category} title={category}>
            {content
              .filter((item) => item.type === ClassworkType.Assignment)
              .map((item) => (
                <ClassworkItem
                  key={item.id}
                  className="p-3"
                  variant="assignment"
                  classwork={item}
                  courseId={courseId}
                  href={`/${ResourceType.Course}/${courseId}/${ResourceType.Assignment}/${item.id}`}
                />
              ))}

            {content
              .filter((item) => item.type === ClassworkType.Material)
              .map((item) => (
                <ClassworkItem
                  key={item.id}
                  className="p-3"
                  variant="material"
                  classwork={item}
                  courseId={courseId}
                  href={`/${ResourceType.Course}/${courseId}/${ResourceType.Material}/${item.id}`}
                />
              ))}
          </Accordion>
        ))}
      </div>
    </div>
  );
}
