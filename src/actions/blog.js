import Blogs from '../models/blogs'

export function fetchBlogs (payload) {
  return {
    type: 'FETCH_BLOGS',
    payload: new Blogs().GET(payload)
  }
}

export function createBlog (payload) {
  return {
    type: 'CREATE_BLOG',
    payload: new Blogs().POST(payload)
  }
}
