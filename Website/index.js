// Typewriter Effect
const app = document.getElementById('app');
const typewriter = new Typewriter(app, {
  loop: true,
  delay: 75,
});

typewriter
  .pauseFor(1000)
  .typeString('I am a software developer and robotics researcher studying @ UVA')
  .pauseFor(3000)
  .start();

// Granim Background
const granimInstance = new Granim({
  element: '#canvas-image-blending',
  direction: 'top-bottom',
  isPausedWhenNotInView: true,
  image: {
    source: 'assets/snow.jpg',
    blendingMode: 'multiply',
  },
  states: {
    "default-state": {
      gradients: [
        ['#29323c', '#485563'],
        ['#FF6B6B', '#556270'],
        ['#80d3fe', '#7ea0c4'],
        ['#f0ab51', '#eceba3']
      ],
      transitionSpeed: 8000
    }
  }
});

// Modal Functionality
function setupModal(modalId, btnId, closeClass) {
  const modal = document.getElementById(modalId);
  const btn = document.getElementById(btnId);
  const closeBtn = document.getElementsByClassName(closeClass)[0];

  if (btn) {
    btn.onclick = () => {
      modal.style.display = "block";
    };
  }
  if (closeBtn) {
    closeBtn.onclick = () => {
      modal.style.display = "none";
    };
  }
}

// Set up modals for buttons
setupModal("modal1", "btn1", "closeModal1");
setupModal("modal2", "btn2", "closeModal2");
setupModal("modal4", "btn4", "closeModal4");
setupModal("modal5", "btn5", "closeModal5");

// Hobby modals setup
setupModal("modalHobby1", "hobbyBtn1", "closeModalHobby1");
setupModal("modalHobby2", "hobbyBtn2", "closeModalHobby2");
setupModal("modalHobby3", "hobbyBtn3", "closeModalHobby3");
setupModal("modalHobby4", "hobbyBtn4", "closeModalHobby4");
setupModal("modalHobby5", "hobbyBtn5", "closeModalHobby5");
setupModal("modalHobby6", "hobbyBtn6", "closeModalHobby6");

// External Links
// External Links
document.getElementById("btn2").onclick = () => window.open("https://github.com/zachkr05/ROSbot_data_collection", "_blank");
document.getElementById("btn1").onclick = () => window.open("https://vanguardlawplc.com/", "_blank");
document.getElementById("btn3").onclick = () => window.open("https://www.bezzorobotics.com/", "_blank");
document.getElementById("btn4").onclick = () => window.open("https://github.com/zachkr05/WhisteleBlowerWebApp", "_blank");

// Additional social links
document.getElementById("btn6").onclick = () => window.open("https://www.linkedin.com/in/zachariah-risheq/", "_blank");

// Close modal on outside click
window.onclick = function(event) {
  const modals = document.querySelectorAll(".modal");
  modals.forEach(modal => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
};
