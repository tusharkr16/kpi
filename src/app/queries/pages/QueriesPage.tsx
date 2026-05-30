import { useState } from "react";
import TopBar from "@/layout/TopBar";
import { mockQueryThreads } from "@/mock/mock-data";
import { cn } from "@/lib/utils";
import { Send, Upload, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import KpiCategoryBadge from "@/components/kpi/KpiCategoryBadge";
import { toast } from "sonner";

const statusConfig = {
  open: { label: "Open", icon: AlertCircle, className: "text-orange-600" },
  replied: { label: "Replied", icon: Clock, className: "text-blue-600" },
  resolved: { label: "Resolved", icon: CheckCircle2, className: "text-green-600" },
};

const QueriesPage = () => {
  const [selectedId, setSelectedId] = useState<string>(mockQueryThreads[0]._id);
  const [replyText, setReplyText] = useState("");
  const [threads, setThreads] = useState(mockQueryThreads);

  const selected = threads.find((t) => t._id === selectedId)!;

  const handleSendReply = () => {
    if (!replyText.trim()) return toast.error("Please enter a reply");
    setThreads((prev) =>
      prev.map((t) =>
        t._id === selectedId
          ? {
              ...t,
              status: "replied" as const,
              messages: [
                ...t.messages,
                {
                  _id: `m-${Date.now()}`,
                  senderName: "Vishal Panchal",
                  senderRole: "coordinator" as const,
                  text: replyText,
                  attachments: [],
                  sentAt: new Date().toISOString(),
                },
              ],
            }
          : t
      )
    );
    setReplyText("");
    toast.success("Reply sent successfully");
  };

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) +
      " · " + d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col flex-1">
      <TopBar title="Queries & Replies" breadcrumbs={["Queries"]} />

      <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 56px)" }}>

        {/* Left — thread list */}
        <div className="w-80 shrink-0 border-r bg-white flex flex-col overflow-hidden">
          <div className="p-4 border-b">
            <p className="text-sm font-semibold">All Queries</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {threads.filter((t) => t.status !== "resolved").length} open · {threads.filter((t) => t.status === "resolved").length} resolved
            </p>
          </div>
          <div className="flex-1 overflow-y-auto divide-y">
            {threads.map((thread) => {
              const sc = statusConfig[thread.status];
              const StatusIcon = sc.icon;
              const lastMsg = thread.messages[thread.messages.length - 1];
              return (
                <button
                  key={thread._id}
                  onClick={() => setSelectedId(thread._id)}
                  className={cn(
                    "w-full text-left p-4 hover:bg-muted/40 transition-colors",
                    selectedId === thread._id && "bg-primary/5 border-l-2 border-l-primary"
                  )}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <p className="text-sm font-medium line-clamp-1 flex-1">{thread.kpiTitle}</p>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{lastMsg.text}</p>
                  <div className="flex items-center justify-between">
                    <KpiCategoryBadge category={thread.category} />
                    <div className={cn("flex items-center gap-1 text-xs font-medium", sc.className)}>
                      <StatusIcon className="w-3 h-3" />
                      {sc.label}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right — thread detail */}
        <div className="flex-1 flex flex-col overflow-hidden bg-muted/20">
          {/* Thread header */}
          <div className="bg-white border-b px-6 py-4 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-semibold text-sm">{selected.kpiTitle}</p>
                <KpiCategoryBadge category={selected.category} />
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Opened {formatTime(selected.createdAt)} · {selected.messages.length} messages
              </p>
            </div>
            <div className={cn("flex items-center gap-1.5 text-sm font-medium", statusConfig[selected.status].className)}>
              {(() => { const I = statusConfig[selected.status].icon; return <I className="w-4 h-4" />; })()}
              {statusConfig[selected.status].label}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
            {selected.messages.map((msg) => {
              const isSPD = msg.senderRole === "spd";
              return (
                <div key={msg._id} className={cn("flex gap-3", !isSPD && "flex-row-reverse")}>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold",
                    isSPD ? "bg-orange-100 text-orange-700" : "bg-primary/10 text-primary"
                  )}>
                    {msg.senderName.charAt(0)}
                  </div>
                  <div className={cn("max-w-[75%]", !isSPD && "items-end flex flex-col")}>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-xs font-semibold">{msg.senderName}</p>
                      <p className="text-xs text-muted-foreground">{formatTime(msg.sentAt)}</p>
                    </div>
                    <div className={cn(
                      "rounded-2xl px-4 py-3 text-sm",
                      isSPD
                        ? "bg-white border rounded-tl-none shadow-sm"
                        : "bg-primary text-white rounded-tr-none"
                    )}>
                      <p>{msg.text}</p>
                      {msg.attachments.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {msg.attachments.map((a) => (
                            <div key={a.name} className={cn(
                              "flex items-center gap-2 text-xs px-2 py-1 rounded",
                              isSPD ? "bg-muted/50" : "bg-white/20"
                            )}>
                              <Upload className="w-3 h-3" />
                              <span>{a.name}</span>
                              <span className="opacity-60">{a.size}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reply box — only if not resolved */}
          {selected.status !== "resolved" ? (
            <div className="bg-white border-t p-4 space-y-3">
              <textarea
                rows={3}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your reply to SPD..."
                className="w-full border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              />
              <div className="flex items-center justify-between">
                <Button variant="outline" size="sm" className="gap-2" onClick={() => toast.info("File picker would open")}>
                  <Upload className="w-4 h-4" /> Attach Document
                </Button>
                <Button size="sm" className="gap-2" onClick={handleSendReply}>
                  <Send className="w-4 h-4" /> Send Reply
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-green-50 border-t border-green-200 px-6 py-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <p className="text-sm text-green-700 font-medium">This query has been resolved.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QueriesPage;
