const CONFIG={
 name:"СЕВЕР BARBERSHOP",city:"Ростов-на-Дону",
 address:"ул. Примерная, 00 (адрес-заглушка — заменить)",
 phone:"+70000000000",phoneView:"+7 (000) 000-00-00",
 telegram:"sever_barber_demo", // ЗАМЕНИТЬ на реальный Telegram-ник администратора
 hours:[["Пн–Пт","10:00–21:00"],["Сб","10:00–20:00"],["Вс","11:00–18:00"]],
 cats:{cut:"Стрижки",beard:"Борода",combo:"Комплексы",extra:"Дополнительно"},
 services:[
  {id:"cut1",cat:"cut",name:"Мужская стрижка",desc:"Классика под ножницы и машинку",price:1500,min:60},
  {id:"cut2",cat:"cut",name:"Стрижка Fade",desc:"Плавный переход, чёткие границы",price:1700,min:70},
  {id:"cut3",cat:"cut",name:"Стрижка машинкой",desc:"Одна насадка, быстро и аккуратно",price:900,min:30},
  {id:"cut4",cat:"cut",name:"Детская стрижка",desc:"До 12 лет",price:1200,min:40},
  {id:"b1",cat:"beard",name:"Оформление бороды",desc:"Форма, контур, уход маслом",price:900,min:40},
  {id:"b2",cat:"beard",name:"Королевское бритьё",desc:"Горячее полотенце и опасная бритва",price:1300,min:45},
  {id:"c1",cat:"combo",name:"Стрижка + борода",desc:"Полный образ за один визит",price:2200,min:100},
  {id:"x1",cat:"extra",name:"Камуфляж седины",desc:"Мягкое тонирование без резкого цвета",price:1200,min:30}
 ],
 masters:[
  {id:"ar",name:"Артём К.",sp:"Fade и короткие стрижки",txt:"Работает с переходами и чёткой геометрией. Перед стрижкой уточняет, как вы укладываетесь утром, и подбирает длину под это.",svc:["Стрижка Fade","Стрижка машинкой"],ini:"А"},
  {id:"dm",name:"Дмитрий Л.",sp:"Классика и ножницы",txt:"Любит аккуратные классические формы и работу ножницами по длине. Хорошо справляется с густыми и непослушными волосами.",svc:["Мужская стрижка","Детская стрижка"],ini:"Д"},
  {id:"ma",name:"Марк С.",sp:"Борода и комплексный образ",txt:"Занимается бородой и бритьём, подбирает форму под овал лица. Часто делает связку «стрижка + борода».",svc:["Оформление бороды","Королевское бритьё","Стрижка + борода"],ini:"М"}
 ]
};
const $=s=>document.querySelector(s),rub=n=>n.toLocaleString("ru-RU").replace(/\u00a0/g," ")+" ₽";
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const C=CONFIG,svcById=id=>C.services.find(s=>s.id===id);
let cat="cut";
/* static data */
document.title=C.name+" — мужские стрижки и борода в "+"Ростове-на-Дону";
$("#heroCity").textContent=C.city+" · барбершоп";
$("#heroFrom").textContent="от "+rub(Math.min(...C.services.map(s=>s.price)));
$("#heroHours").textContent="Открыто ежедневно";
["#navTel"].forEach(s=>{const a=$(s);a.href="tel:"+C.phone;a.textContent=C.phoneView});
["#callBtn","#callBtn2"].forEach(s=>{const a=$(s);a.href="tel:"+C.phone;a.textContent="Позвонить "+C.phoneView});
$("#addr").innerHTML=esc(C.city+", "+C.address)+'<span class="tag">демо</span>';
$("#route").href="https://yandex.ru/maps/?text="+encodeURIComponent(C.city+", "+C.address);
$("#tgDirect").href="https://t.me/"+C.telegram;
$("#fName").textContent=C.name;$("#yr").textContent=new Date().getFullYear();
$("#fContacts").innerHTML='<a href="tel:'+C.phone+'">'+esc(C.phoneView)+'</a><br><a href="https://t.me/'+C.telegram+'" target="_blank" rel="noopener">Telegram</a>';
const day=(new Date().getDay()+6)%7;
$("#hours").innerHTML=C.hours.map((h,i)=>{const t=day<5?0:day==5?1:2;return '<dt>'+h[0]+'</dt><dd'+(i==t?' class="today"':'')+'>'+h[1]+'</dd>'}).join("");
/* tabs + price list */
function renderTabs(){
 $("#tabs").innerHTML=Object.entries(C.cats).map(([k,v])=>'<button class="tab" role="tab" aria-selected="'+(k==cat)+'" data-cat="'+k+'">'+v+'</button>').join("");
 $("#list").innerHTML=C.services.filter(s=>s.cat==cat).map(s=>'<div class="row"><div><h3>'+esc(s.name)+'</h3><p>'+esc(s.desc)+'</p></div><div class="price">'+rub(s.price)+'<span class="dur">~'+s.min+' мин</span></div><button class="btn sm" data-svc="'+s.id+'">Записаться</button></div>').join("");
}
$("#tabs").addEventListener("click",e=>{const b=e.target.closest("[data-cat]");if(b){cat=b.dataset.cat;renderTabs()}});
$("#list").addEventListener("click",e=>{const b=e.target.closest("[data-svc]");if(b){$("#fs").value=b.dataset.svc;goBook()}});
/* masters */
const art=m=>'<img src="images/master-'+m.id+'.svg" width="400" height="300" loading="lazy" alt="Заглушка портрета: '+esc(m.name)+'">';
$("#mgrid").innerHTML=C.masters.map(m=>'<article class="m"><div class="ph">'+art(m)+'</div><div class="b"><h3>'+esc(m.name)+'</h3><div class="sp">'+esc(m.sp)+'</div><p>'+esc(m.txt)+'</p><p><b style="color:var(--text)">Услуги:</b> '+esc(m.svc.join(", "))+'</p><button class="btn" data-m="'+m.id+'">Записаться к мастеру</button></div></article>').join("");
$("#mgrid").addEventListener("click",e=>{const b=e.target.closest("[data-m]");if(b){$("#fm").value=b.dataset.m;goBook()}});
/* form selects */
$("#fs").innerHTML='<option value="">Выберите услугу</option>'+Object.entries(C.cats).map(([k,v])=>'<optgroup label="'+v+'">'+C.services.filter(s=>s.cat==k).map(s=>'<option value="'+s.id+'">'+esc(s.name)+' — '+rub(s.price)+'</option>').join("")+'</optgroup>').join("");
$("#fm").innerHTML='<option value="">Любой мастер</option>'+C.masters.map(m=>'<option value="'+m.id+'">'+esc(m.name)+' — '+esc(m.sp)+'</option>').join("");
function goBook(){$("#out").classList.remove("show");$("#booking").scrollIntoView();setTimeout(()=>{const f=$("#fn");if(!f.value)f.focus({preventScroll:true})},400)}
document.addEventListener("click",e=>{const a=e.target.closest("[data-book]");if(a){e.preventDefault();goBook()}});
/* validation + message */
function setErr(id,t){$("#e-"+id).textContent=t;$("#"+id).setAttribute("aria-invalid",t?"true":"false")}
$("#form").addEventListener("submit",e=>{
 e.preventDefault();
 const s=svcById($("#fs").value),n=$("#fn").value.trim(),c=$("#fc").value.trim();
 setErr("fs",s?"":"Выберите услугу");
 setErr("fn",n.length>=2?"":"Введите имя (не короче 2 символов)");
 const ok=/^@?[A-Za-z0-9_]{5,32}$/.test(c)||c.replace(/\D/g,"").length>=10;
 setErr("fc",ok?"":"Укажите телефон (10+ цифр) или Telegram-ник");
 if(!s||n.length<2||!ok){const f=document.querySelector("[aria-invalid=true]");f&&f.focus();return}
 const m=C.masters.find(x=>x.id==$("#fm").value),t=$("#ft").value.trim(),k=$("#fk").value.trim();
 const txt=["Здравствуйте! Хочу записаться в "+C.name+".","Услуга: "+s.name+" — "+rub(s.price),"Мастер: "+(m?m.name:"любой"),"Имя: "+n,"Контакт: "+c].concat(t?["Удобное время: "+t]:[],k?["Комментарий: "+k]:[]).join("\n");
 $("#msg").textContent=txt;
 const a=$("#tg");a.href="https://t.me/"+C.telegram+"?text="+encodeURIComponent(txt);
 $("#out").classList.add("show");$("#out").scrollIntoView({block:"nearest"});
});
$("#form").addEventListener("input",e=>{if(e.target.id&&$("#e-"+e.target.id))setErr(e.target.id,"");$("#out").classList.remove("show")});
/* mobile menu */
const nav=$("#nav"),bg=$("#burger");
function menu(o){nav.classList.toggle("open",o);bg.setAttribute("aria-expanded",o);bg.setAttribute("aria-label",o?"Закрыть меню":"Открыть меню")}
bg.addEventListener("click",()=>menu(!nav.classList.contains("open")));
nav.addEventListener("click",e=>{if(e.target.closest("a"))menu(false)});
document.addEventListener("keydown",e=>{if(e.key==="Escape")menu(false)});
/* reveal */
const els=document.querySelectorAll(".rv");
if("IntersectionObserver" in window&&!matchMedia("(prefers-reduced-motion:reduce)").matches){
 const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}}),{threshold:.05});els.forEach(x=>io.observe(x));
 setTimeout(()=>els.forEach(x=>x.classList.add("in")),2500);
}else els.forEach(x=>x.classList.add("in"));
renderTabs();
