"use client";

import { useState } from "react";

export default function TerminalDownloader() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([
    "$ 欢迎使用模拟终端",
    "$ 输入命令来探索系统...",
  ]);

  const downloadFile = (url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCommand = (command: string) => {
    const cmd = command.trim().toLowerCase();
    const newHistory = [...history, `$ ${command}`];

    switch (cmd) {
      case "download report":
        newHistory.push("正在下载报告...");
        downloadFile(
          "https://files.academicflow.org/20231008213%E5%90%89%E8%82%B2%E5%BE%B73%E7%8F%AD.doc",
          "20231008213吉育徳3班.doc",
        );
        newHistory.push("下载完成！");
        break;

      case "ls":
        newHistory.push("report    readme");
        break;

      case "cat readme":
        newHistory.push("🎉 恭喜你找到了彩蛋！");
        newHistory.push("");
        newHistory.push("    ╭─────────────────────────────╮");
        newHistory.push("    │   你已经掌握了基本的Linux   │");
        newHistory.push("    │   命令行操作！继续加油！    │");
        newHistory.push("    ╰─────────────────────────────╯");
        newHistory.push("");
        newHistory.push("💡 小贴士：真正的Linux世界比这丰富得多...");
        break;

      case "help":
        newHistory.push("可用命令：");
        newHistory.push("  ls                查看文件列表");
        newHistory.push("  cat readme        查看readme文件");
        newHistory.push("  download report   下载实验报告");
        newHistory.push("  clear             清空终端");
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        newHistory.push(`bash: ${command}: 指令未找到`);
        break;
    }

    setHistory(newHistory);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
    }
  };

  return (
    <div className="bg-black text-green-400 font-mono text-sm p-4 rounded border-2 border-gray-700 max-w-2xl mx-auto">
      <div className="mb-2 text-gray-300">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-xs text-gray-400 ml-2">Terminal</span>
        </div>
      </div>

      <div className="space-y-1 mb-2 max-h-64 overflow-y-auto">
        {history.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap">
            {line}
          </div>
        ))}
      </div>

      <div className="flex items-center">
        <span className="text-blue-400">user@nexus</span>
        <span className="text-white">:</span>
        <span className="text-blue-400">~</span>
        <span className="text-white">$ </span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="bg-transparent border-none outline-none flex-1 text-green-400 ml-1"
          placeholder="输入命令..."
          autoFocus
        />
      </div>

      <div className="mt-2 text-xs text-gray-500">
        提示：试试 help、ls、cat readme 或 download report
      </div>
    </div>
  );
}
