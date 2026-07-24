import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

export default function useAuth() {
  return useContext(AuthContext);
}
