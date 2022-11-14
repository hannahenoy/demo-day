let trash = document.getElementsByClassName("fa fa-times");
let save = document.getElementsByClassName("save");
const deleteSaved = document.querySelectorAll(".deleteSaved")
// const savedMusic = document.querySelector(".savedMusic").querySelectorAll(".artistName")
let love = document.getElementsByClassName("love");
var thumbUp = document.getElementsByClassName("fa-heart");
// let deletePhoto = document.getElementsByClassName("rubbish");


  
Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(){
    fetch('inspo', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'id': element.id
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});



Array.from(save).forEach(function(element) {
  element.addEventListener('click', function(){
    // console.log('trying to save')
    const songTitle = this.parentNode.querySelector('.albumName').innerText
    const artist = this.parentNode.querySelector('.artist').innerText
    const moviePoster = this.parentNode.querySelector('.link').innerText
    fetch('saveMovie', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'songTitle': songTitle,
        'artist': artist,
        'moviePoster': moviePoster
      })
    })
    .then(response => {
      console.log(response)
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  });
});

Array.from(love).forEach(function(element) {
element.addEventListener('click', function(){
console.log('trying to love')
const songTitle = this.parentNode.querySelector('.albumName').innerText
const artist = this.parentNode.querySelector('.artist').innerText
const moviePoster = this.parentNode.querySelector('.link').innerText
fetch('saveMovie', {
  method: 'post',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    'songTitle': songTitle,
    'artist': artist,
    'moviePoster': moviePoster
  })
})
.then(response => {
  console.log(response)
  if (response.ok) return response.json()
})
.then(data => {
  console.log(data)
  window.location.reload(true)
})
});
});

Array.from(love).forEach(function(element) {
element.addEventListener('click', function(){
const songTitle = this.parentNode.querySelector('.albumName').innerText
const artist = this.parentNode.querySelector('.artist').innerText
const moviePoster = this.parentNode.querySelector('.link').innerText
const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[7].innerText)
fetch('saveMovie', {
  method: 'put',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    'songTitle': songTitle,
    'artist': artist,
    'moviePoster': moviePoster,
    'thumbUp':thumbUp
  })
})
.then(response => {
  if (response.ok) return response.json()
})
.then(data => {
  console.log(data)
  window.location.reload(true)
})
});
});

// PLAYLIST DELETE SONG 
// deleteSaved.forEach((button) => {
// button.addEventListener('click', function(){
// let movieId = button.parentNode.childNodes[1].innerText
// console.log(movieId)
// console.log(button.parentNode.childNodes)

// fetch('deleteSave', {
//   method: 'delete',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     movieId: movieId,
//   })
// }).then(function (response) {
//   window.location.reload()
// })
// });
// })


// Array.from(love).forEach(function(element) {
//   element.addEventListener('click', function(){
//     const name = this.parentNode.parentNode.childNodes[1].innerText
//     const msg = this.parentNode.parentNode.childNodes[3].innerText
//     const love = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//     fetch('messages', {
//       method: 'put',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({
//         'name': name,
//         'msg': msg,
//         'love':love
//       })
//     })
//     .then(response => {
//       if (response.ok) return response.json()
//     })
//     .then(data => {
//       console.log(data)
//       window.location.reload(true)
//     })
//   });
// });


// Array.from(trash).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         fetch('messages', {
//           method: 'delete',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg
//           })
//         }).then(function (response) {
//           window.location.reload()
//         })
//       });
// });
