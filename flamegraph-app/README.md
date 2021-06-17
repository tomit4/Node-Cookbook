This program was created once again using express-generator executable:

npx express-generator --views=pug flamegraph-app

cd flamegraph-app

npm install

Then we globally install our benchmarking software:

sudo npm install -g autocannon 0x

Autocannon is a HTTP benchmarking software covered in more depth in benchmarking-views, and 0x is our flamegraph app.

To initialize our server to test our flamegraph app, enter:

0x ./bin/www

This will run our app.js server and listen for HTTP requests to test each part of our program for bottlenecks, it will then prompt you with the following:

Profiling

From a separate terminal window, start autocannon to send off some GET requests to benchmark:

autocannon -c 100 http://localhost:3000

This will generate the usual latency graph, but that's not what we're interested in in this tutorial, return to your terminal running 0x, and shut it down hitting CTRL -C. This should generate a flamegraph directory, which is represented by its .0x extension, look inside this directory for a flamegraph.html file and open it in your web browser.  It should show a GUI that will help you identify CPU
"hotspots" where there is possible room for optimization in our code.

Note that we will want to test our production code as well, so make sure to change your Node environment to production to test for that as well:

NODE_ENV=production 0x ./bin/www

And then start autocannon again:

autocannon -c 100 http://localhost:3000

Note that we can also run both of these and take a look at a more basic performance profile by opening up our DevTools in our browser (usually hitting F12) and navigating to our Performance tab, here we can create a new performance testing profile (on the left) and start recording right before we run autocannon, once autocannon is coplete, hit stop, and we can view similar information to flamegraph app, although it is not as nicely presented.

See page 349 of Node Cookbook for more details.