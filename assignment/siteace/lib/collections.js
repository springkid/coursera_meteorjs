Websites = new Mongo.Collection("websites");

// Security
Websites.allow({
	insert: function(userId, doc) {
		if (Meteor.user() == userId) {
			console.log(userId);
			return true;
		}
		else {
			return false;
		}
	}
});

