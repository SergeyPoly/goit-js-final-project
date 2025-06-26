(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))c(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&c(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();const u="exercise-card",T=5,a=Object.freeze({START:"start",RATE:"rate",REMOVE_FAVORITE:"removeFavorite"}),E="/goit-js-final-project/assets/icons-DrzlWyYF.svg";function l(e){return`${E}#${e}`}function g(e,t){return`
    <div class="${u}" data-id="${e._id}">
      <div class="exercise-card-header">
      <p class="exercise-equipment">${e.equipment}</p>
        <div class="exercise-card-header-middle">
          ${t?`<button data-action="${a.REMOVE_FAVORITE}" class="card-icon-button remove-favorite-button">
                  <svg class="remove-favorite-icon">
                    <use href="${l("trash-icon")}"></use>
                  </svg>
                </button>`:`<button data-action="${a.RATE}" class="card-icon-button rating-button">
                  ${e.rating}
                  <svg class="rating-icon">
                    <use href="${l("star-filled-icon")}"></use>
                  </svg>
                </button>`}
        </div>
        <button data-action="${a.START}" class="start-button">
          Start
          <svg class="arrow-icon" width="13" height="13">
            <use href="${l("arrow-icon")}"></use>
          </svg>
        </button>
      </div>
      <div class="exercise-card-body">
        <div class="exercise-name-container">
          <svg class="exercise-icon" width="24" height="24">
            <use href="${l("running-man-icon")}"></use>
          </svg>
          <h3 class="exercise-name">${e.name}</h3>
        </div>
      </div>
      <div class="exercise-card-footer">
        <p class="card-footer-text">
          <span class="secondary-text">Burned calories:</span>
          ${e.burnedCalories} /${e.time} min
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
  `}function h(e,t){const n=e.querySelector(`.${u}[data-id="${t}"]`);n&&n.remove()}const p="favoriteExercises";function v(e){const n=b().filter(c=>c._id!==e);y(n)}function y(e){localStorage.setItem(p,JSON.stringify(e))}function b(){try{const e=localStorage.getItem(p);if(e){const t=JSON.parse(e);if(Array.isArray(t))return t.filter(S)}}catch{}return[]}function S(e){return e&&typeof e=="object"&&typeof e._id=="string"&&typeof e.name=="string"}function $(e,t){v(t),h(e,t)}function L(e){console.log(`Rating exercise: ${e}`)}function x(e){console.log(`Starting exercise: ${e}`)}const i=document.querySelector(".exercises-list-wrapper");function O(e,t,{favorites:n,onFavoriteDelete:c}={}){i.innerHTML="",n&&i.classList.add("favorites");let r="";e.length?e.forEach(s=>{r+=g(s,n)}):r=`<p class="no-exercises-message">${t}</p>`,i.insertAdjacentHTML("beforeend",r),i.onclick=s=>{let o=s.target;if(o.nodeName!=="BUTTON"&&(o=o.closest(`.${u} button`)),!o||o.nodeName!=="BUTTON")return;const d=o.closest(`.${u}`).dataset.id,m=o.dataset.action;switch(m){case a.REMOVE_FAVORITE:$(i,d),c==null||c(d);break;case a.START:x(d);break;case a.RATE:L(d);break;default:console.warn("Unknown action:",m)}}}async function f(e,t){if(e==="open"){const n=A();document.body.classList.add("modal-open"),t.classList.remove("hidden"),t.classList.add("is-open"),document.documentElement.style.setProperty("--scrollbar-width",`${n}px`)}e==="close"&&(t.classList.remove("is-open"),setTimeout(()=>{t.classList.add("hidden"),document.body.classList.remove("modal-open"),document.documentElement.style.removeProperty("--scrollbar-width")},250))}const A=()=>window.innerWidth-document.documentElement.clientWidth;function _(){const e=document.querySelector(".mobile-menu-overlay"),t=document.querySelector(".burger-btn"),n=document.querySelector(".mobile-menu__close-button");e&&t&&n&&(t.addEventListener("click",()=>f("open",e)),n.addEventListener("click",()=>f("close",e)),e.addEventListener("click",({target:s})=>{(s.classList.contains("mobile-menu__nav-link")||s===e)&&f("close",e)}));const c=document.querySelectorAll(".nav-link"),r=window.location.pathname;c.forEach(s=>{new URL(s.href).pathname===r?s.classList.add("active"):s.classList.remove("active")})}export{T as E,b as a,l as g,_ as l,O as r};
//# sourceMappingURL=header-CTCnJ5Ir.js.map
