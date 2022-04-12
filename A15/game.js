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

/// Converts a map from the raw human-readable version to a more code-friendly version (basically turn the grid string into a char array)
function reformatMap(map) {
	// ok to not clone because of the way this function is used (if we cloned, the original would be discarded anyway)

	// for each layer, convert from human readable version to an array of chars
	// remove every other character (spacing), and convert the resulting string into a char array
	// (the regex here just removes every other char)
	map.layers = map.layers.map(l => l.replaceAll(/(.)(\s)?/g, "$1").split(''));
	return map;
}

// Map Key:
// X = wall
// space = nothing
// s = ball spawn
// G = goal (go to next level, determined by `getNextMap`)
// O = hole (teleports ball to first different layer that has a hole at the same position)

const MAP_TUT = reformatMap({
	size: { width: 13, height: 13 },
	theme: { mainColor: 0x6B5700 },
	status: "Use arrow keys to tilt.",
	layers: [
		`\
X X X X X X X X X X X X X\
X s                     X\
X X X X X X X X X X X   X\
X G     X X X X X X X   X\
X         X X X X X X   X\
X X         X X X X X   X\
X X X         X X X X   X\
X X X X         X X X   X\
X X X X X         X X   X\
X X X X X X             X\
X X X X X X X           X\
X X X X X X X X         X\
X X X X X X X X X X X X X`
	],
	getNextMap: () => MAP_ATTRACTOR
});

const MAP_ATTRACTOR = reformatMap({
	size: { width: 19, height: 19 },
	theme: { mainColor: 0x6B5700 },
	status: "Level 2",
	layers: [
		`\
X X X X X X X X X X X X X X X X X X X\
X       s                           X\
X                                   X\
X                                   X\
X                                   X\
X                                   X\
X           X           X           X\
X             X       X             X\
X               X X X               X\
X               X G X               X\
X               X   X               X\
X             X       X             X\
X           X           X           X\
X                                   X\
X                                   X\
X                                   X\
X                                   X\
X                                   X\
X X X X X X X X X X X X X X X X X X X`
	],
	getNextMap: () => MAP_3
});

const MAP_3 = reformatMap({
	size: { width: 11, height: 11 },
	theme: { mainColor: 0x6D3600 },
	status: "Level 3",
	layers: [
		`\
X X X X X X X X X X X\
X                   X\
X   X X   X X   X   X\
X X X     X     X X X\
X       X X X   X   X\
X   X X X G X       X\
X   X   X   X X X   X\
X   X         O X   X\
X   X X X X X X X   X\
X       s X O       X\
X X X X X X X X X X X`,
		`\
X X X X X X X X X X X\
X X X X X           X\
X X X X             X\
X X X           X   X\
X X             X   X\
X           X   X   X\
X         X X   X   X\
X       X X X O X X X\
X     X X X X X X X X\
X           O X X X X\
X X X X X X X X X X X`
	],
	getNextMap: () => MAP_4
});

const MAP_4 = reformatMap({
	size: { width: 9, height: 11 },
	theme: { mainColor: 0x6D3600 },
	status: "Level 4",
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
	getNextMap: () => MAP_5
});

const MAP_5 = reformatMap({
	size: { width: 14, height: 14 },
	theme: { mainColor: 0x700000 },
	status: "Level 5",
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
	getNextMap: () => MAP_6
});

const MAP_6 = reformatMap({
	size: { width: 15, height: 15 },
	theme: { mainColor: 0x700000 },
	status: "Level 6",
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
	getNextMap: () => MAP_END
});

const MAP_END = reformatMap({
	size: { width: 16, height: 7 },
	theme: { mainColor: 0x4A8423 },
	status: "",
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

/// Game state
const G = {
	/// State of the ball
	ball: {
		pos: { x: 0.0, y: 0.0, layer: 0 },
		vel: { x: 0.0, y: 0.0 }
	},

	/// currently loaded map, or null if none
	map: null,

	/// State of controls
	control: {
		scheme: 0, // 0 for arrow keys/edge click, 1 for mouse position tilting (unused)
		left: false,
		right: false,
		up: false,
		down: false,
		tilt: { x: 0.0, y: 0.0 }
	},

	/// `null` if animation is not happening
	holeAnimationTimer: null,
	holeAnimationTimerMax: 15,

	/// `null` if animation is not happening
	winTimer: null,

	/// number of frames to flash the ball for
	flashTime: 0,
};

/// Load a map
G.loadStage = (map) => {
	G.map = map;

	// put ball at start
	const startPos = findStart(map);
	G.ball.pos = startPos;

	// make ball flash for a bit
	G.flashTime = 30;

	// reset controls
	G.control.left = false;
	G.control.right = false;
	G.control.up = false;
	G.control.down = false;

	// reset animation
	G.holeAnimationTimer = null;

	// resize grid to fit map
	const padding = G.control.scheme == 0 ? 1 : 0;
	PS.gridSize(map.size.width + padding * 2, map.size.height + padding * 2);

	PS.statusText(map.status);

	// reset board colors
	PS.borderColor(PS.ALL, PS.ALL, PS.COLOR_WHITE);
	PS.bgColor(PS.ALL, PS.ALL, PS.COLOR_WHITE);
	PS.border(PS.ALL, PS.ALL, 0);

	// draw a frame to apply the changes
	render();
};

/// returns the position of the start tile in a map, or `null` if not present
function findStart(map) {
	for (const l in map.layers) {
		const index = map.layers[l].indexOf('s');
		if (index !== -1) {
			const x = index % map.size.width;
			const y = Math.floor(index / map.size.width);
			return { x, y, layer: l };
		}
	}

	return null;
}

/// Returns the index of the first layer in the map with a hole at x,y other than `ignoreLayer`
function findLayerWithHole(map, x, y, ignoreLayer) {
	for (const l in map.layers) {
		if (l === ignoreLayer) {
			continue;
		}

		if (map.layers[l][x + y * map.size.width] === 'O') {
			return l;
		}
	}

	return null;
}

/**
PS.init( system, options )
Called once after engine is initialized but before event-polling begins.
This function doesn't have to do anything, although initializing the grid dimensions with PS.gridSize() is recommended.
If PS.grid() is not called, the default grid dimensions (8 x 8 beads) are applied.
Any value returned is ignored.
[system : Object] = A JavaScript object containing engine and host platform information properties; see API documentation for details.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/
PS.init = function (system, options) {

	// load sfx
	PS.audioLoad("hole", { fileTypes: ["wav"], path: "audio/" });
	PS.audioLoad("stageComplete", { fileTypes: ["wav"], path: "audio/" });

	PS.statusText("Use arrow keys to tilt.");

	// (grid size and visuals are set up in loadStage)
	G.loadStage(MAP_TUT);

	PS.timerStart(1, tick);
	tick();
};

function tick() {

	if (G.holeAnimationTimer !== null) {
		// do hole animation

		if (G.holeAnimationTimer === 0) {
			G.ball.pos.layer = findLayerWithHole(G.map, Math.floor(G.ball.pos.x), Math.floor(G.ball.pos.y), G.ball.pos.layer);

			G.holeAnimationTimer -= 1;
		} else if (G.holeAnimationTimer == - G.holeAnimationTimerMax) {
			G.holeAnimationTimer = null;
		} else {
			G.holeAnimationTimer -= 1;
		}
	} else if (G.winTimer !== null) {
		// do win animation

		if (G.winTimer === 0) {

			const newMap = G.map.getNextMap();

			if (newMap !== null) {
				G.loadStage(newMap);
			}

			G.winTimer = null;
		} else {
			G.winTimer -= 1;
		}
	} else {

		// update ball flash timer
		if (G.flashTime > 0) {
			G.flashTime -= 1;
		}

		if (G.control.scheme === 0) {
			// set tilt for arrow keys control scheme
			G.control.tilt = { x: 0.0, y: 0.0 };

			if (G.control.up) {
				G.control.tilt.y -= 0.0075;
			}
			if (G.control.down) {
				G.control.tilt.y += 0.0075;
			}
			if (G.control.left) {
				G.control.tilt.x -= 0.0075;
			}
			if (G.control.right) {
				G.control.tilt.x += 0.0075;
			}
		}

		// add tilt to ball velocity
		G.ball.vel.x += G.control.tilt.x;
		G.ball.vel.y += G.control.tilt.y;

		// clamp ball velocity

		if (Math.abs(G.ball.vel.x) > 1) {
			// clamp to 1
			G.ball.vel.x /= Math.abs(G.ball.vel.x);
		}

		if (Math.abs(G.ball.vel.y) > 1) {
			// clamp to 1
			G.ball.vel.y /= Math.abs(G.ball.vel.y);
		}

		// collision handling

		const newBallX = G.ball.pos.x + G.ball.vel.x;
		const newBallY = G.ball.pos.y + G.ball.vel.y;

		if (G.map !== null) {
			const prevIndex = Math.floor(G.ball.pos.x) + Math.floor(G.ball.pos.y) * G.map.size.width;

			// do x and y collision detection separately so we can just zero the x or y component instead of both

			// do x collision

			const indexXOnly = Math.floor(newBallX) + Math.floor(G.ball.pos.y) * G.map.size.width;
			const tileXOnly = G.map.layers[G.ball.pos.layer][indexXOnly];

			if (tileXOnly === 'X') {
				G.ball.vel.x = 0;
			} else {
				G.ball.pos.x = newBallX;
			}

			// do y collision

			const indexYOnly = Math.floor(G.ball.pos.x) + Math.floor(newBallY) * G.map.size.width;
			const tileYOnly = G.map.layers[G.ball.pos.layer][indexYOnly];

			if (tileYOnly === 'X') {
				G.ball.vel.y = 0;
			} else {
				G.ball.pos.y = newBallY;
			}

			// check for entering tiles with effects

			const newIndex = Math.floor(G.ball.pos.x) + Math.floor(G.ball.pos.y) * G.map.size.width;
			const newTile = G.map.layers[G.ball.pos.layer][newIndex];

			if (newIndex != prevIndex && newTile === 'O') {
				// entered hole

				// start animation
				G.holeAnimationTimer = G.holeAnimationTimerMax;

				// stop the ball
				G.ball.vel.x = 0;
				G.ball.vel.y = 0;

				PS.audioPlay("hole", { fileTypes: ["wav"], path: "audio/", volume: 0.25 });
			} else if (newIndex != prevIndex && newTile === 'G') {
				// entered goal

				// start animation
				G.winTimer = 60;

				// stop the ball
				G.ball.vel.x = 0;
				G.ball.vel.y = 0;

				PS.statusText("Level complete!");
				PS.audioPlay("stageComplete", { fileTypes: ["wav"], path: "audio/", volume: 0.2 });
			}
		}
	}

	// update the display
	render();
}

function render() {
	// draw the map on the lower plane
	PS.gridPlane(1);

	if (G.map !== null) {

		// arrow key control scheme has 1 bead of border for the indicators
		const ofsX = G.control.scheme == 0 ? 1 : 0;
		const ofsY = G.control.scheme == 0 ? 1 : 0;

		// draw each tile in the ball's layer
		const layer = G.map.layers[G.ball.pos.layer];
		for (const i in layer) {
			const x = i % G.map.size.width + ofsX;
			const y = Math.floor(i / G.map.size.width) + ofsY;

			const tile = layer[i];

			// animation for entering/exiting a hole
			if (G.holeAnimationTimer !== null) {
				// G.holeAnimationTimer does G.holeAnimationTimerMax -> 0.0 -> -G.holeAnimationTimerMax

				// map to 1.0 -> 0.0 -> 1.0
				const thru = Math.abs(G.holeAnimationTimer) / G.holeAnimationTimerMax;

				// fancy function to map to inf -> 0.0 -> inf
				// having the function approach inf at 1.0 means it works on any board size
				const distance = Math.tan(Math.PI * thru * 0.5);

				// distance from the drawing tile to the ball
				const dx = Math.abs(Math.floor(G.ball.pos.x) - (x - ofsX));
				const dy = Math.abs(Math.floor(G.ball.pos.y) - (y - ofsY));

				// if the drawing tile distance is above the threshold distance, fill it with black and continue to the next tile
				// mostly square mask with a bit of manhattan distance sprinkled in to round the edges (looks better than using a circle)
				if (dx + dy * 0.1 > distance || dy + dx * 0.1 > distance) {
					PS.scale(x, y, 100);
					PS.radius(x, y, 0);
					PS.color(x, y, PS.COLOR_BLACK);

					// skip to next tile
					continue;
				}
			}

			// draw tile depending on type

			PS.scale(x, y, 100);
			if (tile === 'X') {
				// wall tile

				PS.radius(x, y, 0);
				PS.color(x, y, G.winTimer !== null ? 0x015100 : G.map.theme.mainColor);
			} else if (tile === 'G') {
				// goal tile

				PS.radius(x, y, 0);
				PS.color(x, y, PS.COLOR_GREEN);
			} else if (tile === 'O') {
				// hole tile

				PS.radius(x, y, 50);
				PS.color(x, y, PS.COLOR_BLACK);
			} else {
				// blank tiles

				PS.radius(x, y, 0);
				PS.color(x, y, PS.COLOR_WHITE);
			}
		}

		// draw ball

		const ballX = Math.floor(G.ball.pos.x);
		const ballY = Math.floor(G.ball.pos.y);

		const ballInBounds = ballX >= 0 && ballX < G.map.size.width && ballY >= 0 && ballY < G.map.size.height;

		// skip drawing ball if not in bounds or sometimes while flashing
		if (G.flashTime % 8 < 4 && ballInBounds) {
			PS.scale(ballX + ofsX, ballY + ofsY, 90);
			PS.radius(ballX + ofsX, ballY + ofsY, 50);
			PS.color(ballX + ofsX, ballY + ofsY, 0x0080ff);
		}

		// draw the control indicators and gradient overlay on the upper plane
		PS.gridPlane(0);

		// draw control indicators if using arrow key control scheme
		if (G.control.scheme === 0) {
			// corners
			PS.color(0, 0, 0x606060);
			PS.color(PS.gridSize().width - 1, 0, 0x606060);
			PS.color(0, PS.gridSize().height - 1, 0x606060);
			PS.color(PS.gridSize().width - 1, PS.gridSize().height - 1, 0x606060);

			// draw a strip of beads on each edge of the board
			// use gold if the button for that direction is pressed, else use a green if the level was completed, else gray

			const defaultColor = G.winTimer !== null ? 0xA0FFA0 : 0xC0C0C0;
			const activeColor = 0xDBDB7A;

			// top and bottom indicators
			for (let x = 1; x < PS.gridSize().width - 1; x++) {
				PS.color(x, 0, G.control.up ? activeColor : defaultColor);
				PS.color(x, PS.gridSize().height - 1, G.control.down ? activeColor : defaultColor);
			}

			// left and right indicators
			for (let y = 1; y < PS.gridSize().height - 1; y++) {
				PS.color(0, y, G.control.left ? activeColor : defaultColor);
				PS.color(PS.gridSize().width - 1, y, G.control.right ? activeColor : defaultColor);
			}
		}

		// draw the gradient overlay
		for (let x = 0; x < G.map.size.width; x++) {
			for (let y = 0; y < G.map.size.height; y++) {
				// get vector from the center to (x,y)
				const centerDx = (x - G.map.size.width / 2 + 0.5) / (G.map.size.width / 2);
				const centerDy = (y - G.map.size.height / 2 + 0.5) / (G.map.size.height / 2);

				// calculate the dot product of the center->(x,y) vector and the tilt direction
				const dot = G.control.tilt.x * centerDx + G.control.tilt.y * centerDy;

				// get the color on the main board
				PS.gridPlane(1);
				const origColor = PS.color(x + ofsX, y + ofsY, PS.CURRENT);
				PS.gridPlane(0);

				// blend to black depending on the dot product
				const overlayColor = blendColors(origColor, PS.COLOR_BLACK, Math.min(Math.max(dot / 0.05 + 0.1, 0.0), 1.0));

				// fill the bead
				PS.color(x + ofsX, y + ofsY, overlayColor);
				PS.bgColor(x + ofsX, y + ofsY, PS.COLOR_BLACK);
				PS.bgAlpha(x + ofsX, y + ofsY, Math.min(Math.max(dot / 0.05 + 0.1, 0.0), 1.0) * 255);
			}
		}

		PS.gridPlane(1);
	}
}

/// lerps between two colors
function blendColors(color1, color2, factor) {
	const c1 = PS.unmakeRGB(color1, []);
	const c2 = PS.unmakeRGB(color2, []);

	return PS.makeRGB(
		c1[0] + (c2[0] - c1[0]) * factor,
		c1[1] + (c2[1] - c1[1]) * factor,
		c1[2] + (c2[2] - c1[2]) * factor
	);
}

/**
PS.touch ( x, y, data, options )
Called when the left mouse button is clicked over bead(x, y), or when bead(x, y) is touched.
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/
PS.touch = function (x, y, _data, _options) {
	// detect clicking on the edges

	if (G.control.scheme === 0) {
		// top edge
		if (x >= 1 && x < PS.gridSize().width - 1 && y === 0) {
			G.control.up = !G.control.up;
		}

		// bottom edge
		if (x >= 1 && x < PS.gridSize().width - 1 && y === PS.gridSize().height - 1) {
			G.control.down = !G.control.down;
		}

		// left edge
		if (y >= 1 && y < PS.gridSize().height - 1 && x === 0) {
			G.control.left = !G.control.left;
		}

		// right edge
		if (y >= 1 && y < PS.gridSize().height - 1 && x === PS.gridSize().width - 1) {
			G.control.right = !G.control.right;
		}
	}
};

/**
PS.enter ( x, y, button, data, options )
Called when the mouse cursor/touch enters bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/
PS.enter = function (x, y, _data, _options) {
	if (G.control.scheme === 1) {
		// update mouse tilting using new mouse position
		const centerDx = (x - PS.gridSize().width / 2 + 0.5) / (PS.gridSize().width / 2 - 0.5);
		const centerDy = (y - PS.gridSize().height / 2 + 0.5) / (PS.gridSize().height / 2 - 0.5);
		G.control.tilt.x = centerDx * 0.01;
		G.control.tilt.y = centerDy * 0.01;
	}
};

/**
PS.keyDown ( key, shift, ctrl, options )
Called when a key on the keyboard is pressed.
This function doesn't have to do anything. Any value returned is ignored.
[key : Number] = ASCII code of the released key, or one of the PS.KEY_* constants documented in the API.
[shift : Boolean] = true if shift key is held down, else false.
[ctrl : Boolean] = true if control key is held down, else false.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/
PS.keyDown = function (key, _shift, _ctrl, _options) {
	// update directions when arrow keys pressed
	switch (key) {
		case 1006: // up
		case 119:  // W
			G.control.up = true;
			break;
		case 1008: // down
		case 115:  // S
			G.control.down = true;
			break;
		case 1005: // left
		case 97:   // A
			G.control.left = true;
			break;
		case 1007: // right
		case 100:  // D
			G.control.right = true;
			break;
	}
};

/**
PS.keyUp ( key, shift, ctrl, options )
Called when a key on the keyboard is released.
This function doesn't have to do anything. Any value returned is ignored.
[key : Number] = ASCII code of the released key, or one of the PS.KEY_* constants documented in the API.
[shift : Boolean] = true if shift key is held down, else false.
[ctrl : Boolean] = true if control key is held down, else false.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/
PS.keyUp = function (key, shift, ctrl, options) {
	// update directions when arrow keys released
	switch (key) {
		case 1006: // up
		case 119:  // W
			G.control.up = false;
			break;
		case 1008: // down
		case 115:  // S
			G.control.down = false;
			break;
		case 1005: // left
		case 97:   // A
			G.control.left = false;
			break;
		case 1007: // right
		case 100:  // D
			G.control.right = false;
			break;
	}
};
