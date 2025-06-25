
  const toggleBtn = document.getElementById("theme-toggle");

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const dark = document.body.classList.contains("dark-mode");
    toggleBtn.textContent = dark ? "☀️" : "🌙";
    localStorage.setItem("theme", dark ? "dark" : "light");
  });


  window.addEventListener("load", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
      toggleBtn.textContent = "☀️";
    }
  });
