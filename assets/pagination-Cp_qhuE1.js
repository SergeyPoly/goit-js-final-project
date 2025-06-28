import{i as F,a as k}from"./vendor-D9ezOI0e.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(o){if(o.ep)return;o.ep=!0;const a=s(o);fetch(o.href,a)}})();function R(e,t){F.show({icon:t?"fa-solid fa-circle-exclamation":"fa-solid fa-check",iconColor:"white",message:e,messageColor:"white",position:"topRight",timeout:5e3,color:t?"#EF4040":"#00BFFF",maxWidth:"500px"})}function q(e){R(e,!1)}function H(e){R(e,!0)}const y="exercise-card",W=10,p=Object.freeze({START:"start",RATE:"rate",REMOVE_FAVORITE:"removeFavorite"}),ue=Object.freeze({LIMITS:{DESKTOP_LARGE:12,DESKTOP:9,EXERCISES_LIST:10},BREAKPOINTS:{DESKTOP_LARGE:1440,TABLET:768},DEFAULT_FILTER:"Muscles"});k.defaults.baseURL="https://your-energy.b.goit.study/api";function D(e){H(e.response?.data?.message||`An error occurred: ${e.message}, please try again later!`)}async function f(e,...t){try{const{data:s}=await k[e](...t);return s}catch(s){return D(s),null}}function j(){return f("get","/quote")}function me(e,t=1,s=12){return f("get","/filters",{params:{filter:e,page:t,limit:s}})}function pe(e,t,s=1,n=W){const{bodypart:o,muscles:a,equipment:i}=e;return f("get","/exercises",{params:{bodypart:o,muscles:a,equipment:i,keyword:t,page:s,limit:n}})}function U(e){return f("get",`/exercises/${e}`)}async function fe(e){const t=await f("post","/subscription",{email:e});return t&&q(t?.message||"Thank you for your subscription!"),t}async function G(e,t,s,n){const o=await f("patch",`/exercises/${e}/rating`,{rate:t,email:s,review:n});return o&&q("Thank you for your feedback!"),o}const K=document.querySelector(".quote-container");function V(){const e=new Date;return{day:e.getDate(),month:e.getMonth(),year:e.getFullYear()}}function X(e,t){return!!e&&!!t&&e.day===t.day&&e.month===t.month&&e.year===t.year}function w({author:e,quote:t}){K.insertAdjacentHTML("beforeend",`
    <p class="quote-text">${t}</p>
    <p class="quote-author">${e}</p>
  `)}async function ge(){const e=V(),t=JSON.parse(localStorage.getItem("today-quote"));if(X(t?.date,e)&&t)w(t);else{const{author:s,quote:n}=await j();localStorage.setItem("today-quote",JSON.stringify({author:s,quote:n,date:e})),w({author:s,quote:n})}}async function E(e,t){if(e==="open"){const s=z();document.body.classList.add("modal-open"),t.classList.remove("hidden"),t.classList.add("is-open"),document.documentElement.style.setProperty("--scrollbar-width",`${s}px`)}e==="close"&&(t.classList.remove("is-open"),setTimeout(()=>{t.classList.add("hidden"),document.body.classList.remove("modal-open"),document.documentElement.style.removeProperty("--scrollbar-width")},250))}const z=()=>window.innerWidth-document.documentElement.clientWidth;function ve(){const e=document.querySelector(".mobile-menu-overlay"),t=document.querySelector(".burger-btn"),s=document.querySelector(".mobile-menu__close-button");e&&t&&s&&(t.addEventListener("click",()=>E("open",e)),s.addEventListener("click",()=>E("close",e)),e.addEventListener("click",({target:a})=>{(a.classList.contains("mobile-menu__nav-link")||a===e)&&E("close",e)}));const n=document.querySelectorAll(".nav-link");let o=window.location.pathname;(o.endsWith("/")||o.endsWith("/index.html"))&&(o="/index.html"),n.forEach(a=>{let i=new URL(a.href).pathname;(i.endsWith("/")||i.endsWith("/index.html"))&&(i="/index.html"),i===o?a.classList.add("active"):a.classList.remove("active")})}const J="/goit-js-final-project/assets/icons-D_oQLUx2.svg";function d(e){return`${J}#${e}`}function Q(e,t){return`
    <div class="${y}" data-id="${e._id}">
      <div class="exercise-card-header">
      <p class="exercise-equipment">${e.equipment}</p>
        <div class="exercise-card-header-middle">
          ${t?`<button data-action="${p.REMOVE_FAVORITE}" class="card-icon-button remove-favorite-button">
                  <svg class="remove-favorite-icon">
                    <use href="${d("trash-icon")}"></use>
                  </svg>
                </button>`:`<button data-action="${p.RATE}" class="card-icon-button rating-button">
                  ${e.rating.toFixed(1)}
                  <svg class="rating-icon">
                    <use href="${d("star-filled-icon")}"></use>
                  </svg>
                </button>`}
        </div>
        <button data-action="${p.START}" class="start-button">
          Start
          <svg class="arrow-icon" width="13" height="13">
            <use href="${d("arrow-icon")}"></use>
          </svg>
        </button>
      </div>
      <div class="exercise-card-body">
        <div class="exercise-name-container">
          <svg class="exercise-icon" width="24" height="24">
            <use href="${d("running-man-icon")}"></use>
          </svg>
          <h3 class="exercise-name">${e.name}</h3>
        </div>
      </div>
      <div class="exercise-card-footer">
        <p class="card-footer-text">
          <span class="secondary-text">Burned calories:</span>
          ${e.burnedCalories} / ${e.time} min
        </p>
        <p class="card-footer-text">
          <span class="secondary-text">Body part:</span>
          ${e.bodyPart}
        </p>
        <p class="card-footer-text">
          <span class="secondary-text">Target:</span>
          ${e.target}
        </p>
      </div>
    </div>
  `}function Y(e,t){const s=e.querySelector(`.${y}[data-id="${t}"]`);s&&s.remove()}const O="favoriteExercises";function Z(e){const t=$();t.some(s=>s._id===e._id)||(t.push(e),C(t))}function B(e){const s=$().filter(n=>n._id!==e);C(s)}function C(e){localStorage.setItem(O,JSON.stringify(e))}function $(){try{const e=localStorage.getItem(O);if(e){const t=JSON.parse(e);if(Array.isArray(t))return t.filter(ee)}}catch{}return[]}function ee(e){return e&&typeof e=="object"&&typeof e._id=="string"&&typeof e.name=="string"}const te=()=>window.innerWidth-document.documentElement.clientWidth;function se(e){const t=Math.floor(e);let s="";for(let n=0;n<5;n++){let o=n<t?"star-filled-icon":"star-icon";s+=`
      <svg class="exercise-modal__star-icon" data-rating="${n+1}">
        <use href="${d(o)}"></use>
      </svg>
    `}return s}function T(){return`
    <button
      type="button"
      class="exercise-modal__fav-btn rating-modal__btn"
      data-action="send"
    >
      Send
    </button>
  `}function I(e){return`
    <div class="exercise-modal__rating">
      <span class="exercise-modal__rating-value rating-modal__rating-value">${e}</span>
      <div class="exercise-modal__stars rating-modal__stars">
        ${se(e)}
      </div>
      <input name="rating" hidden="hidden" value="${e}">
    </div>
  `}function P(e){e.querySelector(".exercise-modal__stars").addEventListener("click",t=>{const s=t.target.closest("[data-rating]");if(!s)return;const n=s.dataset.rating|0;e.querySelector(".exercise-modal__rating").outerHTML=I(n),P(e)})}function N(e){const s=`
    <div id="ratingModalBackdrop" class="exercise-modal__backdrop">
      <div class="exercise-modal rating-modal">
        <button class="exercise-modal__close-btn" type="button">
          <svg class="exercise-modal__close-icon">
            <use href="${d("close-icon")}"></use>
          </svg>
        </button>
        <form id="rating-form" class="exercise-modal__info-wrapper rating-modal__wrapper">
          <div class="rating-modal__item-group rating-modal__rating-group">
            <p class="rating-modal__title">Rating</p>
            <div class="exercise-modal__title-block">
              ${I(0)}
            </div>
          </div>
          <div class="rating-modal__item-group">
            <input id="email" class="footer-input" name="email" pattern="[^@]+@[^@]+" placeholder="Email" />
            <textarea id="review" class="footer-input rating-modal__review-textarea" name="review" placeholder="Your comment"></textarea>
          </div>
          <div class="exercise-modal__buttons rating-modal__item-group">
            ${T()}
          </div>
        </form>
      </div>
    </div>
  `;document.querySelector("#ratingModalBackdrop")?.remove(),document.body.insertAdjacentHTML("beforeend",s);const n=document.getElementById("ratingModalBackdrop"),o=te();document.body.classList.add("modal-open"),document.documentElement.style.setProperty("--scrollbar-width",`${o}px`),setTimeout(()=>{n.classList.add("is-open")},50);const a=()=>{n.classList.remove("is-open"),setTimeout(()=>{document.body.classList.remove("modal-open"),document.documentElement.style.removeProperty("--scrollbar-width"),n.remove()},300),document.removeEventListener("keydown",i)};n.querySelector(".exercise-modal__close-btn").addEventListener("click",a),n.addEventListener("click",c=>{c.target===n&&a()});function i(c){c.key==="Escape"&&a()}document.addEventListener("keydown",i),n.querySelector(".exercise-modal__buttons").addEventListener("click",c=>{const l=c.target.closest("[data-action]");if(console.log("Button click",l),!l)return;if(l.dataset.action==="send"){let u=n.querySelector("#rating-form"),v=u.elements.rating.value|0,_=u.elements.email.value,r=u.elements.review.value;console.log({exerciseId:e,rating:v,email:_,review:r}),G(e,v,_,r)}l.outerHTML=T()}),P(n)}const oe=()=>window.innerWidth-document.documentElement.clientWidth;function b(e){return e.charAt(0).toUpperCase()+e.slice(1)}function ne(e){const t=Math.floor(e);let s="";for(let n=0;n<5;n++){let o=n<t?"star-filled-icon":"star-icon";s+=`
      <svg class="exercise-modal__star-icon">
        <use href="${d(o)}"></use>
      </svg>
    `}return s}function M(e){const t=$().some(s=>s._id===e._id);return`
    <button
      type="button"
      class="exercise-modal__fav-btn"
      data-action="${t?"remove":"add"}"
    >
      ${t?"Remove from favorites":"Add to favorites"}
      <svg class="exercise-modal__fav-icon" width="18" height="18">
        <use href="${t?`${d("trash-icon")}`:`${d("heart-icon")}`}"></use>
      </svg>
    </button>
  `}function ae(e){const t=`
    <div id="exerciseModalBackdrop" class="exercise-modal__backdrop">
      <div class="exercise-modal">
        <button class="exercise-modal__close-btn" type="button">
          <svg class="exercise-modal__close-icon">
            <use href="${d("close-icon")}"></use>
          </svg>
        </button>

        <div class="exercise-modal__content">
      <div class="exercise-modal__image-wrapper">
          <img src="${e.gifUrl}" alt="${e.name}"class="exercise-modal__image" />
        </div>
        <div class="exercise-modal__info-wrapper">
          <div class="exercise-modal__title-block">
            <h2 class="exercise-modal__name">${b(e.name)}</h2>
            <div class="exercise-modal__rating">
              <span class="exercise-modal__rating-value">${e.rating}</span>
              <div class="exercise-modal__stars">
                ${ne(e.rating)}
              </div>
            </div>
          </div>
          <ul class="exercise-modal__info-list">
            <li class="exercise-modal__info-item"><p class="exercise-modal__label">Target</p><p class="exercise-modal__value">${b(e.target)}</p></li>
            <li class="exercise-modal__info-item"><p class="exercise-modal__label">Body Part</p><p class="exercise-modal__value">${b(e.bodyPart)}</p></li>
            <li class="exercise-modal__info-item"><p class="exercise-modal__label">Equipment</p><p class="exercise-modal__value">${b(e.equipment)}</p></li>
            <li class="exercise-modal__info-item"><p class="exercise-modal__label">Popular</p><p class="exercise-modal__value">${e.popularity}</p></li>
            <li class="exercise-modal__info-item"><p class="exercise-modal__label">Burned calories</p><p class="exercise-modal__value">${e.burnedCalories}/${e.time} min</p></li>
          </ul>
          <p class="exercise-modal__description">${e.description}</p>
        </div>
        </div>

        <div class="exercise-modal__buttons">
            ${M(e)}
            <button type="button" class="exercise-modal__rating-btn" data-action="rate">Give a rating</button>
        </div>
        </div>
      </div>
    </div>
  `;document.querySelector("#exerciseModalBackdrop")?.remove(),document.body.insertAdjacentHTML("beforeend",t);const s=document.getElementById("exerciseModalBackdrop"),n=oe();document.body.classList.add("modal-open"),document.documentElement.style.setProperty("--scrollbar-width",`${n}px`),setTimeout(()=>{s.classList.add("is-open")},50);const o=()=>{s.classList.remove("is-open"),setTimeout(()=>{document.body.classList.remove("modal-open"),document.documentElement.style.removeProperty("--scrollbar-width"),s.remove()},300),document.removeEventListener("keydown",a)};s.querySelector(".exercise-modal__close-btn").addEventListener("click",o),s.addEventListener("click",i=>{i.target===s&&o()});function a(i){i.key==="Escape"&&o()}document.addEventListener("keydown",a),s.querySelector(".exercise-modal__buttons").addEventListener("click",i=>{const c=i.target.closest("[data-action]");if(!c)return;switch(c.dataset.action){case"add":Z(e);break;case"remove":B(e._id);break;case"rate":o(),N(e._id);break}c.outerHTML=M(e)})}function ie(e,t){B(t),Y(e,t)}function re(e){N(e),console.log(`Rating exercise: ${e}`)}async function ce(e){const t=await U(e);ae(t)}const g=document.querySelector(".exercises-list-wrapper");function _e(e,t,{favorites:s,onFavoriteDelete:n}={}){g.innerHTML="",s&&g.classList.add("favorites");let o="";e.length?e.forEach(a=>{o+=Q(a,s)}):o=`<p class="no-exercises-message">${t}</p>`,g.insertAdjacentHTML("beforeend",o),g.onclick=a=>{let i=a.target;if(i.nodeName!=="BUTTON"&&(i=i.closest(`.${y} button`)),!i||i.nodeName!=="BUTTON")return;const l=i.closest(`.${y}`).dataset.id,m=i.dataset.action;switch(m){case p.REMOVE_FAVORITE:ie(g,l),n?.(l);break;case p.START:ce(l);break;case p.RATE:re(l);break;default:console.warn("Unknown action:",m)}}}const h=3;function A(){return'<span class="pagination-ellipsis">...</span>'}function le(e,t){return`<button class="page-button ${e===t?"active":""}" data-page="${e}">${e}</button>`}function x(e,t,s,n){return`<button class="page-button arrow ${n?"disabled":""}" data-page="${s}">
    <svg class="pagination-arrow-icon ${t?"double":""}">
      <use href="${d(`pagination-arrow${t?"-double":""}-${e}-icon`)}"></use>
    </svg>
  </button>`}function be(e,t,s,n=".exercises-list"){let o=document.querySelector(".pagination");o?o.innerHTML="":(o=document.createElement("div"),o.className="pagination",document.querySelector(n).appendChild(o));let a="";const i=Math.max(1,e-Math.floor(h/2)),c=Math.min(t,i+h-1),l=Math.max(1,c-h+1),m=t>h;if(m){const r=e===1;a+=`
      <div class="arrow-buttons">
        ${x("left",!0,1,r)}
        ${x("left",!1,e-1,r)}
      </div>
    `}let u="";for(let r=l;r<=c;r+=1)u+=le(r,e);const v=l>1,_=c<t;if(v&&(u=`${A()}${u}`),_&&(u+=A()),a+=`<div class="page-buttons">${u}</div>`,m){const r=e===t;a+=`
      <div class="arrow-buttons">
        ${x("right",!1,e+1,r)}
        ${x("right",!0,t,r)}
      </div>
    `}o.insertAdjacentHTML("beforeend",a),o.onclick=r=>{const S=r.target.nodeName==="BUTTON"?r.target:r.target.closest(".pagination button");if(S){const L=parseInt(S.dataset.page,10);L!==e&&s(L)}}}export{W as E,ue as S,be as a,me as b,ge as c,$ as d,pe as g,ve as l,fe as p,_e as r};
//# sourceMappingURL=pagination-Cp_qhuE1.js.map
