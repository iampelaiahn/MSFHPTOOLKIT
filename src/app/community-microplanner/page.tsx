import { TaskList } from "./_components/task-list";

export default function CommunityMicroplannerPage() {
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="space-y-6">
        <TaskList />
      </div>
    </div>
  );
}
