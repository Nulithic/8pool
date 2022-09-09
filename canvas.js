// p5 can not be executed the normal "global" way
// Instead a sketch instance has to be manually created
// This is done with the closure below
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const injectButton = async () => {
  await delay(2000);
  $(".mt-8").append('<button id="hackBtn" class="sidebar-main-link block w-full pl-3 mb-2 text-xl hover:text-lightblue-100 nuxt-link-active">Hack</button>');

  $("#hackBtn").on("click", async function () {
    console.log("hackBtn clicked");
    console.log($("#iframe-game")[0].getBoundingClientRect());

    var bodyRect = document.body.getBoundingClientRect();
    var elemRect = $("#iframe-game")[0].getBoundingClientRect();
    var offsetTop = elemRect.top - bodyRect.top;
    var offsetLeft = elemRect.left - bodyRect.left;

    var sketch = function (p5) {
      // setup canvas
      p5.setup = function () {
        console.log("p5 running");
        var c = p5.createCanvas(600, 300);
        c.style("pointer-events", "none");
        c.position(130, 0);
        p5.background(0, 0, 255);
        // p5.clear();
        // p5.noFill();
        // p5.noLoop();
        p5.stroke(255, 30);
      };
      // draw the guidelines
      p5.draw = function () {
        // p5.clear();
        // set stroke weight
        p5.strokeWeight(2);
        // set transparency
        p5.stroke(255, 30);
        p5.line(0, 0, p5.mouseX, p5.mouseY);
        p5.line(285, 0, p5.mouseX, p5.mouseY);
        p5.line(570, 0, p5.mouseX, p5.mouseY);
        p5.line(0, 274, p5.mouseX, p5.mouseY);
        p5.line(285, 274, p5.mouseX, p5.mouseY);
        p5.line(570, 274, p5.mouseX, p5.mouseY);
        // increase the transparency of the circle
        p5.stroke(255, 100);
        p5.ellipse(p5.mouseX, p5.mouseY, 16);
      };
      // change the layout if mouse is moved and SHIFT key is pressed
      p5.mouseMoved = function () {
        if (p5.keyIsDown(p5.SHIFT)) {
          p5.draw();
        }
      };
      p5.keyPressed = function () {
        if (p5.keyIsDown(p5.SHIFT)) {
          p5.draw();
        }
      };
    };

    // The above function closure is passed into a p5 object constructor
    // this starts the sketch.
    var myp5 = new p5(sketch);
  });
};
injectButton();
