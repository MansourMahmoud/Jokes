let input = document.querySelector("input");
let btn = document.querySelector("button");
let informations = document.querySelector(".informations");
let paragraphContainer = document.querySelector(".paragraph_container");

// disabled for button
window.addEventListener("DOMContentLoaded", () => {
  btn.setAttribute("disabled", "");
});

// available for button
input.addEventListener("keyup", () => {
  if (input.value !== "") {
    btn.removeAttribute("disabled", "");
  } else {
    btn.setAttribute("disabled", "");
  }
});

btn.addEventListener("click", () => {
  let myRequest = new XMLHttpRequest();

  myRequest.open("GET", "https://api.imgflip.com/get_memes");
  myRequest.send();

  myRequest.onreadystatechange = () => {
    if (myRequest.readyState === 4 && myRequest.status === 200) {
      let obj = JSON.parse(myRequest.response);

      if (input.value >= 1 && input.value <= 100) {
        let filtering = obj.data.memes.filter((arr, index) => {
          if (input.value == index + 1) {
            return arr;
          }
        });

        filtering.forEach((element) => {
          informations.innerHTML = `
                    <h1>${element.name}</h1>
                    <img src="${element.url}">
                    `;
        });
        paragraphContainer.innerHTML = "";
        input.value = "";
        btn.setAttribute("disabled", "");
      } else {
        paragraphContainer.innerHTML = `
                <p class="mt-5">Please type number from 1 to 100 for a result</p>
                `;
        informations.innerHTML = "";
        input.value = "";
        btn.setAttribute("disabled", "");
      }
    }
  };
});
