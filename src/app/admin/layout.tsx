import { getCurrentAdminSession } from "@/lib/auth";
import AdminSidebar from "./AdminSidebar";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentAdminSession();

  // If not logged in, render the login page directly without dashboard shell
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-madar-dark text-slate-100 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <AdminSidebar session={session} />

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-screen">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
