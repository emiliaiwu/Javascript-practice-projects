const carousel = document.querySelector(".carousel");
const cards = carousel.querySelectorAll(".card");
const prevButton = document.querySelector(".left");
const nextButton = document.querySelector(".right");

const cardWidth = cards[0].getBoundingClientRect().width + 16;// Add 16px for margin between cards
console.log(cardWidth)
let scrollOffset = 0;


const disablePrev = () => {
    scrollOffset >= cardWidth
			? prevButton.classList.remove("disabled")
			: prevButton.classList.add("disabled");
}

const disableNext = () => {
    scrollOffset <= cardWidth
			? nextButton.classList.remove("disabled")
			: nextButton.classList.add("disabled");
}

// Scroll to previous card
prevButton.addEventListener("click", () => {
	if (scrollOffset >= cardWidth) {
        scrollOffset -= cardWidth;
        disablePrev()
        disableNext()
	} else {
        scrollOffset = 0;
        disablePrev();
		disableNext();
	}

	carousel.scroll({
		left: scrollOffset,
		behavior: "smooth",
	});
});


// Scroll to next card
nextButton.addEventListener("click", () => {
	if (scrollOffset <= cardWidth) {
		scrollOffset += cardWidth;
		disablePrev();
		disableNext();
	} else {
		scrollOffset === cardWidth;
		disablePrev();
		disableNext();
	}

	carousel.scroll({
		left: scrollOffset,
		behavior: "smooth",
	});
});

let startX;
let currentX;
let rafId;

function animateScroll() {
	const diffX = currentX - startX;
	scrollOffset -= diffX;
	carousel.scroll({
		left: scrollOffset,
		behavior: "auto",
	});
	startX = currentX;
	rafId = requestAnimationFrame(animateScroll);
}

carousel.addEventListener("touchstart", (e) => {
	startX = e.touches[0].clientX;
	cancelAnimationFrame(rafId);
});

carousel.addEventListener("touchmove", (e) => {
	currentX = e.touches[0].clientX;
	cancelAnimationFrame(rafId);
	rafId = requestAnimationFrame(animateScroll);
});

carousel.addEventListener("touchend", () => {
	const cardIndex = Math.round(scrollOffset / cardWidth);
	scrollOffset = cardIndex * cardWidth;
	carousel.scroll({
		left: scrollOffset,
		behavior: "smooth",
	});
	cancelAnimationFrame(rafId);
});


// Set up event listener for mouse drag
let isDragging = false;
carousel.addEventListener("mousedown", (e) => {
	isDragging = true;
	startX = e.pageX - scrollOffset;
});

carousel.addEventListener("mousemove", (e) => {
	if (isDragging) {
		const currentX = e.pageX - startX;
		scrollOffset = currentX;
		carousel.scroll({
			left: scrollOffset,
			behavior: "auto",
		});
	}
});

carousel.addEventListener("mouseup", () => {
	isDragging = false;
	const cardIndex = Math.round(scrollOffset / cardWidth);
	scrollOffset = cardIndex * cardWidth;
	carousel.scroll({
		left: scrollOffset,
		behavior: "smooth",
	});
});

// Disable text selection on cards and buttons
cards.forEach((card) => {
	card.addEventListener("mousedown", (e) => {
		e.preventDefault();
	});
});

prevButton.addEventListener("mousedown", (e) => {
	e.preventDefault();
});

nextButton.addEventListener("mousedown", (e) => {
	e.preventDefault();
});
