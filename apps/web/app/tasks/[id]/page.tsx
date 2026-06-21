import { TaskDetailPage } from "../../../features/tasks/TaskDetailPage";

export default async function TaskDetailRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <TaskDetailPage taskId={id} />;
}
