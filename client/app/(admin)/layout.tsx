import AdminSidebar from "@/components/Reuseable/AdminNavbar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />

        <main className="flex-1 overflow-y-auto pt-14 md:pt-0 bg-stone-50">
          {children}
        </main>
      </div>
    </>
  );
}
