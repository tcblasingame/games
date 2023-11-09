function handleCellClick(event) {
    const cell = event.target;
    if (cell.textContent || winner || cell.classList.contains("game-over")) return;

    cell.textContent = currentPlayer;
    cell.style.cursor = "not-allowed";

    if (checkWin()) {
        winner = currentPlayer;
        cells.forEach((cell) => cell.classList.add("game-over"));
    } else if (cells.every((cell) => cell.textContent)) {
        winner = "draw";
        cells.forEach((cell) => cell.classList.add("game-over"));
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("reset-button").addEventListener("click", function () {
        location.reload();
    });
});

function resetGame() {
    // ... your existing resetGame code ...
    cells.forEach((cell) => cell.classList.remove("game-over"));
}

function checkWin() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (
            cells[a].textContent &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent
        ) {
            cells[a].style.background = "#ffffff" + "50";
            cells[b].style.background = "#ffffff" + "50";
            cells[c].style.background = "#ffffff" + "50";
            document.getElementById("winner-display").textContent = `${cells[a].textContent} wins!`;
            cells.forEach((cell) => cell.classList.add("game-over"));
            return true;
        }
    }

    if (cells.every((cell) => cell.textContent)) {
        document.getElementById("winner-display").textContent = "It's a draw!";
        cells.forEach((cell) => cell.classList.add("game-over"));
        return true;
    }

    return false;
}


const dropdownBtn = document.querySelectorAll(".dropdown-btn");
const dropdown = document.querySelectorAll(".dropdown");
const hamburgerBtn = document.getElementById("hamburger");
const navMenu = document.querySelector(".menu");
const links = document.querySelectorAll(".dropdown a");

function setAriaExpandedFalse() {
  dropdownBtn.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
}

function closeDropdownMenu() {
  dropdown.forEach((drop) => {
    drop.classList.remove("active");
    drop.addEventListener("click", (e) => e.stopPropagation());
  });
}

function toggleHamburger() {
  navMenu.classList.toggle("show");
}

dropdownBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const dropdownIndex = e.currentTarget.dataset.dropdown;
    const dropdownElement = document.getElementById(dropdownIndex);

    dropdownElement.classList.toggle("active");
    dropdown.forEach((drop) => {
      if (drop.id !== btn.dataset["dropdown"]) {
        drop.classList.remove("active");
      }
    });
    e.stopPropagation();
    btn.setAttribute(
      "aria-expanded",
      btn.getAttribute("aria-expanded") === "false" ? "true" : "false"
    );
  });
});

// close dropdown menu when the dropdown links are clicked
links.forEach((link) =>
  link.addEventListener("click", () => {
    closeDropdownMenu();
    setAriaExpandedFalse();
    toggleHamburger();
  })
);

// close dropdown menu when you click on the document body
document.documentElement.addEventListener("click", () => {
  closeDropdownMenu();
  setAriaExpandedFalse();
});

// close dropdown when the escape key is pressed
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeDropdownMenu();
    setAriaExpandedFalse();
  }
});

// toggle hamburger menu
hamburgerBtn.addEventListener("click", toggleHamburger);