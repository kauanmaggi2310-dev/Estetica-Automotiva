const menuToggle=document.querySelector('.menu-toggle');
const mobileMenu=document.querySelector('.mobile-menu');
const dialog=document.querySelector('#contact-dialog');
const form=document.querySelector('#contact-form');
const success=document.querySelector('.success-state');
const toast=document.querySelector('.toast');

menuToggle?.addEventListener('click',()=>{
  const open=mobileMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded',String(open));
  mobileMenu.setAttribute('aria-hidden',String(!open));
});

document.querySelectorAll('.mobile-menu a').forEach(link=>link.addEventListener('click',()=>{
  mobileMenu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded','false');
  mobileMenu.setAttribute('aria-hidden','true');
}));

document.querySelectorAll('[data-open-contact]').forEach(button=>button.addEventListener('click',()=>{
  mobileMenu.classList.remove('open');
  dialog.showModal();
}));
document.querySelector('.dialog-close')?.addEventListener('click',()=>dialog.close());
dialog?.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});

form?.addEventListener('submit',async event=>{
  event.preventDefault();
  const data=new FormData(form);
  const message=`Olá, LavaJet! Meu nome é ${data.get('nome')}. Meu veículo é ${data.get('veiculo')} e tenho interesse em ${data.get('servico')}. Gostaria de solicitar um orçamento para atendimento a domicílio.`;
  try{await navigator.clipboard.writeText(message)}catch{const area=document.createElement('textarea');area.value=message;document.body.appendChild(area);area.select();document.execCommand('copy');area.remove()}
  form.hidden=true;success.hidden=false;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2200);
});

document.querySelector('.dialog-reset')?.addEventListener('click',()=>{form.reset();form.hidden=false;success.hidden=true});

const range=document.querySelector('[data-comparison] input');
const after=document.querySelector('.comparison-layer.after');
const handle=document.querySelector('.comparison-handle');
range?.addEventListener('input',()=>{const value=range.value;after.style.clipPath=`inset(0 0 0 ${value}%)`;handle.style.left=`${value}%`});

