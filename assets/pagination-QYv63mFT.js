import{i as W,a as O,E as j}from"./vendor-C1ZlVBJv.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function s(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(o){if(o.ep)return;o.ep=!0;const n=s(o);fetch(o.href,n)}})();function k(e,t){W.show({icon:t?"fa-solid fa-circle-exclamation":"fa-solid fa-check",iconColor:"white",message:e,messageColor:"white",position:"topRight",timeout:5e3,color:t?"#EF4040":"#00BFFF",maxWidth:"500px"})}function q(e){k(e,!1)}function U(e){k(e,!0)}const $="exercise-card",z=10,d=Object.freeze({START:"start",RATE:"rate",REMOVE_FAVORITE:"removeFavorite",ADD_FAVORITE:"addFavorite"}),_e=Object.freeze({LIMITS:{DESKTOP_LARGE:12,DESKTOP:9,EXERCISES_LIST:10},BREAKPOINTS:{DESKTOP_LARGE:1440,TABLET:768},DEFAULT_FILTER:"Muscles"}),I=Object.freeze({FAVORITE_REMOVED:"favorite-removed",FAVORITE_ADDED:"favorite-added"});O.defaults.baseURL="https://your-energy.b.goit.study/api";function G(e){var t,s;U(((s=(t=e.response)==null?void 0:t.data)==null?void 0:s.message)||`An error occurred: ${e.message}, please try again later!`)}async function f(e,...t){try{const{data:s}=await O[e](...t);return s}catch(s){return G(s),null}}function K(){return f("get","/quote")}function ve(e,t=1,s=12){return f("get","/filters",{params:{filter:e,page:t,limit:s}})}function ge(e,t,s=1,a=z){const{bodypart:o,muscles:n,equipment:r}=e;return f("get","/exercises",{params:{bodypart:o,muscles:n,equipment:r,keyword:t,page:s,limit:a}})}function X(e){return f("get",`/exercises/${e}`)}async function Ee(e){const t=await f("post","/subscription",{email:e});return t&&q((t==null?void 0:t.message)||"Thank you for your subscription!"),t}async function J(e,t,s,a){const o=await f("patch",`/exercises/${e}/rating`,{rate:t,email:s,review:a});return o&&q("Thank you for your feedback!"),o}const Y=document.querySelector(".quote-container");function Z(){const e=new Date;return{day:e.getDate(),month:e.getMonth(),year:e.getFullYear()}}function Q(e,t){return!!e&&!!t&&e.day===t.day&&e.month===t.month&&e.year===t.year}function w({author:e,quote:t}){Y.insertAdjacentHTML("beforeend",`
    <p class="quote-text">${t}</p>
    <p class="quote-author">${e}</p>
  `)}async function be(){const e=Z(),t=JSON.parse(localStorage.getItem("today-quote"));if(Q(t==null?void 0:t.date,e)&&t)w(t);else{const{author:s,quote:a}=await K();localStorage.setItem("today-quote",JSON.stringify({author:s,quote:a,date:e})),w({author:s,quote:a})}}async function x(e,t){if(e==="open"){const s=ee();document.body.classList.add("modal-open"),t.classList.remove("hidden"),t.classList.add("is-open"),document.documentElement.style.setProperty("--scrollbar-width",`${s}px`)}e==="close"&&(t.classList.remove("is-open"),setTimeout(()=>{t.classList.add("hidden"),document.body.classList.remove("modal-open"),document.documentElement.style.removeProperty("--scrollbar-width")},250))}const ee=()=>window.innerWidth-document.documentElement.clientWidth;function he(){const e=document.querySelector(".mobile-menu-overlay"),t=document.querySelector(".burger-btn"),s=document.querySelector(".mobile-menu__close-button");e&&t&&s&&(t.addEventListener("click",()=>x("open",e)),s.addEventListener("click",()=>x("close",e)),e.addEventListener("click",({target:n})=>{(n.classList.contains("mobile-menu__nav-link")||n===e)&&x("close",e)}));const a=document.querySelectorAll(".nav-link");let o=window.location.pathname;(o.endsWith("/")||o.endsWith("/index.html"))&&(o="/index.html"),a.forEach(n=>{let r=new URL(n.href).pathname;(r.endsWith("/")||r.endsWith("/index.html"))&&(r="/index.html"),r===o?n.classList.add("active"):n.classList.remove("active")})}const D="favoriteExercises";function te(e){const t=L();t.some(s=>s._id===e._id)||(t.push(e),F(t))}function se(e){const s=L().filter(a=>a._id!==e);F(s)}function F(e){localStorage.setItem(D,JSON.stringify(e))}function L(){try{const e=localStorage.getItem(D);if(e){const t=JSON.parse(e);if(Array.isArray(t))return t.filter(oe)}}catch{}return[]}function oe(e){return e&&typeof e=="object"&&typeof e._id=="string"&&typeof e.name=="string"}const ne="/goit-js-final-project/assets/icons-D_oQLUx2.svg";function u(e){return`${ne}#${e}`}const ae=()=>window.innerWidth-document.documentElement.clientWidth;function ie(e){const t=Math.floor(e);let s="";for(let a=0;a<5;a++){let o=a<t?"star-filled-icon":"star-icon";s+=`
      <svg class="exercise-modal__star-icon" data-rating="${a+1}">
        <use href="${u(o)}"></use>
      </svg>
    `}return s}function A(){return`
    <button
      type="button"
      class="exercise-modal__fav-btn rating-modal__btn"
      data-action="send"
    >
      Send
    </button>
  `}function B(e){return`
    <div class="exercise-modal__rating">
      <span class="exercise-modal__rating-value rating-modal__rating-value">${e}</span>
      <div class="exercise-modal__stars rating-modal__stars">
        ${ie(e)}
      </div>
      <input name="rating" hidden="hidden" value="${e}">
    </div>
  `}function C(e){e.querySelector(".exercise-modal__stars").addEventListener("click",t=>{const s=t.target.closest("[data-rating]");if(!s)return;const a=s.dataset.rating|0;e.querySelector(".exercise-modal__rating").outerHTML=B(a),C(e)})}function P(e){var r;const t=`
    <div id="ratingModalBackdrop" class="exercise-modal__backdrop">
      <div class="exercise-modal rating-modal">
        <button class="exercise-modal__close-btn" type="button">
          <svg class="exercise-modal__close-icon">
            <use href="${u("close-icon")}"></use>
          </svg>
        </button>
        <form id="rating-form" class="exercise-modal__info-wrapper rating-modal__wrapper">
          <div class="rating-modal__item-group rating-modal__rating-group">
            <p class="rating-modal__title">Rating</p>
            <div class="exercise-modal__title-block">
              ${B(0)}
            </div>
          </div>
          <div class="rating-modal__item-group">
            <input id="email" class="footer-input" name="email" pattern="^\\w+(\\.\\w+)?@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$" placeholder="Email" required />
            <textarea id="review" class="footer-input rating-modal__review-textarea" name="review" placeholder="Your comment" required></textarea>
          </div>
          <div class="exercise-modal__buttons rating-modal__item-group">
            ${A()}
          </div>
        </form>
      </div>
    </div>
  `;(r=document.querySelector("#ratingModalBackdrop"))==null||r.remove(),document.body.insertAdjacentHTML("beforeend",t);const s=document.getElementById("ratingModalBackdrop"),a=ae();document.body.classList.add("modal-open"),document.documentElement.style.setProperty("--scrollbar-width",`${a}px`),setTimeout(()=>{s.classList.add("is-open")},50);const o=()=>{s.classList.remove("is-open"),setTimeout(()=>{document.body.classList.remove("modal-open"),document.documentElement.style.removeProperty("--scrollbar-width"),s.remove()},300),document.removeEventListener("keydown",n),H(e)};s.querySelector(".exercise-modal__close-btn").addEventListener("click",o),s.addEventListener("click",i=>{i.target===s&&o()});function n(i){i.key==="Escape"&&o()}document.addEventListener("keydown",n),s.querySelector(".exercise-modal__buttons").addEventListener("click",async i=>{const l=i.target.closest("[data-action]");if(!l)return;if(l.dataset.action==="send"){const m=s.querySelector("#rating-form"),b=m.elements.rating.value|0,h=m.elements.email.value,c=m.elements.review.value;await J(e,b,h,c)&&o()}l.outerHTML=A()}),C(s)}const re=()=>window.innerWidth-document.documentElement.clientWidth;function _(e){return e.charAt(0).toUpperCase()+e.slice(1)}function ce(e){const t=Math.floor(e);let s="";for(let a=0;a<5;a++){let o=a<t?"star-filled-icon":"star-icon";s+=`
      <svg class="exercise-modal__star-icon">
        <use href="${u(o)}"></use>
      </svg>
    `}return s}function R(e){const t=L().some(s=>s._id===e._id);return`
    <button
      type="button"
      class="exercise-modal__fav-btn"
      data-action="${t?d.REMOVE_FAVORITE:d.ADD_FAVORITE}"
    >
      ${t?"Remove from favorites":"Add to favorites"}
      <svg class="exercise-modal__fav-icon" width="18" height="18">
        <use href="${t?`${u("trash-icon")}`:`${u("heart-icon")}`}"></use>
      </svg>
    </button>
  `}function le(e){var r;const t=`
    <div id="exerciseModalBackdrop" class="exercise-modal__backdrop">
      <div class="exercise-modal">
        <button class="exercise-modal__close-btn" type="button">
          <svg class="exercise-modal__close-icon">
            <use href="${u("close-icon")}"></use>
          </svg>
        </button>

        <div class="exercise-modal__content">
      <div class="exercise-modal__image-wrapper">
          <img src="${e.gifUrl}" alt="${e.name}"class="exercise-modal__image" />
        </div>
        <div class="exercise-modal__info-wrapper">
          <div class="exercise-modal__title-block">
            <h2 class="exercise-modal__name">${_(e.name)}</h2>
            <div class="exercise-modal__rating">
              <span class="exercise-modal__rating-value">${e.rating}</span>
              <div class="exercise-modal__stars">
                ${ce(e.rating)}
              </div>
            </div>
          </div>
          <ul class="exercise-modal__info-list">
            <li class="exercise-modal__info-item"><p class="exercise-modal__label">Target</p><p class="exercise-modal__value">${_(e.target)}</p></li>
            <li class="exercise-modal__info-item"><p class="exercise-modal__label">Body Part</p><p class="exercise-modal__value">${_(e.bodyPart)}</p></li>
            <li class="exercise-modal__info-item"><p class="exercise-modal__label">Equipment</p><p class="exercise-modal__value">${_(e.equipment)}</p></li>
            <li class="exercise-modal__info-item"><p class="exercise-modal__label">Popular</p><p class="exercise-modal__value">${e.popularity}</p></li>
            <li class="exercise-modal__info-item"><p class="exercise-modal__label">Burned calories</p><p class="exercise-modal__value">${e.burnedCalories}/${e.time} min</p></li>
          </ul>
          <p class="exercise-modal__description">${e.description}</p>
        </div>
        </div>

        <div class="exercise-modal__buttons">
            ${R(e)}
            <button type="button" class="exercise-modal__rating-btn" data-action="${d.RATE}">Give a rating</button>
        </div>
        </div>
      </div>
    </div>
  `;(r=document.querySelector("#exerciseModalBackdrop"))==null||r.remove(),document.body.insertAdjacentHTML("beforeend",t);const s=document.getElementById("exerciseModalBackdrop"),a=re();document.body.classList.add("modal-open"),document.documentElement.style.setProperty("--scrollbar-width",`${a}px`),setTimeout(()=>{s.classList.add("is-open")},50);const o=()=>{s.classList.remove("is-open"),setTimeout(()=>{document.body.classList.remove("modal-open"),document.documentElement.style.removeProperty("--scrollbar-width"),s.remove()},300),document.removeEventListener("keydown",n)};s.querySelector(".exercise-modal__close-btn").addEventListener("click",o),s.addEventListener("click",i=>{i.target===s&&o()});function n(i){i.key==="Escape"&&o()}document.addEventListener("keydown",n),s.querySelector(".exercise-modal__buttons").addEventListener("click",i=>{const l=i.target.closest("[data-action]");if(!l)return;const p=l.dataset.action;switch(p){case d.ADD_FAVORITE:de(e);break;case d.REMOVE_FAVORITE:V(e._id);break;case d.RATE:o(),P(e._id);break;default:console.warn("Unknown action:",p)}l.outerHTML=R(e)})}const S=new j;function N(e,t){S.emit(e,t)}function ye(e,t){return S.addListener(e,t),()=>{S.removeListener(e,t)}}function V(e){se(e),N(I.FAVORITE_REMOVED,e)}function de(e){te(e),N(I.FAVORITE_ADDED,e)}function ue(e){P(e)}async function H(e){const t=await X(e);le(t)}function me(e,t){return`
    <div class="${$}" data-id="${e._id}">
      <div class="exercise-card-header">
      <p class="exercise-equipment">${e.equipment}</p>
        <div class="exercise-card-header-middle">
          ${t?`<button data-action="${d.REMOVE_FAVORITE}" class="card-icon-button remove-favorite-button">
                  <svg class="remove-favorite-icon">
                    <use href="${u("trash-icon")}"></use>
                  </svg>
                </button>`:`<button data-action="${d.RATE}" class="card-icon-button rating-button">
                  ${e.rating.toFixed(1)}
                  <svg class="rating-icon">
                    <use href="${u("star-filled-icon")}"></use>
                  </svg>
                </button>`}
        </div>
        <button data-action="${d.START}" class="start-button">
          Start
          <svg class="arrow-icon" width="13" height="13">
            <use href="${u("arrow-icon")}"></use>
          </svg>
        </button>
      </div>
      <div class="exercise-card-body">
        <div class="exercise-name-container">
          <svg class="exercise-icon" width="24" height="24">
            <use href="${u("running-man-icon")}"></use>
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
  `}const v=document.querySelector(".exercises-list-wrapper");function xe(e,t,s){v.innerHTML="",s&&v.classList.add("favorites");let a="";e.length?e.forEach(o=>{a+=me(o,s)}):a=`<p class="no-exercises-message">${t}</p>`,v.insertAdjacentHTML("beforeend",a),v.onclick=o=>{let n=o.target;if(n.nodeName!=="BUTTON"&&(n=n.closest(`.${$} button`)),!n||n.nodeName!=="BUTTON")return;const i=n.closest(`.${$}`).dataset.id,l=n.dataset.action;switch(l){case d.REMOVE_FAVORITE:V(i);break;case d.START:H(i);break;case d.RATE:ue(i);break;default:console.warn("Unknown action:",l)}}}const g=3;function M(){return'<span class="pagination-ellipsis">...</span>'}function pe(e,t){return`<button class="page-button ${e===t?"active":""}" data-page="${e}">${e}</button>`}function E(e,t,s,a){return`<button class="page-button arrow ${a?"disabled":""}" data-page="${s}">
    <svg class="pagination-arrow-icon ${t?"double":""}">
      <use href="${u(`pagination-arrow${t?"-double":""}-${e}-icon`)}"></use>
    </svg>
  </button>`}function $e(e,t,s,a=".exercises-list"){let o=document.querySelector(".pagination");o?o.innerHTML="":(o=document.createElement("div"),o.className="pagination",document.querySelector(a).appendChild(o));let n="";const r=Math.max(1,e-Math.floor(g/2)),i=Math.min(t,r+g-1),l=Math.max(1,i-g+1),p=t>g;if(p){const c=e===1;n+=`
      <div class="arrow-buttons">
        ${E("left",!0,1,c)}
        ${E("left",!1,e-1,c)}
      </div>
    `}let m="";for(let c=l;c<=i;c+=1)m+=pe(c,e);const b=l>1,h=i<t;if(b&&(m=`${M()}${m}`),h&&(m+=M()),n+=`<div class="page-buttons">${m}</div>`,p){const c=e===t;n+=`
      <div class="arrow-buttons">
        ${E("right",!1,e+1,c)}
        ${E("right",!0,t,c)}
      </div>
    `}o.insertAdjacentHTML("beforeend",n),o.onclick=c=>{const y=c.target.nodeName==="BUTTON"?c.target:c.target.closest(".pagination button");if(y){const T=parseInt(y.dataset.page,10);T!==e&&s(T)}}}function Se(){const e=document.querySelector(".pagination");e&&e.remove()}export{I as E,_e as S,$e as a,ve as b,Se as c,be as d,L as e,ye as f,ge as g,z as h,he as l,Ee as p,xe as r};
//# sourceMappingURL=pagination-QYv63mFT.js.map
