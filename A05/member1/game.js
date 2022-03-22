// David Mahany
// Team David^2
// Mod 1: Changed colors from black/white to beach-flavored water and sand colors
// Mod 2: Added random starting state
// Mod 3: Changed click action to rotate neighbors around the clicked bead
// Mod 4: Changed click sound to a swoosh sound to match the new action
// Mod 5: Added check to prevent click action on the edge of the board
// Mod 6: Added sound effect for clicking on the edge of the board
// Mod 7: Changed title to say "Click any bead not on the edge"
// Mod 8: When clicking, if all four neighbor beads are not water-colored, they change to a coral color
// Mod 9: When Mod 8 triggers, a ding sound effect is played

/*
game.js for Perlenspiel 3.3.x
Last revision: 2022-03-15 (BM)

/* jshint browser : true, devel : true, esversion : 6, freeze : true */
/* globals PS : true */

"use strict"; // Do NOT remove this directive!

const G = {
	WATER_COLOR: 0x1D46A3,
	SAND_COLOR: 0xFFC768,
	CORAL_COLOR: 0xFF8F97
};

PS.init = function( system, options ) {
	// Establish grid dimensions

	PS.gridSize( 7, 7 );

	// Set background color to Perlenspiel logo gray

	PS.gridColor( 0x303030 );

	// Change status line color and text

	PS.statusColor( PS.COLOR_WHITE );
	PS.statusText( "Touch any bead not on the edge" );

	// Preload sound effects

	PS.audioLoad( "fx_swoosh" );
	PS.audioLoad( "fx_bloink" );
	PS.audioLoad( "fx_ding" );

	for (let x = 0; x < PS.gridSize().width; x++) {
		for (let y = 0; y < PS.gridSize().height; y++) {
			PS.color(x, y, Math.random() >= 0.5 ? G.SAND_COLOR : G.WATER_COLOR);
		}
	}
};

PS.touch = function( x, y, data, options ) {

	if (x >= 1 && y >= 1 && x < PS.gridSize().width - 1 && y < PS.gridSize().height - 1) {
		// relative positions of the four beads to rotate
		let relative_positions = [
			[0, -1],
			[-1, 0],
			[0, 1],
			[1, 0]
		];

		// map the relative positions to absolute ones
		let absolute_positions = relative_positions.map(p => {
			// this is safe since we already checked that we aren't at the edge of the board, so no wrapping should occur.
			let ax = x + p[0];
			let ay = y + p[1];
			return [ax, ay];
		});

		let all_sand = absolute_positions.every(p => {
			return PS.color(p[0], p[1], PS.CURRENT) != G.WATER_COLOR;
		});

		if (all_sand) {
			absolute_positions.forEach(p => {
				PS.color(p[0], p[1], G.CORAL_COLOR);
			});
			PS.audioPlay( "fx_ding" );
		} else {
			// rotate the colors at the four neighbor beads counterclockwise

			// function to swap the colors of the beads at two points
			let swap_colors = (p1, p2) => {
				let c1 = PS.color(p1[0], p1[1], PS.CURRENT);
				let c2 = PS.color(p2[0], p2[1], PS.CURRENT);
				
				PS.color(p1[0], p1[1], c2);
				PS.color(p2[0], p2[1], c1);
			};

			// perform the counterclockwise rotation 
			swap_colors(absolute_positions[3], absolute_positions[0]);
			swap_colors(absolute_positions[2], absolute_positions[3]);
			swap_colors(absolute_positions[1], absolute_positions[2]);

			PS.audioPlay( "fx_swoosh" );
		}
	} else {
		PS.audioPlay( "fx_bloink" );
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

PS.release = function( x, y, data, options ) {
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

PS.enter = function( x, y, data, options ) {
	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.enter() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch enters a bead.
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

PS.exit = function( x, y, data, options ) {
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

PS.exitGrid = function( options ) {
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

PS.keyDown = function( key, shift, ctrl, options ) {
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

PS.keyUp = function( key, shift, ctrl, options ) {
	// Uncomment the following code line to inspect first three parameters:

	// PS.debug( "PS.keyUp(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

	// Add code here for when a key is released.
};

/*
PS.input ( sensors, options )
Called when a supported input device event (other than those above) is detected.
This function doesn't have to do anything. Any value returned is ignored.
[sensors : Object] = A JavaScript object with properties indicating sensor status; see API documentation for details.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
NOTE: Currently, only mouse wheel events are reported, and only when the mouse cursor is positioned directly over the grid.
*/

PS.input = function( sensors, options ) {
	// Uncomment the following code lines to inspect first parameter:

//	 var device = sensors.wheel; // check for scroll wheel
//
//	 if ( device ) {
//	   PS.debug( "PS.input(): " + device + "\n" );
//	 }

	// Add code here for when an input event is detected.
};

