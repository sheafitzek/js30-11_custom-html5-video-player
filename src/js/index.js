const app = {
	player: document.querySelector(`.player`),

	playListener() {
		const video = app.player.querySelector(`.viewer`);
		const toggleplay = app.player.querySelector(`.togglePlay`);

		[video, toggleplay].forEach((div)=> {
			div.addEventListener(`click`, app.togglePlayPause);
		});

		[`play`, `pause`].forEach((e)=> {
			video.addEventListener(e, app.togglePlayPauseButton);
		});
	},

	togglePlayPause() {
		const video = app.player.querySelector(`.viewer`);

		video.paused
			? video.play()
			: video.pause();
	},

	togglePlayPauseButton() {
		const video = app.player.querySelector(`.viewer`);
		const togglePlay = app.player.querySelector(`.togglePlay`);

		const icon = video.paused
			? `<i class="fa fa-play" aria-hidden="true"></i>`
			: `<i class="fa fa-pause" aria-hidden="true"></i>`;

		togglePlay.innerHTML = icon;
	},

	skipListener() {
		const skipButtons = app.player.querySelectorAll(`[data-skip]`);

		skipButtons.forEach((button)=> {
			button.addEventListener(`click`, app.skip);
		});
	},

	skip() {
		const video = app.player.querySelector(`.viewer`);

		video.currentTime += parseFloat(this.dataset.skip);
	},

	rangeListener() {
		const ranges = app.player.querySelectorAll(`.player__slider`);

		ranges.forEach((range)=> {
			[`change`, `input`].forEach((e)=> {
				range.addEventListener(e, app.updateRange);
			});
		});
	},

	updateRange() {
		const video = app.player.querySelector(`.viewer`);
		let padVal;

		if(this.name === `volume`) {
			padVal = this.value > 9
				? parseFloat(this.value).toFixed()
				: `0${parseFloat(this.value).toFixed()}`;
			video[this.name] = this.value / 100;
		} else {
			padVal = parseFloat(this.value).toFixed(1);
			video[this.name] = this.value;
		}

		this.setAttribute(`value`, `${padVal}`);
	},

	progressListener() {
		const video = app.player.querySelector(`.viewer`);

		video.addEventListener(`timeupdate`, app.updateProgress);
	},

	updateProgress() {
		const video = app.player.querySelector(`.viewer`);
		const progressBar = app.player.querySelector(`.progress__filled`);
		const progressTime = app.player.querySelector(`.progress__time`);

		const percent = (video.currentTime / video.duration) * 100;

		progressBar.style.flexBasis = `${percent}%`;

		function formatTime(seconds) {
			const hours = Math.floor(seconds / 3600);

			const minutes = Math.floor((seconds / 60) - (hours * 60)) > 9
				? Math.floor((seconds / 60) - (hours * 60))
				: `0${Math.floor((seconds / 60) - (hours * 60))}`;

			seconds = Math.floor(seconds % 60) > 9
				? Math.floor(seconds % 60)
				: `0${Math.floor(seconds % 60)}`;

			return `${hours}:${minutes}:${seconds}`;
		}

		progressTime.innerHTML = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
	},

	scrubListener() {
		const progress = app.player.querySelector(`.progress`);
		let isMousedown = false;

		progress.addEventListener(`click`, app.scrub);

		[`mousedown`, `mouseup`, `touchstart`, `touchend`].forEach((e)=> {
			progress.addEventListener(e, ()=> isMousedown = !isMousedown);
		});

		[`mousemove`, `touchmove`].forEach((evt)=> {
			progress.addEventListener(evt, (e)=> isMousedown && app.scrub(e));
		});
	},

	scrub(e) {
		const video = app.player.querySelector(`.viewer`);
		const progress = app.player.querySelector(`.progress`);
		const left = e.touches
			? Math.round(e.touches[0].clientX - progress.getBoundingClientRect().left)
			: null;
		const scrubTime = e.touches
			? Math.round((left / progress.offsetWidth) * video.duration)
			: (e.offsetX / progress.offsetWidth) * video.duration;

		video.currentTime = scrubTime;
	},

	largeScreenListener() {
		const toggleLargeScreen = app.player.querySelector(`.toggleLarge`);

		toggleLargeScreen.addEventListener(`click`, app.toggleLargeScreen);
	},

	toggleLargeScreen() {
		if (app.player.style.flex === `1 1 auto`) {
			app.player.style.flex = ``;
			app.player.style.height = ``;
			app.player.style.width = ``;
			app.player.style.maxWidth = `750px`;
		} else {
			app.player.style.flex = `1 1 auto`;
			window.matchMedia(`(orientation: landscape)`).matches
				? app.player.style.height = `100%`
				: app.player.style.width = `100%`;
			app.player.style.maxWidth = ``;
		}

		app.toggleLargeScreenButton();
	},

	toggleLargeScreenButton() {
		const toggleLargeScreen = app.player.querySelector(`.toggleLarge`);

		const icon = app.player.style.flex === `1 1 auto`
			? `<i class="fa fa-compress" aria-hidden="true"></i>`
			: `<i class="fa fa-expand" aria-hidden="true"></i>`;

		toggleLargeScreen.innerHTML = icon;
	},

	fullscreenListener() {
		const toggleFullscreen = app.player.querySelector(`.toggleFull`);

		toggleFullscreen.addEventListener(`click`, app.toggleFullscreen);
	},

	toggleFullscreen() {
		// app.player.requestFullscreen
		// && app.player.requestFullscreen();
		if (app.player.style.flex === `1 1 auto`) {
			app.player.style.flex = ``;
			app.player.style.width = ``;
			app.player.style.maxWidth = `750px`;
		} else {
			app.player.style.flex = `1 1 auto`;
			app.player.style.width = `100%`;
			app.player.style.maxWidth = ``;
		}

		app.toggleFullscreenButton();
	},

	toggleFullscreenButton() {
		const toggleFullscreen = app.player.querySelector(`.toggleFull`);

		const icon = app.player.style.flex === `1 1 auto`
			? `<i class="fa fa-compress" aria-hidden="true"></i>`
			: `<i class="fa fa-arrows-alt" aria-hidden="true"></i>`;

		toggleFullscreen.innerHTML = icon;
	},

	onloadFunction() {
		app.playListener();
		app.skipListener();
		app.rangeListener();
		app.progressListener();
		app.scrubListener();
		app.largeScreenListener();
		// app.fullscreenListener();
	},
};

window.onload = app.onloadFunction;
