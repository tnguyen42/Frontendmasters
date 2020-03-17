#!/usr/bin/env node

"use strict";

const util = require("util");
const path = require("path");
const fs = require("fs");
const Transform = require("stream").Transform;
const zlib = require("zlib");

const args = require("minimist")(process.argv.slice(2), {
	boolean: ["help", "in", "out", "compress", "uncompress"],
	string: ["file"]
});

const BASE_PATH = path.resolve(
	process.env.BASE_PATH || __dirname
);

let OUTFILE = path.join(BASE_PATH, "out.txt");

if (process.env.HELLO) {
	console.log(process.env.HELLO);
}


if (args.help) {
	printHelp();
} else if (args.in || args._.includes("-")) {
	processFile(process.stdin);
} else if (args.file) {
	let stream = fs.createReadStream(path.join(BASE_PATH, args.file));
	processFile(stream);
} else {
	error("Incorrect usage.", true);
}

function processFile (inStream) {
	var outStream = inStream;

	if (args.uncompress) {
		let gunzipStream = zlib.createGunzip();
		outStream = outStream.pipe(gunzipStream);
	}

	var upperStream = new Transform({
		transform (chunk, enc, cb) {
			this.push(chunk.toString().toUpperCase());
			// setTimeout(cb, 500);
			cb();
		}
	});

	outStream = outStream.pipe(upperStream);

	if (args.compress) {
		let gzipStream = zlib.createGzip();
		outStream = outStream.pipe(gzipStream);
		OUTFILE = `${OUTFILE}.gz`;
	}

	var targetStream;
	if (args.out) {
		targetStream = process.stdout;
	} else {
		targetStream = fs.createWriteStream(OUTFILE);
	}
	outStream.pipe(targetStream);
}

function error (msg, includeHelp = false) {
	console.log(msg);
	if (includeHelp) {
		console.log("");
		printHelp();
	}
}

// process.stdout.write("Hello World!\n");
// // process.stdin.read();
// console.log("Hello World!");

// console.error("Oops");

// printHelp();

// ***************************************

function printHelp () {
	console.log("ex2 usage: ");
	console.log("  ex2.js --help --file={FILENAME}");
	console.log("");
	console.log("--help                    print this help");
	console.log("--file={FILENAME}         process the file")
	console.log("--in, -                   process stdin");
	console.log("--out                     print to stdout");
	console.log("--compress                gzip the output");
	console.log("--uncompress              un-gzip the input");
	console.log("");
}