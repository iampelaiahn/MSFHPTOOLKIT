import { HotspotDiary } from "./_components/hotspot-diary";

export default function CommunityMicroplannerPage() {
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="space-y-6">
        <HotspotDiary />
      </div>
    </div>
  );
}
