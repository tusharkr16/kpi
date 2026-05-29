import { useState } from "react";
import TopBar from "@/layout/TopBar";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { User, Building2, Bell, Shield, Save } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const tabs = [
  { key: "profile", label: "Profile", icon: User },
  { key: "university", label: "University", icon: Building2 },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "security", label: "Security", icon: Shield },
];

const SettingsPage = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState("profile");

  const [profile, setProfile] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    mobile: user?.mobile ?? "",
    designation: "Coordinator",
  });

  const [university, setUniversity] = useState({
    name: user?.universityName ?? "",
    address: "Solapur, Maharashtra",
    city: "Solapur",
    district: "Solapur",
    agencyCode: "MH-SRT-001",
  });

  const [notifications, setNotifications] = useState({
    queryAlerts: true,
    deadlineReminders: true,
    approvalUpdates: true,
    rejectionAlerts: true,
    weeklyDigest: false,
  });

  return (
    <div className="flex flex-col flex-1">
      <TopBar title="Settings" breadcrumbs={["Settings"]} />

      <div className="p-6 flex gap-6">
        {/* Sidebar tabs */}
        <div className="w-52 shrink-0 space-y-1">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                activeTab === key
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 max-w-2xl">

          {activeTab === "profile" && (
            <div className="bg-white rounded-xl border p-6 space-y-5">
              <h2 className="font-semibold">Profile Information</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Full Name", key: "name", type: "text" },
                  { label: "Email Address", key: "email", type: "email" },
                  { label: "Mobile Number", key: "mobile", type: "tel" },
                  { label: "Designation", key: "designation", type: "text" },
                ].map(({ label, key, type }) => (
                  <div key={key} className="space-y-1.5">
                    <label className="text-sm font-medium">{label}</label>
                    <input
                      type={type}
                      value={profile[key as keyof typeof profile]}
                      onChange={(e) => setProfile((p) => ({ ...p, [key]: e.target.value }))}
                      className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t flex justify-end">
                <Button size="sm" className="gap-2" onClick={() => toast.success("Profile updated")}>
                  <Save className="w-4 h-4" /> Save Changes
                </Button>
              </div>
            </div>
          )}

          {activeTab === "university" && (
            <div className="bg-white rounded-xl border p-6 space-y-5">
              <h2 className="font-semibold">University Information</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "University Name", key: "name" },
                  { label: "Agency Code", key: "agencyCode" },
                  { label: "City", key: "city" },
                  { label: "District", key: "district" },
                ].map(({ label, key }) => (
                  <div key={key} className="space-y-1.5">
                    <label className="text-sm font-medium">{label}</label>
                    <input
                      type="text"
                      value={university[key as keyof typeof university]}
                      onChange={(e) => setUniversity((p) => ({ ...p, [key]: e.target.value }))}
                      className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                ))}
                <div className="col-span-2 space-y-1.5">
                  <label className="text-sm font-medium">Address</label>
                  <textarea
                    rows={2}
                    value={university.address}
                    onChange={(e) => setUniversity((p) => ({ ...p, address: e.target.value }))}
                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  />
                </div>
              </div>
              <div className="pt-2 border-t flex justify-end">
                <Button size="sm" className="gap-2" onClick={() => toast.success("University info updated")}>
                  <Save className="w-4 h-4" /> Save Changes
                </Button>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="bg-white rounded-xl border p-6 space-y-5">
              <h2 className="font-semibold">Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  { key: "queryAlerts", label: "Query Alerts", desc: "Get notified when SPD raises a query on your KPI" },
                  { key: "deadlineReminders", label: "Deadline Reminders", desc: "Reminders 3 and 7 days before KPI deadlines" },
                  { key: "approvalUpdates", label: "Approval Updates", desc: "Notification when a KPI is approved" },
                  { key: "rejectionAlerts", label: "Rejection Alerts", desc: "Notification when a KPI submission is rejected" },
                  { key: "weeklyDigest", label: "Weekly Digest", desc: "Weekly summary of your KPI activity" },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/20 transition-colors">
                    <div>
                      <p className="text-sm font-medium">{label}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                    <button
                      onClick={() => setNotifications((p) => ({ ...p, [key]: !p[key as keyof typeof notifications] }))}
                      className={cn(
                        "w-10 h-6 rounded-full transition-colors relative",
                        notifications[key as keyof typeof notifications] ? "bg-primary" : "bg-muted"
                      )}
                    >
                      <span className={cn(
                        "absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all",
                        notifications[key as keyof typeof notifications] ? "left-5" : "left-1"
                      )} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t flex justify-end">
                <Button size="sm" className="gap-2" onClick={() => toast.success("Notification preferences saved")}>
                  <Save className="w-4 h-4" /> Save Preferences
                </Button>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="bg-white rounded-xl border p-6 space-y-5">
              <h2 className="font-semibold">Security Settings</h2>
              <div className="space-y-4">
                {[
                  { label: "Current Password", placeholder: "Enter current password" },
                  { label: "New Password", placeholder: "Enter new password" },
                  { label: "Confirm New Password", placeholder: "Confirm new password" },
                ].map(({ label, placeholder }) => (
                  <div key={label} className="space-y-1.5">
                    <label className="text-sm font-medium">{label}</label>
                    <input
                      type="password"
                      placeholder={placeholder}
                      className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t flex justify-end">
                <Button size="sm" className="gap-2" onClick={() => toast.success("Password updated")}>
                  <Save className="w-4 h-4" /> Update Password
                </Button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
