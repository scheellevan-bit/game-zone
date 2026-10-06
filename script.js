const grid=document.getElementById('games');
const search=document.getElementById('search');
const player=document.getElementById('player');
const frame=document.getElementById('gameFrame');
const title=document.getElementById('gameTitle');

let allGames=[];

async function loadGames(){
  const res=await fetch('games.json');
  const data=await res.json();
  allGames=data.games;
  render(allGames);
}
function render(list){
  grid.innerHTML=list.map(g=>`
    <article class="card">
      <div class="thumb">${g.icon}</div>
      <div class="card-body">
        <h3>${g.title}</h3>
        <p>${g.description}</p>
        <button class="play" onclick="playGame('${g.id}')">Play</button>
      </div>
    </article>`).join('');
}
window.playGame=function(id){
  const g=allGames.find(x=>x.id===id);
  if(!g)return;
  title.textContent=g.title;
  frame.srcdoc=g.html;
  player.classList.remove('hidden');
}
document.getElementById('close').onclick=()=>{
  frame.srcdoc='';
  player.classList.add('hidden');
}
search.oninput=()=>render(allGames.filter(g=>g.title.toLowerCase().includes(search.value.toLowerCase())));
loadGames();
