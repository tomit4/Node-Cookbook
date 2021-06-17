This directory was created using npx and the express-generator module which automatically creates an express server on the fly for us.
By invoking this command it creates the directory benchmarking-http as well:

npx express-generator --no-view benchmarking-http

Once we have entered the directory: 

cd benchmarking-http

We then install our dependencies:

npm install

Then we install the benchmarking software, autocannon:

sudo npm install --global autocannon

Then we simply start our server:

npm start

Check our browser to be sure its, running by going to http://localhost:3000

Once we've established that the server is up and running, we can run it through autocannon benchmarking test:

autocannon --connections 100 http://localhost:3000

autocannon --c 100 --duration 20 http://localhost:3000

auto cannon --c 100 --d 20 http://localhost:3000

Generally lower latency is better.