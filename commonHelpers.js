import{a as h,S as L,i as n}from"./assets/vendor-b11e2a50.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const p of o.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&l(p)}).observe(document,{childList:!0,subtree:!0});function a(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(e){if(e.ep)return;e.ep=!0;const o=a(e);fetch(e.href,o)}})();async function m(s,t){try{const a="https://pixabay.com/api/",l=new URLSearchParams({key:"44082899-a223f277c19d17b254d670762",q:s,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:15,page:t}),e=`${a}?${l}`;return(await h.get(e)).data}catch{iziToast.error({position:"topRight",message:"Error"})}}function u(s){return s.map(t=>`<li class="gallery-list"><div class="gallery"><a href="${t.largeImageURL}"><img src="${t.webformatURL}" alt="${t.tags}" width="360px" height="100px"></a>
      <ul class="img-cont-list">
      <li class="img-cont-item">Likes<p class="img-cont-descr">${t.likes}</p></li>
      <li class="img-cont-item">Views<p class="img-cont-descr">${t.views}</p></li>
      <li class="img-cont-item">Comments<p class="img-cont-descr">${t.comments}</p></li>
      <li class="img-cont-item">Downloads<p class="img-cont-descr">${t.downloads}</p></li>
      </ul>
      </div>
      </li>`).join("")}function f(){new L(".gallery a",{navText:["&#5176;","&#5171;"],captionsData:"alt",captionDelay:250}).refresh()}const g=document.querySelector(".find-form"),i=document.querySelector(".gallery-container"),r=document.querySelector(".btn"),y=document.querySelector("#load");document.querySelector(".find-btn");let d=1,c="";g.addEventListener("submit",async s=>{if(s.preventDefault(),d=1,i.innerHTML="",c=new FormData(g).get("find-text"),!c){r.style.display="none",n.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"});return}i.innerHTML='<div class="loader"></div>';try{const t=await m(c,d);if(t.hits.length===0){n.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"}),i.innerHTML="",r.style.display="none";return}i.innerHTML=u(t.hits),f()}catch{n.error({position:"topRight",message:"Ooops"})}finally{s.target.reset(),r.style.display="block"}});r.addEventListener("click",b);async function b(){r.style.display="none",d+=1,y.innerHTML='<div class="loading">Loading...  <span class="loader"></span></div>';try{const s=await m(c,d);s.hits.length===0?(n.info({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"}),r.style.display="none"):(i.insertAdjacentHTML("beforeend",u(s.hits)),f(),window.scrollBy({top:720,behavior:"smooth"}),r.style.display="block")}catch{n.error({position:"topRight",message:"We're sorry, but you've reached the end of search results."}),r.style.display="none"}finally{y.innerHTML=""}}
//# sourceMappingURL=commonHelpers.js.map