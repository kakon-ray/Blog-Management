<!-- convert type script to js src to dist folder -->
tsc

<!-- run the express mongose project -->
npm run dev


# User Registration Api

 * http://localhost:5000/api/auth/register

 {
  "name": "Kakon Ray",
  "email": "kakonray.cse@gmail.com",
  "password": "securepassword123"
}

# User Login Api
* http://localhost:5000/api/auth/login

{
  "email": "kakonray.cse@gmail.com",
  "password": "securepassword123"
}


# Blogs add Api

* http://localhost:5000/api/blogs

* authorization > token

{
  "title": "The Future of Technology",
  "content": "Technology is evolving rapidly, influencing every aspect of our lives."
}
