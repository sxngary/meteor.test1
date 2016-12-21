import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
    deleteMessage: function(id) {
        if(id){
            return Message.remove({ _id: id});
        }else{
            throw new Meteor.Error(403, "User not found.");
        }
    },
});
