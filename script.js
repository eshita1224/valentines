document.addEventListener('DOMContentLoaded',()=>{
  const yes = document.getElementById('yesBtn');
  const no = document.getElementById('noBtn');
  const overlay = document.getElementById('overlay');
  const closeOverlay = document.getElementById('closeOverlay');
  let moves = 0;

  function ensureFixed(el){
    const rect = el.getBoundingClientRect();
    el.style.position = 'fixed';
    el.style.left = rect.left + 'px';
    el.style.top = rect.top + 'px';
    el.style.margin = '0';
  }

  function randomPosFor(el){
    const margin = 16;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    const maxX = Math.max(window.innerWidth - w - margin, margin);
    const maxY = Math.max(window.innerHeight - h - margin, margin);
    const x = Math.floor(Math.random() * (maxX - margin)) + margin;
    const y = Math.floor(Math.random() * (maxY - margin)) + margin;
    return {x,y};
  }

  function moveNo(){
    if(getComputedStyle(no).position !== 'fixed') ensureFixed(no);
    const {x,y} = randomPosFor(no);
    no.classList.add('no-moving');
    no.style.left = x + 'px';
    no.style.top = y + 'px';
    moves++;
    // sometimes swap places with Yes to confuse more
    if(moves % 4 === 0){
      swapWithYes();
    }
  }

  function swapWithYes(){
    const yesRect = yes.getBoundingClientRect();
    const noRect = no.getBoundingClientRect();
    // ensure both fixed
    if(getComputedStyle(yes).position !== 'fixed') ensureFixed(yes);
    if(getComputedStyle(no).position !== 'fixed') ensureFixed(no);
    yes.style.left = noRect.left + 'px';
    yes.style.top = noRect.top + 'px';
    no.style.left = yesRect.left + 'px';
    no.style.top = yesRect.top + 'px';
  }

  no.addEventListener('mouseenter', (e)=>{
    moveNo();
  });
  no.addEventListener('click',(e)=>{
    e.preventDefault();
    moveNo();
  });

  yes.addEventListener('click',()=>{
    showOverlay();
    for(let i=0;i<18;i++) setTimeout(()=>spawnHeart(), i*120);
  });

  closeOverlay.addEventListener('click',()=>{ overlay.classList.add('hidden'); });

  function showOverlay(){
    overlay.classList.remove('hidden');
  }

  function spawnHeart(){
    const h = document.createElement('div');
    h.className = 'floating-heart';
    const size = Math.floor(Math.random()*14)+12;
    h.style.width = size + 'px';
    h.style.height = size + 'px';
    const left = Math.floor(Math.random() * (window.innerWidth - size));
    h.style.left = left + 'px';
    h.style.bottom = '-40px';
    const dur = Math.floor(Math.random()*2200)+2600;
    h.style.animation = `floatUp ${dur}ms linear forwards`;
    document.body.appendChild(h);
    setTimeout(()=>h.remove(), dur+200);
  }

});