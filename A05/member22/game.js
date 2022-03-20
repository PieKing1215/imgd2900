/*
game.js for Perlenspiel 3.3.x
Last revision: 2022-03-15 (BM)

/* jshint browser : true, devel : true, esversion : 6, freeze : true */
/* globals PS : true */

// Mod 1: changed grid size from 7,7 to 16,16
// Mod 2: changed color change logic from touch to enter
// Mod 3: changed status line to "Turn all beads black
// Mod 4: plays "tada" sound when you turn all beads black
// Mod 5: randomizes white/black colors of beads on grid
// Mod 6: turns all beads green when you turn all beads black
// Mod 7: added constants to clean up code, and to add difficulty levels

"use strict"; // Do NOT remove this directive!

let score = 1;
const grid_x = 16;
const grid_y = 16;
const win_score = grid_y * grid_x;

PS.init = function( system, options ) {
	// Establish grid dimensions

	PS.gridSize( grid_x, grid_y );

	// Set background color to Perlenspiel logo gray

	PS.gridColor( 0x303030 );

	// Change status line color and text

	PS.statusColor( PS.COLOR_WHITE );
	PS.statusText( "Turn all beads black" );

	// Preload tada sound

	PS.audioLoad( "fx_tada" );
	PS.audioLoad( "fx_click" );

	// randomize colors of beads in grid
	for (let x_index = 0; x_index < grid_x; x_index++){
		for (let y_index = 0; y_index < grid_y; y_index++) {
			if((Math.floor(Math.random() * 2)) === 1){
				PS.data( x_index, y_index, PS.COLOR_BLACK )
				PS.color(x_index, y_index, PS.COLOR_WHITE);
			}
			else{
				PS.data( x_index, y_index, PS.COLOR_WHITE )
				PS.color(x_index, y_index, PS.COLOR_BLACK)
				score = score + 1;
			}
		}
	}

};

PS.touch = function( x, y, data, options ) {

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

	PS.debug( "PS.enter() @ " + score + "\n" );

	// Add code here for when the mouse cursor/touch enters a bead.
	// Toggle color of touched bead from white to black and back again
	// NOTE: The default value of a bead's [data] is 0, which happens to be equal to PS.COLOR_BLACK
	PS.color( x, y, data ); // set color to current value of data

	// Decide what the next color should be.
	// If the current value was black, change it to white.
	// Otherwise, change it to black.

	// NOTE: This is not the most succinct way to code this functionality.
	// It's written this way for clarity.

	if (score === win_score){
		// Play tada sound.
		PS.audioPlay( "fx_tada" );
		PS.statusText( "YOU WIN! Are you proud?" );
		for (let x_index = 0; x_index < grid_x; x_index++){
			for (let y_index = 0; y_index < grid_y; y_index++) {
					PS.data(x_index, y_index, PS.COLOR_GREEN)
					PS.color(x_index, y_index, PS.COLOR_GREEN)
			}
		}
		score = 0;
	}

	let next; // variable to save next color

	if ( data === PS.COLOR_BLACK ) {
		next = PS.COLOR_WHITE;
		score = score +1;
		PS.audioPlay("fx_click");
	}
	else if ( data === PS.COLOR_WHITE ){
		next = PS.COLOR_BLACK;
		score = score -1;
		PS.audioPlay("fx_click");
	}

	// NOTE: The above statement could be expressed more succinctly using JavaScript's ternary operator:
	// let next = ( data === PS.COLOR_BLACK ) ? PS.COLOR_WHITE : PS.COLOR_BLACK;

	// Remember the newly-changed color by storing it in the bead's data.

	PS.data( x, y, next );
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

