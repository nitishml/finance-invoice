import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logout } from "./logout";

export const useLogout = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            await logout()
        },
        onSuccess: () => {
            queryClient.clear();
            queryClient.invalidateQueries({ queryKey: ['me'] });
            window.location.replace("/auth/login")
        },
        onError: (error) => {
            console.error('Logout error:', error);
        },
    });
};