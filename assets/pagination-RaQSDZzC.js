import{i as I,a as T}from"./vendor-D9ezOI0e.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(o){if(o.ep)return;o.ep=!0;const n=s(o);fetch(o.href,n)}})();function w(e,t){I.show({icon:t?"fa-solid fa-circle-exclamation":"fa-solid fa-check",iconColor:"white",message:e,messageColor:"white",position:"topRight",timeout:5e3,color:t?"#EF4040":"#00BFFF",maxWidth:"500px"})}function k(e){w(e,!1)}function q(e){w(e,!0)}const b="exercise-card",B=10,u=Object.freeze({START:"start",RATE:"rate",REMOVE_FAVORITE:"removeFavorite"}),Z=Object.freeze({LIMITS:{DESKTOP_LARGE:12,DESKTOP:9,EXERCISES_LIST:10},BREAKPOINTS:{DESKTOP_LARGE:1440},DEFAULT_FILTER:"Muscles"});T.defaults.baseURL="https://your-energy.b.goit.study/api";function P(e){q(e.response?.data?.message||`An error occurred: ${e.message}, please try again later!`)}async function v(e,...t){try{const{data:s}=await T[e](...t);return s}catch(s){return P(s),null}}function ee(){return v("get","/quote")}function te(e,t=1,s=12){return v("get","/filters",{params:{filter:e,page:t,limit:s}})}function se(e,t,s=1,a=B){const{bodypart:o,muscles:n,equipment:i}=e;return v("get","/exercises",{params:{bodypart:o,muscles:n,equipment:i,keyword:t,page:s,limit:a}})}function N(e){return v("get",`/exercises/${e}`)}async function oe(e){const t=await v("post","/subscription",{email:e});return t&&k(t?.message||"Thank you for your subscription!"),t}async function x(e,t){if(e==="open"){const s=F();document.body.classList.add("modal-open"),t.classList.remove("hidden"),t.classList.add("is-open"),document.documentElement.style.setProperty("--scrollbar-width",`${s}px`)}e==="close"&&(t.classList.remove("is-open"),setTimeout(()=>{t.classList.add("hidden"),document.body.classList.remove("modal-open"),document.documentElement.style.removeProperty("--scrollbar-width")},250))}const F=()=>window.innerWidth-document.documentElement.clientWidth;function ne(){const e=document.querySelector(".mobile-menu-overlay"),t=document.querySelector(".burger-btn"),s=document.querySelector(".mobile-menu__close-button");e&&t&&s&&(t.addEventListener("click",()=>x("open",e)),s.addEventListener("click",()=>x("close",e)),e.addEventListener("click",({target:n})=>{(n.classList.contains("mobile-menu__nav-link")||n===e)&&x("close",e)}));const a=document.querySelectorAll(".nav-link");let o=window.location.pathname;(o.endsWith("/")||o.endsWith("/index.html"))&&(o="/index.html"),a.forEach(n=>{let i=new URL(n.href).pathname;(i.endsWith("/")||i.endsWith("/index.html"))&&(i="/index.html"),i===o?n.classList.add("active"):n.classList.remove("active")})}const W="/goit-js-final-project/assets/icons-D_oQLUx2.svg";function d(e){return`${W}#${e}`}function H(e,t){return`
    <div class="${b}" data-id="${e._id}">
      <div class="exercise-card-header">
      <p class="exercise-equipment">${e.equipment}</p>
        <div class="exercise-card-header-middle">
          ${t?`<button data-action="${u.REMOVE_FAVORITE}" class="card-icon-button remove-favorite-button">
                  <svg class="remove-favorite-icon">
                    <use href="${d("trash-icon")}"></use>
                  </svg>
                </button>`:`<button data-action="${u.RATE}" class="card-icon-button rating-button">
                  ${e.rating.toFixed(1)}
                  <svg class="rating-icon">
                    <use href="${d("star-filled-icon")}"></use>
                  </svg>
                </button>`}
        </div>
        <button data-action="${u.START}" class="start-button">
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
  `}function D(e,t){const s=e.querySelector(`.${b}[data-id="${t}"]`);s&&s.remove()}const A="favoriteExercises";function U(e){const t=E();t.some(s=>s._id===e._id)||(t.push(e),M(t))}function R(e){const s=E().filter(a=>a._id!==e);M(s)}function M(e){localStorage.setItem(A,JSON.stringify(e))}function E(){try{const e=localStorage.getItem(A);if(e){const t=JSON.parse(e);if(Array.isArray(t))return t.filter(j)}}catch{}return[]}function j(e){return e&&typeof e=="object"&&typeof e._id=="string"&&typeof e.name=="string"}const G=()=>window.innerWidth-document.documentElement.clientWidth;function g(e){return e.charAt(0).toUpperCase()+e.slice(1)}function K(e){const t=Math.floor(e);let s="";for(let a=0;a<5;a++){let o=a<t?"star-filled-icon":"star-icon";s+=`
      <svg class="exercise-modal__star-icon">
        <use href="${d(o)}"></use>
      </svg>
    `}return s}function S(e){const t=E().some(s=>s._id===e._id);return`
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
  `}function V(e){const t=`
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
            <h2 class="exercise-modal__name">${g(e.name)}</h2>
            <div class="exercise-modal__rating">
              <span class="exercise-modal__rating-value">${e.rating}</span>
              <div class="exercise-modal__stars">
                ${K(e.rating)}
              </div>
            </div>
          </div>
          <ul class="exercise-modal__info-list">
            <li class="exercise-modal__info-item"><p class="exercise-modal__label">Target</p><p class="exercise-modal__value">${g(e.target)}</p></li>
            <li class="exercise-modal__info-item"><p class="exercise-modal__label">Body Part</p><p class="exercise-modal__value">${g(e.bodyPart)}</p></li>
            <li class="exercise-modal__info-item"><p class="exercise-modal__label">Equipment</p><p class="exercise-modal__value">${g(e.equipment)}</p></li>
            <li class="exercise-modal__info-item"><p class="exercise-modal__label">Popular</p><p class="exercise-modal__value">${e.popularity}</p></li>
            <li class="exercise-modal__info-item"><p class="exercise-modal__label">Burned calories</p><p class="exercise-modal__value">${e.burnedCalories}/${e.time} min</p></li>
          </ul>
          <p class="exercise-modal__description">${e.description}</p>
        </div>
        </div>

        <div class="exercise-modal__buttons">
            ${S(e)}
            <button type="button" class="exercise-modal__rating-btn">Give a rating</button>
        </div>
      </div>
    </div>
  `;document.querySelector("#exerciseModalBackdrop")?.remove(),document.body.insertAdjacentHTML("beforeend",t);const s=document.getElementById("exerciseModalBackdrop"),a=G();document.body.classList.add("modal-open"),document.documentElement.style.setProperty("--scrollbar-width",`${a}px`),setTimeout(()=>{s.classList.add("is-open")},50);const o=()=>{s.classList.remove("is-open"),setTimeout(()=>{document.body.classList.remove("modal-open"),document.documentElement.style.removeProperty("--scrollbar-width"),s.remove()},300),document.removeEventListener("keydown",n)};s.querySelector(".exercise-modal__close-btn").addEventListener("click",o),s.addEventListener("click",i=>{i.target===s&&o()});function n(i){i.key==="Escape"&&o()}document.addEventListener("keydown",n),s.querySelector(".exercise-modal__buttons").addEventListener("click",i=>{const l=i.target.closest("[data-action]");if(!l)return;const c=l.dataset.action;c==="add"?U(e):c==="remove"&&R(e._id),l.outerHTML=S(e)})}function X(e,t){R(t),D(e,t)}function z(e){console.log(`Rating exercise: ${e}`)}async function J(e){const t=await N(e);V(t)}const f=document.querySelector(".exercises-list-wrapper");function ie(e,t,{favorites:s,onFavoriteDelete:a}={}){f.innerHTML="",s&&f.classList.add("favorites");let o="";e.length?e.forEach(n=>{o+=H(n,s)}):o=`<p class="no-exercises-message">${t}</p>`,f.insertAdjacentHTML("beforeend",o),f.onclick=n=>{let i=n.target;if(i.nodeName!=="BUTTON"&&(i=i.closest(`.${b} button`)),!i||i.nodeName!=="BUTTON")return;const c=i.closest(`.${b}`).dataset.id,m=i.dataset.action;switch(m){case u.REMOVE_FAVORITE:X(f,c),a?.(c);break;case u.START:J(c);break;case u.RATE:z(c);break;default:console.warn("Unknown action:",m)}}}const _=3;function L(){return'<span class="pagination-ellipsis">...</span>'}function Q(e,t){return`<button class="page-button ${e===t?"active":""}" data-page="${e}">${e}</button>`}function h(e,t,s,a){return`<button class="page-button arrow ${a?"disabled":""}" data-page="${s}">
    <svg class="pagination-arrow-icon ${t?"double":""}">
      <use href="${d(`pagination-arrow${t?"-double":""}-${e}-icon`)}"></use>
    </svg>
  </button>`}function ae(e,t,s,a=".exercises-list"){let o=document.querySelector(".pagination");o?o.innerHTML="":(o=document.createElement("div"),o.className="pagination",document.querySelector(a).appendChild(o));let n="";const i=Math.max(1,e-Math.floor(_/2)),l=Math.min(t,i+_-1),c=Math.max(1,l-_+1),m=t>_;if(m){const r=e===1;n+=`
      <div class="arrow-buttons">
        ${h("left",!0,1,r)}
        ${h("left",!1,e-1,r)}
      </div>
    `}let p="";for(let r=c;r<=l;r+=1)p+=Q(r,e);const O=c>1,C=l<t;if(O&&(p=`${L()}${p}`),C&&(p+=L()),n+=`<div class="page-buttons">${p}</div>`,m){const r=e===t;n+=`
      <div class="arrow-buttons">
        ${h("right",!1,e+1,r)}
        ${h("right",!0,t,r)}
      </div>
    `}o.insertAdjacentHTML("beforeend",n),o.onclick=r=>{const y=r.target.nodeName==="BUTTON"?r.target:r.target.closest(".pagination button");if(y){const $=parseInt(y.dataset.page,10);$!==e&&s($)}}}export{B as E,Z as S,se as a,ae as b,te as c,E as d,ee as g,ne as l,oe as p,ie as r};
//# sourceMappingURL=pagination-RaQSDZzC.js.map
