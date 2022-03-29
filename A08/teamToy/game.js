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

/*
PS.init( system, options )
Called once after engine is initialized but before event-polling begins.
This function doesn't have to do anything, although initializing the grid dimensions with PS.gridSize() is recommended.
If PS.grid() is not called, the default grid dimensions (8 x 8 beads) are applied.
Any value returned is ignored.
[system : Object] = A JavaScript object containing engine and host platform information properties; see API documentation for details.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// global state variables
const Toy = {
	bgColor: 0xADE4EA, // sky blue
	petColor: 0x7B5725, // brown by default
	groundColor: 0x4F9327, // green
	foodColor: 0xA8341D, // meaty red
	petSize: 1, // int, [1, 17]
	petSprite: undefined, // initialized in PS.init
	jumpTime: 0, // int, 5 -> 0
	jumpXDir: 0, // int, [-1, 1]
	jumpYDir: 0, // int, [-1, 1]
	jumpsSinceEat: 0, // int, [0,)
	napTime: 0, // int, 96 -> 0
	newLookTimer: 0, // int, 100 -> 0
};

PS.init = function (_system, _options) {

	// we use a big grid size to allow as much growth as possible for the pet
	PS.gridSize(32, 32);

	PS.gridColor(Toy.bgColor);

	PS.border(PS.ALL, PS.ALL, 0);
	PS.alpha(PS.ALL, PS.ALL, 0);

	// fill ground with groundColor
	let groundThickness = 5;
	for (let y = 0; y < groundThickness; y++) {
		let ground_y = 31 - y;
		for (let x = 0; x < PS.gridSize().width; x++) {
			PS.color(x, ground_y, Toy.groundColor);
			PS.alpha(x, ground_y, 255);
		}
	}

	// pet sprite is a solid square with size Toy.petSize
	Toy.petSprite = PS.spriteSolid(Toy.petSize, Toy.petSize);
	PS.spriteSolidColor(Toy.petSprite, Toy.petColor);
	// start the sprite with its bottom on the groud
	PS.spriteMove(Toy.petSprite, PS.gridSize().width / 2, PS.gridSize().height - groundThickness - 1);

	// start calling our tick function
	PS.timerStart(2, tick);

	PS.statusText("");

	// load sfx

	PS.audioLoad("snore", { path: "audio/" });
	for (let i = 0; i <= 3; i++) {
		PS.audioLoad("jump" + i, { fileTypes: ["wav"], path: "audio/" });
	}
	PS.audioLoad("munch", { fileTypes: ["wav"], path: "audio/" });
	PS.audioLoad("color_change", { fileTypes: ["wav"], path: "audio/" });
};

function tick() {
	// get current position
	let petX = PS.spriteMove(Toy.petSprite, PS.CURRENT, PS.CURRENT).x;
	let petY = PS.spriteMove(Toy.petSprite, PS.CURRENT, PS.CURRENT).y;

	// check if food is touching the pet
	let touchingFood = isFoodPresent() &&
		Math.abs(Toy.foodX - (petX + (Toy.petSize / 2))) <= (Toy.petSize / 2 + 1) &&
		Math.abs(Toy.foodY - (petY + (Toy.petSize / 2))) <= (Toy.petSize / 2 + 1);

	if (Toy.napTime == 0 && touchingFood) {
		// eat the food

		PS.audioPlay("munch", { fileTypes: ["wav"], path: "audio/" });

		// reset food
		PS.alpha(Toy.foodX, Toy.foodY, 0);
		Toy.foodX = undefined;
		Toy.foodY = undefined;

		Toy.petSize += 1;
		Toy.jumpsSinceEat = 0;

		if (Toy.petSize > 16) {
			// if pet grows large enough, change it to a new random color

			PS.audioPlay("color_change", { fileTypes: ["wav"], path: "audio/" });

			// random color
			Toy.petColor = PS.makeRGB(PS.random(255), PS.random(255), PS.random(255));

			// shrink by 14 sizes
			Toy.jumpsSinceEat = 14 * 10;

			Toy.newLookTimer = 100;

			PS.statusText("Your buddy got a new look!");
		}

		// shift pet up by 1 since it grows from the top left
		petY -= 1;

		// regenerate pet sprite with new size
		PS.spriteDelete(Toy.petSprite);
		Toy.petSprite = PS.spriteSolid(Toy.petSize, Toy.petSize);
		PS.spriteSolidColor(Toy.petSprite, Toy.petColor);
		PS.spriteMove(Toy.petSprite, petX, petY);

		// 1/3 chance of taking a short nap
		if (PS.random(3) == 1) {
			Toy.napTime = 96;
			PS.audioPlay("snore", { path: "audio/" });
		}
	} else if (Toy.jumpsSinceEat > 10 && Toy.petSize > 1) {
		// shrink over time when not fed

		// shrink once per 10 jumps
		// (doing -= 10 instead of = 0 means elsewhere can set jumpsSinceEat to like 100 or something to automatically shrink by several sizes)
		Toy.jumpsSinceEat -= 10;

		Toy.petSize -= 1;
		// shift pet down by 1 since it shrinks from the top left
		petY += 1;

		// regenerate pet sprite with new size
		PS.spriteDelete(Toy.petSprite);
		Toy.petSprite = PS.spriteSolid(Toy.petSize, Toy.petSize);
		PS.spriteSolidColor(Toy.petSprite, Toy.petColor);
		PS.spriteMove(Toy.petSprite, petX, petY);
	}

	if (Toy.newLookTimer > 0) {
		Toy.newLookTimer -= 1;
		if (Toy.newLookTimer == 0) {
			// clear status (since it could be the "Your buddy got a new look!" message)
			PS.statusText("");
		}
	}

	if (Toy.jumpTime === 0) {
		// not currently jumping

		// 1/2 chance to start a jump if not napping
		if (Toy.napTime == 0 && PS.random(3) === 1) {
			// set animation timer
			Toy.jumpTime = 5;

			Toy.jumpsSinceEat += 1;

			// random x movement -1, 0, or 1
			Toy.jumpXDir = PS.random(3) - 2;

			// if food is present, have a higher chance to move towards the food
			if (isFoodPresent() && PS.random(2) == 1) {
				let dx = Toy.foodX - (petX + Toy.petSize/2);
				Toy.jumpXDir = Math.sign(dx);
			}

			// if the pet is near the edge of the grid, force the direction back towards the middle

			if (petX > PS.gridSize().width - (5 + Toy.petSize)) {
				Toy.jumpXDir = -1;
			}

			if (petX < 5) {
				Toy.jumpXDir = 1;
			}

			PS.audioPlay("jump" + (PS.random(4) - 1), { fileTypes: ["wav"], path: "audio/", volume: 0.05 + PS.random(4) * 0.025});
		}
	} else {
		// currently jumping

		// kinda gross hardcoded animation

		if (Toy.jumpTime === 5) {
			Toy.jumpYDir = -1;
		}

		if (Toy.jumpTime === 3) {
			Toy.jumpYDir = 1;
		}

		if (Toy.jumpTime === 1) {
			Toy.jumpYDir = 0;
		}

		// move the sprite
		PS.spriteMove(Toy.petSprite, (petX + Toy.jumpXDir), (petY + Toy.jumpYDir));

		// decrement the animation timer
		Toy.jumpTime -= 1;
	}

	if (isFoodPresent() && PS.color(Toy.foodX, Toy.foodY + 1, PS.CURRENT) !== Toy.groundColor) {
		// bead below the food is not the ground

		// clear the old position of the food
		PS.color(Toy.foodX, Toy.foodY, PS.COLOR_WHITE);
		PS.alpha(Toy.foodX, Toy.foodY, 0);

		// force redraw the pet sprite (otherwise the two lines above make a hole in the pet)
		let cur = PS.spriteMove(Toy.petSprite, PS.CURRENT, PS.CURRENT);
		PS.spriteMove(Toy.petSprite, cur.x, cur.y - 1);
		PS.spriteMove(Toy.petSprite, cur.x, cur.y);

		// draw the old position of the food (in front of the pet sprite)
		Toy.foodY += 1;
		PS.color(Toy.foodX, Toy.foodY, Toy.foodColor);
		PS.alpha(Toy.foodX, Toy.foodY, 255);
	}

	if (Toy.napTime > 0) {
		// currently napping

		Toy.napTime--;

		// clear all glyphs
		PS.glyph(PS.ALL, PS.ALL, '');

		// calculate the position of the 'Z'
		let zTimeScale = 3;
		let x = petX + Math.round(Math.sin(Toy.napTime / zTimeScale) * 2) + Toy.petSize / 2;
		let y = petY + ((Toy.napTime / zTimeScale) % 8) - 8;

		if (inBounds(x, y)) {
			// this unicode character renders slightly larger than a normal Z in the default font
			PS.glyph(x, y, '乙');
		}
	} else {
		// not currently mapping

		// clear all glyphs
		PS.glyph(PS.ALL, PS.ALL, '');
	}

}

/// returns `true` if a piece of food is present on the board, `false` otherwise
function isFoodPresent() {
	// foodX and foodY are undefined if no food is present
	return Toy.foodX !== undefined;
}

/// returns `true` if the provided point is within the grid, `false` otherwise
function inBounds(x, y) {
	return x >= 0 && x < PS.gridSize().width &&
		y >= 0 && y < PS.gridSize().height;
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

PS.touch = function (x, y, _data, _options) {
	// drop a piece of food if there isn't already one

	if (!isFoodPresent()) {
		// drop a piece of food

		// clip the x slightly away from the edges of the grid (so it doesn't get stuck)
		let clipX = Math.min(Math.max(3, x), PS.gridSize().width - 3);

		// spawn the food
		PS.color(clipX, y, Toy.foodColor);
		Toy.foodX = clipX;
		Toy.foodY = y;
	}
};
