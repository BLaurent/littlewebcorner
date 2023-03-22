document.querySelector(".hamburger").addEventListener("click", () => {
  document.querySelector(".dropdown")?.classList.toggle("dropdown-visible");
});

window.onclick = function (event) {
  if (!event.target?.matches(".hamburger")) {
    document
      .querySelector(".dropdown-visible")
      ?.classList.toggle("dropdown-visible");
  }
};
