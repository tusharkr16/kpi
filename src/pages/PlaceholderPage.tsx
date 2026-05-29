import TopBar from "@/layout/TopBar";
import type { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  icon: LucideIcon;
  description: string;
}

const PlaceholderPage = ({ title, icon: Icon, description }: Props) => (
  <div className="flex flex-col flex-1">
    <TopBar title={title} breadcrumbs={[title]} />
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
          <Icon className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground max-w-xs">{description}</p>
        <p className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full inline-block">Coming soon</p>
      </div>
    </div>
  </div>
);

export default PlaceholderPage;
