/* Vitality Working — demo interactiva de la pausa activa */
(function(){
  var screen=document.getElementById('screen');
  var flash=document.getElementById('flash');
  var pips=screen.querySelectorAll('.pips i');
  var snooze=document.getElementById('btn-snooze');
  var ringBar=document.getElementById('ring-bar');
  var ringTime=document.getElementById('ring-time');
  var exercise=document.getElementById('exercise');
  var CIRC=339.292, SECONDS=20, MAX_SNOOZE=2;
  var exercises=['Estira el cuello hacia un lado','Rota los hombros hacia atrás','Respira profundo por la nariz','Descansa la vista: mira a lo lejos'];
  var used=0, timer=null, flashTimer=null;

  function setState(s){screen.setAttribute('data-state',s)}
  function paintPips(){
    pips.forEach(function(p,i){p.classList.toggle('used',i<used)});
    var left=MAX_SNOOZE-used;
    if(left<=0){snooze.disabled=true;snooze.textContent='Sin pospuestas disponibles'}
    else{snooze.disabled=false;snooze.textContent='Posponer 5 min'}
  }
  function say(msg){
    flash.textContent=msg;
    clearTimeout(flashTimer);
    flashTimer=setTimeout(function(){flash.textContent=''},3500);
  }

  snooze.addEventListener('click',function(){
    if(used>=MAX_SNOOZE) return;
    used++;paintPips();
    say(used<MAX_SNOOZE?'Pospuesta 5 min. Te queda 1 vez.':'Pospuesta 5 min. Es la última vez.');
  });

  document.getElementById('btn-start').addEventListener('click',function(){
    var t=SECONDS;
    setState('pause');
    ringBar.style.transition='none';ringBar.style.strokeDashoffset='0';
    void ringBar.getBoundingClientRect();
    ringBar.style.transition='';
    function paint(){
      ringTime.textContent='0:'+(t<10?'0':'')+t;
      ringBar.style.strokeDashoffset=String(CIRC*(1-t/SECONDS));
      exercise.textContent=exercises[Math.min(exercises.length-1,Math.floor((SECONDS-t)/(SECONDS/exercises.length)))];
    }
    paint();
    clearInterval(timer);
    timer=setInterval(function(){
      t--;paint();
      if(t<=0){clearInterval(timer);setTimeout(function(){setState('done')},700)}
    },1000);
  });

  document.getElementById('btn-reset').addEventListener('click',function(){
    used=0;flash.textContent='';paintPips();setState('alert');
  });

  paintPips();
})();
