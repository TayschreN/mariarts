// CURSOR
const cursor=document.getElementById('cursor');
const cursorRing=document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cursor.style.left=mx+'px';cursor.style.top=my+'px'});
(function loop(){rx+=(mx-rx)*0.12;ry+=(my-ry)*0.12;cursorRing.style.left=rx+'px';cursorRing.style.top=ry+'px';requestAnimationFrame(loop)})();
document.querySelectorAll('a,button,.card,.filter-btn,.form-submit,.back-top').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cursor.style.transform='translate(-50%,-50%) scale(2)';cursorRing.style.width='50px';cursorRing.style.height='50px'});
  el.addEventListener('mouseleave',()=>{cursor.style.transform='translate(-50%,-50%) scale(1)';cursorRing.style.width='32px';cursorRing.style.height='32px'});
});

// NAV
function toggleMenu(){
  document.getElementById('nav-menu').classList.toggle('open');
  document.getElementById('hamburger').classList.toggle('open');
}
function closeMenu(){
  document.getElementById('nav-menu').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}
window.addEventListener('scroll',()=>{
  document.getElementById('nav').classList.toggle('scrolled',window.scrollY>60);
  document.getElementById('back-top').classList.toggle('visible',window.scrollY>400);
});

// FILTER
function filterCards(cat,btn){
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.card').forEach(c=>{
    c.classList.toggle('hidden',cat!=='all'&&c.dataset.cat!==cat);
  });
}

// LIGHTBOX
function openLightbox(src,caption){
  document.getElementById('lightbox-img').src=src;
  document.getElementById('lightbox-caption').textContent=caption;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeLightbox(){
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow='';
}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox()});

// COUNTER ANIMATION
function animateCounters(){
  document.querySelectorAll('[data-target]').forEach(el=>{
    const target=+el.dataset.target;
    let current=0;
    const step=Math.ceil(target/40);
    const timer=setInterval(()=>{
      current=Math.min(current+step,target);
      el.textContent=current+(el.dataset.target==='100'?'%':'+');
      if(current>=target)clearInterval(timer);
    },35);
  });
}
const statsObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){animateCounters();statsObs.disconnect()}});
},{threshold:0.5});
const statsBar=document.querySelector('.stats-bar');
if(statsBar)statsObs.observe(statsBar);

// FORM
function submitForm(){
  const name=document.getElementById('f-name').value.trim();
  const email=document.getElementById('f-email').value.trim();
  const msg=document.getElementById('f-msg').value.trim();
  if(!name||!email||!msg){alert('Por favor preencha nome, e-mail e mensagem.');return;}
  document.getElementById('form-fields').style.display='none';
  document.getElementById('form-success').style.display='block';
}

// SCROLL REVEAL (simples)
const revealObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){e.target.style.opacity='1';e.target.style.transform='translateY(0)'}
  });
},{threshold:0.1});
document.querySelectorAll('.card,.service-card,.testimonial-card').forEach(el=>{
  el.style.opacity='0';el.style.transform='translateY(24px)';el.style.transition='opacity 0.5s ease,transform 0.5s ease,box-shadow 0.25s';
  revealObs.observe(el);
});

// SCROLL PROGRESS (barra fininha no topo mostrando o quanto já rolou da página)
function updateScrollProgress(){
  const scrollTop=window.scrollY;
  const docHeight=document.documentElement.scrollHeight-window.innerHeight;
  const progress=docHeight>0?(scrollTop/docHeight)*100:0;
  document.getElementById('scroll-progress').style.width=progress+'%';
}
window.addEventListener('scroll',updateScrollProgress);
window.addEventListener('resize',updateScrollProgress);
updateScrollProgress();

// NAV ATIVO (destaca no menu a seção que está visível na tela)
const navLinks=document.querySelectorAll('nav a[href^="#"]');
const navSections=[...navLinks].map(link=>document.querySelector(link.getAttribute('href'))).filter(Boolean);
const navObs=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const id='#'+entry.target.id;
      navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===id));
    }
  });
},{rootMargin:'-45% 0px -45% 0px'});
navSections.forEach(section=>navObs.observe(section));

