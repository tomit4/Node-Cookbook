This module creates a simple leaky-server.js to demonstrate memory leaks and how they can eventually crash our browser if left unattended.

While the tutorial utilizes Google Chrome and it's dev tools, I used Firefox Developer Edition to similar effect in monitoring our memory performance using the dev tools brought up by the F12 key.

sudo npm install -g autocannon

mkdir profiling-memory
cd profiling-memory
touch leaky-server.js

Once written, limit the amount of bytes that node can hold in RAM, and run leaky-server.js:

node --max-old-space-size=10 leaky-server.js

This will run our server, but with only 10mb of ram to store memory, if our leaky-server.js file has a leak, it will run out of memory pretty much as soon as any HTTP request are made to it.

Now open it up in our browser by going to http://localhost:3000

Then open up our devtools by hitting F12, and navigating to our Memory tab. Use the left side of the window to take a snapshot of our server running.

Now run autocannon in a separate terminal:

autocannon http://localhost:3000

This will run its test will multiple HTTP GET requests, and you will notice in our other terminal, that leaky-server.js has crashed.

Now return to our web browser and take another snapshot.  Compare the results, our latter results should give some indication of where the leak occurred.  See our leaky-server.js file for notes on where the leak occurred and why.

Now copy our leaker-server.js file and rename the copy server.js:

cp leaky-server.js server.js

In server.js make the adjustments that will mitigate/stop the memory leak by placing our server.on() method outside of our createServer() method, that way our server doesn't recursively call server.on every millisecond it's connected...

And run the same test, now they should be relatively the same as there is no memory leak.