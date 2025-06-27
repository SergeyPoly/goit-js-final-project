import{i as C,a as T}from"./vendor-CLZFq-H_.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function s(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(o){if(o.ep)return;o.ep=!0;const n=s(o);fetch(o.href,n)}})();function I(e,t){C.show({icon:"fa-solid fa-circle-exclamation",iconColor:"white",message:e,messageColor:"white",position:"topRight",timeout:4e3,color:"#EF4040",maxWidth:"500px"})}function k(e){I(e)}const h="exercise-card",q=10,m=Object.freeze({START:"start",RATE:"rate",REMOVE_FAVORITE:"removeFavorite"}),Y=Object.freeze({LIMITS:{DESKTOP_LARGE:12,DESKTOP:9,EXERCISES_LIST:10},BREAKPOINTS:{DESKTOP_LARGE:1440},DEFAULT_FILTER:"Muscles"});T.defaults.baseURL="https://your-energy.b.goit.study/api";function B(e){var t,s;k(((s=(t=e.response)==null?void 0:t.data)==null?void 0:s.message)||`An error occurred: ${e.message}, please try again later!`)}async function b(e,...t){try{const{data:s}=await T[e](...t);return s}catch(s){return B(s),null}}function Z(){return b("get","/quote")}function ee(e,t=1,s=12){return b("get","/filters",{params:{filter:e,page:t,limit:s}})}function te(e,t,s=1,i=q){const{bodypart:o,muscles:n,equipment:r}=e;return b("get","/exercises",{params:{bodypart:o,muscles:n,equipment:r,keyword:t,page:s,limit:i}})}function P(e){return b("get",`/exercises/${e}`)}async function E(e,t){if(e==="open"){const s=N();document.body.classList.add("modal-open"),t.classList.remove("hidden"),t.classList.add("is-open"),document.documentElement.style.setProperty("--scrollbar-width",`${s}px`)}e==="close"&&(t.classList.remove("is-open"),setTimeout(()=>{t.classList.add("hidden"),document.body.classList.remove("modal-open"),document.documentElement.style.removeProperty("--scrollbar-width")},250))}const N=()=>window.innerWidth-document.documentElement.clientWidth;function se(){const e=document.querySelector(".mobile-menu-overlay"),t=document.querySelector(".burger-btn"),s=document.querySelector(".mobile-menu__close-button");e&&t&&s&&(t.addEventListener("click",()=>E("open",e)),s.addEventListener("click",()=>E("close",e)),e.addEventListener("click",({target:n})=>{(n.classList.contains("mobile-menu__nav-link")||n===e)&&E("close",e)}));const i=document.querySelectorAll(".nav-link");let o=window.location.pathname;(o.endsWith("/")||o.endsWith("/index.html"))&&(o="/index.html"),i.forEach(n=>{let r=new URL(n.href).pathname;(r.endsWith("/")||r.endsWith("/index.html"))&&(r="/index.html"),r===o?n.classList.add("active"):n.classList.remove("active")})}const W="/goit-js-final-project/assets/icons-D_oQLUx2.svg";function d(e){return`${W}#${e}`}function H(e,t){return`
    <div class="${h}" data-id="${e._id}">
      <div class="exercise-card-header">
      <p class="exercise-equipment">${e.equipment}</p>
        <div class="exercise-card-header-middle">
          ${t?`<button data-action="${m.REMOVE_FAVORITE}" class="card-icon-button remove-favorite-button">
                  <svg class="remove-favorite-icon">
                    <use href="${d("trash-icon")}"></use>
                  </svg>
                </button>`:`<button data-action="${m.RATE}" class="card-icon-button rating-button">
                  ${e.rating}
                  <svg class="rating-icon">
                    <use href="${d("star-filled-icon")}"></use>
                  </svg>
                </button>`}
        </div>
        <button data-action="${m.START}" class="start-button">
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
  `}function U(e,t){const s=e.querySelector(`.${h}[data-id="${t}"]`);s&&s.remove()}const w="favoriteExercises";function j(e){const t=x();t.some(s=>s._id===e._id)||(t.push(e),R(t))}function A(e){const s=x().filter(i=>i._id!==e);R(s)}function R(e){localStorage.setItem(w,JSON.stringify(e))}function x(){try{const e=localStorage.getItem(w);if(e){const t=JSON.parse(e);if(Array.isArray(t))return t.filter(F)}}catch{}return[]}function F(e){return e&&typeof e=="object"&&typeof e._id=="string"&&typeof e.name=="string"}const G=()=>window.innerWidth-document.documentElement.clientWidth;function v(e){return e.charAt(0).toUpperCase()+e.slice(1)}function D(e){const t=Math.floor(e);let s="";for(let i=0;i<5;i++){let o=i<t?"star-filled-icon":"star-icon";s+=`
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
  `}function K(e){var r;const t=`
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
                ${D(e.rating)}
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
  `;(r=document.querySelector("#exerciseModalBackdrop"))==null||r.remove(),document.body.insertAdjacentHTML("beforeend",t);const s=document.getElementById("exerciseModalBackdrop"),i=G();document.body.classList.add("modal-open"),document.documentElement.style.setProperty("--scrollbar-width",`${i}px`),setTimeout(()=>{s.classList.add("is-open")},50);const o=()=>{s.classList.remove("is-open"),setTimeout(()=>{document.body.classList.remove("modal-open"),document.documentElement.style.removeProperty("--scrollbar-width"),s.remove()},300),document.removeEventListener("keydown",n)};s.querySelector(".exercise-modal__close-btn").addEventListener("click",o),s.addEventListener("click",c=>{c.target===s&&o()});function n(c){c.key==="Escape"&&o()}document.addEventListener("keydown",n),s.querySelector(".exercise-modal__buttons").addEventListener("click",c=>{const l=c.target.closest("[data-action]");if(!l)return;const u=l.dataset.action;u==="add"?j(e):u==="remove"&&A(e._id),l.outerHTML=S(e)})}function V(e,t){A(t),U(e,t)}function X(e){console.log(`Rating exercise: ${e}`)}async function z(e){const t=await P(e);K(t)}const f=document.querySelector(".exercises-list-wrapper");function oe(e,t,{favorites:s,onFavoriteDelete:i}={}){f.innerHTML="",s&&f.classList.add("favorites");let o="";e.length?e.forEach(n=>{o+=H(n,s)}):o=`<p class="no-exercises-message">${t}</p>`,f.insertAdjacentHTML("beforeend",o),f.onclick=n=>{let r=n.target;if(r.nodeName!=="BUTTON"&&(r=r.closest(`.${h} button`)),!r||r.nodeName!=="BUTTON")return;const l=r.closest(`.${h}`).dataset.id,u=r.dataset.action;switch(u){case m.REMOVE_FAVORITE:V(f,l),i==null||i(l);break;case m.START:z(l);break;case m.RATE:X(l);break;default:console.warn("Unknown action:",u)}}}const g=3;function L(){return'<span class="pagination-ellipsis">...</span>'}function J(e,t){return`<button class="page-button ${e===t?"active":""}" data-page="${e}">${e}</button>`}function _(e,t,s,i){return`<button class="page-button arrow ${i?"disabled":""}" data-page="${s}">
    <svg class="pagination-arrow-icon ${t?"double":""}">
      <use href="${d(`pagination-arrow${t?"-double":""}-${e}-icon`)}"></use>
    </svg>
  </button>`}function ne(e,t,s,i=".exercises-list"){let o=document.querySelector(".pagination");o?o.innerHTML="":(o=document.createElement("div"),o.className="pagination",document.querySelector(i).appendChild(o));let n="";const r=Math.max(1,e-Math.floor(g/2)),c=Math.min(t,r+g-1),l=Math.max(1,c-g+1),u=t>g;if(u){const a=e===1;n+=`
      <div class="arrow-buttons">
        ${_("left",!0,1,a)}
        ${_("left",!1,e-1,a)}
      </div>
    `}let p="";for(let a=l;a<=c;a+=1)p+=J(a,e);const M=l>1,O=c<t;if(M&&(p=`${L()}${p}`),O&&(p+=L()),n+=`<div class="page-buttons">${p}</div>`,u){const a=e===t;n+=`
      <div class="arrow-buttons">
        ${_("right",!1,e+1,a)}
        ${_("right",!0,t,a)}
      </div>
    `}o.insertAdjacentHTML("beforeend",n),o.onclick=a=>{const y=a.target.nodeName==="BUTTON"?a.target:a.target.closest(".pagination button");if(y){const $=parseInt(y.dataset.page,10);$!==e&&s($)}}}export{q as E,Y as S,te as a,ne as b,ee as c,x as d,Z as g,se as l,oe as r};
//# sourceMappingURL=pagination-DMaF5ENc.js.map
