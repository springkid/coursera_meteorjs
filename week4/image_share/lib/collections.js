Images = new.Mongo.Collection("images");

// set up security
Images.allow({
	insert:function(userId, doc){
		console.log("Testing security on image_insert");
		if (Meteor.user()) {
			if (doc.createdBy != userId) {
				return false;
			}
			else {
				return true;
			}
		}
		else { // user not logged in
			return false;
		}
	},
	remove:function(userId, doc){
		return false;
	}
})