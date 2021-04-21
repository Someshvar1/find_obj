find_object="";
function setup(){
    video=createCapture(VIDEO);
    video.hide();
    canvas=createCanvas(490,380);
    canvas.center();
}
function draw(){
    image(video,0,0,490,380);
}
function find(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status:Detecting objects";
    find_object=document.getElementById("object").value;
}
function modelLoaded(){
    console.log("Model loaded!");
    status=true;
}