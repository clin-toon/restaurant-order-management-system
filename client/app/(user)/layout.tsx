import CustomerNavbar from "@/components/Reuseable/CustomerNavbar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CustomerNavbar />
      {children}
    </>
  );
}
