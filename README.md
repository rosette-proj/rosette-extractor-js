[![Build Status](https://travis-ci.org/rosette-proj/rosette-extractor-js.svg?branch=master)](https://travis-ci.org/rosette-proj/rosette-extractor-js) [![Code Climate](https://codeclimate.com/github/rosette-proj/rosette-extractor-js/badges/gpa.svg)](https://codeclimate.com/github/rosette-proj/rosette-extractor-js) [![Test Coverage](https://codeclimate.com/github/rosette-proj/rosette-extractor-js/badges/coverage.svg)](https://codeclimate.com/github/rosette-proj/rosette-extractor-js/coverage)

rosette-extractor-js
====================

Extracts translatable strings from Javascript source code for the Rosette internationalization platform.

## Installation

`gem install rosette-extractor-js`

Then, somewhere in your project:

```ruby
# NOTE: this gem can only be used under jRuby
require 'rosette/extractors/javascript-extractor'
```

### Introduction

This library is generally meant to be used with the Rosette internationalization platform that extracts translatable phrases from git repositories. rosette-extractor-js is capable of identifying translatable phrases in Javascript source files, specifically those that use one of the following translation strategies:

1. The `_()` function, mimicking [fast_gettext](https://github.com/grosser/fast_gettext). Generally, the `_()` function simply indexes into a hash of English (source) strings to translated (target) strings.

Additional types of function calls are straightforward to support. Open an issue or pull request if you'd like to see support for another strategy.

### Usage with rosette-server

Let's assume you're configuring an instance of [`Rosette::Server`](https://github.com/rosette-proj/rosette-server). Adding `_()` support would cause your configuration to look something like this:

```ruby
# config.ru
require 'rosette/core'
require 'rosette/extractors/javascript-extractor'

rosette_config = Rosette.build_config do |config|
  config.add_repo('my_awesome_repo') do |repo_config|
    repo_config.add_extractor('javascript/underscore') do |extractor_config|
      extractor_config.match_file_extension('.js')
    end
  end
end

server = Rosette::Server::ApiV1.new(rosette_config)
run server
```

See the documentation contained in [rosette-core](https://github.com/rosette-proj/rosette-core) for a complete list of extractor configuration options in addition to `match_file_extension`.

### Standalone Usage

While most of the time rosette-extractor-js will probably be used alongside rosette-server (or similar), there may arise use cases where someone might want to use it on its own. The `extract_each_from` method on `UnderscoreExtractor` yields `Rosette::Core::Phrase` objects (or returns an enumerator):

```ruby
javascript_source_code = "function() { return _('bar'); }"
extractor = Rosette::Extractors::JavascriptExtractor::UnderscoreExtractor.new
extractor.extract_each_from(javascript_source_code) do |phrase|
  phrase.key  # => "bar"
end
```

## Requirements

This project must be run under jRuby. It uses [expert](https://github.com/camertron/expert) to manage java dependencies via Maven. Run `bundle exec expert install` in the project root to download and install java dependencies.

## Running Tests

`bundle exec rake` or `bundle exec rspec` should do the trick.

## Authors

* Cameron C. Dutro: http://github.com/camertron
