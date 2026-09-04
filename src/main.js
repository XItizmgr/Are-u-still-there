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
const dialogeLines = [
    "Hello there .",
    "Are you there ?",
    " you are looking at me ",
    " whyy are you still here ?",
    "....",
    "I can see you.",
    "Stop looking at me . ",
    "Stoppppppp",
    "why did you come back"
]
let dailogueIndex = 0;
function showDialogue(txt) {
    dialouge.textContent = txt;
    dialouge.classList.add("show");
    setTimeout(() => {
        dialouge.classList.remove("show");
        console.log("hloo ??")
    }, 5000);
}

talkbtn.addEventListener("click", () => {
    showDialogue(dialogeLines[dailogueIndex]);
    dailogueIndex++
    if (dailogueIndex >= dialogeLines.length) {
        dailogueIndex = 0
    }
})
