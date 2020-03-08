
document.getElementById('button-addon2').addEventListener("click", () => {
    goFetch();
    showLoader();

});

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

    } else if (userInput == 42) {
        document.getElementById('serverResult').innerText = "Server Error: 42 is the meaning of life";
        document.getElementById('serverResult').setAttribute('class', 'textError42')
        setTimeout(function () {
            location.reload();
        }, 3000);

    } else {
        fetch(url)
            .then(response =>
                response.json())
            .then(data => {

                hideLoader();
                let result = document.getElementById('serverResult');
                result.innerText = data.result;
                showResults()
            })
            .catch(error => {
                throw (error);
            })
    }
}

function showResults() {
    showResultsLoader();
    fetch('http://localhost:5050/getFibonacciResults')
        .then(response =>
            response.json())
        .then(data => {

            let outputNumber;
            let outputResult;
            let outputCreatedDate;

            for (i = 0; i < data.results.length; i++) {
                let dataResults = data.results[i]
                outputNumber = dataResults.number;
                outputResult = dataResults.result;
                outputCreatedDate = new Date(dataResults.createdDate);

                
                let resultsList = document.getElementById('resultsList');
                let listItem = document.createElement('li');
                
                resultsList.append(listItem);




                listItem.setAttribute('id','item');
                listItem.classList.add('underlineResults');
                listItem.innerText = "The Fibonnaci Of " + outputNumber + " is " + outputResult + " Calculated at: " + outputCreatedDate;
            }

            hideResultsLoader();
        })
        .catch(error => {
            throw (error);
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
    document.getElementById('wrapper').style.display = 'none';
}

function showResultsLoader() {
    let resultLoader = document.createElement("div")
    resultLoader.classList.add("spinner-border")

    let resultSpinner = document.createElement("span")
    resultSpinner.classList.add("sr-only");

    const wrapper2 = document.getElementById('wrapper2');
    resultLoader.append(resultSpinner);
    wrapper2.append(resultLoader);
}

function hideResultsLoader() {
    document.getElementById('wrapper2').style.display = 'none';

}



// arr.sort(function (a, b) {
//     var keyA = new Date(a.updated_at),
//         keyB = new Date(b.updated_at);
//     // Compare the 2 dates
//     if (keyA < keyB) return -1;
//     if (keyA > keyB) return 1;
//     return 0;
// });


