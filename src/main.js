import "./style.css";

const backgroundsound = document.getElementById("background-sound")
const audiocontroller = document.getElementById("audio-controler")
const audiovalue = document.getElementById("audio-value")
const button = document.querySelectorAll("button")
const btnsound = document.getElementById('click-sound')
const eyes = document.querySelectorAll(".left-eye, .right-eye");
const pupils = document.querySelectorAll(".pupil");
const dialouge = document.getElementById("dialogue")
const talkbtn = document.querySelector(".talk-btn")
const lookbtn = document.querySelector(".look-btn")
const leavebtn = document.querySelector(".leave-btn")

const hasVisited = localStorage.getItem("visited")
let visitCount = Number(localStorage.getItem("visitCount")) || 0
visitCount++
localStorage.setItem("visitCount", visitCount)
let talkCount = Number(localStorage.getItem("talkCount")) || 0
const hasLeft = localStorage.getItem("left")

backgroundsound.volume = 0.5;
document.addEventListener('click', () => {
    backgroundsound.play();
})
audiocontroller.addEventListener("input", () => {
    const volume = audiocontroller.value
    backgroundsound.volume = volume / 100
    audiovalue.textContent = `${volume}%`
    backgroundsound.play()
})
button.forEach((btn) => {
    btn.addEventListener('click', () => {
        btnsound.volume = 0.5;
        btnsound.play()
    })
})
if (eyes && pupils) {
    window.addEventListener("mousemove", (e) => {
        if (looking) {
            return;
        }
        pupils.forEach((pupil, index) => {
            const eye = eyes[index]
            if (!eye) return;
            const eyeDetail = eye.getBoundingClientRect()
            const eyeX = eyeDetail.left + eyeDetail.width / 2
            const eyeY = eyeDetail.top + eyeDetail.height / 2
            const mouseX = e.clientX
            const mouseY = e.clientY
            // console.log(mouseX)
            const diffX = mouseX - eyeX
            const diffY = mouseY - eyeY
            const distance = Math.hypot(diffX, diffY)
            const maxmove = 5
            const moveX = distance > 0 ? (diffX / distance) * Math.min(distance * 0.05, maxmove) : 0
            const moveY = distance > 0 ? (diffY / distance) * Math.min(distance * 0.05, maxmove) : 0
            pupil.style.transform = `translate(${moveX}px, ${moveY}px)`
        })
    })
}
const firstvisitDialogue = [
    "hello..",
    "Are you there .. ? someone .. Anyone",
    "You are looking at me . ",
    "What are you looking for ?",
    "Why are you still here ?",
    "...",
    "I can see you.",
]
const returnDialogue = [
    "Welcome back.",
    "I remember you.",
    "I knew you would.",
    "You stayed away for a while. Where were you ?",
    "Why did you leave me ?",
]
let talkIndex = 0;
function showDialogue(txt) {
    dialouge.textContent = txt;
    dialouge.classList.add("show");
    setTimeout(() => {
        dialouge.classList.remove("show");
        console.log("hloo ??")
    }, 4000);
}
if (hasVisited) {
    setTimeout(() => {
        if (hasLeft) {
            showDialogue("You came back.");
            setTimeout(() => {
                showDialogue("hehehehe")
            }, 3000)
        }
        else if (visitCount >= 3) {
            showDialogue("you keep coming back");
        }
        else {
            showDialogue("Welcome back.")
        }
    }, 1200)
}
localStorage.setItem("visited", "true");
talkbtn.addEventListener("click", () => {
    talkCount++;
    localStorage.setItem("talkCount", talkCount)
    if (talkCount >= 8) {
        showDialogue("you really like talking to me. heh heh")
        return
    }
    if (hasVisited) {
        showDialogue(
            returnDialogue[
            Math.min(talkIndex, returnDialogue.length - 1)
            ]
        )
    }
    else {
        showDialogue(
            firstvisitDialogue[
            Math.min(talkIndex, firstvisitDialogue.length - 1)
            ]
        )
    }
    talkIndex++;
})
let looking = false;
lookbtn.addEventListener("click", () => {
    looking = !looking
    if (looking) {
        showDialogue("why are you looking at me ?");
        pupils.forEach((pupil) => {
            pupil.style.transform = "translate(0,0)"
        })
    }
    else {
        showDialogue("Stop looking.");
    }
})
leavebtn.addEventListener("click", () => {
    localStorage.setItem('left', "true")
    localStorage.setItem('style', "true")
    showDialogue("leaving already ? ")
})




const creepypicContainer = document.getElementById("creepyPic")
const svgContainer = document.querySelector(".svg-container")
const wariningcontainer = document.querySelector('.warning')
if (hasLeft && hasVisited) {
    creepypicContainer.style.backgroundImage = "url('/creepyfacesmiling.jpg')";
    svgContainer.classList.remove("svg-container")
    svgContainer.classList.add("Smiling")
}
else {
    creepypicContainer.style.backgroundImage = "url('/creepyface.jpg')";
}
if (hasVisited) {
    wariningcontainer.style.display = "none"

    randomBlink();
}
document.addEventListener("click", (e) => {
    if (e.target) {
        wariningcontainer.style.display = "none"
        randomBlink();
    }
})
const container = document.querySelector(".cointainer-single")
if (localStorage.getItem("style")) {
    container.style.left = "37.5%"

}
function blink() {
    const eyelids = document.querySelectorAll(".single");

    eyelids.forEach((eye) => {
        eye.classList.add("blink");
    });
    setTimeout(() => {
        eyelids.forEach((eye) => {
            eye.classList.remove("blink");
        });
    }, 180);
}
function randomBlink() {
    blink();
    const nextBlink = Math.random() * 4000 + 2000;
    console.log(nextBlink)
    setTimeout(randomBlink, nextBlink);
}
