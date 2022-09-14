const setupScrolling = () => {
  const container = [...document.querySelectorAll(".movie-container")];
  const next = [...document.querySelectorAll(".nxt-btn")];
  const prebtn = [...document.querySelectorAll(".pre-btn")];

  container.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
        let containerWidth = containerDimensions.width;
    next[i].addEventListener("click",() => {
        item.scrollLeft += containerWidth;
      })
    
    prebtn[i].addEventListener('click',()=>{
        item.scrollLeft -= cocontainerWidth;

    })
  });
};
