import Widget from "@/components/Widget";

export default function FleetingNotes() {
  // Mock fleeting notes data
  const notes = [
    {
      id: 1,
      content: "Server-side components in Next.js 15 are game-changers for performance",
      timestamp: "2h ago",
    },
    {
      id: 2,
      content: "Consider implementing rate limiting for API endpoints",
      timestamp: "5h ago", 
    },
    {
      id: 3,
      content: "Typography consistency matters more than I initially thought",
      timestamp: "1d ago",
    },
    {
      id: 4,
      content: "The compound effect applies to code quality as much as investing",
      timestamp: "2d ago",
    },
  ];

  return (
    <Widget title="Fleeting Notes">
      <div className="space-y-3">
        {notes.map((note) => (
          <div key={note.id} className="border-l-2 border-color-separator pl-3 space-y-1">
            <p className="text-xs text-color-text-paragraph leading-relaxed">
              {note.content}
            </p>
            <p className="text-xs text-color-text-subdue">{note.timestamp}</p>
          </div>
        ))}
        
        <div className="pt-2 border-t border-color-separator">
          <p className="text-xs text-color-text-subdue italic">
            Capturing thoughts as they emerge...
          </p>
        </div>
      </div>
    </Widget>
  );
}