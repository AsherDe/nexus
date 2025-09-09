interface WidgetProps {
  title?: string;
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
    <div
      className={`widget animate-widget-entrance ${hover ? "" : "hover:transform-none hover:shadow-none"} ${className}`}
    >
      {title && (
        <div className="widget-header">
          <h3 className="widget-title">{title}</h3>
        </div>
      )}
      {children}
    </div>
  );
}
