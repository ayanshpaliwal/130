song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
song1_status = "";
song2_status = "";
scoreLeftWrist = "";
scoreRightWrist = "";

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses)
}

function modelLoaded() {

    console.log('poseNet Is Initialized');
}

function draw() {
    image(video, 0, 0, 600, 500)
    fill('#FF0000');
    stroke('#FF0000');
    song1_status = song1.isPlaying();
    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song_2.stop();
        if (song1_status == false) {
            song_1.play();
            document.getElementById("song").innerHTML = "Playing - Harry Potter Theme Song"
        }
    }
    if (scoreLeftWrist > 0.2) {
        circle(LeftWristX, LeftWristY, 20);
        song_1.stop();
        if (song2_status == false) {
            song_2.play();
            document.getElementById("song").innerHTML = "Playing - Peter Pan Theme Song"
        }
    }
}

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("Peter-Pan.mp3");
}

function play() {
    song.setVolume(1.7);
    song.setRate(1);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("lX" + leftWristX + "ly" + leftWristY)

        scoreRightWrist = results[0].pose.keypoints[10].score;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rX" + rightWristX + "ry" + rightWristY)
    }
}