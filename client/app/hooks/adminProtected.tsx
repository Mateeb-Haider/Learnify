import { redirect } from "next/navigation";

import React from "react";
import { useSelector } from "react-redux";
import useAuth from "./useAuth";

interface ProtectedProps {
  children: React.ReactNode;
}

export default function AdminProtected({ children }: ProtectedProps) {
  const { user } = useSelector((state: any) => state.auth);
  const { isLoading } = useAuth();

  if (isLoading) return null;
  const isAdmin = user?.role === "admin";
  return isAdmin ? children : redirect("/");
}
