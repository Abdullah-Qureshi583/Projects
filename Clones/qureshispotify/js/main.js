let currentSong = new Audio();
let play = document.querySelector(".main-play");
let songs;
let currFolder;

let secondsToMinutesSeconds = (seconds) => {
  if (isNaN(seconds) || seconds < 0) {
    return "00 :00";
  }

  let min = String(Math.floor(seconds / 60)).padStart(2, "0");
  let remainingSec = String(Math.floor(seconds % 60)).padStart(2, "0");

  return `${min}:${remainingSec}`;
};

let getSongs = async (folder) => {
  currFolder = folder;
  let a = await fetch(`${folder}/`);
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");

  songs = [];
  for (let i = 0; i < as.length; i++) {
    const element = as[i];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split(`/${folder}/`)[1]);
    }
  }

  let songUL = document.querySelector(".song-list");
  songUL.innerHTML = "";
  for (const song of songs) {
    songUL.innerHTML =
      songUL.innerHTML +
      `<li class="library-song">
        <img class="invert music" src="icons/music.svg" alt="">
        <div class="song-details">
          <p class="song-name">${song.replaceAll("%20", " ")}</p>
          <p class="artist">Qureshi</p>
        </div>
        <div class="play-container">
          <p>Play now</p>
          <img class="invert play" src="icons/play.svg" alt="o">
        </div>
      </li>`;
  }
  console.log(songs.length);

  // set the property that when there will song playlist so the songlist is shown other wise just play
  if (songs.length > 1) {
    document.querySelector(".left").style.left = "0%";
    document.querySelector(".left").style.zIndex = "2";
  }

  // attatch an event listener to each song
  Array.from(document.querySelectorAll(".library-song")).forEach((e) => {
    e.addEventListener("click", (element) => {
      playMusic(e.querySelector(".song-name").innerHTML.trim());
    });
  });
  return songs;
};

const playMusic = (track, pause = false) => {
  currentSong.src = `/${currFolder}/` + track;
  if (!pause) {
    currentSong.play();
    play.src = "icons/pause.svg";
  }
  document.querySelector(".songinfo").innerHTML = decodeURI(
    track.replace(".mp3", "")
  ); // decode uri is remove all the %20
  document.querySelector(".songtime").innerHTML = "00:00 / 00:00"; //
};

//Display all the albums on the page
async function displayAlbums() {
  console.log("displaying albums");
  let x = await fetch(`/songs/`);
  let response = await x.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let anchors = div.getElementsByTagName("a");
  let cardContainer = document.querySelector(".card-container");
  let array = Array.from(anchors);
  for (let index = 0; index < array.length; index++) {
    const e = array[index];
    if (e.href.includes("/songs")  && !e.href.includes(".htaccess")) {
      let folder = e.href.split("/").slice(-2)[0];
      // Get the metadata of the folder
      let a = await fetch(`/songs/${folder}/info.json`);
      let response = await a.json();
      cardContainer.innerHTML =
        cardContainer.innerHTML +
        `<div data-folder="${folder}" class="card">
                                    <img
                                      src="/songs/${folder}/cover.jpg"
                                      alt=""
                                    />
                                    <h2>${response.title}</h2>
                                    <p>${response.description}</p>
                                    
                                    <img src="icons/hover-play.svg" class=" play hover" alt="">
                                  </div>`;
    }

    // load the library when ever card is clicked
    Array.from(document.getElementsByClassName("card")).forEach((card) => {
      card.addEventListener("click", async (item) => {
        console.log("Fetching Songs");
        songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`);
        playMusic(songs[0]);
      });
    });

  }
}

let main = async () => {
  // Get the list of all the songs
  await getSongs("songs/l");

  //set default song
  playMusic(songs[0], true);

  // Display all the albums on the page
  await displayAlbums();

  // add an event listener to play
  play.addEventListener("click", () => {
    if (currentSong.paused) {
      console.log("Play");
      currentSong.play();
      play.src = "icons/pause.svg";
    } else {
      console.log("pause");
      currentSong.pause();
      play.src = "icons/play.svg";
    }
  });

  // add an event listener to previous
  document.querySelector(".previous").addEventListener("click", (e) => {
    currentSong.pause();
    console.log("Previous clicked");
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]); // get the index of currentSongm and update the index
    if (index - 1 >= 0) {
      playMusic(songs[index - 1]);
    }
  });

  // add an event listener to next
  document.querySelector(".next").addEventListener("click", () => {
    let index = Array.from(songs).indexOf(
      currentSong.src.split("/").slice(-1)[0]
    ); // get the index of currentSong and update the index
    if (index + 1 < songs.length) {
      playMusic(songs[index + 1]);
    }
  });

  // add an event listener to the seekbar and circle
  let seekBar = document.querySelector(".seekbar");
  seekBar.addEventListener("click", (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentSong.currentTime = (currentSong.duration * percent) / 100;
  });

  // set song time and update the circle accordingly
  let timeupdate = document.querySelector(".songtime");
  currentSong.addEventListener("timeupdate", () => {
    timeupdate.innerHTML = `${secondsToMinutesSeconds(
      currentSong.currentTime
    )} / ${secondsToMinutesSeconds(currentSong.duration)}`;
    document.querySelector(".circle").style.left =
      (currentSong.currentTime / currentSong.duration) * 100 + "%";
  });

  // add event listeners to hamburger and control it
  document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0px";
    document.querySelector(".left").style.zIndex = "2";
  });

  // add event listner to close button
  let close = document.querySelector(".close");
  close.addEventListener("click", () => {
    let left = document.querySelector(".left");
    document.querySelector(".left").style.left = "-170%";
  });

  // set volume range
  let turn = true;
  let range = document.querySelector(".range");
  document.querySelector(".volume").addEventListener("click", (e) => {
    if (turn) {
      currentSong.volume = 0;
      document.querySelector(".volume").src = "icons/muted-volume.svg";
      turn = false;
    } else {
      currentSong.volume = 0.5;
      range.value = 50;
      console.log(range.value);
      document.querySelector(".volume").src = "icons/volume.svg";
      turn = true;
    }
  });
  range.addEventListener("change", (e) => {
    let vol = e.target.value;
    currentSong.volume = vol / 100;
    if (vol == 0) {
      document.querySelector(".volume").src = "icons/muted-volume.svg";
      turn = false;
    } else if (vol < 40) {
      document.querySelector(".volume").src = "icons/low-volume.svg";
      turn = true;
    } else {
      document.querySelector(".volume").src = "icons/volume.svg";
      turn = true;
    }
  });
};

main();
