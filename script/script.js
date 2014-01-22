function showSchedule() {
	console.log('showSchedule');
}

function showNextFilm() {
	console.log('showNextFilm');
}

function showRequest() {
	console.log('showRequest');
}

function showAbout() {
	console.log('showAbout');
}

Blog = {};

Chat = {
	'server': 'chat',
	'send': function () {
		Chat.username = prompt('Enter your username','anonymous');
		Chat.send = function () {
			var text = $('input')[0].value;
			var post = {
				'text': text,
				'username': Chat.username
			};
			$.post(Chat.server, JSON.stringify(post), function (str) {
				Chat.display(str);
			});
		}
		Chat.fetch();
		setInterval(function () {Chat.fetch()}, 10000);
	},
	'fetch': function () {
		$.post(Chat.server, function (str) {
			Chat.display(str);
		});	
	},
	'display': function (msgs) {
		if (typeof msgs == 'string') {
			msgs = JSON.parse(msgs);
		}
		msgs.sort(function (a, b) {
			if (a.loggedAt < b.loggedAt)
				return -1;
			else if (a.loggedAt > b.loggedAt)
				return 1;
			return 0;
		});
		if (typeof Chat.msgs == 'undefined') {
			Chat.msgs = [];
			Chat.lastLogged = '0';
		}
		for (var msg = 0; msg < msgs.length; msg++) {
			if (Chat.lastLogged < msgs[msg].loggedAt) {
				Chat.msgs.push(msgs[msg]);
				$('ul.messages').append(
					$('<li>').append(
						msgs[msg].username + ': ' + msgs[msg].text
					)
				);
			}
		}
		Chat.lastLogged = Chat.msgs[Chat.msgs.length - 1].loggedAt;
	}
};
