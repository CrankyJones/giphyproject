import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function () {
  $("#searchButton").click(function (event) {
    event.preventDefault();
    const search = $('#search').val();
    $('#search').val("");

    let request = new XMLHttpRequest();
    const url = `http://api.giphy.com/v1/gifs/search?q=${search}&api_key=${process.env.API_KEY}`;

    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      console.log(response);
      for (let x = 0; x < 4; x++) {
        $('.showGif').append(`<img src=${response.data[x].url}>`);
        console.log(`${response.data[x].url}`);
      }
    }
  });
});
