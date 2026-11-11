// Experience layer. Loads after the original inline script and wraps (never replaces) its logic.
(()=>{
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const veil=document.createElement('div');veil.className='veil';document.body.appendChild(veil);
const baseShow=window.showChapter;let busy=false;
window.showChapter=function(i){
  const t=Math.max(0,Math.min(chapters.length-1,i));
  if(busy||t===current)return;
  if(reduce){baseShow(t);return}
  busy=true;veil.classList.add('on');
  setTimeout(()=>{baseShow(t);veil.classList.remove('on');setTimeout(()=>{busy=false},420)},430);
};
// Gentle reveals for reading-heavy passages (letter, two rooms, closing credits, workshop note).
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.2});
document.querySelectorAll('.note-copy p,.room>div>*,.final-inner>*,.idea-close').forEach(el=>{el.classList.add('rv');io.observe(el)});
// Opening: the light follows the pointer.
const home=document.getElementById('home');
home.addEventListener('pointermove',e=>{home.style.setProperty('--mx',(e.clientX/innerWidth*100)+'%');home.style.setProperty('--my',(e.clientY/innerHeight*100)+'%')});
// Workshop: each idea changes what is sketched on the desk.
const board=document.querySelector('.workshop-board');
document.querySelectorAll('.idea-object').forEach((b,i)=>b.addEventListener('click',()=>{board.dataset.idea=i}));
})();
