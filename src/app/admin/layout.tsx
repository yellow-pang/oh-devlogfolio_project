import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "관리자",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 p-6 md:p-8">{children}</div>
      </div>
    </div>
  );
}
