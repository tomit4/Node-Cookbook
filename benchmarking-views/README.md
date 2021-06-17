This application was created using the express-generator module, adding pug as our views middleware.

npx express-generator --views=pug benchmarking-views

cd benchmarking-views

npm install

npm start

autocannon --connections 100 http://localhost:3000/

This produces a development HTTP benchmarking test which is much slower than our benchmarking-http application because pug reloads the page
every time a GET request is made.

However, we can test it in a production environment where the GET requests would not create the constant reloading the page, and we get much better results.  We can benchmark our production version by changing the node environment setting in our terminal:

NODE_ENV=production npm start

Then run auto cannon again, and we should get much faster results:

autocannon --connections 100 http://localhost:3000/
