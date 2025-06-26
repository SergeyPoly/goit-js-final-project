import{g as x,a as y,l as S,E as f,r as L}from"./assets/header-6YTtpEwk.js";const d=3;function b(){return'<span class="pagination-ellipsis">...</span>'}function T(t,e){return`<button class="page-button ${t===e?"active":""}" data-page="${t}">${t}</button>`}function c(t,e,o,n){return`<button class="page-button arrow ${n?"disabled":""}" data-page="${o}">
    <svg class="pagination-arrow-icon ${e?"double":""}">
      <use href="${x(`pagination-arrow${e?"-double":""}-${t}-icon`)}"></use>
    </svg>
  </button>`}function A(t,e,o){let n=document.querySelector(".pagination");n?n.innerHTML="":(n=document.createElement("div"),n.className="pagination",document.querySelector(".exercises-list").appendChild(n));let r="";const E=Math.max(1,t-Math.floor(d/2)),u=Math.min(e,E+d-1),g=Math.max(1,u-d+1),h=e>d;if(h){const a=t===1;r+=`
      <div class="arrow-buttons">
        ${c("left",!0,1,a)}
        ${c("left",!1,t-1,a)}
      </div>
    `}let i="";for(let a=g;a<=u;a+=1)i+=T(a,t);const m=g>1,M=u<e;if(m&&(i=`${b()}${i}`),M&&(i+=b()),r+=`<div class="page-buttons">${i}</div>`,h){const a=t===e;r+=`
      <div class="arrow-buttons">
        ${c("right",!1,t+1,a)}
        ${c("right",!0,e,a)}
      </div>
    `}n.insertAdjacentHTML("beforeend",r),n.onclick=a=>{const v=a.target.nodeName==="BUTTON"?a.target:a.target.closest(".pagination button");if(v){const $=parseInt(v.dataset.page,10);$!==t&&o($)}}}let s=1,l=y();function w(t){s=t,p()}function C(t){l=l.filter(e=>e._id!==t),p()}function p(){const t=Math.ceil(l.length/f);s>t&&(s=t||1);const e=(s-1)*f,o=s*f,n=l.slice(e,o);L(n,"It appears that you haven't added any exercises to your favorites yet. To get started, you can add exercises that you like to your favorites for easier access in the future.",{favorites:!0,onFavoriteDelete:C}),t>1&&A(s,t,w)}document.addEventListener("DOMContentLoaded",()=>{p(),S()});
//# sourceMappingURL=favorites-page.js.map
