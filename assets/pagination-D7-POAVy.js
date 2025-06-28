import{i as H,a as O,E as W}from"./vendor-C1ZlVBJv.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(o){if(o.ep)return;o.ep=!0;const a=s(o);fetch(o.href,a)}})();function k(e,t){H.show({icon:t?"fa-solid fa-circle-exclamation":"fa-solid fa-check",iconColor:"white",message:e,messageColor:"white",position:"topRight",timeout:5e3,color:t?"#EF4040":"#00BFFF",maxWidth:"500px"})}function I(e){k(e,!1)}function j(e){k(e,!0)}const $="exercise-card",U=10,d=Object.freeze({START:"start",RATE:"rate",REMOVE_FAVORITE:"removeFavorite",ADD_FAVORITE:"addFavorite"}),ge=Object.freeze({LIMITS:{DESKTOP_LARGE:12,DESKTOP:9,EXERCISES_LIST:10},BREAKPOINTS:{DESKTOP_LARGE:1440,TABLET:768},DEFAULT_FILTER:"Muscles"}),q=Object.freeze({FAVORITE_REMOVED:"favorite-removed",FAVORITE_ADDED:"favorite-added"});O.defaults.baseURL="https://your-energy.b.goit.study/api";function G(e){var t,s;j(((s=(t=e.response)==null?void 0:t.data)==null?void 0:s.message)||`An error occurred: ${e.message}, please try again later!`)}async function f(e,...t){try{const{data:s}=await O[e](...t);return s}catch(s){return G(s),null}}function K(){return f("get","/quote")}function _e(e,t=1,s=12){return f("get","/filters",{params:{filter:e,page:t,limit:s}})}function ve(e,t,s=1,n=U){const{bodypart:o,muscles:a,equipment:i}=e;return f("get","/exercises",{params:{bodypart:o,muscles:a,equipment:i,keyword:t,page:s,limit:n}})}function X(e){return f("get",`/exercises/${e}`)}async function Ee(e){const t=await f("post","/subscription",{email:e});return t&&I((t==null?void 0:t.message)||"Thank you for your subscription!"),t}async function z(e,t,s,n){const o=await f("patch",`/exercises/${e}/rating`,{rate:t,email:s,review:n});return o&&I("Thank you for your feedback!"),o}const J=document.querySelector(".quote-container");function Y(){const e=new Date;return{day:e.getDate(),month:e.getMonth(),year:e.getFullYear()}}function Q(e,t){return!!e&&!!t&&e.day===t.day&&e.month===t.month&&e.year===t.year}function w({author:e,quote:t}){J.insertAdjacentHTML("beforeend",`
    <p class="quote-text">${t}</p>
    <p class="quote-author">${e}</p>
  `)}async function be(){const e=Y(),t=JSON.parse(localStorage.getItem("today-quote"));if(Q(t==null?void 0:t.date,e)&&t)w(t);else{const{author:s,quote:n}=await K();localStorage.setItem("today-quote",JSON.stringify({author:s,quote:n,date:e})),w({author:s,quote:n})}}async function x(e,t){if(e==="open"){const s=Z();document.body.classList.add("modal-open"),t.classList.remove("hidden"),t.classList.add("is-open"),document.documentElement.style.setProperty("--scrollbar-width",`${s}px`)}e==="close"&&(t.classList.remove("is-open"),setTimeout(()=>{t.classList.add("hidden"),document.body.classList.remove("modal-open"),document.documentElement.style.removeProperty("--scrollbar-width")},250))}const Z=()=>window.innerWidth-document.documentElement.clientWidth;function he(){const e=document.querySelector(".mobile-menu-overlay"),t=document.querySelector(".burger-btn"),s=document.querySelector(".mobile-menu__close-button");e&&t&&s&&(t.addEventListener("click",()=>x("open",e)),s.addEventListener("click",()=>x("close",e)),e.addEventListener("click",({target:a})=>{(a.classList.contains("mobile-menu__nav-link")||a===e)&&x("close",e)}));const n=document.querySelectorAll(".nav-link");let o=window.location.pathname;(o.endsWith("/")||o.endsWith("/index.html"))&&(o="/index.html"),n.forEach(a=>{let i=new URL(a.href).pathname;(i.endsWith("/")||i.endsWith("/index.html"))&&(i="/index.html"),i===o?a.classList.add("active"):a.classList.remove("active")})}const D="favoriteExercises";function ee(e){const t=L();t.some(s=>s._id===e._id)||(t.push(e),F(t))}function te(e){const s=L().filter(n=>n._id!==e);F(s)}function F(e){localStorage.setItem(D,JSON.stringify(e))}function L(){try{const e=localStorage.getItem(D);if(e){const t=JSON.parse(e);if(Array.isArray(t))return t.filter(se)}}catch{}return[]}function se(e){return e&&typeof e=="object"&&typeof e._id=="string"&&typeof e.name=="string"}const oe="/goit-js-final-project/assets/icons-D_oQLUx2.svg";function u(e){return`${oe}#${e}`}const ne=()=>window.innerWidth-document.documentElement.clientWidth;function ae(e){const t=Math.floor(e);let s="";for(let n=0;n<5;n++){let o=n<t?"star-filled-icon":"star-icon";s+=`
      <svg class="exercise-modal__star-icon" data-rating="${n+1}">
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
        ${ae(e)}
      </div>
      <input name="rating" hidden="hidden" value="${e}">
    </div>
  `}function C(e){e.querySelector(".exercise-modal__stars").addEventListener("click",t=>{const s=t.target.closest("[data-rating]");if(!s)return;const n=s.dataset.rating|0;e.querySelector(".exercise-modal__rating").outerHTML=B(n),C(e)})}function P(e){var r;const s=`
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
            <input id="email" class="footer-input" name="email" pattern="[^@]+@[^@]+" placeholder="Email" />
            <textarea id="review" class="footer-input rating-modal__review-textarea" name="review" placeholder="Your comment"></textarea>
          </div>
          <div class="exercise-modal__buttons rating-modal__item-group">
            ${A()}
          </div>
        </form>
      </div>
    </div>
  `;(r=document.querySelector("#ratingModalBackdrop"))==null||r.remove(),document.body.insertAdjacentHTML("beforeend",s);const n=document.getElementById("ratingModalBackdrop"),o=ne();document.body.classList.add("modal-open"),document.documentElement.style.setProperty("--scrollbar-width",`${o}px`),setTimeout(()=>{n.classList.add("is-open")},50);const a=()=>{n.classList.remove("is-open"),setTimeout(()=>{document.body.classList.remove("modal-open"),document.documentElement.style.removeProperty("--scrollbar-width"),n.remove()},300),document.removeEventListener("keydown",i)};n.querySelector(".exercise-modal__close-btn").addEventListener("click",a),n.addEventListener("click",l=>{l.target===n&&a()});function i(l){l.key==="Escape"&&a()}document.addEventListener("keydown",i),n.querySelector(".exercise-modal__buttons").addEventListener("click",l=>{const m=l.target.closest("[data-action]");if(console.log("Button click",m),!m)return;if(m.dataset.action==="send"){let g=n.querySelector("#rating-form"),v=g.elements.rating.value|0,c=g.elements.email.value,_=g.elements.review.value;console.log({exerciseId:e,rating:v,email:c,review:_}),z(e,v,c,_)}m.outerHTML=A()}),C(n)}const ie=()=>window.innerWidth-document.documentElement.clientWidth;function E(e){return e.charAt(0).toUpperCase()+e.slice(1)}function re(e){const t=Math.floor(e);let s="";for(let n=0;n<5;n++){let o=n<t?"star-filled-icon":"star-icon";s+=`
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
  `}function ce(e){var i;const t=`
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
            <h2 class="exercise-modal__name">${E(e.name)}</h2>
            <div class="exercise-modal__rating">
              <span class="exercise-modal__rating-value">${e.rating}</span>
              <div class="exercise-modal__stars">
                ${re(e.rating)}
              </div>
            </div>
          </div>
          <ul class="exercise-modal__info-list">
            <li class="exercise-modal__info-item"><p class="exercise-modal__label">Target</p><p class="exercise-modal__value">${E(e.target)}</p></li>
            <li class="exercise-modal__info-item"><p class="exercise-modal__label">Body Part</p><p class="exercise-modal__value">${E(e.bodyPart)}</p></li>
            <li class="exercise-modal__info-item"><p class="exercise-modal__label">Equipment</p><p class="exercise-modal__value">${E(e.equipment)}</p></li>
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
  `;(i=document.querySelector("#exerciseModalBackdrop"))==null||i.remove(),document.body.insertAdjacentHTML("beforeend",t);const s=document.getElementById("exerciseModalBackdrop"),n=ie();document.body.classList.add("modal-open"),document.documentElement.style.setProperty("--scrollbar-width",`${n}px`),setTimeout(()=>{s.classList.add("is-open")},50);const o=()=>{s.classList.remove("is-open"),setTimeout(()=>{document.body.classList.remove("modal-open"),document.documentElement.style.removeProperty("--scrollbar-width"),s.remove()},300),document.removeEventListener("keydown",a)};s.querySelector(".exercise-modal__close-btn").addEventListener("click",o),s.addEventListener("click",r=>{r.target===s&&o()});function a(r){r.key==="Escape"&&o()}document.addEventListener("keydown",a),s.querySelector(".exercise-modal__buttons").addEventListener("click",r=>{const l=r.target.closest("[data-action]");if(!l)return;switch(l.dataset.action){case d.ADD_FAVORITE:le(e);break;case d.REMOVE_FAVORITE:V(e._id);break;case d.RATE:o(),P(e._id);break}l.outerHTML=R(e)})}const S=new W;function N(e,t){S.emit(e,t)}function ye(e,t){return S.addListener(e,t),()=>{S.removeListener(e,t)}}function V(e){te(e),N(q.FAVORITE_REMOVED,e)}function le(e){ee(e),N(q.FAVORITE_ADDED,e)}function de(e){P(e)}async function ue(e){const t=await X(e);ce(t)}function me(e,t){return`
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
  `}const b=document.querySelector(".exercises-list-wrapper");function xe(e,t,s){b.innerHTML="",s&&b.classList.add("favorites");let n="";e.length?e.forEach(o=>{n+=me(o,s)}):n=`<p class="no-exercises-message">${t}</p>`,b.insertAdjacentHTML("beforeend",n),b.onclick=o=>{let a=o.target;if(a.nodeName!=="BUTTON"&&(a=a.closest(`.${$} button`)),!a||a.nodeName!=="BUTTON")return;const r=a.closest(`.${$}`).dataset.id,l=a.dataset.action;switch(l){case d.REMOVE_FAVORITE:V(r);break;case d.START:ue(r);break;case d.RATE:de(r);break;default:console.warn("Unknown action:",l)}}}const h=3;function M(){return'<span class="pagination-ellipsis">...</span>'}function pe(e,t){return`<button class="page-button ${e===t?"active":""}" data-page="${e}">${e}</button>`}function y(e,t,s,n){return`<button class="page-button arrow ${n?"disabled":""}" data-page="${s}">
    <svg class="pagination-arrow-icon ${t?"double":""}">
      <use href="${u(`pagination-arrow${t?"-double":""}-${e}-icon`)}"></use>
    </svg>
  </button>`}function $e(e,t,s,n=".exercises-list"){let o=document.querySelector(".pagination");o?o.innerHTML="":(o=document.createElement("div"),o.className="pagination",document.querySelector(n).appendChild(o));let a="";const i=Math.max(1,e-Math.floor(h/2)),r=Math.min(t,i+h-1),l=Math.max(1,r-h+1),m=t>h;if(m){const c=e===1;a+=`
      <div class="arrow-buttons">
        ${y("left",!0,1,c)}
        ${y("left",!1,e-1,c)}
      </div>
    `}let p="";for(let c=l;c<=r;c+=1)p+=pe(c,e);const g=l>1,v=r<t;if(g&&(p=`${M()}${p}`),v&&(p+=M()),a+=`<div class="page-buttons">${p}</div>`,m){const c=e===t;a+=`
      <div class="arrow-buttons">
        ${y("right",!1,e+1,c)}
        ${y("right",!0,t,c)}
      </div>
    `}o.insertAdjacentHTML("beforeend",a),o.onclick=c=>{const _=c.target.nodeName==="BUTTON"?c.target:c.target.closest(".pagination button");if(_){const T=parseInt(_.dataset.page,10);T!==e&&s(T)}}}function Se(){const e=document.querySelector(".pagination");e&&e.remove()}export{q as E,ge as S,$e as a,_e as b,Se as c,be as d,L as e,ye as f,ve as g,U as h,he as l,Ee as p,xe as r};
//# sourceMappingURL=pagination-D7-POAVy.js.map
