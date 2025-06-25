(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function o(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(s){if(s.ep)return;s.ep=!0;const n=o(s);fetch(s.href,n)}})();const d="exercise-card",x=10,c=Object.freeze({START:"start",RATE:"rate",REMOVE_FAVORITE:"removeFavorite"});function f(e,t){return`
    <div class="${d} ${t?"favorite":""}" data-id="${e._id}">
      <div class="exercise-card-header">
      <p class="exercise-equipment">${e.equipment}</p>
        <div class="exercise-card-header-middle">
          ${t?`<button data-action="${c.REMOVE_FAVORITE}" class="card-icon-button remove-favorite-button">
                  <svg class="remove-favorite-icon">
                    <use href="./img/icons.svg#trash-icon"></use>
                  </svg>
                </button>`:`<button data-action="${c.RATE}" class="card-icon-button rating-button">
                  ${e.rating}
                  <svg class="rating-icon">
                    <use href="./img/icons.svg#star-filled-icon"></use>
                  </svg>
                </button>`}
        </div>
        <button data-action="${c.START}" class="start-button">
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
  `}function m(e,t){const o=e.querySelector(`.${d}[data-id="${t}"]`);o&&o.remove()}const u="favoriteExercises";function v(e){const o=g().filter(r=>r._id!==e);p(o)}function p(e){localStorage.setItem(u,JSON.stringify(e))}function g(){try{const e=localStorage.getItem(u);if(e){const t=JSON.parse(e);if(Array.isArray(t))return t.filter(E)}}catch{}return[]}function E(e){return e&&typeof e=="object"&&typeof e._id=="string"&&typeof e.name=="string"}function h(e,t){v(t),m(e,t)}function y(e){console.log(`Rating exercise: ${e}`)}function b(e){console.log(`Starting exercise: ${e}`)}function S(e,t,o){switch(o){case c.REMOVE_FAVORITE:h(e,t);break;case c.START:b(t);break;case c.RATE:y(t);break;default:console.warn("Unknown action:",o)}}const i=document.querySelector(".exercises-list");function A(e,t,o){i.innerHTML="",o&&i.classList.add("favorites");let r="";e.length?e.forEach(s=>{r+=f(s,o)}):r=`<p class="no-exercises-message">${t}</p>`,i.insertAdjacentHTML("beforeend",r)}i.addEventListener("click",e=>{let t=e.target;if(t.nodeName!=="BUTTON"&&(t=t.closest(`.${d} button`)),!t||t.nodeName!=="BUTTON")return;const r=t.closest(`.${d}`).dataset.id,s=t.dataset.action;S(i,r,s)});async function l(e,t){if(e==="open"){const o=L();document.body.classList.add("modal-open"),t.classList.remove("hidden"),t.classList.add("is-open"),document.documentElement.style.setProperty("--scrollbar-width",`${o}px`)}e==="close"&&(t.classList.remove("is-open"),setTimeout(()=>{t.classList.add("hidden"),document.body.classList.remove("modal-open"),document.documentElement.style.removeProperty("--scrollbar-width")},250))}const L=()=>window.innerWidth-document.documentElement.clientWidth;function R(){const e=document.querySelector(".mobile-menu-overlay"),t=document.querySelector(".burger-btn"),o=document.querySelector(".mobile-menu__close-button");e&&t&&o&&(t.addEventListener("click",()=>l("open",e)),o.addEventListener("click",()=>l("close",e)),e.addEventListener("click",({target:n})=>{(n.classList.contains("mobile-menu__nav-link")||n===e)&&l("close",e)}));const r=document.querySelectorAll(".nav-link"),s=window.location.pathname;r.forEach(n=>{new URL(n.href).pathname===s?n.classList.add("active"):n.classList.remove("active")})}export{x as E,g,R as l,A as r};
//# sourceMappingURL=header-B6eVmwhF.js.map
