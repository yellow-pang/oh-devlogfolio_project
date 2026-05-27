interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="mb-10">
      <h1 className="text-3xl font-bold tracking-tight mb-2">{title}</h1>
      {description && (
        <p className="text-muted-foreground text-lg">{description}</p>
      )}
      {children}
    </div>
  );
}
