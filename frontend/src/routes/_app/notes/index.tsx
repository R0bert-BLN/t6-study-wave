import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/notes/")({
  component: NotePage,
});

function NotePage() {
  return <div>Hello "/_app/notes/"!</div>;
}
