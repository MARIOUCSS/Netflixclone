

//localizar el id del link
let movie_id=location.pathname;

fetch(`${movie_detail_http}${movie_id}?`+new URLSearchParams({
    api_key:api_key
}))
.then(res=>res.json())
.then(data=>{
    console.log(data)
    setupMovieinfo(data);
})

const setupMovieinfo=(data)=>{
const nombrevideo=document.querySelector('.movie-name')
const genres=document.querySelector('.genres')
const des=document.querySelector('.des')
const title=document.querySelector('title')
const backdrop=document.querySelector('.movie-info')

title.innerHTML=nombrevideo.innerHTML=data.title
 genres.innerHTML=`${data.release_date.split('-')[0]} | `;

 for (let index = 0; index <data.genres.length; index++) {
     genres.innerHTML+=data.genres[index].name +formatString(index,data.genres.length)
    
 }
 if(data.adult==true){
    genres.innerHTML+='|+18'
 }
 if(data.backdrop==null){
    data.backdrop_path=data.poster_path;
 }
 des.innerHTML=data.overview.substring(0,200)+'...';
 backdrop.style.backgroundImage = `url(${original_img_url}${data.backdrop_path})`;
}

const formatString=(currentIndex,maxIndex)=>{
return (currentIndex==maxIndex-1)? ' ':','
}

fetch(`${movie_detail_http}${movie_id}/credits?`+new URLSearchParams({
    api_key:api_key
}))
.then(res=>res.json())
.then(data=>{
    console.log(data);
    const cast=document.querySelector('.starring');
    for (let index = 0; index <5; index++) {
        //const element = array[index];
        cast.innerHTML+=data.cast[index].name + formatString(index,5);
    }
})


fetch(`${movie_detail_http}${movie_id}/videos?`+new URLSearchParams({
    api_key:api_key
}))
.then(res=>res.json())
.then(data=>{
   // console.log(data);
    let trailerContainer=document.querySelector('.trailer-container')
    let maxClips=(data.results.length<4)?4:data.results.length;
  
       
        for(let i = 0; i < maxClips; i++){
            trailerContainer.innerHTML += `
            <iframe src="https://youtube.com/embed/${data.results[i].key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            `;
        }
    
})

fetch(`${movie_detail_http}${movie_id}/recommendations?` + new URLSearchParams({
    api_key: api_key
}))
.then(res=>res.json())
.then(data=>{
    console.log(data)
     let container=document.querySelector('.recomendations-container');

    for (let index = 0; index < 14; index++) {
        if(data.results[index].backdrop_path===null){
            index++;
        }
        container.innerHTML+=`
        <div class="movie" onclick="location.href = '/${data.results[index].id}'">
        <img src="${img_url}${data.results[index].backdrop_path}" alt="">
        <p class="movie-title">${data.results[index].title}</p>
    </div>`
    }
})