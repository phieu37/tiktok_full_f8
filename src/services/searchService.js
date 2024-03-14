// https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debounced)}&type=less
import * as httpRequest from '~/utils/httpRequest'; // dồn tất cả export vào 1 biến

export const search = async (q, type = 'less') => {
    try {
        const res = await httpRequest.get('users/search', {
            params: {
                q,
                type,
            },
        });

        return res.data;
    } catch (error) {
        console.log(error);
    }
};
