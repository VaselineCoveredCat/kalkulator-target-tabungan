const inputs: NodeListOf<Element> = document.querySelectorAll(".js-check");
const calc: HTMLButtonElement = document.querySelector("button")!;

function checkInput(el: HTMLInputElement): void {
  if (/^([1-9]\d*)$/.test(el.value)) {
    el.nextElementSibling!.setAttribute("hidden", "");
    el.setAttribute("aria-invalid", "false");
    el.classList.toggle("valid", true);
    el.classList.toggle("invalid", false);
  } else {
    el.nextElementSibling!.removeAttribute("hidden");
    el.setAttribute("aria-invalid", "true");
    el.classList.toggle("valid", false);
    el.classList.toggle("invalid", true);
  }
}

inputs.forEach((item: Element): void => {
  item.addEventListener("keydown", (event: Event): void => {
    if (
      !"0123456789".includes((event as KeyboardEvent).key) &&
      !["ArrowLeft", "ArrowRight", "Backspace", "Delete", "Enter", "Tab"].includes((event as KeyboardEvent).key)
    ) {
      event.preventDefault();
    }
  });

  item.addEventListener("blur", (event: Event): void => {
    checkInput(event.target as HTMLInputElement);
  });
});

calc.addEventListener("click", (event: MouseEvent): void => {
  event.preventDefault();

  inputs.forEach((item: Element): void => {
    checkInput(item as HTMLInputElement);
  });

  if (document.querySelector("input:invalid")) {
    (document.querySelector("input:invalid")! as HTMLElement).focus();
  } else {
    const goal: number = +(document.querySelector("#goal")! as HTMLInputElement).value;
    const income: number = +(document.querySelector("#income")! as HTMLInputElement).value;
    const deadline: number = +(document.querySelector("#deadline")! as HTMLInputElement).value;

    const offsetLow: number = goal - goal * 0.02;
    const offsetHigh: number = goal + goal * 0.02;

    let max: number = 100;
    let min: number = 0;
    let mid: number = 0;

    if (income * deadline > goal) {
      while (true) {
        let saved: number = 0;
        mid = (min + max) / 2;

        for (let i = 0; i < deadline; i++) {
          saved = saved + income * (mid / 100);
        }

        if (saved >= offsetLow && saved <= offsetHigh) {
          document.querySelector(".js-result")!.textContent = `${new Intl.NumberFormat("id").format(
            +(income * (mid / 100)).toFixed()
          )}`;
          break;
        } else if (saved < offsetLow) {
          min = mid;
        } else if (saved > offsetHigh) {
          max = mid;
        }
      }
    } else {
      document.querySelector(".js-result")!.textContent = "Tidak mungkin.";
    }

    inputs.forEach((item: Element): void => {
      (item as HTMLInputElement).value = "";
      (item as HTMLInputElement).classList.toggle("valid", false);
    });
  }
});
