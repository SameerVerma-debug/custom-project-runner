#!/usr/bin/env node

const chokidar = require("chokidar");
const {debounce} = require("./utils.js");

const onAdd = debounce(() => {
  console.log("ADDED");
},100);

chokidar
  .watch(process.cwd())
  .on("add", onAdd)
  .on("change", () => {
    console.log("change");
  })
  .on("unlink", () => {
    console.log("unlink");
  });
