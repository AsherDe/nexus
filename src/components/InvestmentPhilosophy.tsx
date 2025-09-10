import Widget from "@/components/Widget";

export default function InvestmentPhilosophy() {
  const principles = [
    {
      icon: "🌍",
      title: "Global Diversification",
      description:
        "My core holdings, VTI (Total US Market) and VXUS (Total International Market), give me ownership in thousands of companies worldwide. I'm not betting on a single winner; I'm betting on human progress.",
    },
    {
      icon: "🛡️",
      title: "Risk Management",
      description:
        "A position in BND (Total Bond Market) acts as a stabilizer. It's not for growth, but for resilience during market downturns, allowing me to stay the course.",
    },
    {
      icon: "⏳",
      title: "Long-Term Horizon",
      description:
        "This is a multi-decade strategy. I focus on consistent contribution and automated rebalancing, ignoring market noise. The goal is financial independence, not overnight riches.",
    },
  ];

  return (
    <Widget title="Building Wealth, Slowly">
      <div className="space-y-4">
        <p className="text-xs text-color-text-subdue italic">
          "Inspired by the Norwegian sovereign fund, my approach is built on
          principles, not predictions."
        </p>

        <div className="space-y-4">
          {principles.map((principle, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm">{principle.icon}</span>
                <h4 className="text-sm font-medium text-color-text-highlight">
                  {principle.title}
                </h4>
              </div>
              <p className="text-xs text-color-text-paragraph leading-relaxed pl-6">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Widget>
  );
}
