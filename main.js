alarm = "";
status1 = "";
objects = [];
function preload(){
 alarm = loadSound('alarm.mp3');
}

function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
    img = createCapture(VIDEO);
    img.hide();
    img.size(480, 380);
    classifier = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = "Status - detecting person";
}

function modelLoaded(){
    status1 = true;
    console.log('model loaded');
}

function gotResults(error, results){
  if(error){
      console.error(error);
  }
  else{
      console.log(results);
      objects = results;
  }
}

function draw(){
    image(img, 0, 0, 480, 380);
    if(status1 != ""){
        classifier.detect(img, gotResults);

        for(i = 0; i< objects.length; i++){
            r = random(255);
            g = random(255);
            b = random(255);
            fill(r,g,b);
            percentage = objects[i].confidence *100;
            percentage = percentage.toFixed(2);
            text(objects[i].label + "" + percentage + "%", objects[i].x + 20, objects[i].y - 20);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == "person"){
                document.getElementById('baby_detect').innerHTML = "Baby Found";
                alarm.stop();
            }
            else{
                document.getElementById('baby_detect').innerHTML = "Baby Not Found";
                alarm.play();
            }
        }
    }
}