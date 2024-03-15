// https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debounced)}&type=less
// Tạo instance axios(api endpoint) dùng bên apiService
// custom thêm post put path
import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

// tối ưu để xử lý vđề setSearchResult(res.data.data); // data 1 của axios, data 2 của Api trả về
// options = {} ko bắt buộc nên để rỗng -> là param
// path là users/search
export const get = async (path, options = {}) => {
  const respone = await httpRequest.get(path, options)
  return respone.data
}

export default httpRequest;
