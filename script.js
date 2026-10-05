document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("[data-link]");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.link;
      if (target) {
        window.location.href = target;
      }
    });
  });

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".main-nav a");
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    }
  });
});
