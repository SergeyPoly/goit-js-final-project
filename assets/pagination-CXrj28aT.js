import{i as C,a as T}from"./vendor-D9ezOI0e.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function s(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(o){if(o.ep)return;o.ep=!0;const n=s(o);fetch(o.href,n)}})();function I(e,t){C.show({icon:"fa-solid fa-circle-exclamation",iconColor:"white",message:e,messageColor:"white",position:"topRight",timeout:4e3,color:"#EF4040",maxWidth:"500px"})}function k(e){I(e)}const h="exercise-card",q=10,u=Object.freeze({START:"start",RATE:"rate",REMOVE_FAVORITE:"removeFavorite"}),Y=Object.freeze({LIMITS:{DESKTOP_LARGE:12,DESKTOP:9,EXERCISES_LIST:10},BREAKPOINTS:{DESKTOP_LARGE:1440},DEFAULT_FILTER:"Muscles"});T.defaults.baseURL="https://your-energy.b.goit.study/api";function B(e){k(e.response?.data?.message||`An error occurred: ${e.message}, please try again later!`)}async function b(e,...t){try{const{data:s}=await T[e](...t);return s}catch(s){return B(s),null}}function Z(){return b("get","/quote")}function ee(e,t=1,s=12){return b("get","/filters",{params:{filter:e,page:t,limit:s}})}function te(e,t,s=1,r=q){const{bodypart:o,muscles:n,equipment:i}=e;return b("get","/exercises",{params:{bodypart:o,muscles:n,equipment:i,keyword:t,page:s,limit:r}})}function P(e){return b("get",`/exercises/${e}`)}async function E(e,t){if(e==="open"){const s=N();document.body.classList.add("modal-open"),t.classList.remove("hidden"),t.classList.add("is-open"),document.documentElement.style.setProperty("--scrollbar-width",`${s}px`)}e==="close"&&(t.classList.remove("is-open"),setTimeout(()=>{t.classList.add("hidden"),document.body.classList.remove("modal-open"),document.documentElement.style.removeProperty("--scrollbar-width")},250))}const N=()=>window.innerWidth-document.documentElement.clientWidth;function se(){const e=document.querySelector(".mobile-menu-overlay"),t=document.querySelector(".burger-btn"),s=document.querySelector(".mobile-menu__close-button");e&&t&&s&&(t.addEventListener("click",()=>E("open",e)),s.addEventListener("click",()=>E("close",e)),e.addEventListener("click",({target:n})=>{(n.classList.contains("mobile-menu__nav-link")||n===e)&&E("close",e)}));const r=document.querySelectorAll(".nav-link");let o=window.location.pathname;(o.endsWith("/")||o.endsWith("/index.html"))&&(o="/index.html"),r.forEach(n=>{let i=new URL(n.href).pathname;(i.endsWith("/")||i.endsWith("/index.html"))&&(i="/index.html"),i===o?n.classList.add("active"):n.classList.remove("active")})}const W="/goit-js-final-project/assets/icons-D_oQLUx2.svg";function d(e){return`${W}#${e}`}function F(e,t){return`
    <div class="${h}" data-id="${e._id}">
      <div class="exercise-card-header">
      <p class="exercise-equipment">${e.equipment}</p>
        <div class="exercise-card-header-middle">
          ${t?`<button data-action="${u.REMOVE_FAVORITE}" class="card-icon-button remove-favorite-button">
                  <svg class="remove-favorite-icon">
                    <use href="${d("trash-icon")}"></use>
                  </svg>
                </button>`:`<button data-action="${u.RATE}" class="card-icon-button rating-button">
                  ${e.rating}
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
  `}function H(e,t){const s=e.querySelector(`.${h}[data-id="${t}"]`);s&&s.remove()}const w="favoriteExercises";function D(e){const t=x();t.some(s=>s._id===e._id)||(t.push(e),R(t))}function A(e){const s=x().filter(r=>r._id!==e);R(s)}function R(e){localStorage.setItem(w,JSON.stringify(e))}function x(){try{const e=localStorage.getItem(w);if(e){const t=JSON.parse(e);if(Array.isArray(t))return t.filter(U)}}catch{}return[]}function U(e){return e&&typeof e=="object"&&typeof e._id=="string"&&typeof e.name=="string"}const j=()=>window.innerWidth-document.documentElement.clientWidth;function v(e){return e.charAt(0).toUpperCase()+e.slice(1)}function G(e){const t=Math.floor(e);let s="";for(let r=0;r<5;r++){let o=r<t?"star-filled-icon":"star-icon";s+=`
      <svg class="exercise-modal__star-icon">
        <use href="${d(o)}"></use>
      </svg>
    `}return s}function S(e){const t=x().some(s=>s._id===e._id);return`
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
  `}function K(e){const t=`
    <div id="exerciseModalBackdrop" class="exercise-modal__backdrop">
      <div class="exercise-modal">
        <button class="exercise-modal__close-btn" type="button">
          <svg class="exercise-modal__close-icon">
            <use href="${d("close-icon")}"></use>
          </svg>
        </button>
        <div class="exercise-modal__image-wrapper">
          <img src="${e.gifUrl}" alt="${e.name}"class="exercise-modal__image" />
        </div>
        <div class="exercise-modal__info-wrapper">
          <div class="exercise-modal__title-block">
            <h2 class="exercise-modal__name">${v(e.name)}</h2>
            <div class="exercise-modal__rating">
              <span class="exercise-modal__rating-value">${e.rating}</span>
              <div class="exercise-modal__stars">
                ${G(e.rating)}
              </div>
            </div>
          </div>
          <ul class="exercise-modal__info-list">
            <li class="exercise-modal__info-item"><p class="exercise-modal__label">Target</p><p class="exercise-modal__value">${v(e.target)}</p></li>
            <li class="exercise-modal__info-item"><p class="exercise-modal__label">Body Part</p><p class="exercise-modal__value">${v(e.bodyPart)}</p></li>
            <li class="exercise-modal__info-item"><p class="exercise-modal__label">Equipment</p><p class="exercise-modal__value">${v(e.equipment)}</p></li>
            <li class="exercise-modal__info-item"><p class="exercise-modal__label">Popular</p><p class="exercise-modal__value">${e.popularity}</p></li>
            <li class="exercise-modal__info-item"><p class="exercise-modal__label">Burned calories</p><p class="exercise-modal__value">${e.burnedCalories}/${e.time} min</p></li>
          </ul>
          <p class="exercise-modal__description">${e.description}</p>
          <div class="exercise-modal__buttons">
            ${S(e)}
            <button type="button" class="exercise-modal__rating-btn">Give a rating</button>
          </div>
        </div>
      </div>
    </div>
  `;document.querySelector("#exerciseModalBackdrop")?.remove(),document.body.insertAdjacentHTML("beforeend",t);const s=document.getElementById("exerciseModalBackdrop"),r=j();document.body.classList.add("modal-open"),document.documentElement.style.setProperty("--scrollbar-width",`${r}px`),setTimeout(()=>{s.classList.add("is-open")},50);const o=()=>{s.classList.remove("is-open"),setTimeout(()=>{document.body.classList.remove("modal-open"),document.documentElement.style.removeProperty("--scrollbar-width"),s.remove()},300),document.removeEventListener("keydown",n)};s.querySelector(".exercise-modal__close-btn").addEventListener("click",o),s.addEventListener("click",i=>{i.target===s&&o()});function n(i){i.key==="Escape"&&o()}document.addEventListener("keydown",n),s.querySelector(".exercise-modal__buttons").addEventListener("click",i=>{const l=i.target.closest("[data-action]");if(!l)return;const c=l.dataset.action;c==="add"?D(e):c==="remove"&&A(e._id),l.outerHTML=S(e)})}function V(e,t){A(t),H(e,t)}function X(e){console.log(`Rating exercise: ${e}`)}async function z(e){const t=await P(e);K(t)}const f=document.querySelector(".exercises-list-wrapper");function oe(e,t,{favorites:s,onFavoriteDelete:r}={}){f.innerHTML="",s&&f.classList.add("favorites");let o="";e.length?e.forEach(n=>{o+=F(n,s)}):o=`<p class="no-exercises-message">${t}</p>`,f.insertAdjacentHTML("beforeend",o),f.onclick=n=>{let i=n.target;if(i.nodeName!=="BUTTON"&&(i=i.closest(`.${h} button`)),!i||i.nodeName!=="BUTTON")return;const c=i.closest(`.${h}`).dataset.id,m=i.dataset.action;switch(m){case u.REMOVE_FAVORITE:V(f,c),r?.(c);break;case u.START:z(c);break;case u.RATE:X(c);break;default:console.warn("Unknown action:",m)}}}const g=3;function L(){return'<span class="pagination-ellipsis">...</span>'}function J(e,t){return`<button class="page-button ${e===t?"active":""}" data-page="${e}">${e}</button>`}function _(e,t,s,r){return`<button class="page-button arrow ${r?"disabled":""}" data-page="${s}">
    <svg class="pagination-arrow-icon ${t?"double":""}">
      <use href="${d(`pagination-arrow${t?"-double":""}-${e}-icon`)}"></use>
    </svg>
  </button>`}function ne(e,t,s,r=".exercises-list"){let o=document.querySelector(".pagination");o?o.innerHTML="":(o=document.createElement("div"),o.className="pagination",document.querySelector(r).appendChild(o));let n="";const i=Math.max(1,e-Math.floor(g/2)),l=Math.min(t,i+g-1),c=Math.max(1,l-g+1),m=t>g;if(m){const a=e===1;n+=`
      <div class="arrow-buttons">
        ${_("left",!0,1,a)}
        ${_("left",!1,e-1,a)}
      </div>
    `}let p="";for(let a=c;a<=l;a+=1)p+=J(a,e);const M=c>1,O=l<t;if(M&&(p=`${L()}${p}`),O&&(p+=L()),n+=`<div class="page-buttons">${p}</div>`,m){const a=e===t;n+=`
      <div class="arrow-buttons">
        ${_("right",!1,e+1,a)}
        ${_("right",!0,t,a)}
      </div>
    `}o.insertAdjacentHTML("beforeend",n),o.onclick=a=>{const y=a.target.nodeName==="BUTTON"?a.target:a.target.closest(".pagination button");if(y){const $=parseInt(y.dataset.page,10);$!==e&&s($)}}}export{q as E,Y as S,te as a,ne as b,ee as c,x as d,Z as g,se as l,oe as r};
//# sourceMappingURL=pagination-CXrj28aT.js.map
