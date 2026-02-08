window.startIntro = function () {

  var $scramble = $("#scramble");

  if (!$scramble.length) {
    console.error("Scramble element not found");
    return;
  }

  // Start scramble
  $scramble.scramble(3000, 20, "alphabet", true);

  // GSAP timeline
  var tl = gsap.timeline({
    onComplete: function () {
      // Only finish when ALL animations are done
      window.dispatchEvent(new Event("scrambleDone"));
    }
  });

  tl.to(".loading", {
    opacity: 0,
    delay: 1.5,
  })
    .to(".loader", {
      opacity: 0,
      duration: 0.5,
      ease: "expo.inOut",
    })
    .to(".loader", {
      y: "-100%",
      duration: 0.5,
    });
};
