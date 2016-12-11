# lekker-sa-kos-ng

A web project which uses the lekker-sa-kos API to display delicious South African cuisine.

It uses Angular 1.5 along with Bootstrap 3.x to display the available dishes in a responsive master-detail template.

## Setting up & running the project:
* ``npm install``.
* ``bower install``, however this isn't needed as it's added to the grunt tasks.
* Grunt is used to serve, test and package the project.
* ``grunt serve`` starts a server and serves the static resources for dev testing.
* This uses a proxy to connect to your dev server for the lekker-sa-kos API. You can change the connection details be modifying the ``connect`` property specified in ``Gruntfile.js``.
* ``grunt test`` tests the project using Karma.
* ``grunt package`` tests and packages your project into a single app.js file. This does not include the css files, which will need to be deployed along with the app.js file.
Each of these functions first clears the bower lib folder and then reinstalls the libraries specified in ``bower.js``. This can be removing ``'bower'`` from the task arrays in the actions.
