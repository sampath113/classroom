import { cn } from "@/lib/utils";

interface RoleCardProps {
  icon: string;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

export const RoleCard = ({ icon, title, description, selected, onClick }: RoleCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative p-6 rounded-xl border cursor-pointer transition-all duration-200",
        "hover:shadow-[var(--shadow-card)] active:scale-[0.99]",
        selected
          ? "border-primary bg-primary/5 shadow-[var(--shadow-card)]"
          : "border-border bg-card hover:border-primary/50"
      )}
    >
      <div className="flex items-center space-x-4">
        <div className="text-2xl">{icon}</div>
        <div className="flex-1">
          <h3 className="font-medium text-lg text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
        <div className={cn(
          "w-4 h-4 rounded-full border transition-colors",
          selected
            ? "bg-primary border-primary"
            : "border-muted-foreground/40"
        )}>
          {selected && (
            <div className="w-full h-full rounded-full bg-primary-foreground scale-50" />
          )}
        </div>
      </div>
    </div>
  );
};