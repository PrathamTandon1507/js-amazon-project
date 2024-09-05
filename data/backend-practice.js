const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => { //wait till request goes to backend and response combes back
    console.log(xhr.response);
});

xhr.open('GET', 'https://supersimplebackend.dev'); // /hello -> URL path, different paths give different responses 
xhr.send();

// Using the browser does the same thing as GET request