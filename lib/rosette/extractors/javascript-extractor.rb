# encoding: UTF-8

require 'java'
require 'rosette/core'

java_import 'org.mozilla.javascript.CompilerEnvirons'
java_import 'org.mozilla.javascript.ErrorReporter'
java_import 'org.mozilla.javascript.Parser'
java_import 'org.mozilla.javascript.ast.AstNode'
java_import 'org.mozilla.javascript.ast.AstRoot'
java_import 'org.mozilla.javascript.ast.FunctionCall'
java_import 'org.mozilla.javascript.ast.Name'
java_import 'org.mozilla.javascript.ast.NodeVisitor'
java_import 'org.mozilla.javascript.ast.StringLiteral'

module Rosette
  module Extractors

    class RhinoVisitor
      include NodeVisitor

      attr_reader :on_node_found_proc
      protected :on_node_found_proc

      def on_node_found(&block)
        @on_node_found_proc = block
      end

      def visit(node)
        on_node_found_proc.call(node) if on_node_found_proc
        true
      end
    end

    class JavascriptExtractor < Rosette::Core::Extractor
      protected

      def each_function_call(javascript_code)
        if block_given?
          root = parse(javascript_code)
          visitor = RhinoVisitor.new

          visitor.on_node_found do |node|
            yield node if node.is_a?(FunctionCall)
          end

          root.visitAll(visitor)
        else
          to_enum(__method__, javascript_code)
        end
      end

      def valid_args?(node)
        args = node.getArguments
        args.size > 0 && args[0].is_a?(StringLiteral)
      end

      def get_key(node)
        node.getArguments[0].getValue
      end

      private

      def parse(javascript_code)
        reader = Java::JavaIo::StringReader.new(javascript_code)
        parser.parse(reader, nil, 1)
      end

      def parser
        @parser ||= begin
          compiler_env = CompilerEnvirons.new
          error_reporter = compiler_env.getErrorReporter
          Parser.new(compiler_env, error_reporter)
        end
      end

      class UnderscoreExtractor < JavascriptExtractor
        protected

        def valid_name?(node)
          node.target.is_a?(Name) && node.target.getString == '_'
        end
      end
    end

  end
end
