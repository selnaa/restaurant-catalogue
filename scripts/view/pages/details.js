import TheRestoDbSource from '../../data/therestodb-source';
import UrlParser from '../../routes/url-parser';
import { createRestoDetailTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';

const Detail = {
  async render() {
    return `
      <div id="detail-restoran"></div>
      <div id="likeButtonContainer"></div>
      <div id="review-form-container">
        <h3>Write a Review</h3>
        <form id="review-form">
            <label for="user-name">Your Name:</label>
            <input type="text" id="user-name" placeholder="Your Name" required />
            <label for="review-text">Your Review:</label>
            <textarea id="review-text" placeholder="Write your review..." required></textarea>
            <button type="submit">Submit Review</button>
        </form>
      </div>
      <div id="loading-indicator">Loading...</div> <!-- Indikator Loading -->
      <div id="error-message" style="display: none; color: red;">Failed to load data. Please try again later.</div> <!-- Pesan error -->
    `;
  },

  async afterRender() {
    const loadingIndicator = document.getElementById('loading-indicator');
    const errorMessage = document.getElementById('error-message');
    const detailRestoElement = document.querySelector('#detail-restoran');
    const url = UrlParser.parseActiveUrlWithoutCombiner();

    try {
      // Tampilkan indikator loading saat data sedang dimuat
      loadingIndicator.style.display = 'block';
      errorMessage.style.display = 'none'; // Sembunyikan pesan error jika ada

      // Mengambil detail restoran dari API
      const result = await TheRestoDbSource.getDetailResto(url.id);
      const restaurant = result.restaurant; // Sesuaikan dengan data yang diterima

      // Menghapus indikator loading setelah data berhasil dimuat
      loadingIndicator.style.display = 'none';

      // Tampilkan data restoran di halaman detail
      detailRestoElement.innerHTML = createRestoDetailTemplate(restaurant);

      // Inisialisasi tombol like
      LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          address: restaurant.address,
          city: restaurant.city,
          pictureId: restaurant.pictureId,
          rating: restaurant.rating,
        },
      });
    } catch (error) {
      // Menampilkan pesan error jika terjadi kegagalan
      console.error('Error fetching restaurant details:', error);
      loadingIndicator.style.display = 'none'; // Sembunyikan indikator loading
      errorMessage.style.display = 'block'; // Tampilkan pesan error
    }
  },

  async handleSubmitReview(restaurant, event) {
    event.preventDefault(); // Mencegah reload halaman saat submit

    const name = document.getElementById('user-name').value;
    const reviewText = document.getElementById('review-text').value;

    const reviewData = {
      id: restaurant.id,
      name: name,
      review: reviewText,
    };

    try {
      const response = await fetch('https://restaurant-api.dicoding.dev/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      const responseData = await response.json();
      console.log(responseData); // Cek apakah ada error dalam response

      if (responseData.error === false) {
        // Jika berhasil, refresh halaman untuk menampilkan review terbaru
        window.location.reload();
      } else {
        alert(`Failed to submit review. Error: ${responseData.message}`);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert(`An error occurred: ${error.message}`);
    }
  },
};

export default Detail;


// import TheRestoDbSource from '../../data/therestodb-source';
// import UrlParser from '../../routes/url-parser';
// import { createRestoDetailTemplate } from '../templates/template-creator';
// import LikeButtonInitiator from '../../utils/like-button-initiator';

// const Detail = {
//   async render() {
//     return `
//           <div id="detail-restoran"></div>
//           <div id="likeButtonContainer"></div>
//         `;
//   },

//   async afterRender() {
//     // Mengambil id dari URL
//     const url = UrlParser.parseActiveUrlWithoutCombiner();
//     const result = await TheRestoDbSource.getDetailResto(url.id);
//     const detailRestoElement = document.querySelector('#detail-restoran');
//     const restaurant = result.restaurant; // Sesuaikan dengan data yang diterima
//     detailRestoElement.innerHTML = '';

//     // Cek apakah data sudah diterima dengan baik
//     console.log('Detail restoran: ', restaurant);

//     // Tampilkan data restoran di halaman detail
//     detailRestoElement.innerHTML = createRestoDetailTemplate(restaurant);

//     LikeButtonInitiator.init({
//       likeButtonContainer: document.querySelector('#likeButtonContainer'),
//       restaurant: {
//         id: restaurant.id,
//         name: restaurant.name,
//         address: restaurant.address,
//         city: restaurant.city,
//         pictureId : restaurant.pictureId,
//         rating: restaurant.rating,
//       },
//     });
//   },
// };

// export default Detail;