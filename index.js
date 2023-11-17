#!/usr/bin/env node

const chokidar = require("chokidar");
const { debounce } = require("./utils.js");
const program = require("caporal");
const fs = require("fs");
const childprocess = require("child_process");
const chalk = require("chalk");

program
  .version("0.0.1")
  .argument("[filename]", "Enter the name of the file")
  .action(async (args) => {
    const name = args.filename || "index.js";

    try {
      //checks if file exists
      await fs.promises.access(name);
    } catch (err) {
      throw new Error("Could not find file " + name);
    }

    let proc;
    const start = debounce(() => {
      console.log(chalk.bold.blue(">>>>> Starting Process......"));
      if (proc) {
        proc.kill();
      }
      proc = childprocess.spawn("node", [name], { stdio: "inherit" });
    }, 300);

    //Watches the file for change
    chokidar
      .watch(process.cwd())
      .on("add", start)
      .on("change", start)
      .on("unlink", start);
  });

program.parse(process.argv);
