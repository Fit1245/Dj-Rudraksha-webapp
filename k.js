song = "";
scoreleftWrist = 0;
scorerightWrist = 0;
leftWristX = 0;
leftWristY = 0;
function setup() {
    canvas = createCanvas(500 , 300);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

poseNet = ml5.poseNet(video , modelLoaded);
poseNet.on('pose' , gotposes);
}
function modelLoaded() {
    console.log("Pose is intiliazed");
}
function draw() {
    image(video, 0, 0, 600, 500);
    fill('#F000');
    stroke('#F000');
    
    if(scoreleftWrist > 0.2) {
      circle(leftWristX , leftWristY , 20);
      InNumberleftWrist = Number(leftWristY);
      remove_decimal = floor(InNumberleftWrist);
      volume = remove_decimal/500;
      document.getElementById("volume").innerHTML = "Volume is : " + volume;
      song.setVolume(volume);
    }
   } 

function preload() { 
    song = loadSound("mm.mp3");
    
}
function play() {
song.play();
song.setVolume(1);
song.range(1);
}

function gotposes(results) {
    if(results.length > 0) {
        console.log(results);
        scoreleftWrist = results[0].pose.keypoints[9].score;
      console.log("ScoreleftWrist = " + scoreleftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
       console.log("leftWristX" + leftWristX + "leftWristY" + leftWristY);
      
    }
}
function back() {
    window.location = "main.html";
}