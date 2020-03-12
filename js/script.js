document.getElementById("button-addon2").addEventListener("click", () => {
  showLoader();
  setTimeout(fibonacci, 1000);
})

document.getElementById("saveCalc").addEventListener("click", checkBox);

function checkBox() {
  let checkedBox = document.getElementById("saveCalc");
  if (checkedBox.checked == true) {
    document.getElementById('button-addon2').addEventListener("click", () => {
      goFetch();
    });
  }
}
function fibonacci() {
  let userInput = document.getElementById('userInput').value;
  let fx;
  let f1 = 1;
  let f2 = 0;
  if (parseInt(userInput) === 0) {
    showLoader();
    document.getElementById('serverResult').innerText = 0
  } else if (parseInt(userInput) === 1) {
    showLoader();
    document.getElementById('serverResult').innerText = 1
  } else if (parseInt(userInput) > 50) {
    showLoader();
    let number = document.getElementById('userInput')
    number.setAttribute('class', 'inputError');
    let error = document.getElementById('serverError')
    error.innerText = "Can’t be larger than 50";
    error.setAttribute('class', 'error');
    setTimeout(function () {
      location.reload();
    }, 3000);
  } else if(parseInt(userInput) === 42){
    let result = document.getElementById('serverResult');
    result.classList.add('textError42');
    result.innerHTML = "Server Error: 42 is the meaning of life"
  } else {
    showLoader();
    for (let i = 2; i <= parseInt(userInput); i++) {
      fx = f1 + f2;
      f2 = f1;
      f1 = fx;
    }
    document.getElementById('serverResult').innerText = fx;
  }
  hideLoader();
}
function goFetch() {
  let userInput = document.getElementById('userInput').value;
  const url = 'http://localhost:5050/fibonacci/' + userInput;
  if (userInput > 50) {
    let number = document.getElementById('userInput')
    number.setAttribute('class', 'inputError');
    let error = document.getElementById('serverError')
    error.innerText = "Can’t be larger than 50";
    error.setAttribute('class', 'error');
    setTimeout(function () {
      location.reload();
    }, 3000);
  } else if (parseInt(userInput) === 0){
    // hideLoader();
    document.getElementById('serverResult').innerText = 0
  } else {
    fetch(url)
      .then(response => {
        if (response.status === 400) {
          return response.text();
        } else {
          return response.json();
        }
      })
      .then(data => {
        if (typeof data === "object") {
          let result = document.getElementById('serverResult');
          result.innerHTML = data.result;
        } else {
          let result = document.getElementById('serverResult');
          result.classList.add('textError42');
          result.innerHTML = "Server Error: " + data;
        }
      });
    hideLoader();
    showResults();
  }
}
function showResults() {
  showResultsLoader();
  fetch('http://localhost:5050/getFibonacciResults')
    .then(response =>
      response.json())
    .then(data => {
      let sortByNumAsc = document.getElementById('numAsc');
      let sortByNumDesc = document.getElementById('numDesc');
      let sortByDateAsc = document.getElementById('dateAsc');
      let sortByDateDesc = document.getElementById('dateDesc');
      const sortBy = (e) => {
        if (e.target.innerText === "Number Asc") {
          resultsList.innerHTML = '';
          data.results.sort((a, b) =>  a.number - b.number);
          createOrderedSentence();
        } if (e.target.innerText === "Number Desc") {
          resultsList.innerHTML = '';
          data.results.sort((a, b) =>  b.number - a.number);
          createOrderedSentence();
        } if (e.target.innerText === "Date Asc") {
          resultsList.innerHTML = '';
          data.results.sort((a, b) =>  a.createdDate - b.createdDate);
          createOrderedSentence();
        } if (e.target.innerText === "Date Desc") {
          resultsList.innerHTML = '';
          data.results.sort((a, b) =>  b.createdDate - a.createdDate);
          createOrderedSentence();
        }
      }
      sortByNumAsc.addEventListener('click', sortBy);
      sortByNumDesc.addEventListener('click', sortBy);
      sortByDateAsc.addEventListener('click', sortBy);
      sortByDateDesc.addEventListener('click', sortBy);
        const createOrderedSentence = () => {
          for (i = 0; i < data.results.length; i++) {
            let dataResults = data.results[i];
            let outputNumber = dataResults.number;
            let outputResult = dataResults.result;
            let outputCreatedDate = new Date(dataResults.createdDate);
            let listItem = document.createElement('li');
            let text = document.createElement('div');
    
            text.classList.add('underlineResults');
            resultsList.append(listItem);
            listItem.append(text);
    
            let text1 = document.createElement('span');
            text1.innerHTML = "The Fibonacci Of ";
            text1.setAttribute('class', 'inline');
            text.append(text1);
    
            let text2 = document.createElement('span');
            text2.classList.add('bold');
            text2.innerHTML = outputNumber
            text.append(text2);
    
            let text3 = document.createElement('span');
            text3.innerHTML = " is ";
            text3.setAttribute('class', 'inline');
            text.append(text3);
    
            let text4 = document.createElement('span');
            text4.classList.add('bold');
            text4.innerHTML = outputResult
            text.append(text4);
    
            let text5 = document.createElement('span');
            text5.innerHTML = " Calculated at: ";
            text5.setAttribute('class', 'inline');
            text.append(text5);
    
            let text6 = document.createElement('span');
            text6.innerHTML = outputCreatedDate;
            text6.setAttribute('class', 'inline');
            text.append(text6);
          }
        }

      let resultsList = document.getElementById('resultsList');
      for (i = 0; i < data.results.length; i++) {
        let dataResults = data.results[i];
        let outputNumber = dataResults.number;
        let outputResult = dataResults.result;
        let outputCreatedDate = new Date(dataResults.createdDate);
        let listItem = document.createElement('li');
        let text = document.createElement('div');

        text.classList.add('underlineResults');
        resultsList.append(listItem);
        listItem.append(text);

        let text1 = document.createElement('span');
        text1.innerHTML = "The Fibonacci Of ";
        text1.setAttribute('class', 'inline');
        text.append(text1);

        let text2 = document.createElement('span');
        text2.classList.add('bold');
        text2.innerHTML = outputNumber
        text.append(text2);

        let text3 = document.createElement('span');
        text3.innerHTML = " is ";
        text3.setAttribute('class', 'inline');
        text.append(text3);

        let text4 = document.createElement('span');
        text4.classList.add('bold');
        text4.innerHTML = outputResult
        text.append(text4);

        let text5 = document.createElement('span');
        text5.innerHTML = " Calculated at: ";
        text5.setAttribute('class', 'inline');
        text.append(text5);

        let text6 = document.createElement('span');
        text6.innerHTML = outputCreatedDate;
        text6.setAttribute('class', 'inline');
        text.append(text6);
        hideResultsLoader();
      }
    })
}
function showLoader() {
  let loader = document.createElement("div")
  loader.classList.add("spinner-border")
  let spinner = document.createElement("span")
  spinner.classList.add("sr-only");
  const wrapper = document.getElementById('wrapper');
  loader.append(spinner);
  wrapper.append(loader);
}
function hideLoader() {
  let wrapper2 = document.getElementById('wrapper')
  wrapper2.classList.add('hide');
}
function showResultsLoader() {
  let resultLoader = document.createElement("div")
  resultLoader.classList.add("spinner-border")
  let resultSpinner = document.createElement("span")
  resultSpinner.classList.add("sr-only");
  const wrapper2 = document.getElementById('wrapper2');
  wrapper2.classList.add('wrapper2');
  resultLoader.append(resultSpinner);
  wrapper2.append(resultLoader);
}
function hideResultsLoader() {
  let wrapper2 = document.getElementById('wrapper2')
  wrapper2.setAttribute('class', 'hide');
}