// const exampleForm = document.getElementById("form");
// exampleForm.addEventListener("submit", handlSubmitExampleForm);
// function handlSubmitExampleForm(event) {
//   event.preventDefault();
//   const username = document.querySelector("input[name=username");
//   const lastname = document.querySelector("input[name=lastname");
//   const result = document.querySelector("#register-result");

//   result.textContent = `${username.value}, ${lastname.value} registered.`;

//   username.value = "";
//   lastname.value = "";
// }

fetch("http://localhost:8080/names")
  .then((resp) => resp.json())
  .then((response) => {
    console.log(response);
    const ul = document.createElement("ul");
    response.forEach((name) => {
      const li = document.createElement("li");
      li.textContent = name;
      ul.append(li);
    });

    document.body.append(ul);
  })
  .catch((error) => console.error(error));
