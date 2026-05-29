import { useParams } from "wouter";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-3xl font-semibold">Project {id}</h1>
      <p className="text-gray-600 dark:text-gray-400">Details for project {id}.</p>
    </main>
  );
}
