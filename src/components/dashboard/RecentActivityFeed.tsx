import { useLanguage } from "@/i18n/LanguageContext";

type EventType =
  | "new_application"
  | "commission_approved"
  | "payout_completed"
  | "affiliate_joined"
  | "commission_pending"
  | "payout_requested";

interface ActivityEvent {
  type: EventType;
  name: string;
  time: { value: number; unit: "hours" | "yesterday" | "days" };
}

const DEMO_EVENTS: ActivityEvent[] = [
  { type: "new_application", name: "Dimitar S.", time: { value: 2, unit: "hours" } },
  { type: "commission_approved", name: "Georgi R.", time: { value: 3, unit: "hours" } },
  { type: "payout_completed", name: "Maria M.", time: { value: 5, unit: "hours" } },
  { type: "affiliate_joined", name: "Stefan T.", time: { value: 0, unit: "yesterday" } },
  { type: "commission_pending", name: "Ivan D.", time: { value: 0, unit: "yesterday" } },
  { type: "payout_requested", name: "Nina P.", time: { value: 2, unit: "days" } },
  { type: "new_application", name: "Petar K.", time: { value: 2, unit: "days" } },
  { type: "commission_approved", name: "Alex K.", time: { value: 3, unit: "days" } },
];

const EVENT_COLORS: Record<EventType, string> = {
  new_application: "bg-purple-500",
  commission_approved: "bg-green-500",
  payout_completed: "bg-blue-500",
  affiliate_joined: "bg-indigo-500",
  commission_pending: "bg-yellow-500",
  payout_requested: "bg-orange-500",
};

interface RecentActivityFeedProps {
  events?: ActivityEvent[];
}

export function RecentActivityFeed({ events }: RecentActivityFeedProps) {
  const { lang, t } = useLanguage();
  const feedEvents = events || DEMO_EVENTS;

  function getDescription(event: ActivityEvent): string {
    const { type, name } = event;
    switch (type) {
      case "new_application":
        return `${t.admin.activityNewApplication[lang]} ${name}`;
      case "commission_approved":
        return `${t.admin.activityCommissionApproved[lang]} ${name}`;
      case "payout_completed":
        return `${t.admin.activityPayoutCompleted[lang]} ${name}`;
      case "affiliate_joined":
        return `${name} ${t.admin.activityAffiliateJoined[lang]}`;
      case "commission_pending":
        return `${t.admin.activityCommissionPending[lang]} ${name}`;
      case "payout_requested":
        return `${name} ${t.admin.activityPayoutRequested[lang]}`;
    }
  }

  function getTimeLabel(time: ActivityEvent["time"]): string {
    if (time.unit === "yesterday") return t.admin.yesterday[lang];
    if (time.unit === "hours") return `${time.value} ${t.admin.hoursAgo[lang]}`;
    return `${time.value} ${t.admin.daysAgo[lang]}`;
  }

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-card">
      <h3 className="text-lg font-semibold mb-4">{t.admin.recentActivity[lang]}</h3>
      <div className="space-y-4 max-h-[340px] overflow-y-auto pr-1">
        {feedEvents.map((event, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="mt-1.5 flex-shrink-0">
              <span className={`block w-2.5 h-2.5 rounded-full ${EVENT_COLORS[event.type]}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">{getDescription(event)}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{getTimeLabel(event.time)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
