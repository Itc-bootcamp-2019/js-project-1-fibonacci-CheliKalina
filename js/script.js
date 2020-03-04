function goFetch() {

    let userInput = document.getElementById('userInput').value;
    const url = 'http://localhost:5050/fibonacci/' + userInput;

    fetch(url)
        .then(response =>
            response.json())
        .then(data => {
            console.log(data.result)
            document.getElementById('serverResult').innerText = data.result;
        })
    }
    
        





// The response is the calculated fibonacci, present it to the user.
// Calling the server should replace your implementation of calculating fibonacci
