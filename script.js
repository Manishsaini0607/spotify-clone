
let seekbar=document.querySelector(".seekbar");
let songsOL=document.querySelector(".songslist").getElementsByTagName("ol")[0];
let volumebar=document.querySelector(".volumebar");
let currentSong= new Audio();
let folder="honeysingh";
let firstload=true

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
   if(seekbar.value==100){
    // playMusic(folder+"/"+document.querySelector(".song-info").innerHTML,true)
    play.src="./images/playbtn.svg";
   }
   
}






// access songs folder using fetch api and song path
async function getSongs(folder){ 
    let a = await fetch(`./songs/${folder}/`);
    let response= await a.text();
    let div=document.createElement("div");
    div.innerHTML=response;
    let as=div.getElementsByTagName("a");
    let songs=[];
    for( let index=0;  index<as.length;  index++){
           const element=as[index];
            if (element.href.endsWith(".mp3")){
                songs.push(element.href);
            }   }
 
 
    // show All Songs in Library
    for ( song of songs){
        songsOL.innerHTML=songsOL.innerHTML+`<li><img src="./images//music.svg" alt="">
            <div class="songinfo">${song.split(`/${folder}/`)[1].replaceAll("%20"," ")}</div>
            <div class="playnow"><span>Playnow</span> <img src="./images//playbtn.svg" alt=""></div>
             </li>` }
    
// Add a event Listener on each songs 
             Array.from(document.querySelector(".songslist").getElementsByTagName("li")).forEach(element => {
                element.addEventListener(("click") ,()=>{
                    playMusic(folder+"/"+element.querySelector(".songinfo").innerHTML,false);
                 
                })
                
             });

             // load first and multiple time song
           if(firstload){
            playMusic(  `${folder}/${songs[0].split(`/${folder}/`)[1].replaceAll("%20"," ")}`,true)
           
            play.src="./images/playbtn.svg";
           }else{
            playMusic(  `${folder}/${songs[0].split(`/${folder}/`)[1].replaceAll("%20"," ")}`,false)
            play.src="./images/pausedbtn.svg";
           } 

 return songs
}

const playMusic=(track,pause)=>{
    currentSong.src=`songs/${track}`;
    if(pause===false){currentSong.play();
        play.src="./images/pausedbtn.svg";
       }
    document.querySelector(".song-info").innerHTML=(track.split(`${folder}/`)[1])
    currentSong.addEventListener('loadedmetadata',updateTime);
}

 async function main() {

    // get the list of all songs 
   
   let songs=  await getSongs(folder);


   

                 

     
      



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
          
            if(index===0){
                if(currentSong.paused){
                    playMusic(songs[songs.length-1].split('/songs/')[1].replaceAll("%20"," "),true);
                }
                else{
                
                    playMusic(songs[songs.length-1].split('/songs/')[1].replaceAll("%20"," "),false);
                }
            }
            else{
               if(currentSong.paused){
                playMusic(songs[index-1].split('/songs/')[1].replaceAll("%20"," "),true);
               }
               else{
               
                playMusic(songs[index-1].split('/songs/')[1].replaceAll("%20"," "),false);
               }
            }
          })
          console.log(songs)


          // add event listener to nextbtn 
          next.addEventListener('click',()=>{
          let index =songs.indexOf(currentSong.src);
         console.log( songs[0].split(`/${folder}/`)[1].replaceAll("%20"," "))
          if(index===songs.length-1){
            if(currentSong.paused){
                playMusic(songs[0].split('/songs/')[1].replaceAll("%20"," "),true);
            }
            else{
            
                playMusic(songs[0].split('/songs/')[1].replaceAll("%20"," "),false);
            }
          }
          else{
            if(currentSong.paused){
                playMusic(songs[index+1].split('/songs/')[1].replaceAll("%20"," "),true);
            }
            else{
            
                playMusic(songs[index+1].split('/songs/')[1].replaceAll("%20"," "),false);
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
               
        //  Array.from(document.querySelectorAll(".card")).forEach(element => {
        //     element.addEventListener(("click"),()=>{
        //         songsOL.innerHTML="";
        //         play.src="./images/pausedbtn.svg";
        //         folder=element.getAttribute("data-folder");
        //         main();
        //     })
        //  }) 

        document.querySelectorAll(".card").forEach(element => {    
            element.addEventListener(("click"),async()=>{
                folder=element.getAttribute("data-folder");
               
                songsOL.innerHTML="";
                firstload=false;
                 await getSongs(folder);
            })
          })
        
         


}   


main();   




