import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import {createPost} from '../actions';
import {connect} from 'react-redux';

class PostsNew extends Component{
	renderInputField(field){
		// States of input: pristine touched invalid
		const { meta: { touched, error } } = field;
		const className=`form-group ${touched && error ? 'has-danger' : ''}`;
		return (
			<div className={className}>
				<label>{field.label}</label>
				<input
				className="form-control"
				type="text"
					{...field.input}
				/>
				<div className="text-help">
					{touched ? error : ''}
				</div>
			</div>
		);
	}

	onSubmit(values){
		this.props.createPost(values, ()=>{
			this.props.history.push('/');
		});
	}

	render(){
		const { handleSubmit } = this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<Field 
					name="title"
					component={this.renderInputField}
					label="Title"
				/>
				<Field 
					name="categories"
					component={this.renderInputField}
					label="Categories"
				/>
				<Field 
					name="content"
					component={this.renderInputField}
					label="Post Content"
				/>
				<button type="submit" className="btn btn-primary">Submit</button>
				<Link className="btn btn-danger" to="/">
						Cancel
				</Link>
			</form>
		);
	}
}

function validate(values) {
	const errors = {};

	// Validate the inputs from 'values'
	if(!values.title || values.title.length < 3)
		errors.title = "Enter a title that is at least 3 characters.";
	if(!values.content)
		errors.content = "A post must have content.";
	if(!values.categories)
		errors.categories = "A post must have a category.";

	return errors;
}

export default reduxForm({
	validate,
	form: 'PostsNewForm' // Name of the form
})(
	connect(null,{createPost})(PostsNew)
);