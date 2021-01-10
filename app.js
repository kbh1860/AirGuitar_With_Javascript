const modelParams = {
    flipHorizontal: true,
    imageScaleFactor: 0.7,
    maxNumBoxes: 1,
    iouThreshold: 0.5,
    scoreThreshold: 0.89,
}

navigator.getUserMedia =
    navigator.gerUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;


const video = document.querySelector('#video');
const audio = document.querySelector('#audio');
let model;

handTrack.startVideo(video).then(status => {
    if(status){
        navigator.getUserMedia(
            { video: {} },
            stream => {
                video.srcObject = stream;

                setInterval(runDetection, 1000);
            },
            err => console.log(err)
        );
    }
});

function runDetection()
{
    model.detect(video).then(predictions =>{
        console.log(predictions);
        if(predictions.length !==0)
        {
            let hand1 = predictions[0].bbox;
            let x = hand1[0];
            let y = hand1[1];
            console.log(x);

             if(Math.floor(y) > 100)
            {
                if(Math.floor(x) <= 170)
                {
                    audio.src = 'do.mp3'
                    console.log("do");
                }

                else if(Math.floor(x) > 170 && Math.floor(x) <= 290)
                {
                    audio.src = 're.mp3';
                    console.log("re");
                }

                else if(Math.floor(x) > 290 && Math.floor(x) <= 350)
                {
                    audio.src = "mi.mp3";
                    console.log("mi");
                }

                else
                {
                    audio.src = "pa.mp3";
                    console.log("pa");
                }
            }
            audio.play();
         }
    });
}
handTrack.load(modelParams).then(lmodel => {
    model = lmodel;
})