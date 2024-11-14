import FavoriteRestoIdb from '../../data/favorite-resto-idb';
import { createRestoList } from '../templates/template-creator';
const Like = {
  async render() {
    return `
            <div class="content">
                <section class="jumbotron">
                    <figure>
                        <img src="./images/heros/hero-image_2.jpg" alt="Food Print" />
                    </figure>
                </section>
                <h2 tabindex="-1" id="maincontent" role="main">Explore Restaurant</h2>
                <div id="daftar-restoran">
                </div>
            </div>
        `;
  },

  async afterRender() {

    const restaurants = await FavoriteRestoIdb.getAllRestos();
    console.log(`ini result nya : ${  JSON.stringify(restaurants)}`);
    const daftarRestoranElement = document.querySelector('#daftar-restoran');


    restaurants.forEach((restaurant) => {
      const restaurantCard = document.createElement('div');
      restaurantCard.className = 'restaurant-card';
      restaurantCard.tabIndex = 0;

      restaurantCard.innerHTML = createRestoList(restaurant);
      // Menambahkan event listener untuk klik
      restaurantCard.addEventListener('click', () => {
        // Mengubah hash URL untuk navigasi ke halaman detail
        window.location.hash = `#/detail/${restaurant.id}`;
      });
      daftarRestoranElement.appendChild(restaurantCard);
    });
  },
};

export default Like;