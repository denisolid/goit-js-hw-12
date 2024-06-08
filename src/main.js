import { pixabayApi } from './js/pixabay-api';
import { imagesRender } from './js/render-functions';
import { imgBoxLight } from './js/render-functions';

import axios from 'axios';

import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.find-form');
const gallery = document.querySelector('.gallery-container');
const loader = document.querySelector('.loader');
const loadMore = document.querySelector('.btn');
const loaderPlace = document.querySelector('#load');


loadMore.addEventListener('click', onLoadMore);

let page = 1;
let findText = '';
form.addEventListener('submit', async event => {
    event.preventDefault();
    gallery.innerHTML = '';
    const formData = new FormData(form);
    const findText = formData.get('find-text');

    if (findText === '') {
        return;
    }

    gallery.innerHTML = `<div class = "loading">Loading...  <span class="loader"></span></div>`;

    try {
        const data = await pixabayApi(findText, page);
        if (data.hits.length === 0) {
            iziToast.error({
                position: 'topRight',
                message:
                    'Sorry, there are no images matching your search query. Please try again!',
            });
            gallery.innerHTML = '';
            return;
        }

        const markup = imagesRender(data.hits);
        gallery.innerHTML = markup;
        imgBoxLight();
    } catch (error) {
        iziToast.error({
            position: 'topRight',
            message: 'Error',
        });
    } finally {
        event.target.reset();
        loadMore.classList.remove('hidden');
    }
});

async function onLoadMore() {
    loadMore.classList.add('hidden');
    page += 1;

    loaderPlace.innerHTML = `<div class = "loading">Loading...  <span class="loader"></span></div>`;
    try {
        const data = await pixabayApi(findText, page);
        if (data.hits.length === 0) {
            loadMore.classList.add('hidden');

            iziToast.info({
                position: 'topRight',
                message:
                    'Sorry, there are no images matching your search query. Please try again!',
            });
        }

        loaderPlace.innerHTML = '';
        loadMore.classList.add('hidden');
        loadMore.disable = true;
        const markup = imagesRender(data.hits);
        gallery.insertAdjacentHTML('beforeend', markup);

        loadMore.disable = true;
        imgBoxLight();
        window.scrollBy({
            top: 720,
            behavior: 'smooth',
        });


    } catch (error) {
        iziToast.error({
            position: 'topRight',
            message: error.message,
        });
    } finally {
        loadMore.classList.remove('hidden')
    }
}
