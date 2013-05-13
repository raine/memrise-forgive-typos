// ==UserScript==
// @name           Memrise Forgive Typos
// @description    Makes Memrise more forgiving on typos
// @match          http://www.memrise.com/course/*/garden/*
// @match          http://www.memrise.com/garden/water/*
// @version        0.1.1
// @updateURL      https://userscripts.org/scripts/source/167003.meta.js
// @downloadURL    https://userscripts.org/scripts/source/167003.user.js
// @grant          none
// ==/UserScript==

var onLoad = function($) {
	var get_question = function() {
		return $('.qquestion')[0].childNodes[0].nodeValue.trim();
	};

	var things, thingusers;
	var get_things = function() {
		if (things === undefined) {
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

			if (thing.columns[thinguser.column_b].val === str) {
				return {
					answer   : thing.columns[thinguser.column_a].val,
					question : thing.columns[thinguser.column_b].val
				};
			}
		}
	};

	var levenshtein = MEMRISE.garden.scoring.levenshtein;

	var prev_q;
	var check_answer = function(input) {
		var q;
		if ((q = get_question()) && q === prev_q) {
			return true;
		}

		var val = $(input).val().toLowerCase();
		var answer = get_thing_by_q(q).answer.toLowerCase();
		var dist = levenshtein(val, answer).distance;
		prev_q = q;

		if (dist > 0 && dist <= 2) {
			return false;
		}

		return true;
	};

	var setup = function() {
		var handlers = [];
		var keydowns = $._data($('body').get(0), 'events').keydown;

		for (var i = keydowns.length - 1; i >= 0; i--){
			handlers.push(keydowns[i]);
		}

		var trigger = function(event) {
			for (var i = handlers.length - 1; i >= 0; i--) {
				handlers[i].handler(event);
			}
		};

		$('body').off('keydown');
		$('body').on('keydown', function(e) {
			try {
				var copytyping = $('.garden-box').hasClass('copytyping');
				if (!copytyping && $(e.target).is('input') && e.which === 13) {
					if (!check_answer(e.target)) {
						return alert('Close, did you make a typo? Try again.');
					}
				}

				trigger(e);
			} catch (err) {
				console.log('error - falling back to default behavior', err);
				trigger(e);
			}
		});
	}

	var ready = function (f) {
		$._data($('body').get(0), 'events') ? f() : setTimeout(ready, 9, f);
	};

	ready(setup);
};

var script = document.createElement("script");
script.textContent = '$(' + onLoad.toString() + '($));';
document.body.appendChild(script);
