import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useLoadUserQuery } from "../../redux/features/api/apiSlice";

export default function useAuth() {
  const { user } = useSelector((state: any) => state.auth);

  // Kick off a user fetch on first mount so reloads re-hydrate auth state.
  const { isLoading } = useLoadUserQuery({}, { skip: Boolean(user) });

  const isAuthenticated = useMemo(() => Boolean(user), [user]);

  return { isAuthenticated, isLoading };
}
