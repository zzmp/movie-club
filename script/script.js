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
	'send': function() {
		var text = $('input')[0].value;
		var post = {
			'text': text,
			'time': (new Date()).toJSON(),
			'username': username
		};
		$.post(Chat.server,JSON.stringify(post),function (str) {
			Chat.display(JSON.parse(str));
		});
	},
	'fetch': function() {
		$.getJSON(Chat.server, Chat.display(obj));	
	},
	'display': function(msgs) {
		console.log(msgs);
	}
};
