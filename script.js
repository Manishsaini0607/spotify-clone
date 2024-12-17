
let currentSong= new Audio();

function secondsToMinutes(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // Format minutes and seconds to be two digits
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(Math.floor(remainingSeconds)).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
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

const playMusic=(track, pause=false)=>{
    // let audio=new Audio("/songs/"+track)
    currentSong.src="songs/"+track;
    if(!pause){currentSong.play();
        play.src="./imeges/pausedbtn.svg";
       }
    
  
    document.querySelector(".song-info").innerHTML=(track);
    document.querySelector(".song-time").innerHTML="00:00/00:00";
    
}

async function main() {

    // get the list of all songs 
    let songs=await getSongs();

   
    // show All Songa in Library
let songsOL=document.querySelector(".songslist").getElementsByTagName("ol")[0];
        for ( song of songs){
            songsOL.innerHTML=songsOL.innerHTML+`  <li><img src="./imeges//music.svg" alt="">
                <div class="songinfo">${song.split("/songs/")[1].replaceAll("%20"," ")}</div>
                <div class="playnow"><span>Playnow</span> <img src="./imeges//playbtn.svg" alt=""></div>
                 </li>` }
        
                 // Add a eventLisner on each songs 
                 Array.from(document.querySelector(".songslist").getElementsByTagName("li")).forEach(element => {

                    element.addEventListener(("click") ,()=>{
                        playMusic(element.querySelector(".songinfo").innerHTML);
                        console.log(element.querySelector(".songinfo").innerHTML);
                    })
                    
                 });
                 
                 playMusic( `${songs[0].split("/songs/")[1].replaceAll("%20"," ")}`,true)



                 // Add a event lisner on play , next and previous bottons
                    play.addEventListener(("click"), ()=>{
                        if(currentSong.paused){
                            currentSong.play();
                            play.src="./imeges/pausedbtn.svg";
                        }
                        else{currentSong.pause();
                            play.src="./imeges/playbtn.svg";
                        }
                    })
                // event lisner for update time 
                currentSong.addEventListener(("timeupdate"), ()=>{
                    document.querySelector(".song-time").innerHTML=secondsToMinutes(currentSong.currentTime)+"/"+ secondsToMinutes(currentSong.duration);
                    document.querySelector(".circle").style.left=(currentSong.currentTime/currentSong.duration)*100 +"%";
                })
                

                //add event lisner to sceekbar
                document.querySelector(".sceekbar").addEventListener("click", (e)=>{
                    let persent=(e.offsetX/e.target.getBoundingClientRect().width)*100;
                    document.querySelector(".circle").style.left=persent +"%";
                    currentSong.currentTime= (currentSong.duration*persent)/100
})
                   // Add event lisner to menu btn
                   document.querySelector(".menu").addEventListener(("click"),()=>
                {
                    document.querySelector(".left").style.left="0";
                })
          // Add event lisner to close btn
          document.querySelector(".close").addEventListener(("click"),()=>{
            document.querySelector(".left").style.left="-100%";
          })


          // Add event lisner previousbtn 
           
          

}   

main();   


