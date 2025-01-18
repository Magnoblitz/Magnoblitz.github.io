const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let glitch_text_interval = null;

document.querySelector(".glitch-text").onmouseover = event => {
  let iterator = 0;
  clearInterval(glitch_text_interval);

  glitch_text_interval = setInterval(() => {
    event.target.innerText = event.target.innerText.split("")
      .map((letter, index) => {
         // if the character of the string has already been reached by the iterator, just draw it normally
         if (index < iterator) {
           return event.target.dataset.value[index];
         } 

         // if the character is a space, just draw a space
         if (event.target.dataset.value[index] == ' ') return ' ';

         // draw a random letter
         return letters[Math.floor(Math.random() * 26)]
      })

      .join("");

    // if the entire string has been drawn, stop the glitch text function
    if (iterator >= event.target.dataset.value.length) {
      clearInterval(glitch_text_interval);
    }

    // increment the iterator
    iterator += 1;
  }, 80);
}



// the current mouse position
var mouse_x = 0;
var mouse_y = 0;

// this function detects whenever the mouse moves and stores the new position
document.addEventListener("mousemove", (event) => {
  mouse_x = event.clientX; 
  mouse_y = event.clientY;
});

// references to all the parts of the spider
const spider_container = document.querySelector(".spider-container");
const spider_head = document.querySelector(".spider-head");
const spider_body = document.querySelector(".spider-body"); 

// spider animation code: 
var spider_frame = 0;
setInterval(spider_animation, 100);

function spider_animation() {
  // get the current spider position
  var spider_left = Number(spider_container.style.left.slice(0, -2));
  var spider_top = Number(spider_container.style.top.slice(0, -2));

  // how far the spider is from the mouse
  var left_diff = mouse_x - 20 - spider_left;
  var top_diff = mouse_y - 20 - spider_top + window.pageYOffset;

  // if the spider is very close to the mouse, return (the spider doesn't have to move)
  var dist = left_diff * left_diff + top_diff * top_diff;
  if (dist <= 1000) {
    if (left_diff < 0) {
      spider_head.innerText = "  ,-,";
      spider_body.innerText = "|∞<(|";
    } else {
      spider_head.innerText = "⹁-⹁  ";  // backward commas (don't show up in all contexts)
      spider_body.innerText = "|)>∞|";   
    }
    return;
  }

  // calculate the angle the spider has to move at to move toward the mouse
  var theta = Math.atan(top_diff / left_diff);

  // edit this to change the spider's speed
  var spider_speed = 15;  

  // move the spider's x pos
  if (left_diff > 0) spider_left += spider_speed * Math.cos(theta);
  else spider_left -= spider_speed * Math.cos(theta);
  spider_container.style.left = spider_left + "px";

  // move the spider's y pos
  if (left_diff > 0) spider_top += spider_speed * Math.sin(theta);
  else spider_top -= spider_speed * Math.sin(theta);
  spider_container.style.top = spider_top + "px";

  // set the spider's animation frame
  if (left_diff < 0) {
    spider_head.innerText = "  ,-,";
    if (spider_frame == 0) {
      spider_body.innerText = "/∞(|)";
    } else if (spider_frame == 1) {
      spider_body.innerText = "|∞<(|";
    } else if (spider_frame == 2) {
      spider_body.innerText = "<∞|/>";
    } else if (spider_frame == 3) {
      spider_body.innerText = "(∞/<\\";
    }
  } else {
    spider_head.innerText = "⹁-⹁  ";  // backward commas (don't show up in all contexts)
    if (spider_frame == 0) {
      spider_body.innerText = "(|)∞\\";
    } else if (spider_frame == 1) {
      spider_body.innerText = "|)>∞|";
    } else if (spider_frame == 2) {
      spider_body.innerText = "<\\|∞>";
    } else if (spider_frame == 3) {
      spider_body.innerText = "/>\\∞)";  
    }
  }

  // iterate the spider's animation frame
  spider_frame++;
  if (spider_frame > 3) spider_frame = 0;
}