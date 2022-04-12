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

// =================================================================================================

// Fonts used in cover.png:
// Mayon Exquisite by eyecone (CC BY-NC-ND): https://www.fontspace.com/mayon-exquisite-font-f30365
// Deadender by Pixel Kitchen (public domain): https://www.fontspace.com/deadender-font-f34510

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
// # = breakable wall

const MAP_TUT = reformatMap({
	size: { width: 13, height: 13 },
	theme: { mainColor: 0x6B5700 },
	status: "Use arrow keys to tilt.",
	musicTrack: 0,
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
	musicTrack: 0,
	layers: [
		`\
X X X X X X X X X X X X X X X X X X X\
X                                   X\
X                                   X\
X                                   X\
X                                   X\
X                                   X\
X           X           X           X\
X             X   s   X             X\
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
	musicTrack: 1,
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
	musicTrack: 1,
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
X           X # X\
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
	musicTrack: 2,
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
	musicTrack: 2,
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
	musicTrack: 3,
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

const MAP_EGG_1 = reformatMap({
	size: { width: 19, height: 19 },
	theme: { mainColor: 0x550068 },
	status: "???",
	musicTrack: -1,
	layers: [
		`\
                                      \
                                      \
             X X X X X                \
             X       X                \
             X   s   X                \
             X       X                \
             X       X                \
             X       X                \
             X       X                \
             X       X                \
             X       X                \
             X       X                \
             X       X                \
             X   G   X                \
             X       X                \
             X X X X X                \
                                      \
                                      \
                                      `
	],
	getNextMap: () => MAP_EGG_2
});

const MAP_EGG_2 = reformatMap({
	size: { width: 19, height: 19 },
	theme: { mainColor: 0x550068 },
	status: "???",
	musicTrack: -1,
	layers: [
		`\
                                      \
                                      \
                                      \
                                      \
                                      \
                                      \
                                      \
  X X X X X X X X X X X X X X X X X   \
  X                               X   \
  X   s                       G   X   \
  X                               X   \
  X X X X X X X X X X X X X X X X X   \
                                      \
                                      \
                                      \
                                      \
                                      \
                                      \
                                      `
	],
	getNextMap: () => MAP_EGG_END
});

const MAP_EGG_END = reformatMap({
	size: { width: 19, height: 19 },
	theme: { mainColor: 0x550068 },
	status: "",
	musicTrack: -1,
	layers: [
		`\
X X X X X X X X X X X X X X X X X X X\
X                                   X\
X               X X X               X\
X             X       X             X\
X           X           X           X\
X           X           X           X\
X           X           X           X\
X           X           X           X\
X             X X X X X             X\
X                                   X\
X                 G                 X\
X                                   X\
X                                   X\
X                                   X\
X                                   X\
X                                   X\
X                 s                 X\
X                                   X\
X X X X X X X X X X X X X X X X X X X`
	],
	getNextMap: () => MAP_5
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

	levelTransitionTimer: 15,

	/// number of frames to flash the ball for
	flashTime: 0,

	musicVolume: 0.5,

	audio: {
		started: false,
		musicChannelA: null,
		musicChannelB: null,
		musicChannelC: null,
		musicChannelD: null,
	},

	ascendTimer: null,
	ascendTimerMax: 60 * 4,

	ascended: false,

	startTime: null,
};

/// Load a map
G.loadStage = (map) => {
	// save some stuff from the old map
	const prevMusic = G.map === null ? -1 : G.map.musicTrack;
	const prevColor = G.map === null ? 0x303030 : blendColors(PS.COLOR_BLACK, G.map.theme.mainColor, 0.5);

	G.map = map;

	// update music
	const newMusic = map.musicTrack;
	if (newMusic !== prevMusic && G.audio.started) {
		// fade out old music
		switch (prevMusic) {
			case 0:
				PS.audioFade(G.audio.musicChannelA, PS.CURRENT, 0.0);
				break;
			case 1:
				PS.audioFade(G.audio.musicChannelB, PS.CURRENT, 0.0);
				break;
			case 2:
				PS.audioFade(G.audio.musicChannelC, PS.CURRENT, 0.0);
				break;
			case 3:
				PS.audioFade(G.audio.musicChannelD, PS.CURRENT, 0.0);
				break;
		}

		// fade in new music
		switch (newMusic) {
			case 0:
				PS.audioFade(G.audio.musicChannelA, PS.CURRENT, G.musicVolume);
				break;
			case 1:
				PS.audioFade(G.audio.musicChannelB, PS.CURRENT, G.musicVolume);
				break;
			case 2:
				PS.audioFade(G.audio.musicChannelC, PS.CURRENT, G.musicVolume);
				break;
			case 3:
				// slowly auto fade out the end music after it fades in
				PS.audioFade(G.audio.musicChannelD, PS.CURRENT, G.musicVolume, 1000, () => {
					PS.audioFade(G.audio.musicChannelD, PS.CURRENT, 0.0, 15000);
				});
				break;
		}
	}

	// put ball at start
	G.ball.pos = findStart(map);

	// make ball flash for a bit
	G.flashTime = 45;

	G.levelTransitionTimer = 15;

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

	if (map === MAP_END) {
		// display play time at the end

		let millis = new Date().getTime() - G.startTime;
		let seconds = millis / 1000.0;
		let minutes = Math.floor(seconds / 60.0);

		PS.statusText(minutes + "m " + (seconds % 60.0).toFixed(2) + "s");
	} else {
		PS.statusText(map.status);
	}
	PS.statusColor(blendColors(PS.COLOR_WHITE, G.map.theme.mainColor, 0.25));

	// reset board colors
	PS.borderColor(PS.ALL, PS.ALL, PS.COLOR_WHITE);
	PS.bgColor(PS.ALL, PS.ALL, PS.COLOR_WHITE);
	PS.border(PS.ALL, PS.ALL, 0);

	PS.gridColor(prevColor);
	PS.gridFade(30);
	PS.gridColor(blendColors(PS.COLOR_BLACK, G.map.theme.mainColor, 0.5));

	// play transition sound effect
	PS.audioPlay("loadLevel", { fileTypes: ["wav"], path: "audio/", volume: 0.3 });

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
	PS.audioLoad("loadLevel", { fileTypes: ["wav"], path: "audio/" });
	PS.audioLoad("secret", { fileTypes: ["wav"], path: "audio/" });
	PS.audioLoad("ASCEND", { fileTypes: ["wav"], path: "audio/" });
	PS.audioLoad("ASCENDED", { fileTypes: ["wav"], path: "audio/" });
	PS.audioLoad("HERE", { fileTypes: ["wav"], path: "audio/" });
	PS.audioLoad("HERE2", { fileTypes: ["wav"], path: "audio/" });

	// need to save channels of music since we fade them elsewhere
	PS.audioLoad("laballrinth_a", {
		fileTypes: ["wav"], path: "audio/", onLoad: (ctx) => {
			G.audio.musicChannelA = ctx.channel;
		}
	});
	PS.audioLoad("laballrinth_b", {
		fileTypes: ["wav"], path: "audio/", onLoad: (ctx) => {
			G.audio.musicChannelB = ctx.channel;
		}
	});
	PS.audioLoad("laballrinth_c", {
		fileTypes: ["wav"], path: "audio/", onLoad: (ctx) => {
			G.audio.musicChannelC = ctx.channel;
		}
	});
	PS.audioLoad("laballrinth_d", {
		fileTypes: ["wav"], path: "audio/", onLoad: (ctx) => {
			G.audio.musicChannelD = ctx.channel;
		}
	});

	// (grid size and color stuff is set up in loadStage)
	G.loadStage(MAP_TUT);

	G.startTime = new Date().getTime();

	PS.timerStart(1, tick);
	tick();
};

function tick() {

	// wait for all of the audio to be loaded before playing them all at the same time
	// need to do this for them to be synced
	if (!G.audio.started) {
		if (G.audio.musicChannelA !== null && G.audio.musicChannelB !== null && G.audio.musicChannelC !== null && G.audio.musicChannelD !== null) {
			PS.audioPlayChannel(G.audio.musicChannelA, { loop: true, volume: G.musicVolume });
			PS.audioPlayChannel(G.audio.musicChannelB, { loop: true, volume: 0.0, });
			PS.audioPlayChannel(G.audio.musicChannelC, { loop: true, volume: 0.0, });
			PS.audioPlayChannel(G.audio.musicChannelD, { loop: true, volume: 0.0, });
			G.audio.started = true;
		}
	}

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
	} else if (G.ascendTimer !== null) {
		// do ascend animation

		if (G.ascendTimer === 0) {
			G.loadStage(MAP_EGG_1);
		}

		if (G.ascendTimer <= -G.ascendTimerMax) {
			G.ascendTimer = null;
		} else if (G.ascendTimer < 0) {
			G.ascendTimer -= 2;
		} else {
			G.ascendTimer -= 1;
		}
	} else {

		// update ball flash timer
		if (G.flashTime > 0) {
			G.flashTime -= 1;
		}

		// update level transition timer
		if (G.levelTransitionTimer > 0) {
			G.levelTransitionTimer -= 1;
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

			if (tileXOnly === 'X' || (tileXOnly === '#' && Math.abs(G.ball.vel.x) < 0.25)) {
				G.ball.vel.x = 0;
			} else if (tileXOnly === '#') {
				G.ball.vel.x *= -0.5;
				G.map.layers[G.ball.pos.layer][indexXOnly] = '?';

				onSecretBlockBreak();
			} else {
				G.ball.pos.x = newBallX;
			}

			// do y collision

			const indexYOnly = Math.floor(G.ball.pos.x) + Math.floor(newBallY) * G.map.size.width;
			const tileYOnly = G.map.layers[G.ball.pos.layer][indexYOnly];

			if (tileYOnly === 'X' || (tileYOnly === '#' && Math.abs(G.ball.vel.y) < 0.25)) {
				G.ball.vel.y = 0;
			} else if (tileYOnly === '#') {
				G.ball.vel.y *= -0.5;
				G.map.layers[G.ball.pos.layer][indexYOnly] = '?';

				onSecretBlockBreak();
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

				// stop the ball
				G.ball.vel.x = 0;
				G.ball.vel.y = 0;
				G.control.tilt.x = 0;
				G.control.tilt.y = 0;

				if (G.map === MAP_EGG_END) {
					// start animation (slightly longer so you can see the effects)
					G.winTimer = 90;

					G.ascended = true;
					PS.statusText("egg");
					PS.audioPlay("ASCENDED", { fileTypes: ["wav"], path: "audio/", volume: 0.5 });
				} else {
					// start animation
					G.winTimer = 60;

					if (G.map === MAP_EGG_1) {
						PS.audioPlay("HERE", { fileTypes: ["wav"], path: "audio/", volume: 0.5 });
					} else if (G.map === MAP_EGG_2) {
						PS.audioPlay("HERE2", { fileTypes: ["wav"], path: "audio/", volume: 0.5 });
					} else {
						PS.statusText("Level complete!");
						PS.audioPlay("stageComplete", { fileTypes: ["wav"], path: "audio/", volume: 0.2 });
					}
				}
			} else if (newIndex != prevIndex && newTile === '?') {
				ascend();
			}
		}
	}

	// update the display
	render();
}

function onSecretBlockBreak() {
	// play secret sound effect
	PS.audioPlay("secret", { fileTypes: ["wav"], path: "audio/", volume: 0.5 });

	// fade out music
	switch (G.map.musicTrack) {
		case 0:
			PS.audioFade(G.audio.musicChannelA, PS.CURRENT, 0.0);
			break;
		case 1:
			PS.audioFade(G.audio.musicChannelB, PS.CURRENT, 0.0);
			break;
		case 2:
			PS.audioFade(G.audio.musicChannelC, PS.CURRENT, 0.0);
			break;
		case 3:
			PS.audioFade(G.audio.musicChannelD, PS.CURRENT, 0.0);
			break;
	}
}

function ascend() {
	// stop the ball
	G.ball.vel.x = 0;
	G.ball.vel.y = 0;
	G.control.tilt.x = 0;
	G.control.tilt.y = 0;

	// start ascension animation
	G.ascendTimer = G.ascendTimerMax;

	PS.audioPlay("ASCEND", { fileTypes: ["wav"], path: "audio/" });
}

/// Redraws the current game state
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

			// level transition dissolve effect
			if (G.levelTransitionTimer > 0 && Math.random() > 0.25) continue;

			// draw tile depending on type

			PS.scale(x, y, 100);
			if (tile === 'X') {
				// wall tile

				PS.radius(x, y, 0);
				PS.color(x, y, G.winTimer !== null ? 0x015100 : G.map.theme.mainColor);
			} else if (tile === '#') {
				// breakable wall tile

				PS.radius(x, y, 0);
				PS.color(x, y, blendColors(G.winTimer !== null ? 0x015100 : G.map.theme.mainColor, PS.COLOR_BLACK, 0.1));
			} else if (tile === '?') {
				// secret warp

				// rainbow color
				const time = new Date().getTime();
				const rgb = hsvToRgb((time / 1500.0) % 1.0, 1.0, 1.0);
				PS.color(x, y, PS.makeRGB(rgb[0], rgb[1], rgb[2]));

				// pulsing size/radius
				PS.scale(x, y, (Math.sin(time / 1000 * Math.PI) + 1.0) / 2.0 * 20 + 80);
				PS.radius(x, y, (Math.sin(time / 1200 * Math.PI) + 1.0) / 2.0 * 20 + 30);
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

			if (G.ascended) {
				// use rainbow color if ascended
				const time = new Date().getTime();
				const rgb = hsvToRgb((time / 10000.0) % 1.0, 1.0, 1.0);
				PS.color(ballX + ofsX, ballY + ofsY, PS.makeRGB(rgb[0], rgb[1], rgb[2]));
			} else {
				PS.color(ballX + ofsX, ballY + ofsY, 0x0080ff);
			}
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
				// tint the color of the "solid" part of the bead
				PS.color(x + ofsX, y + ofsY, overlayColor);

				// also set the background color of the bead
				PS.bgColor(x + ofsX, y + ofsY, blendColors(PS.COLOR_WHITE, PS.COLOR_BLACK, Math.min(Math.max(dot / 0.05 + 0.1, 0.0), 1.0)));
				PS.bgAlpha(x + ofsX, y + ofsY, 255);
			}
		}

		// draw ascension rainbow mask effect
		// we do this last since we want it to cover the controls (unlike the hole effect)
		if (G.ascendTimer !== null) {
			for (let x = 0; x < PS.gridSize().width; x++) {
				for (let y = 0; y < PS.gridSize().height; y++) {
					// G.ascendTimer does G.ascendTimerMax -> 0.0 -> -G.ascendTimerMax

					// map to 1.0 -> 0.0 -> 1.0
					const thru = Math.abs(G.ascendTimer) / G.ascendTimerMax;

					// fancy function to map to inf -> 0.0 -> inf
					// having the function approach inf at 1.0 means it works on any board size
					const distance = Math.tan(Math.PI * (1.0 - thru) * 0.5) * 4;

					// distance from the drawing tile to the ball
					const dx = Math.abs(Math.floor(G.ball.pos.x) - (x - ofsX));
					const dy = Math.abs(Math.floor(G.ball.pos.y) - (y - ofsY));

					// if the drawing tile distance is above the threshold distance, fill it with black and continue to the next tile
					// mostly square mask with a bit of manhattan distance sprinkled in to round the edges (looks better than using a circle)
					let dst = dx * dx + dy * dy;
					if (dst < distance * distance) {
						// rainbow colors with waves going outwards or inwards depending on the phase of the timer
						const time = new Date().getTime() - dst * G.ascendTimer / 10;
						const rgb = hsvToRgb((time / 1500.0) % 1.0, 1.0, 1.0);

						PS.scale(x, y, 100);
						PS.radius(x, y, 0);
						PS.color(x, y, PS.makeRGB(rgb[0], rgb[1], rgb[2]));
					}
				}
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

/// Source: https://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
/**
 * Converts an HSV color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes h, s, and v are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  v       The value
 * @return  Array           The RGB representation
 */
function hsvToRgb(h, s, v) {
	let r, g, b;

	let i = Math.floor(h * 6);
	let f = h * 6 - i;
	let p = v * (1 - s);
	let q = v * (1 - f * s);
	let t = v * (1 - (1 - f) * s);

	switch (i % 6) {
		case 0: r = v; g = t; b = p; break;
		case 1: r = q; g = v; b = p; break;
		case 2: r = p; g = v; b = t; break;
		case 3: r = p; g = q; b = v; break;
		case 4: r = t; g = p; b = v; break;
		case 5: r = v; g = p; b = q; break;
	}

	return [r * 255, g * 255, b * 255];
}