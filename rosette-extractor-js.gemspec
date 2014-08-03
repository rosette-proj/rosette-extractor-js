$:.unshift File.join(File.dirname(__FILE__), 'lib')
require 'rosette/extractors/javascript-extractor/version'

Gem::Specification.new do |s|
  s.name     = "rosette-extractor-js"
  s.version  = ::Rosette::Extractors::JAVASCRIPT_EXTRACTOR_VERSION
  s.authors  = ["Cameron Dutro"]
  s.email    = ["camertron@gmail.com"]
  s.homepage = "http://github.com/camertron"

  s.description = s.summary = "Extracts translatable strings from JavaScript source code for the Rosette internationalization platform."

  s.platform = Gem::Platform::RUBY
  s.has_rdoc = true

  s.requirements << "jar 'org.mozilla:rhino', '1.7R4'"

  s.require_path = 'lib'
  s.files = Dir["{lib,spec}/**/*", "Gemfile", "History.txt", "README.md", "Rakefile", "rosette-extractor-js.gemspec"]
end
