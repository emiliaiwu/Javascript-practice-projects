
// Select Elements
const carousel = document.querySelector('.carousel');
const arrowBtns = document.querySelectorAll('.container i');
const firstCardWidth = carousel.querySelector(".card").offsetWidth;

let isDragging = false, startX, startScrollLeft;

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id === left ? -firstCardWidth : firstCardWidth;
    })
})

// 
const dragStart = (e) => {
    isDragging = true;
    // disabling text from being selected while dragging
    carousel.classList.add('dragging');

    // record initial scroll position and cursor
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragStop = () => {
    isDragging = false;

		// enabling text from being selected while dragging
		carousel.classList.remove("dragging");
}

// 
const dragging = (e) => {
    if (!isDragging) return;

    // updates scroll position to mouse movements
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
