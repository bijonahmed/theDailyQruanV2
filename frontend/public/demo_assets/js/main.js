(function($) {
  "use strict";

  // Back To Top - Start
  // --------------------------------------------------
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.backtotop:hidden').stop(true, true).fadeIn();
    } else {
      $('.backtotop').stop(true, true).fadeOut();
    }
  });
  $(function() {
    $(".scroll").on('click', function() {
      $("html,body").animate({scrollTop: 0}, "slow");
      return false
    });
  });
  // Back To Top - End
  // --------------------------------------------------

  // Tilt - Start
  // --------------------------------------------------
  $('.tilt').tilt({
    maxTilt:        20,
    perspective:    1000,
    scale:          1.02,
    speed:          1000,
    glare:          false,
    maxGlare:       1
  });
  // Tilt - End
  // --------------------------------------------------

  // Partical - Start
  // --------------------------------------------------
  if ($('.page_wrapper').length) {
    const colors = ["#ffffff"];

    const numBalls = 20;
    const balls = [];

    for (let i = 0; i < numBalls; i++) {
      let ball = document.createElement("div");
      ball.classList.add("ball");
      ball.style.background = colors[Math.floor(Math.random() * colors.length)];
      ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
      ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
      ball.style.transform = `scale(${Math.random()})`;
      ball.style.width = `${Math.random()}em`;
      ball.style.height = ball.style.width; 
      balls.push(ball);

      $('.page_wrapper').append(ball);
    }

    balls.forEach((el, i, ra) => {
      let to = {
        x: Math.random() * (i % 2 === 0 ? -11 : 11),
        y: Math.random() * 12
      };

      let anim = el.animate(
        [
        { transform: "translate(0, 0)" },
        { transform: `translate(${to.x}rem, ${to.y}rem)` }
        ],
        {
          duration: (Math.random() + 1) * 2000,
          direction: "alternate",
          fill: "both",
          iterations: Infinity,
          easing: "ease-in-out"
        }
        );
    });
  }
  // Partical - End
  // --------------------------------------------------

  // Wow js - Start
  // --------------------------------------------------
  var wow = new WOW({
    animateClass: 'animated',
    offset: 100,
    mobile: true,
    duration: 1000,
  });
  wow.init();
  // Wow js - End
  // --------------------------------------------------

  // Mouse Move Parallax - Start
  // --------------------------------------------------
  $('.mouse_move').parallax({
    scalarX: 10.0,
    scalarY: 10.0,
  });
  // Mouse Move Parallax - End
  // --------------------------------------------------

})(jQuery);