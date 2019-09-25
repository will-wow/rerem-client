import svelte from "rollup-plugin-svelte";
import replace from "rollup-plugin-replace";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import includePaths from "rollup-plugin-includepaths";
import babel from "rollup-plugin-babel";

const production = !process.env.ROLLUP_WATCH;

const extensions = [".js", ".jsx", ".ts", ".tsx"];

export default {
  input: "src/main.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "public/bundle.js",
    globals: {
      crypto: "crypto",
      process: "process"
    }
  },
  external: ["crypto", "process"],
  plugins: [
    replace({
      "process.env.API": JSON.stringify(
        production
          ? "https://rerem.gigalixirapp.com/api"
          : "http://localhost:4000"
      )
    }),
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file — better for performance
      css: css => {
        css.write("public/bundle.css");
      }
    }),

    // Import
    resolve({
      extensions,
      browser: true,
      dedupe: importee =>
        importee === "svelte" || importee.startsWith("svelte/")
    }),
    // node_modules
    commonjs({
      namedExports: {
        "node_modules/humps/humps.js": ["camelizeKeys"]
      }
    }),

    // Absolute imports
    includePaths({
      paths: ["src"],
      extensions: [".ts", ".js", ".svelte"]
    }),
    // ES6/TS
    babel({ extensions, exclude: "node_modules/**" }),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload("public"),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
};
