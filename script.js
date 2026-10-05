document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    const text = button.textContent.trim();
    button.addEventListener("click", () => {
      if (text.includes("Start") || text.includes("Take Test") || text.includes("Open Now")) {
        button.textContent = "Open Now";
      }
    });
  });
});
