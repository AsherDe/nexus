interface WidgetProps {
  title?: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Widget({
  title,
  children,
  className = "",
  hover = true,
}: WidgetProps) {
  return (
    <div className={`widget-container ${className}`}>
      {title && (
        <div className="widget-external-header">
          <h3 className="widget-external-title">{title}</h3>
        </div>
      )}
      <div
        className={`widget animate-widget-entrance ${hover ? "" : "hover:transform-none hover:shadow-none"}`}
      >
        {children}
      </div>
    </div>
  );
}
