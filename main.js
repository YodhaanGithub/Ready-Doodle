to_draw = ["Stars","Alien", "Bus", "Car", "Coffee", "Fork", "Feet", "Pencil", "Spider", "Laptop"];
choose= Math.floor((Math.random()*to_draw.length)+ 1);
array_element = to_draw[choose];
document.getElementById("drawn").innerHTML = "To be Drawn: "+ array_element;

timer_counter = 0;
timer_check = "";
drawn_sketch = "";
answer_holder = "";
score = 0;
sketch = array_element;

function clearCanvas(){
    background("white");
}

function preload() {
    classifier= ml5.imageClassifier('DoodleNet');
}

function draw(){
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed){
       line(pmouseX,pmouseY,mouseX,mouseY);
    }
    check_sketch();
    if(drawn_sketch == sketch){
        timer_counter = 0;
        answer_holder = "set";
        score = score+1;
        document.getElementById("score").innerHTML = "Score: "+score;
    }
}

function check_sketch(){
    timer_counter++;
    document.getElementById("timer").innerHTML = "Timer: "+timer_counter;
    if(timer_counter>500){
        document.getElementById("label").innerHTML = "Your Sketch: ";
        document.getElementById("confidence").innerHTML = "Confidence: ";
        timer_counter = 0;
        timer_check = "completed";
    }
    if(timer_check == "completed" || answer_holder == "set"){
        timer_check = "";
        answer_holder = "";
        updateCanvas();
    }
}

function updateCanvas(){
    background("white");
    to_draw = ["Stars","Alien", "Bus", "Car", "Coffee", "Fork", "Feet", "Pencil", "Spider", "Laptop"];
    array_element = to_draw[choose];
    sketch = array_element;
    document.getElementById("drawn").innerHTML = " To be Drawn: "+sketch;
}

function setup(){
    canvas = createCanvas(280,280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
}
function classifyCanvas(){
    classifier.classify(canvas, gotResults);
}
function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    drawn_sketch = results[0].label;
    document.getElementById("label").innerHTML = "Your Sketch: "+results[0].label;
    document.getElementById("confidence").innerHTML = "Confidence: "+Math.round(results[0].confidence * 100)+"%";
}