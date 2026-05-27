import { AdminAuthGuard } from "@/components/admin/AdminAuthGuard";

export const metadata = {
  title: "관리자",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminAuthGuard>{children}</AdminAuthGuard>;
}
