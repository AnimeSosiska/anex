import http from "../http-common.js";

class HotelDataService {
  getAllLocations() {
    return http.get("/locations");
  }

  getHotelById(id) {
    return http.get(`/hotels/id/${id}`);
  }
  getAllHotels() {
    return http.get(`/hotels`);
  }
  getAllLocationsByName(name) {
    return http.get(`/locations/${name}`)
  }
  createReview(name, review) {
    return http.get(`/reviews?name=${name}&text=${review}`);
  }
  getAllReviews(){
    return http.get(`/reviews/all`);
  }
  findByHot(hot) {
    return http.get(`/hotels/hot`);
  }
  getAdv(hotelId) {
    return http.get(`/adv/id/${hotelId}`);
  }
  findByLocation(location) {
    return http.get(`/hotels/location/${location}`);
  }
  getLocation(locationId) {
    return http.get(`/locations/id/${locationId}`);
  }
  sendBookingData(firstName, lastName, appeal, gender, country, citizenship, birthday, passport, serie, number, issue, valid, phone, email, orderId){
    return http.get(`/booking/data?firstName=${firstName}&lastName=${lastName}&appeal=${appeal}&gender=${gender}&country=${country}&citizenship=${citizenship}&birthday=${birthday}&document=${passport}&serie=${serie}&number=${number}&issue=${issue}&valid=${valid}&phone=${phone}&mail=${email}&orderId=${orderId}`);
  }
  sendBookingOrder(date, adults, kids, room, flyingPlace, price, hotelId) {
    return http.get(`/booking/order?date=${date}&adults=${adults}&kids=${kids}&room=${room}&flyingPlace=${flyingPlace}&price=${price}&hotelId=${hotelId}`);
  }
}

export default new HotelDataService();
