(function () {
  const page = document.body.getAttribute("data-page");

  document.querySelectorAll(".nav-links a[data-page]").forEach((link) => {
    if (link.dataset.page === page) {
      link.classList.add("active");
    }
  });

  const yearNode = document.getElementById("year");
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  const revealNodes = Array.from(document.querySelectorAll(".reveal"));
  if (revealNodes.length === 0) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    revealNodes.forEach((node) => node.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.14 }
  );

  revealNodes.forEach((node) => observer.observe(node));
})();
