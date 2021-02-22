# code-for-chicago-jekyll

## Setup 

To run locally, you will need `npm`, `gem` amd ruby's `bundle` installed and available on your path.  Skip to the Prerequisites section below for information on installing those.

  1. Clone this repository
  1. `cd` into the root directory of this project.
  1. Install npm dependencies with `npm install`
  1. Install gem dependencies with `bundle install`
  1. Run the server locally, recompiling files as needed, with `bundle exec jekyll serve`
  1. Open [http://localhost:4000/](http://localhost:4000/) in your browser to view the site.

## Prerequisites

### npm
To verify you have npm installed:

```
> npm -v
6.10.0

> node -v
v10.15.2
```

If they or not installed, or your version looks much older than this, proceed to [instructions for installing npm](https://www.npmjs.com/get-npm)

### ruby
It is advisable to avoid using the OS install of Ruby that comes bundles with MacOS, Ubuntu, and others. Instead we'd suggest using a Ruby virtual environment like [rbenv](https://github.com/rbenv/rbenv). Installation instructions can be found [here](https://github.com/rbenv/rbenv#installation).

To verify your ruby version:

```
> ruby -v
ruby 2.5.5p157 (2019-03-15 revision 67260) [x86_64-linux-gnu]
```

You should have at least ruby 2.1.0.

### bundler
To install bundler, use:
```
> gem install bundler
```

Find us [on our slack #general channel](https://code-for-chicago-slack-invite.herokuapp.com/) if we can be of assistance getting you set up.

All contributions are very welcome. Thank you!
