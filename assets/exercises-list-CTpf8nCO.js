(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function r(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=r(s);fetch(s.href,o)}})();const i="exercise-card",S=10,a=Object.freeze({START:"start",RATE:"rate",REMOVE_FAVORITE:"removeFavorite"});function u(e,t){return`
    <div class="${i} ${t?"favorite":""}" data-id="${e._id}">
      <div class="exercise-card-header">
      <p class="exercise-equipment">${e.equipment}</p>
        <div class="exercise-card-header-middle">
          ${t?`<button data-action="${a.REMOVE_FAVORITE}" class="card-icon-button remove-favorite-button">
                  <svg class="remove-favorite-icon">
                    <use href="./img/icons.svg#trash-icon"></use>
                  </svg>
                </button>`:`<button data-action="${a.RATE}" class="card-icon-button rating-button">
                  ${e.rating}
                  <svg class="rating-icon">
                    <use href="./img/icons.svg#star-filled-icon"></use>
                  </svg>
                </button>`}
        </div>
        <button data-action="${a.START}" class="start-button">
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
  `}function f(e,t){const r=e.querySelector(`.${i}[data-id="${t}"]`);r&&r.remove()}const l="favoriteExercises";function g(e){const r=p().filter(n=>n._id!==e);E(r)}function E(e){localStorage.setItem(l,JSON.stringify(e))}function p(){try{const e=localStorage.getItem(l);if(e){const t=JSON.parse(e);if(Array.isArray(t))return t.filter(v)}}catch{}return[]}function v(e){return e&&typeof e=="object"&&typeof e._id=="string"&&typeof e.name=="string"}function m(e,t){g(t),f(e,t)}function h(e){console.log(`Rating exercise: ${e}`)}function y(e){console.log(`Starting exercise: ${e}`)}function b(e,t,r){switch(r){case a.REMOVE_FAVORITE:m(e,t);break;case a.START:y(t);break;case a.RATE:h(t);break;default:console.warn("Unknown action:",r)}}const c=document.querySelector(".exercises-list");function x(e,t,r){c.innerHTML="",r&&c.classList.add("favorites");let n="";e.length?e.forEach(s=>{n+=u(s,r)}):n=`<p class="no-exercises-message">${t}</p>`,c.insertAdjacentHTML("beforeend",n)}c.addEventListener("click",e=>{let t=e.target;if(t.nodeName!=="BUTTON"&&(t=t.closest(`.${i} button`)),!t||t.nodeName!=="BUTTON")return;const n=t.closest(`.${i}`).dataset.id,s=t.dataset.action;b(c,n,s)});export{S as E,p as g,x as r};
//# sourceMappingURL=exercises-list-CTpf8nCO.js.map
