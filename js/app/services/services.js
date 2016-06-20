toyTrackerApp.service('authService', ['$firebaseAuth', function($firebaseAuth) {

	var ref = new Firebase('https://toy-tracker-app.firebaseio.com');
	this.auth = $firebaseAuth(ref);

}]);

toyTrackerApp.factory('Search', function() {

	
	
});
toyTrackerApp.service('usersService', ['$firebaseArray', 'FirebaseUrl', function($firebaseArray, FirebaseUrl) {


	// add new user to users in db
	this.createProfile = function(uid, name, age, email, password) {

		this.usersRef = new Firebase(FirebaseUrl + 'users/' + uid);
		console.log(uid);
		this.users = $firebaseArray(this.usersRef);

		this.users.$add({
			// uid: uid,
			name: name,
			age: age,
			email: email
		});
	};

}]);
toyTrackerApp.service('wishlistService', ['$firebaseArray', 'authService', function($firebaseArray, authService) {


	// call correct wishlist
	this.getWishlist = function(uid){

		// reference to firebase
		var ref = new Firebase('https://toy-tracker-app.firebaseio.com/users/' + uid);

		// define 'wishlist'
		this.wishlist = $firebaseArray(ref.child('wishlist'));

	};



	// add toy to wishlist when button is clicked
	this.addToWishlist = function(toyName, toyPrice, onWishlist, toyThumbnail, toyReviewImage) {

		this.wishlist.$add({
			name: toyName,
			price: toyPrice,
			onWishlist: onWishlist,
			thumbnailImage: toyThumbnail,
			reviewImage: toyReviewImage
		});
	};


	// remove toy to wishlist when button is clicked
	this.removeFromWishlist = function(id){
		this.wishlist.$remove(id);
	}

}]);