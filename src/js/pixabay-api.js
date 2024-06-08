import axios from 'axios';

export async function pixabayApi(findText, page) {
    try {
        const BASE_URL = 'https://pixabay.com/api/';
        const params = new URLSearchParams({
            key: '44082899-a223f277c19d17b254d670762',
            q: findText,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
            per_page: 100,
            page: page,
        });
        const url = `${BASE_URL}?${params}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        iziToast.error({
            position: 'topRight',
            message: 'Error',
        });
    }
}