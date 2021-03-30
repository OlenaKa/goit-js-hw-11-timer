import timerTemplate from '../templates/timer.hbs'

const refs = {
  body: document.querySelector('body')
}


class CountdownTimer {
  constructor ({targetDate, selector, initTimer, updateTimer}) {
    this.intervalId=0;
    this.selector=selector.slice(1);
    this.targetDate = targetDate;
    this.markupTimer(this.getLeftTime(), this.selector)
    this.countdown();
    
  }
 
  getLeftTime () {
    const dateNow = Date.now()
    const leftTimeUTC = this.targetDate - dateNow
    const timeLeft = this.getTimeComponents(leftTimeUTC) 
    return timeLeft
 }    

 markupTimer (time, selector){
  refs.body.innerHTML = timerTemplate({...time, id:selector});
   
  refs.daysValue = document.querySelector('[data-value="days"]')
  refs.hoursValue= document.querySelector('[data-value="hours"]')
  refs.minsValue= document.querySelector('[data-value="mins"]')
  refs.secsValue= document.querySelector('[data-value="secs"]')
}

  countdown() {
    this.intervalId = setInterval(()=>{
    let timeLeft= this.getLeftTime()
    if (timeLeft.time< 1000){
      this.endCount(this.intervalId)
    } else {
      this.updateTimer(timeLeft)
    }
 },1000)
 }


 updateTimer({days, hours, mins, secs}) {
  this.animationSet();
  refs.daysValue.textContent = days;
  refs.hoursValue.textContent = hours;
  refs.minsValue.textContent = mins;
  refs.secsValue.textContent = secs;
 }

 getTimeComponents (time){
  const days = String(Math.floor(time / (1000 * 60 * 60 * 24))).padStart(2,'0');
  const hours = String(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2,'0');
  const mins = String(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))).padStart(2,'0');
  const secs = String(Math.floor((time % (1000 * 60)) / 1000)).padStart(2,'0');
  
  return {days, hours, mins, secs, time}
 }

 endCount (intervalId){
  clearInterval(intervalId)
  refs.daysValue.textContent = '00';
  refs.hoursValue.textContent = '00';
  refs.minsValue.textContent = '00';
  refs.secsValue.textContent = '00';
 }

 animationSet () {
  this.animate(refs.secsValue);
  if(refs.secsValue.textContent === '00') {this.animate(refs.minsValue)};
  if(refs.secsValue.textContent=== '00' && refs.minsValue.textContent === '00') {this.animate(refs.hoursValue)};
  if (refs.secsValue.textContent=== '00' && refs.minsValue.textContent === '00' && refs.hoursValue.textContent==='00'){this.animate(refs.daysValue)}
 }


 animate (elem) {
  elem.classList.add('flip')
  setTimeout (()=>elem.classList.remove('flip'), 500);
 }
}


new CountdownTimer ({
  selector: '#timer-1',
  targetDate: new Date('Mar 31, 2021, 9:57'),
})



