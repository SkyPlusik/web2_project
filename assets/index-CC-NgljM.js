(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))c(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function o(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function c(r){if(r.ep)return;r.ep=!0;const n=o(r);fetch(r.href,n)}})();const s=document.getElementById("pokemon-list"),a=document.getElementById("pokemon-detail");function l(){s.innerHTML="<li>Загрузка...</li>"}async function d(){l();try{const e=await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");if(!e.ok)throw new Error("Ошибка сети");const t=await e.json();p(t.results)}catch(e){s.innerHTML=`<li style="color:red">${e.message}</li>`}}function p(e){s.innerHTML="",e.forEach(t=>{const o=document.createElement("li");o.className="pokemon-item",o.innerHTML=`
      <span class="pokemon-name">${t.name}</span>
      <button class="details-btn">Подробнее</button>
    `,o.querySelector(".details-btn").addEventListener("click",()=>f(t.url)),s.appendChild(o)})}async function f(e){a.innerHTML="<p>Загрузка...</p>";try{const t=await fetch(e);if(!t.ok)throw new Error("Ошибка загрузки данных");const o=await t.json();u(o)}catch(t){a.innerHTML=`<p style="color:red">${t.message}</p>`}}function u(e){a.innerHTML=`
    <div class="pokemon-card">
      <h2>${e.name}</h2>
      <img src="${e.sprites.other["official-artwork"].front_default||e.sprites.front_default}" 
           alt="${e.name}" 
           class="pokemon-image"/>
      <div class="pokemon-stats">
        <p><strong>Рост:</strong> ${e.height/10} м</p>
        <p><strong>Вес:</strong> ${e.weight/10} кг</p>
        <p><strong>Типы:</strong> ${e.types.map(t=>t.type.name).join(", ")}</p>
        <p><strong>Способности:</strong> ${e.abilities.map(t=>t.ability.name).join(", ")}</p>
      </div>
    </div>
  `}d();
