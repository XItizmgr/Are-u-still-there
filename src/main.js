import "./style.css";


const backgroundsound = document.getElementById("background-sound")
const audiocontroller = document.getElementById("audio-controler")
const audiovalue = document.getElementById("audio-value")

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

const button = document.querySelectorAll("button")
const btnsound = document.getElementById('click-sound')
button.forEach((btn) => {
    btn.addEventListener('click', () => {
        btnsound.volume = 0.5;
        btnsound.play()
    })
})

const eyes = document.querySelectorAll(".left-eye, .right-eye");
const pupils = document.querySelectorAll(".pupil");

if (eyes && pupils) {
    window.addEventListener("mousemove", (e) => {
        pupils.forEach((pupil, index) => {
            const eye = eyes[index]
            if (!eye) return;
            const eyeDetail = eye.getBoundingClientRect()
            const eyeX = eyeDetail.left + eyeDetail.width / 2
            const eyeY = eyeDetail.top + eyeDetail.height / 2
            const mouseX = e.clientX
            const mouseY = e.clientY
            console.log(mouseX)
            const diffX = mouseX - eyeX
            const diffY = mouseY - eyeY
            const angle = Math.atan2(diffY, diffX)
            const distance = 5
            const pupilX = Math.cos(angle) * distance
            const pupilY = Math.cos(angle) * distance
            pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`

        })
    })

}







const dialouge = document.getElementById("dialogue")
const talkbtn = document.querySelector(".talk-btn")
const lookbtn = document.querySelector(".look-btn")
const leavebtn = document.querySelector(".leave-btn")

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
    }, 5000);
}

const hasVisited = localStorage.getItem("visited")
let visitCount = Number(localStorage.getItem("visitCount")) || 0
visitCount++
localStorage.setItem("visitCount", visitCount)

let talkCount = Number(localStorage.getItem("talkCount")) || 0
const hasLeft = localStorage.getItem("left")

if (hasVisited) {
    setTimeout(() => {
        if (hasLeft) {
            showDialogue("You came back.");
        }
        else if (visitCount >= 3) {
            showDialogue("you keep coming back");
        }
        else {
            showDialogue("Welcome back.")
        }
    }, 2000)
}
localStorage.setItem("visited", "true");

talkbtn.addEventListener("click", () => {
    talkCount++;
    localStorage.setItem("talkCount", talkCount)

    if (talkCount >= 10) {
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
