const displayContent = document.querySelector('.displayContent')
const displayMoovie = (moovieImage, moovieName, moovieDate, id) => {
  displayContent.innerHTML += `
    <div class="card m-4 cardEffect" style="width: 18rem;">
      <img style="height: 17rem;" src="${moovieImage}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">Name: ${moovieName}</h5>
        <p>Date: ${moovieDate}</p>
        <button class="btn btn-primary" onclick="moovieResume('${id}')">Read more</button>
      </div>
    </div>
  `
}

const search = (event) => {
  event.preventDefault();
  document.querySelector('.displayContent').innerHTML = ""
  const research = document.searchForm.searchBar.value;
  const splitResearch = research.split(' ').join('+');
  fetch(`https://www.omdbapi.com/?s=${splitResearch}&apikey=e7fdb520`)
    .then((response) => response.json())
    .then((data) => {
      data.Search.forEach((item) => {
        const name = item.Title;
        const image = item.Poster;
        const date = item.Year
        const id = item.imdbID
        displayMoovie(image, name, date, id);
      });
      let observer = new IntersectionObserver(function (entry) {
        entry.forEach((element) => {
          if (element.intersectionRatio > 0.5) {
            element.target.classList.remove("not-visible")
          } else {
            element.target.classList.add("not-visible")
          }
        })
      }, {
        threshold: [0.5]
      })
      const element = document.querySelectorAll('.cardEffect')
      console.log(element)
      element.forEach((item) => {
        item.classList.add('not-visible')
        observer.observe(item)
      })
    });
};

const moovieResume = (id) => {
  fetch(`https://www.omdbapi.com/?i=${id}&apikey=e7fdb520`)
    .then((response) => response.json())
    .then((data) => {
      const resum = data.Plot
      const moovieImage = data.Poster
      injectModal(resum, moovieImage)
    });
}

const moovieModal = document.querySelector('.moovieModal')
const injectModal = (resum, moovieImage) => {
  moovieModal.innerHTML += `
  <div id="myModal" class="modal">
  <div class="modal-content">
  <span class="close">&times;</span>
    <div class="modal-header">
      <img class="card-img-top" style="height: 17rem;" src="${moovieImage}" alt="Card image cap">
    </div>
    <div class="modal-body">
      <h1>Resum:</h1>
      <p>${resum}</p>
    </div>
    <div class="modal-footer">
    </div>
  </div>
</div>
  `
  var span = document.querySelector(".close");
  span.addEventListener("click", () => {
    document.querySelector('.moovieModal').innerHTML = '';
  })
}

