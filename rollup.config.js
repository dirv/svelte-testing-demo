import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import svelte from "rollup-plugin-svelte";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";

const production = !process.env.ROLLUP_WATCH;

const plugins = [
  svelte({
    dev: !production,
    css: css => {
      css.write("public/build/bundle.css");
    }
  }),
  resolve({
    browser: true,
    dedupe: importee => importee === "svelte" || importee.startsWith("svelte/")
  }),
  commonjs(),
  !production && serve(),
  !production && livereload("build"),
  production && terser()
]

export default {
  input: "src/main.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "build/bundle-index.js"
  },
  plugins,
  watch: {
    clearScreen: false
  }
};

function serve() {
  let started = false;

  return {
    writeBundle() {
      if (!started) {
        started = true;

        require("child_process").spawn("npm", ["run", "start"], {
          stdio: ["ignore", "inherit", "inherit"],
          shell: true
        });
      }
    }
  };
}
