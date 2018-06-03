This project is based on [Create React App](https://github.com/facebookincubator/create-react-app). (For more information about Create react App, check their full [documentation](https://github.com/facebookincubator/create-react-app#create-react-app).)

The main addition is a new folder: `src/lambda`. Each JavaScript file in there will automatically be prepared for Lambda function deployment.

As an example, we've included a small `src/lambda/hello.js` function, which will be deployed to `/.netlify/functions/hello`.

You can easily deploy this project yourself using this button: [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/netlify/create-react-app-lambda)

## Babel/webpack compilation

All functions are compiled with webpack using the Babel Loader, so you can use modern JavaScript, import npm modules, etc., without any extra setup.


## Local Development

Note: This project is set up to use Docker and docker-compose. To build and run with Docker, rename `.env.local-sample` to `.env.local` and fill out the necessary variables. Then, simply run `docker-compose up`.
When deploying to Netlify, remember to fill out the environment variables in Netlify's dashboard as well.

If you do not wish to use Docker, you must set the `proxy.target` in `package.json` back to "localhost", and then follow the instructions below:


### Run the functions dev server

Before developing, clone the repository and run `yarn` from the root of the repo to install all dependencies.

From inside the project folder, run:

```
yarn start:lambda
```

This will open a local server running at `http://localhost:9000` serving your Lambda functions, updating as you make changes in the `src/lambda` folder.

You can then access your functions directly at `http://localhost:9000/{function_name}`, but to access them with the app, you'll need to start the app dev server.


### Run the app dev server

While the functions server is still running, open a new terminal tab and run:

```
yarn start
```

This will start the normal create-react-app dev server and open your app at `http://localhost:3000`.

Local in-app requests to the relative path `/.netlify/functions/*` will automatically be proxied to the local functions dev server.
