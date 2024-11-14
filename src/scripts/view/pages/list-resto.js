import TheRestoDbSource from '../../data/therestodb-source';
import { createRestoList } from '../templates/template-creator';

const ListResto = {
  async render() {
    return `
            <div class="content">
                <section class="jumbotron">
                    <figure>
                        <img src="./images/heros/hero-image_2.jpg" alt="Food Print" />
                    </figure>
                </section>
                <h2 tabindex="-1" id="maincontent" role="main">Explore Restaurant</h2>
                <div id="loading-indicator">Loading...</div> <!-- Indikator Loading -->
                <div id="error-message" style="display: none; color: red;">Failed to load restaurants. Please try again later.</div> <!-- Pesan error -->
                <div id="daftar-restoran"></div>
            </div>
        `;
  },

  async afterRender() {
    const loadingIndicator = document.getElementById('loading-indicator');
    const errorMessage = document.getElementById('error-message');
    const daftarRestoranElement = document.querySelector('#daftar-restoran');

    try {
      // Tampilkan indikator loading saat data sedang dimuat
      loadingIndicator.style.display = 'block';
      errorMessage.style.display = 'none'; // Sembunyikan pesan error jika ada

      const result = await TheRestoDbSource.getListResto();
      const restaurants = result.restaurants;

      // Menghapus indikator loading setelah data berhasil dimuat
      loadingIndicator.style.display = 'none';

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
    } catch (error) {
      // Menampilkan pesan error jika terjadi kegagalan
      console.error('Error fetching restaurant list:', error);
      loadingIndicator.style.display = 'none'; // Sembunyikan indikator loading
      errorMessage.style.display = 'block'; // Tampilkan pesan error
    }
  },
};

export default ListResto;

