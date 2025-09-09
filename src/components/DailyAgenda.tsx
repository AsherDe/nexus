import Widget from "@/components/Widget";

export default function DailyAgenda() {
  // Mock data for daily agenda - replace with Apple Calendar integration later
  const nextEvent = {
    title: "Team Standup",
    time: "10:00 AM",
    timeRemaining: "in 2h",
  };

  const todayFocus = [
    "Complete user authentication feature",
    "Review PR #142",
    "Update project documentation",
  ];

  return (
    <Widget title="Daily Agenda">
      <div className="space-y-4">
        {/* Next Event */}
        <div>
          <h4 className="text-sm font-medium text-color-text-highlight mb-2">
            Next Event
          </h4>
          <div className="space-y-1">
            <div className="text-sm text-color-text-base">{nextEvent.title}</div>
            <div className="flex justify-between text-xs text-color-text-subdue">
              <span>{nextEvent.time}</span>
              <span>{nextEvent.timeRemaining}</span>
            </div>
          </div>
        </div>

        {/* Today's Focus */}
        <div>
          <h4 className="text-sm font-medium text-color-text-highlight mb-2">
            Today's Focus
          </h4>
          <ul className="space-y-2">
            {todayFocus.map((task, index) => (
              <li key={index} className="flex items-start gap-2 text-xs">
                <div className="w-1.5 h-1.5 rounded-full bg-color-primary mt-1.5 flex-shrink-0"></div>
                <span className="text-color-text-paragraph">{task}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Widget>
  );
}