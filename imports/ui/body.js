import { Template } from 'meteor/templating';
import { ReactiveDict} from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';

import './task.js'; 
import './body.html';

Template.body.onCreated(function bodyOnCreated(){
	this.state = new ReactiveDict();
});
 
Template.body.helpers({
  tasks() {
  	const instance = Template.instance();
  	if(instance.state.get('hideCompleted')){
  		return Tasks.find({checked:{$ne: true}}, {sort:{createAt:-1}});
  	}
  	return Tasks.find({},{sort:{createAt:-1}});
  },
  incompleteCount(){
  	return Tasks.find({checked:{$ne: true}}).count();
  },
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

	},
	'change .hide-completed input'(event, instance){
		instance.state.set('hideCompleted', event.target.checked);
	},
});