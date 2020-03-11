document.getElementById("button-addon2").addEventListener("click", () => {
    fibonacci();
});
document.getElementById("saveCalc").addEventListener("click", checkBox);
function checkBox() {
    let checkedBox = document.getElementById("saveCalc");
    if (checkedBox.checked == true) {
        console.log('checkBoxON')
        document.getElementById('button-addon2').addEventListener("click", () => {
            goFetch();
            console.log('fetched')
        });
    } else {
        console.log('checkBoxOff')
        document.getElementById('button-addon2').addEventListener("click", () => {
            fibonacci();
            console.log('locallyCalculated')
        });
    }
}
function fibonacci() {
    let userInput = document.getElementById('userInput').value;
    let fx;
    let f1 = 1;
    let f2 = 0;
    if (parseInt(userInput) === 0) {
        document.getElementById('serverResult').innerText = 0
    } else if (parseInt(userInput) === 1) {
        document.getElementById('serverResult').innerText = 1
    } else {
        for (let i = 2; i <= parseInt(userInput); i++) {
            fx = f1 + f2;
            f2 = f1;
            f1 = fx;
        }
        // console.log(fx);
        document.getElementById('serverResult').innerText = fx;
    }
}
function goFetch() {
    let userInput = document.getElementById('userInput').value;
    const url = 'http://localhost:5050/fibonacci/' + userInput;
    showLoader();
    if (userInput > 50) {
        let number = document.getElementById('userInput')
        number.setAttribute('class', 'inputError');
        let error = document.getElementById('serverError')
        error.innerText = "Can’t be larger than 50";
        error.setAttribute('class', 'error');
        setTimeout(function () {
            location.reload();
        }, 3000);
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
                    if (!typeof data === "object") {
                    let result = document.getElementById('serverResult');
                    result.innerHTML = data.result;

                } else {
                    let result = document.getElementById('serverResult');
                    result.classList.add('textError42');
                    result.innerHTML = "Server Error: " + data;
                    
                    }
                  });
                // .then(data => {
            //     hideLoader();
            //     let result = document.getElementById('serverResult');
            //     result.innerText = data.result;
            // })
        hideLoader();
        showResults();
    }
}


function callServer() {
    restart();
    let number = document.getElementById("number").value;
    if (number > 50) {
      moreThan50();
    } else {
      loader.style.visibility = "visible";
      fetch("http://localhost:5050/fibonacci/" + number)
        .then(response => {
          if (response.status === 400) {
            return response.text();
          } else {
            return response.json();
          }
        })
        .then(data => {
          if (typeof data === "object") {
            console.log(result);
            result.style.color = "black";
            result.innerHTML = data.result;
          } else {
            result.style.color = " #D9534F";
            result.innerText = "server Error:" + data;
          }
          newCall();
          loader.style.visibility = "hidden";
        });
    }
  }



function showResults() {
                showResultsLoader();
                fetch('http://localhost:5050/getFibonacciResults')
                    .then(response =>
                        response.json())
                    .then(data => {

                        for (i = 0; i < data.results.length; i++) {
                            let dataResults = data.results[i];
                            let outputNumber = dataResults.number;
                            let outputResult = dataResults.result;
                            let outputCreatedDate = new Date(dataResults.createdDate);
                            let resultsList = document.getElementById('resultsList');
                            let listItem = document.createElement('li');
                            let div = document.createElement('div');

                            div.classList.add('underlineResults');
                            resultsList.append(listItem);
                            listItem.append(div);

                            let text1 = document.createElement('span')//.innerHTML = "The Fibonacci Of ";
                            text1.innerHTML = "The Fibonacci Of ";
                            text1.setAttribute('class', 'inline');
                            div.append(text1);

                            let text2 = document.createElement('span')//.innerHTML = outputNumber;
                            text2.classList.add('bold');
                            // text2.setAttribute('class', 'bold');
                            text2.innerHTML = outputNumber
                            div.append(text2);

                            let text3 = document.createElement('span')//.innerHTML = " is ";
                            text3.innerHTML = " is ";
                            text3.setAttribute('class', 'inline');
                            div.append(text3);

                            let text4 = document.createElement('span');
                            text4.classList.add('bold');
                            // text4.setAttribute('class', 'bold'); 
                            text4.innerHTML = outputResult
                            div.append(text4);

                            let text5 = document.createElement('span')//.innerHTML = " Calculated at: ";
                            text5.innerHTML = " Calculated at: ";
                            text5.setAttribute('class', 'inline');
                            div.append(text5);

                            let text6 = document.createElement('span')//.innerHTML = outputCreatedDate;;
                            text6.innerHTML = outputCreatedDate;
                            text6.setAttribute('class', 'inline');
                            div.append(text6);

                            // let displayText = text1 + text2 + text3 + text4 + text5 + text6;
                            // listItem.append(displayText)

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
// arr.sort(function (a, b) {
//     var keyA = new Date(a.updated_at),
//         keyB = new Date(b.updated_at);
//     // Compare the 2 dates
//     if (keyA < keyB) return -1;
//     if (keyA > keyB) return 1;
//     return 0;
// });