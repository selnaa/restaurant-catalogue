import CONFIG from '../../globals/config';

const createRestoDetailTemplate = (detailResto) => `
    <h2>${detailResto.name}</h2>
    <p>City: ${detailResto.city}</p>
    <p>Address: ${detailResto.address}</p>
    <p>Rating: ${detailResto.rating}</p>
    <img src="${CONFIG.BASE_IMAGE_URL + detailResto.pictureId}" alt="${detailResto.name}" />
    
    <h3>Description</h3>
    <p>${detailResto.description}</p>
    
    <h3>Menus</h3>
    <section id="menus">
    <div class="food">
        <h4>Foods:</h4>
        <ul>
        ${detailResto.menus.foods.map((food) => `<li>${food.name}</li>`).join('')}
        </ul>
    </div>
    <div class="drink">
        <h4>Drinks:</h4>
        <ul>
        ${detailResto.menus.drinks.map((drink) => `<li>${drink.name}</li>`).join('')}
        </ul>
    </div>
    </section>

    <h3>Customer Reviews</h3>
    <div class="customer-reviews">
    ${detailResto.customerReviews.map((customerReview) =>
    `
        <div class="review-card">
        <h5 class="review-name">${customerReview.name}</h5>
        <p class="review-text">${customerReview.review}</p>
        <p class="review-date"><strong>Date:</strong> ${customerReview.date}</p>
        </div>
        `
  ).join('')}
    </div>
`;

const createRestoList = (restaurant) => `
    <img src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}" />
    <h2>${restaurant.name}</h2>
    <p>City: ${restaurant.city}</p>
    <p>Rating: ${restaurant.rating}</p>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this movie" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this movie" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestoDetailTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
  createRestoList,
};