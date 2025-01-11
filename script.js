let circle=document.querySelector(".circle");
let seekbar=document.querySelector(".seekbar");
let songsOL=document.querySelector(".songslist").getElementsByTagName("ol")[0];
let volumebar=document.querySelector(".volumebar");
let currentSong= new Audio();

function secondsToMinutes(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // Format minutes and seconds to be two digits
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(Math.floor(remainingSeconds)).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

function updateTime() {
    document.querySelector(".song-time").innerHTML = 
        secondsToMinutes(currentSong.currentTime) + "/" + 
        secondsToMinutes(currentSong.duration);

        if (!currentSong.duration) return; 
    let progress = (currentSong.currentTime / currentSong.duration) * 100;
   seekbar.value = progress 
}


// access songs folder using fetch api and song path
async function getSongs(){ 
    let a = await fetch("./songs");
    let response= await a.text();
    let div=document.createElement("div");
    div.innerHTML=response;
    let as=div.getElementsByTagName("a");
    let song=[];
    for( let index=0;  index<as.length;  index++){
           const element=as[index];

            if (element.href.endsWith(".mp3")){
                song.push(element.href);
            }
    }
    return song;
}

const playMusic=(track,pause)=>{
    currentSong.src="songs/"+track;
    if(pause===false){currentSong.play();
        play.src="./images/pausedbtn.svg";
       }
    document.querySelector(".song-info").innerHTML=(track);
    currentSong.addEventListener('loadedmetadata',updateTime);
}

async function main() {

    // get the list of all songs 
    let songs=await getSongs();

   
    // show All Songs in Library
        for ( song of songs){
            songsOL.innerHTML=songsOL.innerHTML+`<li><img src="./images//music.svg" alt="">
                <div class="songinfo">${song.split("/songs/")[1].replaceAll("%20"," ")}</div>
                <div class="playnow"><span>Playnow</span> <img src="./images//playbtn.svg" alt=""></div>
                 </li>` }
        
    // Add a event Listener on each songs 
                 Array.from(document.querySelector(".songslist").getElementsByTagName("li")).forEach(element => {
                    element.addEventListener(("click") ,()=>{
                        playMusic(element.querySelector(".songinfo").innerHTML);
                     
                    })
                    
                 });
                 

     // load first song
            playMusic( `${songs[0].split("/songs/")[1].replaceAll("%20"," ")}`,true)



        // Add a event listener on play btn
                    play.addEventListener(("click"), ()=>{
                        if(currentSong.paused){
                            currentSong.play();
                            play.src="./images/pausedbtn.svg";
                        }
                        else{ 
                            currentSong.pause();
                            play.src="./images/playbtn.svg";
                        }
                    })

                  // //add event listener to sceekbar  //  
           seekbar.addEventListener(("input"),()=>{
            currentSong.currentTime=(seekbar.value*currentSong.duration)/100
           })         

        // event listener for update time 
                currentSong.addEventListener(("timeupdate"),updateTime)
                
         

            // Add event listener to menu btn
                   document.querySelector(".menu").addEventListener(("click"),()=>
                {
                    document.querySelector(".left").style.left="0";
                })

          // Add event listener to close btn
             document.querySelector(".close").addEventListener(("click"),()=>{
              document.querySelector(".left").style.left="-200%";
              })


          // Add event listener to previousbtn 
          previous.addEventListener(("click"), ()=>{
            let index=songs.indexOf(currentSong.src);
            console.log(songs[songs.length-1].split("/songs/")[1].replaceAll("%20"," "));
            if(index===0){
                if(currentSong.paused){
                    playMusic(songs[songs.length-1].split("/songs/")[1].replaceAll("%20"," "),true);
                }
                else{
                
                    playMusic(songs[songs.length-1].split("/songs/")[1].replaceAll("%20"," "),false);
                }
            }
            else{
               if(currentSong.paused){
                playMusic(songs[index-1].split("/songs/")[1].replaceAll("%20"," "),true);
               }
               else{
               
                playMusic(songs[index-1].split("/songs/")[1].replaceAll("%20"," "),false);
               }
            }
          })


          // add event listener to nextbtn 
          next.addEventListener('click',()=>{
          let index=songs.indexOf(currentSong.src);
          if(index===songs.length-1){
            if(currentSong.paused){
                playMusic(songs[0].split("/songs/")[1].replaceAll("%20"," "),true);
            }
            else{
            
                playMusic(songs[0].split("/songs/")[1].replaceAll("%20"," "),false);
            }
          }
          else{
            if(currentSong.paused){
                playMusic(songs[index+1].split("/songs/")[1].replaceAll("%20"," "),true);
            }
            else{
            
                playMusic(songs[index+1].split("/songs/")[1].replaceAll("%20"," "),false);
            }
          }
          })

          // event listener to volumebar
          volumebar.addEventListener(("input"),()=>
          {
            currentSong.volume=volumebar.value/100;

            if(volumebar.value==0){
                document.querySelector(".volume img").src="./images/volumeClose.svg"}
                else{
                    document.querySelector(".volume img").src="./images/volume.svg"
                }
          })
                

}   

main();   


