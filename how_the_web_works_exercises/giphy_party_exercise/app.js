// Define variables - API key, html,*
// Don't allow blank search - if search = blank, alert +
// Limit width of gif, add inline**
// add style*

function addGif(response) {
  let responseLength = response.data.length;
  if (responseLength) {
    let random = Math.floor(Math.random() * responseLength);
    let $anotherGif = $("<img>", {
      src: response.data[random].images.original.url,
    });
    $("#gifs").prepend($anotherGif);
  }
}

$("form").on("submit", async function (e) {
  e.preventDefault();

  let search = $("#search").val();
  if (search !== "") {
    const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
      params: {
        q: search,
        api_key: "p1I8AbxbnjmpKc2ZEjhWwOHBn2MDfQi5",
      },
    });

    addGif(response.data);
  } else {
    alert("Please enter a search term!");
  }
});

$("#remove-images").on("click", function () {
  $("#gifs").empty();
  $("#search").val("");
});
