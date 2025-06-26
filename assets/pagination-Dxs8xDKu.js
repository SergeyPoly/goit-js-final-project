(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function o(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(s){if(s.ep)return;s.ep=!0;const n=o(s);fetch(s.href,n)}})();const v="exercise-card",B=10,d=Object.freeze({START:"start",RATE:"rate",REMOVE_FAVORITE:"removeFavorite"}),j=Object.freeze({LIMITS:{DESKTOP_LARGE:12,DESKTOP:9,EXERCISES_LIST:10},BREAKPOINTS:{DESKTOP_LARGE:1440},DEFAULT_FILTER:"Muscles"});async function h(e,t){if(e==="open"){const o=A();document.body.classList.add("modal-open"),t.classList.remove("hidden"),t.classList.add("is-open"),document.documentElement.style.setProperty("--scrollbar-width",`${o}px`)}e==="close"&&(t.classList.remove("is-open"),setTimeout(()=>{t.classList.add("hidden"),document.body.classList.remove("modal-open"),document.documentElement.style.removeProperty("--scrollbar-width")},250))}const A=()=>window.innerWidth-document.documentElement.clientWidth;function k(){const e=document.querySelector(".mobile-menu-overlay"),t=document.querySelector(".burger-btn"),o=document.querySelector(".mobile-menu__close-button");e&&t&&o&&(t.addEventListener("click",()=>h("open",e)),o.addEventListener("click",()=>h("close",e)),e.addEventListener("click",({target:n})=>{(n.classList.contains("mobile-menu__nav-link")||n===e)&&h("close",e)}));const r=document.querySelectorAll(".nav-link"),s=window.location.pathname;r.forEach(n=>{new URL(n.href).pathname===s?n.classList.add("active"):n.classList.remove("active")})}const x="/goit-js-final-project/assets/icons-DrzlWyYF.svg";function p(e){return`${x}#${e}`}function O(e,t){return`
    <div class="${v}" data-id="${e._id}">
      <div class="exercise-card-header">
      <p class="exercise-equipment">${e.equipment}</p>
        <div class="exercise-card-header-middle">
          ${t?`<button data-action="${d.REMOVE_FAVORITE}" class="card-icon-button remove-favorite-button">
                  <svg class="remove-favorite-icon">
                    <use href="${p("trash-icon")}"></use>
                  </svg>
                </button>`:`<button data-action="${d.RATE}" class="card-icon-button rating-button">
                  ${e.rating}
                  <svg class="rating-icon">
                    <use href="${p("star-filled-icon")}"></use>
                  </svg>
                </button>`}
        </div>
        <button data-action="${d.START}" class="start-button">
          Start
          <svg class="arrow-icon" width="13" height="13">
            <use href="${p("arrow-icon")}"></use>
          </svg>
        </button>
      </div>
      <div class="exercise-card-body">
        <div class="exercise-name-container">
          <svg class="exercise-icon" width="24" height="24">
            <use href="${p("running-man-icon")}"></use>
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
  `}function R(e,t){const o=e.querySelector(`.${v}[data-id="${t}"]`);o&&o.remove()}const y="favoriteExercises";function _(e){const o=I().filter(r=>r._id!==e);w(o)}function w(e){localStorage.setItem(y,JSON.stringify(e))}function I(){try{const e=localStorage.getItem(y);if(e){const t=JSON.parse(e);if(Array.isArray(t))return t.filter(C)}}catch{}return[]}function C(e){return e&&typeof e=="object"&&typeof e._id=="string"&&typeof e.name=="string"}function M(e,t){_(t),R(e,t)}function N(e){console.log(`Rating exercise: ${e}`)}function P(e){console.log(`Starting exercise: ${e}`)}const f=document.querySelector(".exercises-list-wrapper");function H(e,t,{favorites:o,onFavoriteDelete:r}={}){f.innerHTML="",o&&f.classList.add("favorites");let s="";e.length?e.forEach(n=>{s+=O(n,o)}):s=`<p class="no-exercises-message">${t}</p>`,f.insertAdjacentHTML("beforeend",s),f.onclick=n=>{let a=n.target;if(a.nodeName!=="BUTTON"&&(a=a.closest(`.${v} button`)),!a||a.nodeName!=="BUTTON")return;const c=a.closest(`.${v}`).dataset.id,l=a.dataset.action;switch(l){case d.REMOVE_FAVORITE:M(f,c),r==null||r(c);break;case d.START:P(c);break;case d.RATE:N(c);break;default:console.warn("Unknown action:",l)}}}const E=3;function $(){return'<span class="pagination-ellipsis">...</span>'}function q(e,t){return`<button class="page-button ${e===t?"active":""}" data-page="${e}">${e}</button>`}function g(e,t,o,r){return`<button class="page-button arrow ${r?"disabled":""}" data-page="${o}">
    <svg class="pagination-arrow-icon ${t?"double":""}">
      <use href="${p(`pagination-arrow${t?"-double":""}-${e}-icon`)}"></use>
    </svg>
  </button>`}function D(e,t,o,r=".exercises-list"){let s=document.querySelector(".pagination");s?s.innerHTML="":(s=document.createElement("div"),s.className="pagination",document.querySelector(r).appendChild(s));let n="";const a=Math.max(1,e-Math.floor(E/2)),m=Math.min(t,a+E-1),c=Math.max(1,m-E+1),l=t>E;if(l){const i=e===1;n+=`
      <div class="arrow-buttons">
        ${g("left",!0,1,i)}
        ${g("left",!1,e-1,i)}
      </div>
    `}let u="";for(let i=c;i<=m;i+=1)u+=q(i,e);const T=c>1,L=m<t;if(T&&(u=`${$()}${u}`),L&&(u+=$()),n+=`<div class="page-buttons">${u}</div>`,l){const i=e===t;n+=`
      <div class="arrow-buttons">
        ${g("right",!1,e+1,i)}
        ${g("right",!0,t,i)}
      </div>
    `}s.insertAdjacentHTML("beforeend",n),s.onclick=i=>{const b=i.target.nodeName==="BUTTON"?i.target:i.target.closest(".pagination button");if(b){const S=parseInt(b.dataset.page,10);S!==e&&o(S)}}}export{B as E,j as S,D as a,I as g,k as l,H as r};
//# sourceMappingURL=pagination-Dxs8xDKu.js.map
