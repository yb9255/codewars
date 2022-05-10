console.log("hello world!");

const backBtn = document.querySelector(".btn--back");
const textarea = document.querySelector("#code-mirror");

if (backBtn) {
  backBtn.addEventListener("click", () => {
    window.history.back();
  })
}

if (textarea) {
  CodeMirror.fromTextArea(textarea, {
    lineNumbers: true,
    tabSize: 2,
    mode: "javascript",
  }).setValue(`function solution() {\n // write your code!\n}\n`);
}