// ==UserScript==
// @name           Memrise Forgive Typos
// @description    Makes Memrise more forgiving on typos
// @match          http://www.memrise.com/course/*/garden/*
// @match          http://www.memrise.com/garden/water/*
// @version        0.1
// @grant          none
// ==/UserScript==

function addjQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

function main() {
	var get_question = function() {
		return $('.qquestion')[0].childNodes[0].nodeValue.trim();
	};

	var things, thingusers;

	var get_things = function() {
		if (typeof things === 'undefined') {
			things     = MEMRISE.garden.things;
			thingusers = MEMRISE.garden.thingusers._list;
		}
	};
	
	var get_thinguser = function(id) {
		return thingusers.filter(function(e) {
			return e.thing_id === id;
		})[0];
	};

	var get_thing_by_q = function(str) {
		get_things();

		for (var id in things) {
			var thing = things[id];
			var thinguser = get_thinguser(thing.id);

			var val;
			if (val = thing.columns[thinguser.column_b].val === str) {
				return {
					answer   : thing.columns[thinguser.column_a].val,
					question : thing.columns[thinguser.column_b].val
				}
			}
		}
	};

	var levenshtein = MEMRISE.garden.scoring.levenshtein;

	var prev_val;
	var check_answer = function(input) {
		var val = $(input).val();
		if (prev_val === val) return true;

		var obj = get_thing_by_q(get_question());
		var lev = levenshtein(val, obj.answer).distance;
		prev_val = val;

		if (lev > 0 && lev <= 2) {
			alert('Close, did you make a typo? Try again.');
			return false;
		}
		
		return true;
	};

	var handlers = [];
	var keydowns = $._data($('body').get(0), 'events').keydown;

	for (var i = keydowns.length - 1; i >= 0; i--){
		handlers.push(keydowns[i]);
	};

	var trigger = function(event) {
		for (var i = handlers.length - 1; i >= 0; i--) {
			handlers[i].handler(event);
		};
	};

	$('body').off('keydown');
	$('body').on('keydown', function(e) {
		try {
			var copytyping = $('.garden-box').hasClass('copytyping');
			if (!copytyping && $(e.target).is('input') && e.which === 13) {
				if (check_answer(e.target)) {
					trigger(e);
				}
			} else  {
				trigger(e);
			}
		} catch (err) {
			console.log('error - falling back to default behavior', err);
			trigger(e);
		}
	});
}

addjQuery(main);
