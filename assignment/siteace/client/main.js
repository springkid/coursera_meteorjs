//
// routing 
//

Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  this.render('navbar', {
  	to: "navbar"
  });
  this.render('website_form', {
  	to: "formContent"
  });
  this.render('website_list', {
  	to: "main"
  });
});

Router.route('/website/:_id', function () {
  this.render('navbar', {
  	to: "navbar"
  });
  this.render("", {
  	to: "formContent"
  });
  this.render('web_details', {
  	to: "main",
  	data: function() {
  		return Websites.findOne({_id:this.params._id});
  	}
  });
});

/////
// template helpers 
/////

// helper function that returns all available websites
Template.website_list.helpers({
	websites:function(){
		return Websites.find({}, {sort: {"totalVotes": -1}});
	}
});


/////
// template events 
/////

Template.website_item.events({
	"click .js-upvote":function(event){
		// example of how you can access the id for the website in the database
		// (this is the data context for the template)
		var website_id = this._id;
		console.log("Up voting website with id "+website_id);
		// put the code in here to add a vote to a website!
		Websites.update(website_id, {$inc: {totalVotes: 1}});

		return false;// prevent the button from reloading the page
	}, 
	"click .js-downvote":function(event){

		// example of how you can access the id for the website in the database
		// (this is the data context for the template)
		var website_id = this._id;
		console.log("Down voting website with id "+website_id);

		// put the code in here to remove a vote from a website!
		Websites.update(website_id, {$inc: {totalVotes: -1}});

		return false;// prevent the button from reloading the page
	}
});

Template.website_form.events({
	"click .js-toggle-website-form":function(event){
		$("#website_form").toggle('slow');
	}, 
	"submit .js-save-website-form":function(event){

		// here is an example of how to get the url out of the form:
		var url = event.target.url.value;
		var title = event.target.title.value;		
		var description = event.target.description.value;		
		console.log("The url they entered is: "+url);
		
		//  put your website saving code in here!	
		if (Meteor.user()) {
			Websites.insert({
				"url": url, 
				"title": title, 
				"description": description,
				createdOn:new Date(),
	        	createdBy:Meteor.user()._id
			});
		}
		else {
			console.log("Not logged in");

		}
	
		return false;// stop the form submit from reloading the page

	}
});
