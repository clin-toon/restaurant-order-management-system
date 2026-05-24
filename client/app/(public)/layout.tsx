"use client";
import CustomerNavbar from "@/components/Reuseable/CustomerNavbar";
import Navbar from "@/components/Reuseable/Navbar";
import { useAuth } from "@/context/AuthContext/AuthContext";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  return (
    <>
      {user ? <CustomerNavbar /> : <Navbar />}

      {children}
    </>
  );
}
