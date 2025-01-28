let state = {
    ratingValue: 0,
    updateRatingValue(value) {
        this.ratingValue = value;
        reRender(value);
    },
    resetRating() {
        this.ratingValue = 0;
        reRender(0);
    }
};

let container = document.getElementById('star-rating-container');
let ratingDisplay = document.getElementById('rating-value');
let resetButton = document.getElementById('reset-btn');

function reRender(ratingValue) {
    let children = container.children;
    for (let i = 0; i < children.length; i++) {
        if (i < ratingValue) {
            children[i].classList.add('yellow');
        } else {
            children[i].classList.remove('yellow');
        }
    }
    ratingDisplay.textContent = `Rating: ${ratingValue}`;
}

container.addEventListener('click', (e) => {
    let target = e.target;
    let value = parseInt(target.getAttribute('data-index'));
    state.updateRatingValue(value);
});

container.addEventListener('mouseover', (e) => {
    let target = e.target;
    let value = parseInt(target.getAttribute('data-index'));
    reRender(value);
});

container.addEventListener('mouseleave', (e) => {
    reRender(state.ratingValue);
});

// Reset the rating when the button is clicked
resetButton.addEventListener('click', () => {
    state.resetRating();
});
