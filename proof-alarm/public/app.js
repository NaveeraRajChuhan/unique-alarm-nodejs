let selectedObject = "";
let alarmTriggered = false;

function setAlarm(){

    const time =
    document.getElementById("alarmTime").value;

    selectedObject =
    document.getElementById("object").value;

    const now = new Date();

    const current =
    now.getHours().toString().padStart(2,"0")
    + ":"
    +
    now.getMinutes().toString().padStart(2,"0");

    const checker = setInterval(()=>{

        const d = new Date();

        const currentTime =
        d.getHours().toString().padStart(2,"0")
        + ":"
        +
        d.getMinutes().toString().padStart(2,"0");

        if(currentTime===time){

            clearInterval(checker);

            startAlarm();

        }

    },1000);

    alert("Alarm Set!");
}

function startAlarm(){

    alarmTriggered = true;

    document
    .getElementById("alarmAudio")
    .play();

    document
    .getElementById("cameraSection")
    .classList.remove("d-none");
}

async function verifyImage(){

    const file =
    document.getElementById("photo")
    .files[0];

    if(!file){
        alert("Select image");
        return;
    }

    const formData =
    new FormData();

    formData.append("image",file);
    formData.append("object",selectedObject);

    const response =
    await fetch("/verify",{
        method:"POST",
        body:formData
    });

    const result =
    await response.json();

    if(result.success){

        document
        .getElementById("alarmAudio")
        .pause();

        alert(
        "Correct Object. Alarm Stopped!"
        );

    }
}