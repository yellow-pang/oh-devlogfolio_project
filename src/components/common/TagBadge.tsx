import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TagBadgeProps {
  tag: string;
  className?: string;
  onClick?: () => void;
}

export function TagBadge({ tag, className, onClick }: TagBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "text-xs font-medium",
        onClick &&
          "cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors",
        className,
      )}
      onClick={onClick}
    >
      {tag}
    </Badge>
  );
}
