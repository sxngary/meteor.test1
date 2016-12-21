import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  msgList:function(){
    var msgData = Message.find({},{sort:{created:-1}}).fetch();
    return msgData;
    
  },
  
  dateFormat:function(date){
    return moment(date).format("MMM-DD-YYYY h:mm:ss");
  }
  
});

Template.hello.events({
  'click #btn_msg': function(event, data) {
      var msgText = data.find("#text_msg").value;
      msgText = msgText.trim();
      if(msgText.trim()!='') {
          var msg = Message.insert({msg: msgText, created:new Date()});
          $('.msg-div').show().text('Message successfully send!');
          setTimeout(function(){
              $('.msg-div').hide()
          },1000);
          $('#text_msg').val('');
      }
      
  },
  
  'click .msg_delete':function(event, data){
      var id = $(event.currentTarget).attr('id');
      var r = confirm("Are you sure you want to delete this message?");
      if (r == true) {
          Meteor.call('deleteMessage', id , function(err, users){
                if(!err){   
                    $('.msg-div').show().text('Message deleted successfully!');
                    setTimeout(function(){
                        $('.msg-div').hide()
                    },1000);
                }else{
                    alert('not deleted.');
                }
            });
      }
  }
  
});
