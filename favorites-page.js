import{g as x,l as y,E as f,r as S}from"./assets/header-COwEqoJH.js";const d=3;function E(){return'<span class="pagination-ellipsis">...</span>'}function L(t,e){return`<button class="page-button ${t===e?"active":""}" data-page="${t}">${t}</button>`}function c(t,e,o,a){return`<button class="page-button arrow ${a?"disabled":""}" data-page="${o}">
    <svg class="pagination-arrow-icon ${e?"double":""}">
      <use href="./img/icons.svg#pagination-arrow${e?"-double":""}-${t}-icon"></use>
    </svg>
  </button>`}function T(t,e,o){let a=document.querySelector(".pagination");a?a.innerHTML="":(a=document.createElement("div"),a.className="pagination",document.querySelector(".exercises-list").appendChild(a));let r="";const $=Math.max(1,t-Math.floor(d/2)),u=Math.min(e,$+d-1),p=Math.max(1,u-d+1),v=e>d;if(v){const n=t===1;r+=`
      <div class="arrow-buttons">
        ${c("left",!0,1,n)}
        ${c("left",!1,t-1,n)}
      </div>
    `}let i="";for(let n=p;n<=u;n+=1)i+=L(n,t);const m=p>1,M=u<e;if(m&&(i=`${E()}${i}`),M&&(i+=E()),r+=`<div class="page-buttons">${i}</div>`,v){const n=t===e;r+=`
      <div class="arrow-buttons">
        ${c("right",!1,t+1,n)}
        ${c("right",!0,e,n)}
      </div>
    `}a.insertAdjacentHTML("beforeend",r),a.onclick=n=>{const h=n.target.nodeName==="BUTTON"?n.target:n.target.closest(".pagination button");if(h){const b=parseInt(h.dataset.page,10);b!==t&&o(b)}}}let s=1,l=x();function A(t){s=t,g()}function w(t){l=l.filter(e=>e._id!==t),g()}function g(){const t=Math.ceil(l.length/f);s>t&&(s=t||1);const e=(s-1)*f,o=s*f,a=l.slice(e,o);S(a,"It appears that you haven't added any exercises to your favorites yet. To get started, you can add exercises that you like to your favorites for easier access in the future.",{favorites:!0,onFavoriteDelete:w}),t>1&&T(s,t,A)}document.addEventListener("DOMContentLoaded",()=>{g(),y()});
//# sourceMappingURL=favorites-page.js.map
