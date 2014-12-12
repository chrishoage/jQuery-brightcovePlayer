#jQuery BrightcovePlayer

This jQuery plugin wraps the [Brightcove Smart Player API](http://support.brightcove.com/en/video-cloud/docs/using-smart-player-api)

#Usage

		$('#player').brightcovePlayer({
			playerKey: '{{playerKey}}',
			playerID: '{{playerID}}',
			'@videoPlayer': '{{videoID}}', //optional, this is the video id to load on init
			width: 480,
			height: 270
		});

##Binding to Player Events

		$player.on('playerReady.brightcovePlayer', function () {
			console.log('#player palyer ready');
			$player.brightcovePlayer('loadVideo', videos[nextVideo]);
		});

##List of Player Events
 * **playerLoaded**
 	* Fires when Brightcove API has loaded
 * **playerReady**
 	* Fires when the player is ready to be used
 * **mediaBegin**
  * Fires when meida begins to play
 * **mediaChange**
	* Fires when the media has been changed
 * **mediaComplete**
  * Fires when the meida has finished playing
 * **mediaError**
  * Fires when there is an error with the media
 * **mediaPlay**
  * Fires when ``play()`` is called
 * **mediaProgress**
  * Fires while media is playing with duration and current time
 * **mediaStop**
  * Fires when media has been stoped (paused)
 * **mediaSeekNotify**
  * Fires when the media has been seeked

##List of Plugin Methods
 * ``$('#player').brightcovePlayer('play')``
 * ``$('#player').brightcovePlayer('pause')``
 * ``$('#player').brightcovePlayer('seek', time)``

##Development:

Run ``npm install`` to install dev dependencies.

Run ``gulp`` to start dev server and watch project
