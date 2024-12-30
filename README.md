<!-- convert type script to js src to dist folder -->

tsc

<!-- run the express mongose project -->

npm run dev

# User Registration Api

- http://localhost:5000/api/auth/register

{
"name": "Kakon Ray",
"email": "kakonray.cse@gmail.com",
"password": "securepassword123"
}

# User Login Api

- http://localhost:5000/api/auth/login

{
"email": "kakonray.cse@gmail.com",
"password": "securepassword123"
}

# Blogs add Api

- http://localhost:5000/api/blogs

- authorization > token

{
"title": "The Future of Technology",
"content": "Technology is evolving rapidly, influencing every aspect of our lives."
}

# Blogs update api

- http://localhost:5000/api/blogs/67726cc0b248b80ef92f90f7
  {
  "title": "Kakon Ray",
  "content": "Technology is evolving rapidly, influencing every aspect of our lives."
  }

# Get Single Blog

- http://localhost:5000/api/blogs/677261696dc3c1cbf1a3debf

# Delete Single Blog

- http://localhost:5000/api/blogs/67726cc0b248b80ef92f90f7

# Get All Blog

- http://localhost:5000/api/blogs?search=technology&sortBy=createdAt&sortOrder=desc&filter=6772646fc8775360a09ab4e6

# User Block

- http://localhost:5000/api/admin/users/6772de5590c2048a0c4ca401/block

<!-- Login Admin and block user -->

{
"email": "thisiskakonray@gmail.com",
"password": "kakonray1234"
}

# Es lint

npm run lint
