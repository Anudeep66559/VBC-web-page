/* ---------- Preloader ---------- */
window.addEventListener('load',()=>{
  setTimeout(()=>document.getElementById('preloader').classList.add('hide'),600);
});

/* ---------- Nav scroll state + progress ---------- */
const nav=document.getElementById('nav');
const progress=document.getElementById('progress');
const sections=document.querySelectorAll('.page');
const navItems=document.querySelectorAll('.nav-links a');
const dots=document.querySelectorAll('.dots a');

function onScroll(){
  const sc=window.scrollY;
  nav.classList.toggle('scrolled',sc>60);
  const docH=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width=(sc/docH*100)+'%';
  // active section
  let current='home';
  sections.forEach(sec=>{
    if(sc>=sec.offsetTop-180) current=sec.id;
  });
  navItems.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+current));
  dots.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+current));
}
window.addEventListener('scroll',onScroll,{passive:true});

/* ---------- Burger ---------- */
const burger=document.getElementById('burger');
const navLinks=document.getElementById('navLinks');
burger.addEventListener('click',()=>{
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));

/* ---------- Reveal on scroll ---------- */
const io=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
},{threshold:.12,rootMargin:'0px 0px -60px 0px'});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* ---------- Animated counters ---------- */
const counters=document.querySelectorAll('.stat .num');
const counterIO=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const el=e.target;
      const target=+el.dataset.target;
      const dur=1600;
      const start=performance.now();
      function tick(now){
        const p=Math.min((now-start)/dur,1);
        const eased=1-Math.pow(1-p,3);
        const val=Math.floor(eased*target);
        el.textContent=target===2011?val:val+(target>=50?'+':'');
        if(p<1) requestAnimationFrame(tick);
        else el.textContent=target===2011?target:target+(target>=50?'+':'');
      }
      requestAnimationFrame(tick);
      counterIO.unobserve(el);
    }
  });
},{threshold:.5});
counters.forEach(c=>counterIO.observe(c));

/* ---------- Smooth anchor scroll offset ---------- */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const id=a.getAttribute('href');
    if(id.length>1){
      const el=document.querySelector(id);
      if(el){
        e.preventDefault();
        const y=el.getBoundingClientRect().top+window.scrollY-70;
        window.scrollTo({top:y,behavior:'smooth'});
      }
    }
  });
});

/* ---------- Form handlers ---------- */
document.getElementById('quoteForm').addEventListener('submit',function(e){
  e.preventDefault();
  const status=document.getElementById('formStatus');
  status.classList.add('show');
  this.reset();
  setTimeout(()=>status.classList.remove('show'),5000);
});
document.getElementById('newsForm').addEventListener('submit',function(e){
  e.preventDefault();
  const btn=this.querySelector('button');
  const orig=btn.textContent;
  btn.textContent='Subscribed!';
  this.reset();
  setTimeout(()=>btn.textContent=orig,2500);
});

/* ---------- Subtle parallax on hero cards ---------- */
const hero=document.getElementById('home');
const cards=hero.querySelectorAll('.hero-card');
hero.addEventListener('mousemove',e=>{
  const r=hero.getBoundingClientRect();
  const x=(e.clientX-r.left)/r.width-0.5;
  const y=(e.clientY-r.top)/r.height-0.5;
  cards.forEach((c,i)=>{
    const depth=(i+1)*8;
    c.style.transform=`translate(${x*depth}px,${y*depth}px)`;
  });
});
hero.addEventListener('mouseleave',()=>{
  cards.forEach(c=>c.style.transform='');
});

onScroll();