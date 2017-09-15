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

		video[this.name] = this.value;
	},

	progressListener() {
		const video = app.player.querySelector(`.viewer`);

		video.addEventListener(`timeupdate`, app.updateProgress);
	},

	updateProgress() {
		const video = app.player.querySelector(`.viewer`);
		const progressBar = app.player.querySelector(`.progress__filled`);

		const percent = (video.currentTime / video.duration) * 100;

		progressBar.style.flexBasis = `${percent}%`;
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

	fullscreenListener() {
		const toggleScreen = app.player.querySelector(`.toggleFull`);

		toggleScreen.addEventListener(`click`, app.toggleFullscreen);
	},

	toggleFullscreen() {
		if (app.player.style.flex === `1 1 auto`) {
			app.player.style.flex = ``;
			app.player.style.maxWidth = `750px`;
		} else {
			app.player.style.flex = `1 1 auto`;
			app.player.style.maxWidth = ``;
		}

		app.toggleFullscreenButton();
	},

	toggleFullscreenButton() {
		const toggleScreen = app.player.querySelector(`.toggleFull`);

		const icon = app.player.style.flex === `1 1 auto`
			? `<i class="fa fa-compress" aria-hidden="true"></i>`
			: `<i class="fa fa-arrows-alt" aria-hidden="true"></i>`;

		toggleScreen.innerHTML = icon;
	},

	onloadFunction() {
		app.playListener();
		app.skipListener();
		app.rangeListener();
		app.progressListener();
		app.scrubListener();
		app.fullscreenListener();
	},
};

window.onload = app.onloadFunction;
