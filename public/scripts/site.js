/* Progressive enhancements only. All critical page content exists in the static HTML. */
(()=>{
  document.querySelectorAll('[data-current-year]').forEach(el=>{el.textContent=String(new Date().getFullYear());});
  const button=document.querySelector('[data-menu-toggle]');
  const menu=document.querySelector('[data-menu]');
  const close=()=>{if(!button||!menu)return;button.setAttribute('aria-expanded','false');button.setAttribute('aria-label','Open menu');menu.classList.remove('is-open');document.body.classList.remove('menu-open');};
  if(button&&menu){
    button.addEventListener('click',()=>{
      const isOpen=button.getAttribute('aria-expanded')==='true';
      button.setAttribute('aria-expanded',String(!isOpen));
      button.setAttribute('aria-label',isOpen?'Open menu':'Close menu');
      menu.classList.toggle('is-open',!isOpen);
      document.body.classList.toggle('menu-open',!isOpen);
    });
    menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
    window.addEventListener('resize',()=>{if(window.innerWidth>860)close();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
    document.addEventListener('click',e=>{if(!menu.contains(e.target)&&!button.contains(e.target))close();});
  }
  const tabs=[...document.querySelectorAll('[data-age-tab]')];
  const panels=[...document.querySelectorAll('[data-age-panel]')];
  function selectAge(id,focus=false){
    tabs.forEach(t=>{const selected=t.dataset.ageTab===id;t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1;if(selected&&focus)t.focus();});
    panels.forEach(p=>{p.hidden=p.dataset.agePanel!==id;});
    history.replaceState(null,'',`#${id}`);
  }
  if(tabs.length){
    tabs.forEach((t,i)=>{
      t.addEventListener('click',()=>selectAge(t.dataset.ageTab));
      t.addEventListener('keydown',e=>{
        if(!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;
        e.preventDefault();
        let index=i;
        if(e.key==='ArrowRight')index=(i+1)%tabs.length;
        if(e.key==='ArrowLeft')index=(i+tabs.length-1)%tabs.length;
        if(e.key==='Home')index=0;
        if(e.key==='End')index=tabs.length-1;
        selectAge(tabs[index].dataset.ageTab,true);
      });
    });
    const hash=location.hash.slice(1);
    if(tabs.some(t=>t.dataset.ageTab===hash))selectAge(hash);
    window.addEventListener('hashchange',()=>{const h=location.hash.slice(1);if(tabs.some(t=>t.dataset.ageTab===h))selectAge(h);});
  }
  const form=document.querySelector('[data-contact-form]');
  if(form){form.addEventListener('submit',e=>{
    e.preventDefault();
    const status=document.querySelector('[data-form-status]');
    const name=form.elements.name.value.trim();
    const email=form.elements.email.value.trim();
    const subject=form.elements.subject.value;
    const message=form.elements.message.value.trim();
    if(!name||!email||!message||!form.elements.email.checkValidity()){
      status.textContent='Please add your name, a valid email and a message.';
      const invalid=[form.elements.name,form.elements.email,form.elements.message].find(x=>!x.value.trim()||!x.checkValidity());
      invalid?.focus();return;
    }
    status.textContent='Your email application will open with the message prepared.';
    const mail=form.dataset.toEmail;
    const text=`From: ${name}\nReply email: ${email}\nTopic: ${subject}\n\n${message}`;
    window.location.href=`mailto:${mail}?subject=${encodeURIComponent('Little Cats inquiry: '+subject)}&body=${encodeURIComponent(text)}`;
  });}
})();
