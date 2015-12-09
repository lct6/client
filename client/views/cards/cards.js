// binds to the cards template when its created
Template.cards.onCreated(function(){
    this.subscribe("books");
});

// helper functions bound to the cards template
Template.cards.helpers({
    books: function() {
        return Books.find();
    }
});

// binds to the card template when its created
Template.card.onCreated(function() {
    this.messageSent = new ReactiveVar(false);
});

// event handler bound to the card template
Template.card.events({
    "click .send-message": function(event, template) {
        MaterializeModal.confirm({
            title: "Are you sure?",
            message: "Your email address will be sent to the seller to notify them of your interest.",
            callback: function(error, response) {
                if (response.submit) {
                     // client part of email; asynchronously send an email
                    //Order: to, from, subject, text.
                    //replace the from with calvinbookshelf and to with the seller
                    Meteor.call('sendEmail',
                          template.data.user +'@students.calvin.edu',
                          'calvinbookshelf',
                         'You have an offer',
                        Meteor.user().username + ' would like to purchase "' + template.data.title + '."' +
                         '\n' + 'Please contact your customer at ' + Meteor.user().username + '@students.calvin.edu.'
                        );
                    template.messageSent.set(true);
                    Materialize.toast("Message Sent", 4000, "rounded");
                }
            }
        });
    },
    "click #remove-button": function(event, template) {
        Meteor.call("removeBook", template.data._id);
    }
})

// helper functions bound to the card template
Template.card.helpers({
    messageSent: function() {
        return Template.instance().messageSent.get();
    },
    myBook: function() {
        return this.user == Meteor.userId();
    }
});
