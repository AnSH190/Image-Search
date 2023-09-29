var images = [];
var imageIndex = 0;

async function search() {
  var query = document.getElementById("search").value;
  try {
    const response = await fetch(
      "https://bing-image-search1.p.rapidapi.com/images/search?q=" + query,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "bing-image-search1.p.rapidapi.com",
          "x-rapidapi-key":
            "eb710828a4msha295e99c039484cp1d0831jsn27ecaf0d4f0d",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    images = data.value;
    imageIndex = 0;
    document.getElementById("results").innerHTML = "";
    showMore();
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

function showMore() {
  var resultsDiv = document.getElementById("results");
  for (var i = 0; i < 21; i++) {
    var img = document.createElement("img");
    img.src = images[imageIndex + i].thumbnailUrl;
    resultsDiv.appendChild(img);
  }
  imageIndex += Math.min(20, images.length - imageIndex);
  document.getElementById("more").style.display =
    imageIndex < images.length ? "block" : "none";
}
