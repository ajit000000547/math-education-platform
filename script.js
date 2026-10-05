document.addEventListener("DOMContentLoaded", () => {
  const actionButtons = document.querySelectorAll(".btn[data-link]");

  actionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const link = button.dataset.link;
      if (link) {
        window.location.href = link;
      }
    });
  });
});
