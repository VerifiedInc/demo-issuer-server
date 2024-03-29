# demo-issuer-server

> Issuer server for the Acme family of demos

Information about the Unum ID demo ecosystem can be found in our [documentation](https://docs.unum.id/#demos).

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/demo-issuer-server
    npm install
    ```

3. Start your app

    ```
    npm start
    ```

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g @feathersjs/cli          # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers help                           # Show all commands
```

## Release 
### Dev
Just merging changes to `main` will trigger automated deployments to dev.

### Sandbox
To release a version of this project to sandbox create a Github release with a preceding `v`, i.e. `v3.4.0`. This will trigger an automated deployment to sandbox.

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).
