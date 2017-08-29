/* eslint-disable */

/* Command line Utility to convert
 * Regular expressions to valid JSON strings.
 */

// Read the first argument given to the
const str = process.argv[2];

// Print the answer to the stdout
console.log(JSON.stringify(str.toString()));
