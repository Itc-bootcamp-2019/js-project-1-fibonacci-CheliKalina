
document.getElementById('button-addon2').addEventListener("click", goFetch);


function showLoader(){
    let loader = document.createElement("div")
    loader.classList.add("spinner-border")

        let spinner = document.createElement("span")
        spinner.classList.add("sr-only");

        const wrapper = document.getElementById('wrapper');
        loader.append(spinner);
        wrapper.append(loader);

}
function hideLoader(){
    document.getElementById('wrapper').style.display = 'none';
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
        
    } else if (userInput == 42) {
        document.getElementById('serverResult').innerText = "Server Error: 42 is the meaning of life";
        document.getElementById('serverResult').setAttribute('class', 'textError42')        
        setTimeout(function () {
            location.reload();
        }, 3000);

    } else {
        showLoader();
        fetch(url)
        .then(response =>
            response.json())
            .then(data => {
                console.log(data.result);
                hideLoader();
                let result = document.getElementById('serverResult');
                result.innerText = data.result;
            })
            .catch(error => {
                throw(error);
            })
    }
}