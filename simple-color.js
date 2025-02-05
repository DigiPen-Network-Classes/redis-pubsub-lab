"use strict";
// Define functions to wrap text in ANSI color codes
// quick n dirty hack...

export function green(text) {
    return `\x1b[32m${text}\x1b[0m`;
  }
  
export function red(text) {
    return `\x1b[31m${text}\x1b[0m`;
  }
  
