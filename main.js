objects = [];
status = "";
input = "";
obj = "";
function preload(){
  
}


function setup() {
  canvas = createCanvas(480, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380,380);
  video.hide();

}

function find()
{
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(video, 0, 0, 480, 380);
      if(status != "")
      {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status : Objects Detected";
          
          obj = objects[i].label;
          input = document.getElementById("object").value;
          if (input == obj)
          {
              document.getElementById("dect_objects").innerHTML = input + " found";
              var synth=window.speechSynthesis;
              speak_data=input+"found";
              var utterThis=new SpeechSynthesisUtterance(speak_data);
              synth.speak(utterThis);
          } else
          {
            document.getElementById("dect_objects").innerHTML = input + " not found";
            document.getElementById("dect_objects").innerHTML = input + " found";
              var synth=window.speechSynthesis;
              speak_data=input+"not found";
              var utterThis=new SpeechSynthesisUtterance(speak_data);
              synth.speak(utterThis);
          }
          fill("#FF0000");
          percent = floor(objects[i].confidence * 100);
          text(obj + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke("#FF0000");
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
      }
}
