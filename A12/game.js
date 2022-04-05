/*
game.js for Perlenspiel 3.3.x
Last revision: 2022-03-15 (BM)

Perlenspiel is a scheme by Professor Moriarty (bmoriarty@wpi.edu).
This version of Perlenspiel (3.3.x) is hosted at <https://ps3.perlenspiel.net>
Perlenspiel is Copyright © 2009-22 Brian Moriarty.
This file is part of the standard Perlenspiel 3.3.x devkit distribution.

Perlenspiel is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Perlenspiel is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You may have received a copy of the GNU Lesser General Public License
along with the Perlenspiel devkit. If not, see <http://www.gnu.org/licenses/>.
*/

/*
This JavaScript file is a template for creating new Perlenspiel 3.3.x games.
Any unused event-handling function templates can be safely deleted.
Refer to the tutorials and documentation at <https://ps3.perlenspiel.net> for details.
*/

/*
The following comment lines are for JSHint <https://jshint.com>, a tool for monitoring code quality.
You may find them useful if your development environment is configured to support JSHint.
If you don't use JSHint (or are using it with a configuration file), you can safely delete these two lines.
*/

/* jshint browser : true, devel : true, esversion : 6, freeze : true */
/* globals PS : true */

"use strict"; // Do NOT remove this directive!

function reformatMap(rawMap) {
	// ok to not clone because of the way this function is used (if we cloned, the original would be discarded anyway)
	let newMap = rawMap;

	// for each layer, convert from human readable version to an array of chars
	// remove every other character (spacing), and convert the resulting string into a char array
	// (the regex here just removes every other char)
	newMap.layers = newMap.layers.map(l => l.replaceAll(/(.)(\s)?/g, "$1").split(''));
	return newMap;
}

// Map Key:
// X = wall
// space = nothing
// s = ball spawn
// G = goal (go to next level, determined by `getNextMap`)
// O = hole (teleports ball to first different layer that has a hole at the same position)

const TEST_MAP_1 = reformatMap({
	size: { width: 7, height: 7 },
	layers: [
		`\
X X X X X X X\
X s     X O X\
X X X       X\
X   G X X X X\
X   X X   X X\
X         O X\
X X X X X X X`,
		`\
X X X X X X X\
X X X X   O X\
X X X X   X X\
X X X     X X\
X X X   X X X\
X X X     O X\
X X X X X X X`
	],
	getNextMap: () => TEST_MAP_2
});

const TEST_MAP_2 = reformatMap({
	size: { width: 9, height: 11 },
	layers: [
		`\
X X X X X X X X X\
X X X           X\
X       X   X X X\
X O X X X   X s X\
X X             X\
X X   X X X X X X\
X X X X         X\
X         X X   X\
X   X X X X X   X\
X       G X X O X\
X X X X X X X X X`,
		`\
X X X X X X X X X\
X           X X X\
X X X   X       X\
X O X     X X   X\
X   X X     X   X\
X       X   X   X\
X   X X X   X   X\
X     X     X   X\
X X   X   X X   X\
X           X O X\
X X X X X X X X X`
	],
	getNextMap: () => TEST_MAP_3
});

const TEST_MAP_3 = reformatMap({
	size: { width: 14, height: 14 },
	layers: [
		`\
X X X X X X X X X X X X X X\
X X   X X X X     X X X X X\
X X               X O X X X\
X X s           X X     X X\
X X X   X X   X X X X   X X\
X X X X X     X           X\
X X X   X             X   X\
X X     G X X X X X X X   X\
X X     X X X X     X X X X\
X X     X X X       X X X X\
X X                     X X\
X X X           X     O X X\
X X X X X X X X X X X X X X\
X X X X X X X X X X X X X X`,
		`\
X X X X X X X X X X X X X X\
X X X X X X X X X X X X X X\
X X X X         X   O X X X\
X X   X     X           X X\
X       X   X X       X X X\
X           X X     X X X X\
X X   X X   X X         X X\
X X   X X X X X   X X   X X\
X X     X       X X X   X X\
X X X         X X X X X X X\
X X X X             X X X X\
X X X X X X           O X X\
X X X X X X X X X X X X X X\
X X X X X X X X X X X X X X`
	],
	getNextMap: () => TEST_MAP_4
});

const TEST_MAP_4 = reformatMap({
	size: { width: 15, height: 15 },
	layers: [
		`\
X X X X X X X X X X X X X X X\
X X X O     X         X X X X\
X   O X X   X   X       X X X\
X   X   X   X     X X       X\
X   X   X     X   X X   X   X\
X   X     X         X   X   X\
X     X     X X X X X   X   X\
X X   X X     s   X     X X X\
X X   X X X X X       X X X X\
X       X     X X X X       X\
X   X         O X       X   X\
X   X X X   X X X X X   X   X\
X     X         X X     X G X\
X X       X X   X O     X X X\
X X X X X X X X X X X X X X X`,
		`\
X X X X X X X X X X X X X X X\
X X X O         X X X X X X X\
X   O X X X X     X     X X X\
X     X X         X   X X X X\
X   X X X   X     X   X X X X\
X   X       X X   X       X X\
X   X   X   X X X X   X   X X\
X       X X X         X   X X\
X X X X X         X   X     X\
X X X X     X X X X   X     X\
X X X X   X X O X X X X X   X\
X X X               X X X   X\
X X X       X X X X X       X\
X X X X X X X X X O       X X\
X X X X X X X X X X X X X X X`
	],
	getNextMap: () => TEST_MAP_END
});

const TEST_MAP_END = reformatMap({
	size: { width: 16, height: 7 },
	layers: [
		`\
X X X X X X X X X X X X X X X X\
X       X   X X   X     X X X X\
X   X X X     X   X   X   X X X\
X     X X   X     X   X   X X X\
X   X X X   X X   X   X   X X X\
X       X   X X   X     X X s X\
X X X X X X X X X X X X X X X X`
	],
	getNextMap: () => null
});

const G = {
	ball: {
		pos: { x: 0.0, y: 0.0, layer: 0 },
		vel: { x: 0.0, y: 0.0 }
	},
	map: null,
	control: {
		scheme: 0, // 0 for edge click/arrow keys, 1 for mouse position tilting // TODO: enum/constants
		selectedDir: null,
		tilt: { x: 0.0, y: 0.0 }
	}
};

G.loadStage = (map) => {
	G.map = map;
	let startPos = findStart(map);
	G.ball.pos = startPos;

	G.control.selectedDir = null;

	let padding = G.control.scheme == 0 ? 1 : 0;
	PS.gridSize(map.size.width + padding * 2, map.size.height + padding * 2);

	PS.gridColor(0x222222);
	// PS.statusColor(PS.COLOR_WHITE);
	// PS.gridColor(PS.COLOR_WHITE);
	//PS.border(PS.ALL, PS.ALL, 1);
	//PS.gridRefresh();
	PS.borderColor(PS.ALL, PS.ALL, PS.COLOR_WHITE);
	PS.bgColor(PS.ALL, PS.ALL, PS.COLOR_WHITE);
	PS.border(PS.ALL, PS.ALL, 0);
	// PS.gridColor(0x222222);

	render();
};

function findStart(map) {
	for (let l in map.layers) {
		let index = map.layers[l].indexOf('s');
		if (index !== -1) {
			let x = index % map.size.width;
			let y = Math.floor(index / map.size.width);
			return { x, y, layer: l };
		}
	}

	return null;
}

function findLayerWithHole(map, x, y, ignoreLayer) {
	for (let l in map.layers) {
		if (l == ignoreLayer) {
			continue;
		}

		if (map.layers[l][x + y * map.size.width] === 'O') {
			return l;
		}
	}

	return null;
}

/*
PS.init( system, options )
Called once after engine is initialized but before event-polling begins.
This function doesn't have to do anything, although initializing the grid dimensions with PS.gridSize() is recommended.
If PS.grid() is not called, the default grid dimensions (8 x 8 beads) are applied.
Any value returned is ignored.
[system : Object] = A JavaScript object containing engine and host platform information properties; see API documentation for details.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.init = function (system, options) {
	// Uncomment the following code line
	// to verify operation:

	// PS.debug( "PS.init() called\n" );

	// This function should normally begin
	// with a call to PS.gridSize( x, y )
	// where x and y are the desired initial
	// dimensions of the grid.
	// Call PS.gridSize() FIRST to avoid problems!
	// The sample call below sets the grid to the
	// default dimensions (8 x 8).
	// Uncomment the following code line and change
	// the x and y parameters as needed.

	// PS.gridSize( 8, 8 );

	// This is also a good place to display
	// your game title or a welcome message
	// in the status line above the grid.
	// Uncomment the following code line and
	// change the string parameter as needed.

	// PS.statusText("Laballrinth");
	PS.statusText("Click edges or use arrow keys to tilt.");

	// Add any other initialization code you need here.

	G.loadStage(TEST_MAP_1);

	PS.timerStart(1, tick);
	tick();
};

function tick() {

	if (G.control.scheme === 0) {
		G.control.tilt = { x: 0.0, y: 0.0 };
		switch (G.control.selectedDir) {
			case 0:
				G.control.tilt.x = 0;
				G.control.tilt.y = -0.01;
				break;
			case 1:
				G.control.tilt.x = 0;
				G.control.tilt.y = 0.01;
				break;
			case 2:
				G.control.tilt.x = -0.01;
				G.control.tilt.y = 0;
				break;
			case 3:
				G.control.tilt.x = 0.01;
				G.control.tilt.y = 0;
				break;
		}
	}

	G.ball.vel.x += G.control.tilt.x;
	G.ball.vel.y += G.control.tilt.y;

	let newBallX = G.ball.pos.x + G.ball.vel.x;
	let newBallY = G.ball.pos.y + G.ball.vel.y;

	if (G.map !== null) {
		let prevIndex = Math.floor(G.ball.pos.x) + Math.floor(G.ball.pos.y) * G.map.size.width;
		let prevTile = G.map.layers[G.ball.pos.layer][prevIndex];
		let newIndex = Math.floor(newBallX) + Math.floor(newBallY) * G.map.size.width;
		let newTile = G.map.layers[G.ball.pos.layer][newIndex];

		if (newIndex != prevIndex && newTile === 'O') {
			G.ball.pos.x = newBallX;
			G.ball.pos.y = newBallY;
			G.ball.vel.x = 0;
			G.ball.vel.y = 0;
			G.ball.pos.layer = findLayerWithHole(G.map, Math.floor(newBallX), Math.floor(newBallY), G.ball.pos.layer);
		} else if (newIndex != prevIndex && newTile === 'G') {
			G.ball.pos.x = newBallX;
			G.ball.pos.y = newBallY;
			G.ball.vel.x = 0;
			G.ball.vel.y = 0;

			let newMap = G.map.getNextMap();

			if (newMap !== null) {
				G.loadStage(newMap);
			}

		} else if (newTile !== 'X') {
			G.ball.pos.x = newBallX;
			G.ball.pos.y = newBallY;
		} else {
			// TODO: per-component collision handling
			G.ball.vel.x = 0;
			G.ball.vel.y = 0;
		}
	}

	render();
}

function render() {
	// need to do this dumbness or ps3 will sometimes use 0x222222 as the bead border color
	PS.gridColor(PS.COLOR_WHITE);
	// PS.gridColor(0x222222);

	if (G.map !== null) {

		let ofsX = G.control.scheme == 0 ? 1 : 0;
		let ofsY = G.control.scheme == 0 ? 1 : 0;

		const layer = G.map.layers[G.ball.pos.layer];
		for (let i in layer) {
			let x = i % G.map.size.width + ofsX;
			let y = Math.floor(i / G.map.size.width) + ofsY;

			let tile = layer[i];

			if (tile === 'X') {
				PS.radius(x, y, 0);
				PS.color(x, y, 0x510100);
			} else if (tile === ' ' || tile === 's') {
				PS.radius(x, y, 0);
				PS.color(x, y, PS.COLOR_WHITE);
			} else if (tile === 'G') {
				PS.radius(x, y, 0);
				PS.color(x, y, PS.COLOR_GREEN);
			} else if (tile === 'O') {
				PS.radius(x, y, 50);
				PS.color(x, y, PS.COLOR_BLACK);
			}
		}

		let ballX = Math.floor(G.ball.pos.x);
		let ballY = Math.floor(G.ball.pos.y);
		if (ballX >= 0 && ballX < G.map.size.width && ballY >= 0 && ballY < G.map.size.height) {
			PS.radius(ballX + ofsX, ballY + ofsY, 50);
			PS.color(ballX + ofsX, ballY + ofsY, PS.COLOR_BLUE);
		}

		if (G.control.scheme === 0) {
			PS.color(0, 0, 0x606060);
			PS.color(PS.gridSize().width - 1, 0, 0x606060);
			PS.color(0, PS.gridSize().height - 1, 0x606060);
			PS.color(PS.gridSize().width - 1, PS.gridSize().height - 1, 0x606060);

			for (let x = 1; x < PS.gridSize().width - 1; x++) {
				PS.color(x, 0, G.control.selectedDir === 0 ? 0xDBDB7A : 0xC0C0C0);
				PS.color(x, PS.gridSize().height - 1, G.control.selectedDir === 1 ? 0xDBDB7A : 0xC0C0C0);
			}

			for (let y = 1; y < PS.gridSize().height - 1; y++) {
				PS.color(0, y, G.control.selectedDir === 2 ? 0xDBDB7A : 0xC0C0C0);
				PS.color(PS.gridSize().width - 1, y, G.control.selectedDir === 3 ? 0xDBDB7A : 0xC0C0C0);
			}
		}

		for (let x = 0; x < G.map.size.width; x++) {
			for (let y = 0; y < G.map.size.height; y++) {
				let centerDx = (x - G.map.size.width / 2 + 0.5) / (G.map.size.width / 2);
				let centerDy = (y - G.map.size.height / 2 + 0.5) / (G.map.size.height / 2);
				let dot = G.control.tilt.x * centerDx + G.control.tilt.y * centerDy;

				let color = PS.color(x + ofsX, y + ofsY, PS.CURRENT);
				// let color = PS.COLOR_WHITE;
				PS.color(x + ofsX, y + ofsY, blendColors(color, PS.COLOR_BLACK, Math.min(Math.max(dot / 0.05 + 0.1, 0.0), 1.0)));
			}
		}

		PS.gridRefresh();
	}
}

function blendColors(color1, color2, factor) {
	let c1 = PS.unmakeRGB(color1, []);
	let c2 = PS.unmakeRGB(color2, []);

	return PS.makeRGB(
		c1[0] + (c2[0] - c1[0]) * factor,
		c1[1] + (c2[1] - c1[1]) * factor,
		c1[2] + (c2[2] - c1[2]) * factor
	);
}

/*
PS.touch ( x, y, data, options )
Called when the left mouse button is clicked over bead(x, y), or when bead(x, y) is touched.
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.touch = function (x, y, data, options) {

	if (G.control.scheme === 0) {
		// top edge
		if (x >= 1 && x < PS.gridSize().width - 1 && y === 0) {
			G.control.selectedDir = G.control.selectedDir === 0 ? null : 0;
		}

		// bottom edge
		if (x >= 1 && x < PS.gridSize().width - 1 && y === PS.gridSize().height - 1) {
			G.control.selectedDir = G.control.selectedDir === 1 ? null : 1;
		}

		// left edge
		if (y >= 1 && y < PS.gridSize().height - 1 && x === 0) {
			G.control.selectedDir = G.control.selectedDir === 2 ? null : 2;
		}

		// right edge
		if (y >= 1 && y < PS.gridSize().height - 1 && x === PS.gridSize().width - 1) {
			G.control.selectedDir = G.control.selectedDir === 3 ? null : 3;
		}
	}
};

/*
PS.release ( x, y, data, options )
Called when the left mouse button is released, or when a touch is lifted, over bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.release = function (x, y, data, options) {
	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.release() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse button/touch is released over a bead.
};

/*
PS.enter ( x, y, button, data, options )
Called when the mouse cursor/touch enters bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.enter = function (x, y, data, options) {
	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.enter() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch enters a bead.

	if (G.control.scheme === 1) {
		let centerDx = (x - PS.gridSize().width / 2 + 0.5) / (PS.gridSize().width / 2 - 0.5);
		let centerDy = (y - PS.gridSize().height / 2 + 0.5) / (PS.gridSize().height / 2 - 0.5);
		G.control.tilt.x = centerDx * 0.01;
		G.control.tilt.y = centerDy * 0.01;
	}

};

/*
PS.exit ( x, y, data, options )
Called when the mouse cursor/touch exits bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.exit = function (x, y, data, options) {
	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.exit() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch exits a bead.
};

/*
PS.exitGrid ( options )
Called when the mouse cursor/touch exits the grid perimeter.
This function doesn't have to do anything. Any value returned is ignored.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.exitGrid = function (options) {
	// Uncomment the following code line to verify operation:

	// PS.debug( "PS.exitGrid() called\n" );

	// Add code here for when the mouse cursor/touch moves off the grid.
};

/*
PS.keyDown ( key, shift, ctrl, options )
Called when a key on the keyboard is pressed.
This function doesn't have to do anything. Any value returned is ignored.
[key : Number] = ASCII code of the released key, or one of the PS.KEY_* constants documented in the API.
[shift : Boolean] = true if shift key is held down, else false.
[ctrl : Boolean] = true if control key is held down, else false.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.keyDown = function (key, shift, ctrl, options) {
	// Uncomment the following code line to inspect first three parameters:

	// PS.debug( "PS.keyDown(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

	// Add code here for when a key is pressed.
};

/*
PS.keyUp ( key, shift, ctrl, options )
Called when a key on the keyboard is released.
This function doesn't have to do anything. Any value returned is ignored.
[key : Number] = ASCII code of the released key, or one of the PS.KEY_* constants documented in the API.
[shift : Boolean] = true if shift key is held down, else false.
[ctrl : Boolean] = true if control key is held down, else false.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.keyUp = function (key, shift, ctrl, options) {
	// Uncomment the following code line to inspect first three parameters:

	// PS.debug("PS.keyUp(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n");

	// Add code here for when a key is released.

	switch (key) {
		case 1006:
			G.control.selectedDir = G.control.selectedDir === 0 ? null : 0;
			break;
		case 1008:
			G.control.selectedDir = G.control.selectedDir === 1 ? null : 1;
			break;
		case 1005:
			G.control.selectedDir = G.control.selectedDir === 2 ? null : 2;
			break;
		case 1007:
			G.control.selectedDir = G.control.selectedDir === 3 ? null : 3;
			break;
	}
};

/*
PS.input ( sensors, options )
Called when a supported input device event (other than those above) is detected.
This function doesn't have to do anything. Any value returned is ignored.
[sensors : Object] = A JavaScript object with properties indicating sensor status; see API documentation for details.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
NOTE: Currently, only mouse wheel events are reported, and only when the mouse cursor is positioned directly over the grid.
*/

PS.input = function (sensors, options) {
	// Uncomment the following code lines to inspect first parameter:

	//	 var device = sensors.wheel; // check for scroll wheel
	//
	//	 if ( device ) {
	//	   PS.debug( "PS.input(): " + device + "\n" );
	//	 }

	// Add code here for when an input event is detected.
};

