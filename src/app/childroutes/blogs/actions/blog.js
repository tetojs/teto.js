import Blogs from '../models/blogs'

export func tion fetchBlogs (payload) {
  return {
    types: [
      'FETCH_BLOGS_PENDING',
      'FETCH_BLOGS_SUCCESS',
      'FETCH_BLOGS_FAILURE',
      'FETCH_BLOGS_FINALLY'
    ],
    payload: new Blogs().GET(payload)
  }
}

export function createBlog (payload) {
  return {
    type: 'CREATE_BLOG',
    payload: new Blogs().POST(payload)
  }
}

export function deleteBlog (payload) {
  return {
    type: 'DELETE_BLOG',
    payload: new Blogs().DELETE(payload)
  }
}
