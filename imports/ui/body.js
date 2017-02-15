import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';
 
import './body.html';
 
Template.body.helpers({
  tasks() {
  	return Tasks.find({},{sort:{createAt:-1}});
  }
});

Template.body.events({
	'submit .new-task'(event){
		//prevent default browser from submit
		event.preventDefault();

		//Get value from element
		const target = event.target;
		const text = target.text.value;

		//Insert a task into the collection
		Tasks.insert({
			text,
			createAt : new Date(),
		});

		//clear form 
		target.text.value = '';

		console.log(event);
	},
});