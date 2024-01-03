const musicListsTag = document.getElementsByClassName("musiclists")[0];
const audioTag = document.getElementsByClassName("audioTag")[0];
const currentAndTotleTime = document.getElementsByClassName("currentAndTotleTime")[0];
const currentProgressTag = document.getElementById("currentProgress");
const playButton = document.getElementsByClassName("playButton")[0];
const pauseButton = document.getElementsByClassName("pauseButton")[0];
const previousButton = document.getElementsByClassName("previousButton")[0];
const nextButton = document.getElementsByClassName("nextButton")[0];
const lists = [
    {listId: "music/BLACKPINK_FLOWER_JISOO_Solo_Coachella_Studio_Version_Pm_s3Psto50.m4a" , title: "JISOO - '꽃(FLOWER)'"},
    {listId: "music/supershy.mp3" , title: "SuperShy_NewJeans"},
    {listId: "music/JENNIE_You_&_Me_Jazz_ver__LIVE_CLIP_ZgLlabyz7oY.m4a" , title: "JENNIE - 'You & Me' "},
    {listId: "music/MONEY - Lisa.mp3" , title: "LISA - 'MONEY'"},
];

for( let i = 0; i < lists.length; i++){
    const listsTag = document.createElement("div");
    listsTag.addEventListener("click", ()=>{
      currentIndex = i ;
      playsong();
    });
    listsTag.classList.add("listItem");
    const title = (i+1).toString() +"." + lists[i].title;
    listsTag.textContent = title;
    musicListsTag.append(listsTag);
};

let durationText = "00:00"
let duration = 0;
audioTag.addEventListener("loadeddata", ()=>{
 duration = Math.floor(audioTag.duration);
  durationText = createMinuteAndSecondText(duration);
});

audioTag.addEventListener("timeupdate", ()=>{
  const currentTime = Math.floor(audioTag.currentTime);
  const currentText = createMinuteAndSecondText(currentTime);
  const currentTextAndDurationText = currentText + " / " + durationText;
  currentAndTotleTime.textContent = currentTextAndDurationText;
  currentProgress(currentTime);
});

const  currentProgress = (currentTime) =>{
const  currentProgressWidth = (500/duration) * currentTime;
 currentProgressTag.style.width = currentProgressWidth.toString() + "px";
}

const createMinuteAndSecondText =  (totalsecond) =>{
  const minutes = Math.floor(totalsecond / 60);
  const seconds = totalsecond % 60;

  const minutestext = minutes < 10 ? "0" + minutes.toString() : minutes;
  const secondstext = seconds < 10 ? "0" + seconds.toString() : seconds;
  return minutestext + ":" + secondstext;

}

let currentIndex = 0;
let playing = false;
playButton.addEventListener("click", ()=>{
  const CurrentTime = Math.floor(audioTag.currentTime);
  playing = true;
  if(CurrentTime === 0){
    playsong();
  }
  else{
    audioTag.play();
    updatePlayAndPauseBtn();
  }
});

pauseButton.addEventListener("click", ()=>{
  playing = false;
  audioTag.pause();
  updatePlayAndPauseBtn();
});

previousButton.addEventListener("click", ()=>{
if(currentIndex === 0){
  return;
}
currentIndex -= 1;
playsong();
});

nextButton.addEventListener("click", ()=>{
if( currentIndex === lists.length - 1){
  return;
}
currentIndex += 1;
playsong();

});

const playsong = () =>{
  const songIdToPlay = lists[currentIndex].listId;
  audioTag.src = songIdToPlay;
  audioTag.play();
playing = true;
updatePlayAndPauseBtn();
};

const updatePlayAndPauseBtn = () =>{
 if(playing){
  playButton.style.display = "none";
  pauseButton.style.display = "inline";
 }
 else{
  playButton.style.display = "inline";
  pauseButton.style.display = "none";
 }
}
