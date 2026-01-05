import { getAuthUser } from "../lib/api.js";
import { useQuery } from "@tanstack/react-query";

const useAuthUser = () => {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false // axios sends request three more times in case of failure, to avoid that because if user is unauthorized it will make no sense in this case,
  });

  return {isLoading: authUser.isLoading, authUser: authUser.data?.user, error: authUser.error};
}

export default useAuthUser