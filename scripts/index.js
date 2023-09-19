"use strict";
const ALL_INPUT = document.querySelectorAll(".js-check");
const CALC = document.querySelector("button");

function checkInput(ele) {
  if (/^([1-9]\d*)$/.test(ele.value)) {
    ele.nextElementSibling.setAttribute("hidden", "");
    ele.setAttribute("aria-invalid", "false");
    ele.classList.toggle("valid", true);
    ele.classList.toggle("invalid", false);
  } else {
    ele.nextElementSibling.removeAttribute("hidden");
    ele.setAttribute("aria-invalid", "true");
    ele.classList.toggle("valid", false);
    ele.classList.toggle("invalid", true);
  }
}

ALL_INPUT.forEach((item) => {
  item.addEventListener("keydown", (event) => {
    if (
      !"0123456789".includes(event.key) &&
      !["ArrowLeft", "ArrowRight", "Backspace", "Delete", "Enter", "Tab"].includes(event.key)
    ) {
      event.preventDefault();
    }
  });

  item.addEventListener("blur", (event) => {
    checkInput(event.target);
  });
});

CALC.addEventListener("click", (event) => {
  event.preventDefault();

  ALL_INPUT.forEach((item) => {
    checkInput(item);
  });

  if (document.querySelector("input:invalid")) {
    document.querySelector("input:invalid").focus();
  } else {
    const GOAL = +document.querySelector("#goal").value;
    const INCOME = +document.querySelector("#income").value;
    const DEADLINE = +document.querySelector("#deadline").value;

    const OFFSET_LOW = GOAL - GOAL * 0.02;
    const OFFSET_HIGH = GOAL + GOAL * 0.02;

    let max = 100;
    let min = 0;
    let mid = 0;
    let bank = 0;

    if (INCOME * DEADLINE > GOAL) {
      while (true) {
        mid = (min + max) / 2;
        bank = 0;

        for (let i = 0; i < DEADLINE; i++) {
          bank = bank + INCOME * (mid / 100);
        }

        if (bank >= OFFSET_LOW && bank <= OFFSET_HIGH) {
          document.querySelector(".js-result").textContent = `${new Intl.NumberFormat("id").format(
            (INCOME * (mid / 100)).toFixed()
          )}`;
          break;
        } else if (bank < OFFSET_LOW) {
          min = mid;
        } else if (bank > OFFSET_HIGH) {
          max = mid;
        }
      }
    } else {
      document.querySelector(".js-result").textContent = "Tidak mungkin.";
    }

    ALL_INPUT.forEach((item) => {
      item.value = "";
      item.classList.toggle("valid", false);
    });
  }
});
