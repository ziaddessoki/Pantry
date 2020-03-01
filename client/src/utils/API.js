import axios from "axios";

export default {
  // Gets all users
  getUsers: function() {
    return axios.get("/user/");
  },

  saveUser: function(userData) {
    return axios.post("/user/add", userData);
  },
  // Gets a user with id 
  getUser: function(id) {
    return axios.get("/user/" + id);
  },
  // Deletes the user with the given id
  deleteUser: function(id) {
    return axios.delete("/user/" + id);
  },
  // Saves a book to the database
  addPantry: function(id,newPantry) {
    return axios.post("/user/addPantry/"+id, newPantry);
  },

  addFav: function(id,newFav) {
    return axios.post("/user/addFav/"+id,newFav);
  },

  deletePantry: function(id, newPantry){
    return axios.post("/user/deletePantry/"+id , newPantry);
  },

  deleteFav: function(id){
    return axios.post("/deleteFav/"+id);
  }


};
