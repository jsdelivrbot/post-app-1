import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import _ from 'lodash';

class PostIndex extends Component{
	componentDidMount(){
		this.props.fetchPosts();
	}

	renderPosts(){
		return _.map(this.props.posts, post => {
			return (
				<li key={post.id} className="list-group-item">
					<Link to={`/posts/${post.id}`}>{post.title}</Link>
				</li>
			)
		})
	}

	render(){
		return (
			<div>
				<div className="text-xs-right">
					<Link className="btn btn-primary" to="/posts/new">
						Add a Post
					</Link>
				</div>
				<h3>Posts</h3>
				<ul className="list-group">
					{this.renderPosts()}
				</ul>
			</div>
		)
	}
}

function bindDispatchToProps(dispatch){
	return bindActionCreators({fetchPosts}, dispatch);
}

function mapStateToProps(state){
	return {posts:state.posts};
}

export default connect(mapStateToProps, bindDispatchToProps)(PostIndex);