(function(window, $, undefined) {
	'use strict';

	var videos = [1754276221001,1756137891001,1754276206001,1754276205001,1754234236001];
	var $player = $('#player');
	var nextVideo = 0;

	$player.brightcovePlayer({
		playerKey: 'AQ~~,AAABmA9XpXk~,-Kp7jNgisreaNI4gqZCnoD2NqdsPzOGP',
		playerID: '1925363807001',
		//'@videoPlayer': '1926945850001', //optional, this is the video id
		width: 480,
		height: 270
	});

	$player.on('playerReady.brightcovePlayer', function () {
		console.log('#player palyer ready');
		$player.brightcovePlayer('loadVideo', videos[nextVideo]);
	});

	$player.on('mediaBegin.brightcovePlayer', function (event, evt) {
		console.log('#player media begin', arguments);
		$('#mediaInfo').html(evt.media.displayName);
	});

	$player.on('mediaComplete.brightcovePlayer', function (event, evt) {
		console.log('#player media complete', arguments);
		nextVideo++;
		if (nextVideo == videos.length) {
		 nextVideo = 0;
		}
		$player.brightcovePlayer('loadVideo', videos[nextVideo]);
	});

	$('#play').click(function () {
		$player.brightcovePlayer('play');
	});

	$('#pause').click(function () {
		$player.brightcovePlayer('pause');
	});

	$('#seek').click(function () {
		$player.brightcovePlayer('seek', $('#seektime').val());
	});

})(window, jQuery);
