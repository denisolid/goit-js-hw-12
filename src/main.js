import { pixabayApi } from './js/pixabay-api';
import { imagesRender, imgBoxLight } from './js/render-functions';
import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.find-form');
const gallery = document.querySelector('.gallery-container');
const loadMore = document.querySelector('.btn');
const loaderPlace = document.querySelector('#load');
const submitBtn = document.querySelector('.find-btn')

let page = 1;
let findText = '';

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    page = 1;
    gallery.innerHTML = '';
    findText = new FormData(form).get('find-text');

    if (!findText) {
        loadMore.style.display = 'none';
        iziToast.error({
            position: 'topRight',
            message: 'Sorry, there are no images matching your search query. Please try again!',
        });
        return;
    }

    gallery.innerHTML = `<div class="loader"></div>`;
    try {
        const data = await pixabayApi(findText, page);
        if (data.hits.length === 0) {
            iziToast.error({
                position: 'topRight',
                message: 'Sorry, there are no images matching your search query. Please try again!',
            });
            gallery.innerHTML = '';
            loadMore.style.display = 'none';
            return;
        }
        gallery.innerHTML = imagesRender(data.hits);
        imgBoxLight();
    } catch {
        iziToast.error({
            position: 'topRight',
            message: 'Ooops',
        });
    } finally {
        event.target.reset()
        loadMore.style.display = 'block';
    }
});

loadMore.addEventListener('click', onLoadMore);

async function onLoadMore() {

    loadMore.style.display = 'none';
    page += 1;
    loaderPlace.innerHTML = `<div class="loading">Loading...  <span class="loader"></span></div>`;

    try {
        const data = await pixabayApi(findText, page);
        if (data.hits.length === 0) {
            iziToast.info({
                position: 'topRight',
                message: 'Sorry, there are no images matching your search query. Please try again!',
            });
            loadMore.style.display = 'none';
        } else {
            gallery.insertAdjacentHTML('beforeend', imagesRender(data.hits));
            imgBoxLight();
            window.scrollBy({
                top: 720,
                behavior: 'smooth',
            });
            loadMore.style.display = 'block';
        }
    } catch {
        iziToast.error({
            position: 'topRight',
            message: "We're sorry, but you've reached the end of search results.",
        });
        loadMore.style.display = 'none';
    } finally {
        loaderPlace.innerHTML = '';

    }
}