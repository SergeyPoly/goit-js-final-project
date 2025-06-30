import{i as U,a as q,E as j}from"./vendor-C1ZlVBJv.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();function k(e,t){U.show({icon:t?"fa-solid fa-circle-exclamation":"fa-solid fa-check",iconColor:"white",message:e,messageColor:"white",position:"topRight",timeout:5e3,color:t?"#EF4040":"#00BFFF",maxWidth:"500px"})}function I(e){k(e,!1)}function z(e){k(e,!0)}const L="exercise-card",G=10,m=Object.freeze({START:"start",RATE:"rate",REMOVE_FAVORITE:"removeFavorite",ADD_FAVORITE:"addFavorite"}),ge=Object.freeze({LIMITS:{DESKTOP_LARGE:12,TABLET:9,EXERCISES_LIST:10},BREAKPOINTS:{DESKTOP_LARGE:1440,TABLET:768},DEFAULT_FILTER:"Muscles"}),F=Object.freeze({FAVORITE_REMOVED:"favorite-removed",FAVORITE_ADDED:"favorite-added"});q.defaults.baseURL="https://your-energy.b.goit.study/api";function X(e){var t,n;z(((n=(t=e.response)==null?void 0:t.data)==null?void 0:n.message)||`An error occurred: ${e.message}, please try again later!`)}async function p(e,...t){try{const{data:n}=await q[e](...t);return n}catch(n){return X(n),null}}function K(){return p("get","/quote")}function he(e,t=1,n=12){return p("get","/filters",{params:{filter:e,page:t,limit:n}})}function Ee(e,t,n=1,o=G){const{bodypart:s,muscles:i,equipment:r}=e;return p("get","/exercises",{params:{bodypart:s,muscles:i,equipment:r,keyword:t,page:n,limit:o}})}function J(e){return p("get",`/exercises/${e}`)}async function be(e){const t=await p("post","/subscription",{email:e});return t&&I((t==null?void 0:t.message)||"Thank you for your subscription!"),t}async function Y(e,t,n,o){const s=await p("patch",`/exercises/${e}/rating`,{rate:t,email:n,review:o});return s&&I("Thank you for your feedback!"),s}const Z=document.querySelector(".quote-container");function Q(){const e=new Date;return{day:e.getDate(),month:e.getMonth(),year:e.getFullYear()}}function ee(e,t){return!!e&&!!t&&e.day===t.day&&e.month===t.month&&e.year===t.year}function A({author:e,quote:t}){Z.insertAdjacentHTML("beforeend",`
    <p class="quote-text">${t}</p>
    <p class="quote-author">${e}</p>
  `)}async function ye(){const e=Q(),t=JSON.parse(localStorage.getItem("today-quote"));if(ee(t==null?void 0:t.date,e)&&t)A(t);else{const{author:n,quote:o}=await K();localStorage.setItem("today-quote",JSON.stringify({author:n,quote:o,date:e})),A({author:n,quote:o})}}async function w(e,t){if(e==="open"){const n=te();document.body.classList.add("modal-open"),t.classList.remove("hidden"),t.classList.add("is-open"),document.documentElement.style.setProperty("--scrollbar-width",`${n}px`)}e==="close"&&(t.classList.remove("is-open"),setTimeout(()=>{t.classList.add("hidden"),document.body.classList.remove("modal-open"),document.documentElement.style.removeProperty("--scrollbar-width")},250))}const te=()=>window.innerWidth-document.documentElement.clientWidth;function E(e=null,t=null){if(window.innerWidth<768)return;const n=document.querySelector(".nav-list"),o=n?n.querySelector(".nav-underline"):null,s=t||(n?n.querySelector(".nav-link.active"):null);if(!(!o||!s))if(e&&e!==s){const{offsetLeft:i,offsetWidth:r}=e;o.style.transition="none",o.style.left=i+"px",o.style.width=r+"px",requestAnimationFrame(()=>{o.style.transition="left 0.6s cubic-bezier(.77,0,.18,1), width 0.4s cubic-bezier(.77,0,.18,1)";const{offsetLeft:a,offsetWidth:c}=s;o.style.left=a+"px",o.style.width=c+"px"})}else{const{offsetLeft:i,offsetWidth:r}=s;o.style.transition="left 0.6s cubic-bezier(.77,0,.18,1), width 0.4s cubic-bezier(.77,0,.18,1)",o.style.left=i+"px",o.style.width=r+"px"}}function ne(){const e=document.querySelectorAll(".nav-link");let t=window.location.pathname;(t.endsWith("/")||t.endsWith("/index.html"))&&(t="/index.html");let n=null;e.forEach(o=>{let s=new URL(o.href).pathname;(s.endsWith("/")||s.endsWith("/index.html"))&&(s="/index.html"),s===t?(n=o,o.classList.add("active")):o.classList.remove("active")}),window.innerWidth>=768&&n&&E(n,n)}function xe(){const e=document.querySelector(".mobile-menu-overlay"),t=document.querySelector(".burger-btn"),n=document.querySelector(".mobile-menu__close-button");e&&t&&n&&(t.addEventListener("click",()=>w("open",e)),n.addEventListener("click",()=>w("close",e)),e.addEventListener("click",({target:l})=>{(l.classList.contains("mobile-menu__nav-link")||l===e)&&w("close",e)}));const o=document.querySelector(".nav-list");if(window.innerWidth>=768&&o&&!o.querySelector(".nav-underline")){const l=document.createElement("span");l.className="nav-underline",o.prepend(l)}const s=document.querySelectorAll(".nav-link");let i=window.location.pathname;(i.endsWith("/")||i.endsWith("/index.html"))&&(i="/index.html");const r=sessionStorage.getItem("prevPath");let a=null,c=null;s.forEach(l=>{let d=new URL(l.href).pathname;(d.endsWith("/")||d.endsWith("/index.html"))&&(d="/index.html"),d===r&&(a=l),d===i?(c=l,l.classList.add("active")):l.classList.remove("active")}),sessionStorage.setItem("prevPath",i),window.innerWidth>=768&&E(r&&a||c,c),window.addEventListener("resize",()=>{window.innerWidth>=768&&ne()}),s.forEach(l=>{l.addEventListener("click",()=>{setTimeout(()=>{const d=document.querySelector(".nav-link.active");E(d,l)},0)})})}const W="favoriteExercises";function se(e){const t=S();t.some(n=>n._id===e._id)||(t.push(e),B(t))}function oe(e){const n=S().filter(o=>o._id!==e);B(n)}function B(e){localStorage.setItem(W,JSON.stringify(e))}function S(){try{const e=localStorage.getItem(W);if(e){const t=JSON.parse(e);if(Array.isArray(t))return t.filter(ie)}}catch{}return[]}function ie(e){return e&&typeof e=="object"&&typeof e._id=="string"&&typeof e.name=="string"}const ae="/goit-js-final-project/assets/icons-DRCXB5f3.svg";function f(e){return`${ae}#${e}`}const re=()=>window.innerWidth-document.documentElement.clientWidth;function ce(e){const t=Math.floor(e);let n="";for(let o=0;o<5;o++){let s=o<t?"star-filled-icon":"star-icon";n+=`
      <svg class="exercise-modal__star-icon" data-rating="${o+1}">
        <use href="${f(s)}"></use>
      </svg>
    `}return n}function R(){return`
    <button
      type="button"
      class="exercise-modal__fav-btn rating-modal__btn"
      data-action="send"
    >
      Send
    </button>
  `}function D(e){return`
    <div class="exercise-modal__rating">
      <span class="exercise-modal__rating-value rating-modal__rating-value">${e}</span>
      <div class="exercise-modal__stars rating-modal__stars">
        ${ce(e)}
      </div>
      <input name="rating" hidden="hidden" value="${e}">
    </div>
  `}function C(e){e.querySelector(".exercise-modal__stars").addEventListener("click",t=>{const n=t.target.closest("[data-rating]");if(!n)return;const o=n.dataset.rating|0;e.querySelector(".exercise-modal__rating").outerHTML=D(o),C(e)})}function P(e){var r;const t=`
    <div id="ratingModalBackdrop" class="exercise-modal__backdrop">
      <div class="exercise-modal rating-modal">
        <button class="exercise-modal__close-btn" type="button">
          <svg class="exercise-modal__close-icon">
            <use href="${f("close-icon")}"></use>
          </svg>
        </button>
        <form id="rating-form" class="exercise-modal__info-wrapper rating-modal__wrapper">
          <div class="rating-modal__item-group rating-modal__rating-group">
            <p class="rating-modal__title">Rating</p>
            <div class="exercise-modal__title-block">
              ${D(0)}
            </div>
          </div>
          <div class="rating-modal__item-group">
            <input id="email" class="footer-input" name="email" pattern="^\\w+(\\.\\w+)?@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$" placeholder="Email" required />
            <textarea id="review" class="footer-input rating-modal__review-textarea" name="review" placeholder="Your comment" required></textarea>
          </div>
          <div class="exercise-modal__buttons rating-modal__item-group">
            ${R()}
          </div>
        </form>
      </div>
    </div>
  `;(r=document.querySelector("#ratingModalBackdrop"))==null||r.remove(),document.body.insertAdjacentHTML("beforeend",t);const n=document.getElementById("ratingModalBackdrop"),o=re();document.body.classList.add("modal-open"),document.documentElement.style.setProperty("--scrollbar-width",`${o}px`),setTimeout(()=>{n.classList.add("is-open")},50);const s=()=>{n.classList.remove("is-open"),n.remove(),document.removeEventListener("keydown",i),H(e)};n.querySelector(".exercise-modal__close-btn").addEventListener("click",s),n.addEventListener("click",a=>{a.target===n&&s()});function i(a){a.key==="Escape"&&s()}document.addEventListener("keydown",i),n.querySelector(".exercise-modal__buttons").addEventListener("click",async a=>{const c=a.target.closest("[data-action]");if(!c)return;if(c.dataset.action==="send"){const d=n.querySelector("#rating-form"),b=d.elements.rating.value|0,y=d.elements.email.value,u=d.elements.review.value;await Y(e,b,y,u)&&s()}c.outerHTML=R()}),C(n)}const le=()=>window.innerWidth-document.documentElement.clientWidth;function v(e){return e.charAt(0).toUpperCase()+e.slice(1)}function de(e){const t=Math.floor(e);let n="";for(let o=0;o<5;o++){let s=o<t?"star-filled-icon":"star-icon";n+=`
      <svg class="exercise-modal__star-icon">
        <use href="${f(s)}"></use>
      </svg>
    `}return n}function M(e){const t=S().some(n=>n._id===e._id);return`
    <button
      type="button"
      class="exercise-modal__fav-btn"
      data-action="${t?m.REMOVE_FAVORITE:m.ADD_FAVORITE}"
    >
      ${t?"Remove from favorites":"Add to favorites"}
      <svg class="exercise-modal__fav-icon" width="18" height="18">
        <use href="${t?`${f("trash-icon")}`:`${f("heart-icon")}`}"></use>
      </svg>
    </button>
  `}function ue(e){var r;const t=`
    <div id="exerciseModalBackdrop" class="exercise-modal__backdrop">
      <div class="exercise-modal">
        <button class="exercise-modal__close-btn" type="button">
          <svg class="exercise-modal__close-icon">
            <use href="${f("close-icon")}"></use>
          </svg>
        </button>

        <div class="exercise-modal__content">
      <div class="exercise-modal__image-wrapper">
          <img src="${e.gifUrl}" alt="${e.name}"class="exercise-modal__image" />
        </div>
        <div class="exercise-modal__info-wrapper">
          <div class="exercise-modal__title-block">
            <h2 class="exercise-modal__name">${v(e.name)}</h2>
            <div class="exercise-modal__rating">
              <span class="exercise-modal__rating-value">${e.rating}</span>
              <div class="exercise-modal__stars">
                ${de(e.rating)}
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
        </div>
        </div>

        <div class="exercise-modal__buttons">
            ${M(e)}
            <button type="button" class="exercise-modal__rating-btn" data-action="${m.RATE}">Give a rating</button>
        </div>
        </div>
      </div>
    </div>
  `;(r=document.querySelector("#exerciseModalBackdrop"))==null||r.remove(),document.body.insertAdjacentHTML("beforeend",t);const n=document.getElementById("exerciseModalBackdrop"),o=le();document.body.classList.add("modal-open"),document.documentElement.style.setProperty("--scrollbar-width",`${o}px`),setTimeout(()=>{n.classList.add("is-open")},50);const s=(a=!0)=>{n.classList.remove("is-open"),document.removeEventListener("keydown",i),a&&setTimeout(()=>{document.body.classList.remove("modal-open"),document.documentElement.style.removeProperty("--scrollbar-width")},300),n.remove()};n.querySelector(".exercise-modal__close-btn").addEventListener("click",s),n.addEventListener("click",a=>{a.target===n&&s()});function i(a){a.key==="Escape"&&s()}document.addEventListener("keydown",i),n.querySelector(".exercise-modal__buttons").addEventListener("click",a=>{const c=a.target.closest("[data-action]");if(!c)return;const l=c.dataset.action;switch(l){case m.ADD_FAVORITE:me(e);break;case m.REMOVE_FAVORITE:V(e._id);break;case m.RATE:s(!1),P(e._id);break;default:console.warn("Unknown action:",l)}c.outerHTML=M(e)})}const $=new j;function N(e,t){$.emit(e,t)}function we(e,t){return $.addListener(e,t),()=>{$.removeListener(e,t)}}function V(e){oe(e),N(F.FAVORITE_REMOVED,e)}function me(e){se(e),N(F.FAVORITE_ADDED,e)}function fe(e){P(e)}async function H(e){const t=await J(e);ue(t)}function pe(e,t){return`
    <div class="${L}" data-id="${e._id}">
      <div class="exercise-card-header">
      <p class="exercise-equipment">${e.equipment}</p>
        <div class="exercise-card-header-middle">
          ${t?`<button data-action="${m.REMOVE_FAVORITE}" class="card-icon-button remove-favorite-button">
                  <svg class="remove-favorite-icon">
                    <use href="${f("trash-icon")}"></use>
                  </svg>
                </button>`:`<button data-action="${m.RATE}" class="card-icon-button rating-button">
                  ${e.rating.toFixed(1)}
                  <svg class="rating-icon">
                    <use href="${f("star-filled-icon")}"></use>
                  </svg>
                </button>`}
        </div>
        <button data-action="${m.START}" class="start-button">
          Start
          <svg class="arrow-icon" width="13" height="13">
            <use href="${f("arrow-icon")}"></use>
          </svg>
        </button>
      </div>
      <div class="exercise-card-body">
        <div class="exercise-name-container">
          <svg class="exercise-icon" width="24" height="24">
            <use href="${f("running-man-icon")}"></use>
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
  `}const _=document.querySelector(".exercises-list-wrapper");function Le(e,t,n){_.innerHTML="",n&&_.classList.add("favorites");let o="";e.length?e.forEach(s=>{o+=pe(s,n)}):o=`<p class="no-exercises-message">${t}</p>`,_.insertAdjacentHTML("beforeend",o),_.onclick=s=>{let i=s.target;if(i.nodeName!=="BUTTON"&&(i=i.closest(`.${L} button`)),!i||i.nodeName!=="BUTTON")return;const a=i.closest(`.${L}`).dataset.id,c=i.dataset.action;switch(c){case m.REMOVE_FAVORITE:V(a);break;case m.START:H(a);break;case m.RATE:fe(a);break;default:console.warn("Unknown action:",c)}}}const g=3;function O(){return'<span class="pagination-ellipsis">...</span>'}function ve(e,t){return`<button class="page-button ${e===t?"active":""}" data-page="${e}">${e}</button>`}function h(e,t,n,o){return`<button class="page-button arrow ${o?"disabled":""}" data-page="${n}">
    <svg class="pagination-arrow-icon ${t?"double":""}">
      <use href="${f(`pagination-arrow${t?"-double":""}-${e}-icon`)}"></use>
    </svg>
  </button>`}function $e(e,t,n,o=".exercises-list"){let s=document.querySelector(".pagination");s?s.innerHTML="":(s=document.createElement("div"),s.className="pagination",document.querySelector(o).appendChild(s));let i="";const r=Math.max(1,e-Math.floor(g/2)),a=Math.min(t,r+g-1),c=Math.max(1,a-g+1),l=t>g;if(l){const u=e===1;i+=`
      <div class="arrow-buttons">
        ${h("left",!0,1,u)}
        ${h("left",!1,e-1,u)}
      </div>
    `}let d="";for(let u=c;u<=a;u+=1)d+=ve(u,e);const b=c>1,y=a<t;if(b&&(d=`${O()}${d}`),y&&(d+=O()),i+=`<div class="page-buttons">${d}</div>`,l){const u=e===t;i+=`
      <div class="arrow-buttons">
        ${h("right",!1,e+1,u)}
        ${h("right",!0,t,u)}
      </div>
    `}s.insertAdjacentHTML("beforeend",i),s.onclick=u=>{const x=u.target.nodeName==="BUTTON"?u.target:u.target.closest(".pagination button");if(x){const T=parseInt(x.dataset.page,10);T!==e&&n(T)}}}function Se(){const e=document.querySelector(".pagination");e&&e.remove()}export{F as E,ge as S,$e as a,he as b,Se as c,ye as d,S as e,we as f,Ee as g,G as h,xe as l,be as p,Le as r};
//# sourceMappingURL=pagination-toLlALgX.js.map
