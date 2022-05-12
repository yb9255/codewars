const backBtn = document.querySelector(".btn--back");

if (backBtn) {
  backBtn.addEventListener("click", () => {
    window.history.back();
  });
}
