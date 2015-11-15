import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

import { blogActions } from '../../../../actions'

import Item from './item'

import styles from './styles/index.scss'

@connect(state => ({
  blogs: state.blogs
}), dispatch => ({
  ...bindActionCreators(blogActions, dispatch)
}))
export default class Todos extends Component {

  static propTypes = {
    blogs: PropTypes.array.isRequired,
    fetchBlogs: PropTypes.func.isRequired
  }

  // constructor(props, context) {
  //   super(props, context);
  // }

  componentDidMount () {
    this.props.fetchBlogs({})
  }

  render () {
    return (
      <div className={styles.ns}>
        <header className={styles.header}>
          Blogs:
          <Link to="/blogs/add">Add New</Link>
        </header>
        <section className={styles.blogs}>
          <ul>
            {
              this.props.blogs.map(
                blog => <Item key={blog.id} { ...blog } />
              )
            }
          </ul>
        </section>
      </div>
    )
  }

}
