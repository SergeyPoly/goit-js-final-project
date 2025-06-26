(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))c(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&c(r)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();const l="exercise-card",T=10,i=Object.freeze({START:"start",RATE:"rate",REMOVE_FAVORITE:"removeFavorite"}),p="/goit-js-final-project/assets/icons-CKhcjcyQ.svg";function g(e,t){return`
    <div class="${l}" data-id="${e._id}">
      <div class="exercise-card-header">
      <p class="exercise-equipment">${e.equipment}</p>
        <div class="exercise-card-header-middle">
          ${t?`<button data-action="${i.REMOVE_FAVORITE}" class="card-icon-button remove-favorite-button">
                  <svg class="remove-favorite-icon">
                    <use href="./img/icons.svg#trash-icon"></use>
                  </svg>
                </button>`:`<button data-action="${i.RATE}" class="card-icon-button rating-button">
                  ${e.rating}
                  <svg class="rating-icon">
                    <use href="${p}#star-filled-icon"></use>
                  </svg>
                </button>`}
        </div>
        <button data-action="${i.START}" class="start-button">
          Start
          <svg class="arrow-icon" width="13" height="13">
            <use href="./img/icons.svg#arrow-icon"></use>
          </svg>
        </button>
      </div>
      <div class="exercise-card-body">
        <div class="exercise-name-container">
          <svg class="exercise-icon" width="24" height="24">
            <use href="./img/icons.svg#running-man-icon"></use>
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
  `}function v(e,t){const n=e.querySelector(`.${l}[data-id="${t}"]`);n&&n.remove()}const m="favoriteExercises";function E(e){const n=y().filter(c=>c._id!==e);h(n)}function h(e){localStorage.setItem(m,JSON.stringify(e))}function y(){try{const e=localStorage.getItem(m);if(e){const t=JSON.parse(e);if(Array.isArray(t))return t.filter(b)}}catch{}return[]}function b(e){return e&&typeof e=="object"&&typeof e._id=="string"&&typeof e.name=="string"}function S(e,t){E(t),v(e,t)}function L(e){console.log(`Rating exercise: ${e}`)}function x(e){console.log(`Starting exercise: ${e}`)}const a=document.querySelector(".exercises-list-wrapper");function $(e,t,{favorites:n,onFavoriteDelete:c}={}){a.innerHTML="",n&&a.classList.add("favorites");let o="";e.length?e.forEach(s=>{o+=g(s,n)}):o=`<p class="no-exercises-message">${t}</p>`,a.insertAdjacentHTML("beforeend",o),a.onclick=s=>{let r=s.target;if(r.nodeName!=="BUTTON"&&(r=r.closest(`.${l} button`)),!r||r.nodeName!=="BUTTON")return;const d=r.closest(`.${l}`).dataset.id,f=r.dataset.action;switch(f){case i.REMOVE_FAVORITE:S(a,d),c==null||c(d);break;case i.START:x(d);break;case i.RATE:L(d);break;default:console.warn("Unknown action:",f)}}}async function u(e,t){if(e==="open"){const n=A();document.body.classList.add("modal-open"),t.classList.remove("hidden"),t.classList.add("is-open"),document.documentElement.style.setProperty("--scrollbar-width",`${n}px`)}e==="close"&&(t.classList.remove("is-open"),setTimeout(()=>{t.classList.add("hidden"),document.body.classList.remove("modal-open"),document.documentElement.style.removeProperty("--scrollbar-width")},250))}const A=()=>window.innerWidth-document.documentElement.clientWidth;function O(){const e=document.querySelector(".mobile-menu-overlay"),t=document.querySelector(".burger-btn"),n=document.querySelector(".mobile-menu__close-button");e&&t&&n&&(t.addEventListener("click",()=>u("open",e)),n.addEventListener("click",()=>u("close",e)),e.addEventListener("click",({target:s})=>{(s.classList.contains("mobile-menu__nav-link")||s===e)&&u("close",e)}));const c=document.querySelectorAll(".nav-link"),o=window.location.pathname;c.forEach(s=>{new URL(s.href).pathname===o?s.classList.add("active"):s.classList.remove("active")})}export{T as E,y as g,O as l,$ as r};
//# sourceMappingURL=header-By93FrxP.js.map
