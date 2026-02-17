import { TaskList } from "./_components/task-list";
import { ReferralGenerator } from "./_components/referral-generator";

export default function CommunityMicroplannerPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <TaskList />
      </div>
      <div className="space-y-6">
        <ReferralGenerator />
      </div>
    </div>
  );
}
