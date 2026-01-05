import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { login } from '../lib/api.js';

const useLogin = () => {
    const queryClient = useQueryClient();
    const { mutate, isPending, error } = useMutation({
        mutationFn: login,
        onSuccess: () => {
            toast.success("Logged in successfully.");
            queryClient.invalidateQueries({ querykey: ["authUser"] });
        }
    });
    return { error, isPending, loginMutation:mutate};
}

export default useLogin