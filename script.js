document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const text = button.textContent.trim();
      if (text.includes("Take Test") || text.includes("Start")) {
        button.textContent = "Open Now";
      }
    });
  });
});
