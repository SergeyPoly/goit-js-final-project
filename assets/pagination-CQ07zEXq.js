import{i as N,a as A}from"./vendor-D9ezOI0e.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(o){if(o.ep)return;o.ep=!0;const a=s(o);fetch(o.href,a)}})();function k(e,t){N.show({icon:t?"fa-solid fa-circle-exclamation":"fa-solid fa-check",iconColor:"white",message:e,messageColor:"white",position:"topRight",timeout:5e3,color:t?"#EF4040":"#00BFFF",maxWidth:"500px"})}function R(e){k(e,!1)}function W(e){k(e,!0)}const E="exercise-card",F=10,p=Object.freeze({START:"start",RATE:"rate",REMOVE_FAVORITE:"removeFavorite"}),ie=Object.freeze({LIMITS:{DESKTOP_LARGE:12,DESKTOP:9,EXERCISES_LIST:10},BREAKPOINTS:{DESKTOP_LARGE:1440,TABLET:768},DEFAULT_FILTER:"Muscles"});A.defaults.baseURL="https://your-energy.b.goit.study/api";function H(e){W(e.response?.data?.message||`An error occurred: ${e.message}, please try again later!`)}async function f(e,...t){try{const{data:s}=await A[e](...t);return s}catch(s){return H(s),null}}function re(){return f("get","/quote")}function ce(e,t=1,s=12){return f("get","/filters",{params:{filter:e,page:t,limit:s}})}function le(e,t,s=1,n=F){const{bodypart:o,muscles:a,equipment:i}=e;return f("get","/exercises",{params:{bodypart:o,muscles:a,equipment:i,keyword:t,page:s,limit:n}})}function j(e){return f("get",`/exercises/${e}`)}async function de(e){const t=await f("post","/subscription",{email:e});return t&&R(t?.message||"Thank you for your subscription!"),t}async function D(e,t,s,n){const o=await f("patch",`/exercises/${e}/rating`,{rate:t,email:s,review:n});return o&&R("Thank you for your feedback!"),o}async function y(e,t){if(e==="open"){const s=U();document.body.classList.add("modal-open"),t.classList.remove("hidden"),t.classList.add("is-open"),document.documentElement.style.setProperty("--scrollbar-width",`${s}px`)}e==="close"&&(t.classList.remove("is-open"),setTimeout(()=>{t.classList.add("hidden"),document.body.classList.remove("modal-open"),document.documentElement.style.removeProperty("--scrollbar-width")},250))}const U=()=>window.innerWidth-document.documentElement.clientWidth;function ue(){const e=document.querySelector(".mobile-menu-overlay"),t=document.querySelector(".burger-btn"),s=document.querySelector(".mobile-menu__close-button");e&&t&&s&&(t.addEventListener("click",()=>y("open",e)),s.addEventListener("click",()=>y("close",e)),e.addEventListener("click",({target:a})=>{(a.classList.contains("mobile-menu__nav-link")||a===e)&&y("close",e)}));const n=document.querySelectorAll(".nav-link");let o=window.location.pathname;(o.endsWith("/")||o.endsWith("/index.html"))&&(o="/index.html"),n.forEach(a=>{let i=new URL(a.href).pathname;(i.endsWith("/")||i.endsWith("/index.html"))&&(i="/index.html"),i===o?a.classList.add("active"):a.classList.remove("active")})}const G="/goit-js-final-project/assets/icons-D_oQLUx2.svg";function d(e){return`${G}#${e}`}function K(e,t){return`
    <div class="${E}" data-id="${e._id}">
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
  `}function V(e,t){const s=e.querySelector(`.${E}[data-id="${t}"]`);s&&s.remove()}const O="favoriteExercises";function X(e){const t=$();t.some(s=>s._id===e._id)||(t.push(e),q(t))}function B(e){const s=$().filter(n=>n._id!==e);q(s)}function q(e){localStorage.setItem(O,JSON.stringify(e))}function $(){try{const e=localStorage.getItem(O);if(e){const t=JSON.parse(e);if(Array.isArray(t))return t.filter(z)}}catch{}return[]}function z(e){return e&&typeof e=="object"&&typeof e._id=="string"&&typeof e.name=="string"}const J=()=>window.innerWidth-document.documentElement.clientWidth;function Q(e){const t=Math.floor(e);let s="";for(let n=0;n<5;n++){let o=n<t?"star-filled-icon":"star-icon";s+=`
      <svg class="exercise-modal__star-icon" data-rating="${n+1}">
        <use href="${d(o)}"></use>
      </svg>
    `}return s}function w(){return`
    <button
      type="button"
      class="exercise-modal__fav-btn rating-modal__btn"
      data-action="send"
    >
      Send
    </button>
  `}function C(e){return`
    <div class="exercise-modal__rating">
      <span class="exercise-modal__rating-value rating-modal__rating-value">${e}</span>
      <div class="exercise-modal__stars">
        ${Q(e)}
      </div>
      <input name="rating" hidden="hidden" value="${e}">
    </div>
  `}function I(e){e.querySelector(".exercise-modal__stars").addEventListener("click",t=>{const s=t.target.closest("[data-rating]");if(!s)return;const n=s.dataset.rating|0;e.querySelector(".exercise-modal__rating").outerHTML=C(n),I(e)})}function P(e){const s=`
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
              ${C(0)}
            </div>
          </div>
          <div class="rating-modal__item-group">
            <input id="email" class="footer-input" name="email" pattern="[^@]+@[^@]+" placeholder="Email" />
            <textarea id="review" class="footer-input rating-modal__review-textarea" name="review" placeholder="Your comment"></textarea>
          </div>
          <div class="exercise-modal__buttons rating-modal__item-group">
            ${w()}
          </div>
        </form>
      </div>
    </div>
  `;document.querySelector("#ratingModalBackdrop")?.remove(),document.body.insertAdjacentHTML("beforeend",s);const n=document.getElementById("ratingModalBackdrop"),o=J();document.body.classList.add("modal-open"),document.documentElement.style.setProperty("--scrollbar-width",`${o}px`),setTimeout(()=>{n.classList.add("is-open")},50);const a=()=>{n.classList.remove("is-open"),setTimeout(()=>{document.body.classList.remove("modal-open"),document.documentElement.style.removeProperty("--scrollbar-width"),n.remove()},300),document.removeEventListener("keydown",i)};n.querySelector(".exercise-modal__close-btn").addEventListener("click",a),n.addEventListener("click",c=>{c.target===n&&a()});function i(c){c.key==="Escape"&&a()}document.addEventListener("keydown",i),n.querySelector(".exercise-modal__buttons").addEventListener("click",c=>{const l=c.target.closest("[data-action]");if(console.log("Button click",l),!l)return;if(l.dataset.action==="send"){let u=n.querySelector("#rating-form"),g=u.elements.rating.value|0,_=u.elements.email.value,r=u.elements.review.value;console.log({exerciseId:e,rating:g,email:_,review:r}),D(e,g,_,r)}l.outerHTML=w()}),I(n)}const Y=()=>window.innerWidth-document.documentElement.clientWidth;function b(e){return e.charAt(0).toUpperCase()+e.slice(1)}function Z(e){const t=Math.floor(e);let s="";for(let n=0;n<5;n++){let o=n<t?"star-filled-icon":"star-icon";s+=`
      <svg class="exercise-modal__star-icon">
        <use href="${d(o)}"></use>
      </svg>
    `}return s}function T(e){const t=$().some(s=>s._id===e._id);return`
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
  `}function ee(e){const t=`
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
                ${Z(e.rating)}
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
            ${T(e)}
            <button type="button" class="exercise-modal__rating-btn" data-action="rate">Give a rating</button>
        </div>
        </div>
      </div>
    </div>
  `;document.querySelector("#exerciseModalBackdrop")?.remove(),document.body.insertAdjacentHTML("beforeend",t);const s=document.getElementById("exerciseModalBackdrop"),n=Y();document.body.classList.add("modal-open"),document.documentElement.style.setProperty("--scrollbar-width",`${n}px`),setTimeout(()=>{s.classList.add("is-open")},50);const o=()=>{s.classList.remove("is-open"),setTimeout(()=>{document.body.classList.remove("modal-open"),document.documentElement.style.removeProperty("--scrollbar-width"),s.remove()},300),document.removeEventListener("keydown",a)};s.querySelector(".exercise-modal__close-btn").addEventListener("click",o),s.addEventListener("click",i=>{i.target===s&&o()});function a(i){i.key==="Escape"&&o()}document.addEventListener("keydown",a),s.querySelector(".exercise-modal__buttons").addEventListener("click",i=>{const c=i.target.closest("[data-action]");if(!c)return;switch(c.dataset.action){case"add":X(e);break;case"remove":B(e._id);break;case"rate":o(),P(e._id);break}c.outerHTML=T(e)})}function te(e,t){B(t),V(e,t)}function se(e){P(e),console.log(`Rating exercise: ${e}`)}async function oe(e){const t=await j(e);ee(t)}const v=document.querySelector(".exercises-list-wrapper");function me(e,t,{favorites:s,onFavoriteDelete:n}={}){v.innerHTML="",s&&v.classList.add("favorites");let o="";e.length?e.forEach(a=>{o+=K(a,s)}):o=`<p class="no-exercises-message">${t}</p>`,v.insertAdjacentHTML("beforeend",o),v.onclick=a=>{let i=a.target;if(i.nodeName!=="BUTTON"&&(i=i.closest(`.${E} button`)),!i||i.nodeName!=="BUTTON")return;const l=i.closest(`.${E}`).dataset.id,m=i.dataset.action;switch(m){case p.REMOVE_FAVORITE:te(v,l),n?.(l);break;case p.START:oe(l);break;case p.RATE:se(l);break;default:console.warn("Unknown action:",m)}}}const h=3;function M(){return'<span class="pagination-ellipsis">...</span>'}function ne(e,t){return`<button class="page-button ${e===t?"active":""}" data-page="${e}">${e}</button>`}function x(e,t,s,n){return`<button class="page-button arrow ${n?"disabled":""}" data-page="${s}">
    <svg class="pagination-arrow-icon ${t?"double":""}">
      <use href="${d(`pagination-arrow${t?"-double":""}-${e}-icon`)}"></use>
    </svg>
  </button>`}function pe(e,t,s,n=".exercises-list"){let o=document.querySelector(".pagination");o?o.innerHTML="":(o=document.createElement("div"),o.className="pagination",document.querySelector(n).appendChild(o));let a="";const i=Math.max(1,e-Math.floor(h/2)),c=Math.min(t,i+h-1),l=Math.max(1,c-h+1),m=t>h;if(m){const r=e===1;a+=`
      <div class="arrow-buttons">
        ${x("left",!0,1,r)}
        ${x("left",!1,e-1,r)}
      </div>
    `}let u="";for(let r=l;r<=c;r+=1)u+=ne(r,e);const g=l>1,_=c<t;if(g&&(u=`${M()}${u}`),_&&(u+=M()),a+=`<div class="page-buttons">${u}</div>`,m){const r=e===t;a+=`
      <div class="arrow-buttons">
        ${x("right",!1,e+1,r)}
        ${x("right",!0,t,r)}
      </div>
    `}o.insertAdjacentHTML("beforeend",a),o.onclick=r=>{const L=r.target.nodeName==="BUTTON"?r.target:r.target.closest(".pagination button");if(L){const S=parseInt(L.dataset.page,10);S!==e&&s(S)}}}export{F as E,ie as S,le as a,pe as b,ce as c,$ as d,re as g,ue as l,de as p,me as r};
//# sourceMappingURL=pagination-CQ07zEXq.js.map
