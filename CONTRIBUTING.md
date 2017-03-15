# Contributing

Here you'll find the steps you need to take to set up your development environment
as well as instructions for coding standards and contributing guidelines.

You'll notice that when this file is present, GitHub will give you an alert when creating
a new issue, indicating that you should check out the guidelines *before* contributing.

* [Development Environment](#development-environment)
* [Coding Standards](#coding-standards)
* [Contributing Guidelines](#contributing-guidelines)
* [Resources](#resources)


## Development Environment

#### Prerequesites

You must install and configure the following packages on your development machine:

- [Git](http://git-scm.com/)
- [Node 6.9+ and NPM 4+](http://nodejs.org/)

In order to extend veinapp's functionality you should install [Angular CLI](https://cli.angular.io/):

```shell
# Uninstall any previous version
npm uninstall -g angular-cli @angular/cli

# Clear entire cache
npm cache clean

# Install Angular CLI globally
npm install -g @angular/cli@latest
```

See [Resources](#resources) section for more information on Angular CLI.

#### Set up instructions

This application relies on [Firebase Realtime Database](https://firebase.google.com/docs/database/) as its data store. So first sign in to [Firebase](https://firebase.google.com/), head to the console and create your project. Then grab your initialization data as explained [here](https://www.youtube.com/v/k1D0_wFlXgo?start=60&end=104&autoplay=1).

This application also relies on [Mapzen](https://mapzen.com/) as its geocoding service provider. Create a [Mapzen developer account](https://mapzen.com/developers/sign_up) and grab your API key as explained [here](https://mapzen.com/documentation/overview/).

[Fork](https://help.github.com/articles/fork-a-repo/) the main [Veinapp repository](https://github.com/adab1ts/veinapp.git) from GitHub and then...

```shell
# Clone your fork (https://help.github.com/articles/cloning-a-repository/):
git clone git@github.com:<github username>/veinapp.git

# Go to the project directory:
cd veinapp

# Add the main Veinapp repository as an upstream remote to your repository:
git remote add upstream https://github.com/adab1ts/veinapp.git

# Tell local git to get information about upstream remote:
git fetch upstream

# Point local copy of master branch to upstream to be able to pull the latest changes of upstream repository:
git branch --set-upstream-to=upstream/master master

# Check that your local branches track the proper remotes:
git branch -vv

# Install project dependencies:
npm install

# Edit Mapzen configuration files and update it with your data
cp src/config/mapzen.{ts.sample,ts}
vi src/config/mapzen.ts

cp src/config/mapzen.{ts.sample,prod.ts}
vi src/config/mapzen.prod.ts

# Edit Firebase configuration files and update it with your data
cp src/config/firebase.{ts.sample,ts}
vi src/config/firebase.ts

cp src/config/firebase.{ts.sample,prod.ts}
vi src/config/firebase.prod.ts

# To populate firebase with the list of places and their coordinates:
# 1. Add your places data in JSON format at db/data/places.json following this structure:
#    [{
#      "name": "the name",
#      "address": "the address",
#      "zip": "00000",
#      "city": "the city",
#      "latitude": "00.00000",
#      "longitude": "00.00000",
#      "telephone": "999 999 999",
#      "email": "email@email.com",
#      "web": "www.the-web.com"
#     },
#     ...
#    ]

# 2. In your console at the application root execute the following script
#    (inspect the code to see how to populate your production datastore):
npm run db:populate

# 3. In firebase console go to the rules tab in your project view
#    and add the following rule in order to index and have better querys:
#    "coords": {
#      ".indexOn": ["g"]
#    }

# Run tests:
ng test

# Run the development server:
ng serve
```

If everything works, then you're ready to make changes.


## Coding Standards

#### Style Guide

All code must follow the styles dictated by the official [Angular Style Guide](https://angular.io/styleguide). As long as you use Angular CLI and don't skip the git hooks, you shouldn't need to worry about missing something.

Angular projects created using Angular CLI (like this) include [Codelyzer](https://github.com/mgechev/codelyzer) as a dependency. Codelyzer will check your code against the Angular tslint rules every time you run `ng lint` or commit your changes.

#### Commit messages

Follow [Angular Commit Message Guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines) to write your commit messages. To ease this task you can use [Commitizen](https://github.com/commitizen/cz-cli).

This repo is [Commitizen-friendly](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly) and supports Commitizen out-of-the-box:

* define an alias like `alias nbin='PATH=$(npm bin):$PATH'` as detailed in this
[Stackoverflow answer](http://stackoverflow.com/questions/9679932/how-to-use-package-installed-locally-in-node-modules/15157360#15157360) and
* invoke it like this: `nbin git-cz`.

If you feel comfortable with global packages you can:

1. install [npm-run](https://github.com/timoxley/npm-run) by running `npm i -g npm-run` and then invoke `npm-run git-cz` to commit your messages, or
2. install commitizen by running `npm i -g commitizen` and commit your messages invoking `git cz`.

## Contributing Guidelines

#### Acceptable Submissions

We will only accept submissions that:

- report a bug in the source code.
- propose a missing feature.

If you find a bug, please submit an issue or a Pull Request (PR) with your fix.
If you miss a feature, you may:

- craft it and submit it as a PR when it is small enough.
- open an issue and outline your proposal for further discussion when it is a major one before you spend time working on it.

#### Submmitting an Issue

Before you [submit an issue](https://github.com/adab1ts/veinapp/issues/new), please search the issue tracker,
maybe an issue for your problem already exists and the discussion might inform you of workarounds readily available.

Before fixing a bug we need to reproduce and confirm it. Provide a minimal reproduction scenario using http://plnkr.co/.
If plunker is not a suitable way to demonstrate the problem please create a standalone git repository demonstrating the problem.

#### Submitting a Pull Request

Before you submit your PR consider the following guidelines:

```shell
# Create a new branch:
git checkout -b my-branch master

# Make your changes and try to make the tests pass.
# All the tests are executed on our Continuous Integration infrastructure
# and a PR could only be merged once the tests pass:
ng test
ng e2e

# If you can't or need help then commit what you have with `--no-verify`:
git add . && git commit --no-verify

# If you get things working add your changed files and commit with a message
# that follows our standards (see above). You'll notice that there are git hooks in place
# which will run testing, linting, etc. (unless you commit with `--no-verify`):
git add . && git cz

# Push your changes to your fork:
git push -u origin my-branch

# In GitHub, send a PR to `veinapp:master`.
# Follow our feedback and iterate on the solution until we accept it.

# Rebase and squash your branch:
git rebase -i master

# Push to your fork (this will update your PR):
git push -f

# Get merged! 🎉 🎊
```

After your PR is merged, you can safely delete your branch and pull the changes from the main (upstream) repository:

```shell
# Delete the remote branch on GitHub:
git push origin --delete my-branch

# Check out the master branch:
git checkout master -f

# Delete the local branch:
git branch -D my-branch

# Update your master with the latest upstream version:
git pull --ff upstream master
```

## Resources

* [The Ultimate Angular CLI Reference Guide](https://www.sitepoint.com/ultimate-angular-cli-reference/)
* [Contributing to Open Source on GitHub](https://guides.github.com/activities/contributing-to-open-source/)
* [Forking Projects](https://guides.github.com/activities/forking/)
* [Thoughtbot Git Protocol](https://github.com/thoughtbot/guides/blob/master/protocol/git)
* [Thoughtbot Open Source Protocol](https://github.com/thoughtbot/guides/blob/master/protocol/open-source)
* [5 Useful Tips For A Better Commit Message](https://robots.thoughtbot.com/5-useful-tips-for-a-better-commit-message)
* [Git Interactive Rebase, Squash, Amend and Other Ways of Rewriting History](https://robots.thoughtbot.com/git-interactive-rebase-squash-amend-rewriting-history)
* [Auto-squashing Git Commits](https://robots.thoughtbot.com/autosquashing-git-commits)
* [Squash your commits](https://github.com/blog/2141-squash-your-commits)
* [About Git rebase](https://help.github.com/articles/about-git-rebase/)
* [How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)
* [How to Write an Open Source JavaScript Library](https://egghead.io/courses/how-to-write-an-open-source-javascript-library)
