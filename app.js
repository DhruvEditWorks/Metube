/**
 * MeTube — Where silence finds its voice
 * Application Logic & Video Player Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // ---------------- DOM Element References ----------------
  const video = document.getElementById('mainVideo');
  const videoSource = document.getElementById('videoSource');
  const playerContainer = document.getElementById('playerContainer');
  const centerPlayBtn = document.getElementById('centerPlayBtn');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const playSvg = playPauseBtn.querySelector('.play-svg');
  const pauseSvg = playPauseBtn.querySelector('.pause-svg');
  const skipBackBtn = document.getElementById('skipBackBtn');
  const skipForwardBtn = document.getElementById('skipForwardBtn');
  const volumeBtn = document.getElementById('volumeBtn');
  const volHigh = volumeBtn.querySelector('.vol-high');
  const volMute = volumeBtn.querySelector('.vol-mute');
  const volumeSlider = document.getElementById('volumeSlider');
  const currentTimeEl = document.getElementById('currentTime');
  const durationTimeEl = document.getElementById('durationTime');
  const scrubberWrap = document.getElementById('scrubberWrap');
  const seekProgress = document.getElementById('seekProgress');
  const bufferProgress = document.getElementById('bufferProgress');
  const scrubberThumb = document.getElementById('scrubberThumb');
  const scrubberTooltip = document.getElementById('scrubberTooltip');
  const speedMenuBtn = document.getElementById('speedMenuBtn');
  const speedDropdown = document.getElementById('speedDropdown');
  const currentSpeedText = document.getElementById('currentSpeedText');
  const ccToggleBtn = document.getElementById('ccToggleBtn');
  const captionsOverlay = document.getElementById('captionsOverlay');
  const captionText = document.getElementById('captionText');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const fsEnter = fullscreenBtn.querySelector('.fs-enter');
  const fsExit = fullscreenBtn.querySelector('.fs-exit');
  const quickFeedback = document.getElementById('quickFeedback');
  const quickFeedbackText = document.getElementById('quickFeedbackText');

  // Video Info Elements
  const mainVideoTitle = document.getElementById('mainVideoTitle');
  const videoViewsCount = document.getElementById('videoViewsCount');
  const videoUploadDate = document.getElementById('videoUploadDate');
  const likeCountEl = document.getElementById('likeCount');
  const likeBtn = document.getElementById('likeBtn');
  const dislikeBtn = document.getElementById('dislikeBtn');
  const subscribeBtn = document.getElementById('subscribeBtn');
  const shareBtn = document.getElementById('shareBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const saveBtn = document.getElementById('saveBtn');
  const saveBtnText = document.getElementById('saveBtnText');
  const descToggleBtn = document.getElementById('descToggleBtn');
  const descExpandedContent = document.getElementById('descExpandedContent');
  const mainDescParagraph = document.getElementById('mainDescParagraph');

  // Theme & Navigation
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const sunIcon = themeToggleBtn.querySelector('.sun-icon');
  const moonIcon = themeToggleBtn.querySelector('.moon-icon');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const sidebarDrawer = document.getElementById('sidebarDrawer');
  const sidebarBackdrop = document.getElementById('sidebarBackdrop');
  const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');

  // Search & Chips
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const searchSubmitBtn = document.getElementById('searchSubmitBtn');
  const searchDropdown = document.getElementById('searchDropdown');
  const filterChips = document.querySelectorAll('.chip');
  const navTabs = document.querySelectorAll('.nav-tab');
  const mobNavBtns = document.querySelectorAll('.mob-nav-btn');

  // Playlist & Cards
  const playlistCards = document.querySelectorAll('.video-card');
  const autoplayToggle = document.getElementById('autoplayToggle');

  // Comments
  const commentList = document.getElementById('commentList');
  const commentsCountText = document.getElementById('commentsCountText');
  const newCommentInput = document.getElementById('newCommentInput');
  const commentActionsBar = document.getElementById('commentActionsBar');
  const cancelCommentBtn = document.getElementById('cancelCommentBtn');
  const postCommentBtn = document.getElementById('postCommentBtn');
  const commentSortSelect = document.getElementById('commentSortSelect');
  const loadMoreCommentsBtn = document.getElementById('loadMoreCommentsBtn');

  // Modals & Toasts
  const shareModal = document.getElementById('shareModal');
  const closeShareModalBtn = document.getElementById('closeShareModalBtn');
  const copyLinkBtn = document.getElementById('copyLinkBtn');
  const shareLinkInput = document.getElementById('shareLinkInput');
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');

  // ---------------- Thematic Comments Dataset (50 Full Poetic Entries) ----------------
  const THEMATIC_COMMENTS = [
    { id: 1, name: 'SilentListener_42', avatarClass: 'circle-av-1', time: '2 hours ago', text: "This is so helpful! I've been trying to learn sign language for my deaf friend. Thank you!", likes: 342, isLiked: false },
    { id: 2, name: 'EchoSeeker', avatarClass: 'circle-av-2', time: '5 hours ago', text: 'The instructor explains everything so clearly. I love how she shows each gesture slowly.', likes: 287, isLiked: false },
    { id: 3, name: 'VoiceWithin', avatarClass: 'circle-av-3', time: '1 day ago', text: "Coming here after watching 'I Am Here'. The film made me want to learn sign language.", likes: 956, isLiked: true },
    { id: 4, name: 'HeartSpeaks_7', avatarClass: 'circle-av-4', time: '2 days ago', text: "I'm learning this for my brother. He's deaf and I want to communicate with him properly.", likes: 543, isLiked: false },
    { id: 5, name: 'SilentDreamer', avatarClass: 'circle-av-5', time: '3 days ago', text: "The hand gestures are very clear. I've already learned 10 sentences!", likes: 189, isLiked: false },
    { id: 6, name: 'WhisperOfHope', avatarClass: 'circle-av-6', time: '4 days ago', text: 'This should be taught in all schools. Thank you for making this!', likes: 432, isLiked: false },
    { id: 7, name: 'EternalLearner_55', avatarClass: 'circle-av-7', time: '5 days ago', text: "I'm 55 years old and learning sign language. Never too late to learn.", likes: 654, isLiked: false },
    { id: 8, name: 'SoulConnection', avatarClass: 'circle-av-8', time: '6 days ago', text: "The 'I am here' gesture brought tears to my eyes. Beautiful.", likes: 876, isLiked: true },
    { id: 9, name: 'GentleSoul', avatarClass: 'circle-av-9', time: '1 week ago', text: 'My daughter is learning this in school. She told me to watch this.', likes: 234, isLiked: false },
    { id: 10, name: 'PureHeart_11', avatarClass: 'circle-av-1', time: '1 week ago', text: 'Amazing content! Keep making more videos like this.', likes: 345, isLiked: false },
    { id: 11, name: 'SilentRainbow', avatarClass: 'circle-av-2', time: '1 week ago', text: 'Sign language is the most beautiful form of communication.', likes: 198, isLiked: false },
    { id: 12, name: 'FingersOfLight', avatarClass: 'circle-av-3', time: '1 week ago', text: 'This should be mandatory in schools. Every child should learn this.', likes: 567, isLiked: false },
    { id: 13, name: 'TheQuietOne', avatarClass: 'circle-av-4', time: '2 weeks ago', text: "I've been deaf since birth. Seeing people learn sign language makes me so happy.", likes: 923, isLiked: true },
    { id: 14, name: 'ListeningHeart', avatarClass: 'circle-av-5', time: '2 weeks ago', text: 'Thank you for making the world more inclusive. One gesture at a time.', likes: 456, isLiked: false },
    { id: 15, name: 'HopeFloats', avatarClass: 'circle-av-6', time: '2 weeks ago', text: "My best friend is deaf. I'm learning this so we can talk in his language.", likes: 789, isLiked: false },
    { id: 16, name: 'SilentObserver', avatarClass: 'circle-av-7', time: '2 weeks ago', text: 'The silence has its own symphony. Watching this brings so much inner calmness.', likes: 312, isLiked: false },
    { id: 17, name: 'EchoOfSilence', avatarClass: 'circle-av-8', time: '2 weeks ago', text: 'The facial expressions complete the meaning of every gesture. Such high quality guidance.', likes: 421, isLiked: false },
    { id: 18, name: 'ThePatientOne', avatarClass: 'circle-av-9', time: '3 weeks ago', text: 'Practicing 20 minutes every evening. Lesson 3 changed my perspective on communication.', likes: 275, isLiked: false },
    { id: 19, name: 'QuietStorm', avatarClass: 'circle-av-1', time: '3 weeks ago', text: 'Such delicate strength in every sign. Reyansh and Amaira’s story echoes through every lesson.', likes: 618, isLiked: false },
    { id: 20, name: 'SoulfulEcho', avatarClass: 'circle-av-2', time: '3 weeks ago', text: 'Where silence finds its voice — MeTube is truly living up to its motto.', likes: 834, isLiked: true },
    { id: 21, name: 'UnspokenWords', avatarClass: 'circle-av-3', time: '3 weeks ago', text: 'I never realized how much we say without words until I took this course.', likes: 412, isLiked: false },
    { id: 22, name: 'SilentWarrior', avatarClass: 'circle-av-4', time: '3 weeks ago', text: 'As a deaf teacher myself, this curriculum is accurate, respectful, and heartwarming.', likes: 749, isLiked: true },
    { id: 23, name: 'GentleWhisper', avatarClass: 'circle-av-5', time: '4 weeks ago', text: 'The sky blue theme makes learning so soothing. No sensory overload.', likes: 388, isLiked: false },
    { id: 24, name: 'HeartfeltSoul', avatarClass: 'circle-av-6', time: '4 weeks ago', text: 'My whole family gathers every evening to learn together. Thank you Amaira and team.', likes: 520, isLiked: false },
    { id: 25, name: 'FingersThatSpeak', avatarClass: 'circle-av-7', time: '1 month ago', text: 'Language is not sound; language is connection. Beautifully demonstrated.', likes: 690, isLiked: false },
    { id: 26, name: 'TheSilentOne', avatarClass: 'circle-av-8', time: '1 month ago', text: 'Lesson 1 laid the groundwork so naturally. Excited for lesson 2!', likes: 245, isLiked: false },
    { id: 27, name: 'EchoingHeart', avatarClass: 'circle-av-9', time: '1 month ago', text: 'The gesture for ‘I care about you’ made me choke up. So tender.', likes: 812, isLiked: true },
    { id: 28, name: 'StillWater', avatarClass: 'circle-av-1', time: '1 month ago', text: 'Quiet minds understand quiet signs. Truly peaceful.', likes: 194, isLiked: false },
    { id: 29, name: 'QuietlySpeaking', avatarClass: 'circle-av-2', time: '1 month ago', text: 'Watching with closed captions and hands up copying every movement.', likes: 310, isLiked: false },
    { id: 30, name: 'SilentSoul_22', avatarClass: 'circle-av-3', time: '1 month ago', text: 'The pace of these lessons is ideal for working adults.', likes: 267, isLiked: false },
    { id: 31, name: 'WordsUnsaid', avatarClass: 'circle-av-4', time: '1 month ago', text: 'I bought a blue notebook just like in the film to write down the vocab.', likes: 453, isLiked: false },
    { id: 32, name: 'TheListeningEar', avatarClass: 'circle-av-5', time: '1 month ago', text: 'Hearing with your eyes is a skill that makes you a better human.', likes: 629, isLiked: false },
    { id: 33, name: 'SilentHope', avatarClass: 'circle-av-6', time: '1 month ago', text: 'This platform brings genuine hope to the deaf community.', likes: 512, isLiked: false },
    { id: 34, name: 'GentleEcho', avatarClass: 'circle-av-7', time: '2 months ago', text: 'Clear lighting, crisp gestures, and wonderful pacing.', likes: 189, isLiked: false },
    { id: 35, name: 'HeartfeltSilence', avatarClass: 'circle-av-8', time: '2 months ago', text: 'The world needs more empathy like this.', likes: 741, isLiked: true },
    { id: 36, name: 'TheQuietListener', avatarClass: 'circle-av-9', time: '2 months ago', text: 'The transitions between basic signs and full sentences are seamless.', likes: 322, isLiked: false },
    { id: 37, name: 'UnheardVoice', avatarClass: 'circle-av-1', time: '2 months ago', text: 'Finally a video platform tailored specifically for us!', likes: 885, isLiked: true },
    { id: 38, name: 'SilentGrace', avatarClass: 'circle-av-2', time: '2 months ago', text: 'Graceful hands, expressive eyes, and heartfelt intent.', likes: 419, isLiked: false },
    { id: 39, name: 'SoulfulSilence', avatarClass: 'circle-av-3', time: '2 months ago', text: 'A masterclass in non-verbal warmth.', likes: 356, isLiked: false },
    { id: 40, name: 'EchoingHope', avatarClass: 'circle-av-4', time: '2 months ago', text: 'Sharing this with my university linguistics club!', likes: 290, isLiked: false },
    { id: 41, name: 'ThePatientSoul', avatarClass: 'circle-av-5', time: '2 months ago', text: 'Step by step, gesture by gesture, a whole new world opens.', likes: 478, isLiked: false },
    { id: 42, name: 'QuietlyStrong', avatarClass: 'circle-av-6', time: '3 months ago', text: 'The strength in silence is louder than thunder.', likes: 610, isLiked: false },
    { id: 43, name: 'SilentWisdom', avatarClass: 'circle-av-7', time: '3 months ago', text: 'Invaluable lessons for anyone working in healthcare and education.', likes: 534, isLiked: false },
    { id: 44, name: 'GentleHeart', avatarClass: 'circle-av-8', time: '3 months ago', text: 'My non-verbal son smiles every time we watch this together.', likes: 982, isLiked: true },
    { id: 45, name: 'UnspokenTruth', avatarClass: 'circle-av-9', time: '3 months ago', text: 'True understanding requires no sound, only presence.', likes: 467, isLiked: false },
    { id: 46, name: 'SilentCourage', avatarClass: 'circle-av-1', time: '3 months ago', text: 'Giving confidence to millions of silent voices everywhere.', likes: 399, isLiked: false },
    { id: 47, name: 'TheListeningSoul', avatarClass: 'circle-av-2', time: '3 months ago', text: 'I rewatch the warm-up exercises daily. Excellent teacher.', likes: 215, isLiked: false },
    { id: 48, name: 'EchoOfLove', avatarClass: 'circle-av-3', time: '3 months ago', text: 'A pure labor of love. Long live MeTube!', likes: 642, isLiked: false },
    { id: 49, name: 'QuietResolve', avatarClass: 'circle-av-4', time: '3 months ago', text: 'Committed to finishing all 60 sentences before the month ends.', likes: 308, isLiked: false },
    { id: 50, name: 'SilentStrength', avatarClass: 'circle-av-5', time: '3 months ago', text: 'In our silence, we stand united. Beautiful work on this series.', likes: 894, isLiked: true }
  ];

  let commentsData = [...THEMATIC_COMMENTS];
  let visibleCommentCount = 10;
  let totalCommentsCount = 574;
  let isVideoLiked = false;
  let isSubscribed = false;
  let isSaved = false;
  let hideControlsTimeout = null;

  // ---------------- Theme Management ----------------
  const initTheme = () => {
    const savedTheme = localStorage.getItem('metube_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcons(savedTheme);
  };

  const toggleTheme = () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('metube_theme', next);
    updateThemeIcons(next);
    showToast(`Switched to ${next === 'dark' ? 'Dark' : 'Light'} Mode`);
  };

  const updateThemeIcons = (theme) => {
    if (theme === 'dark') {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    } else {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    }
  };

  themeToggleBtn.addEventListener('click', toggleTheme);
  initTheme();

  // ---------------- Sidebar Drawer Management ----------------
  const openSidebar = () => {
    sidebarDrawer.classList.add('open');
    sidebarBackdrop.classList.add('show');
    document.body.style.overflow = 'hidden';
  };

  const closeSidebar = () => {
    sidebarDrawer.classList.remove('open');
    sidebarBackdrop.classList.remove('show');
    document.body.style.overflow = '';
  };

  hamburgerBtn.addEventListener('click', openSidebar);
  sidebarCloseBtn.addEventListener('click', closeSidebar);
  sidebarBackdrop.addEventListener('click', closeSidebar);

  // ---------------- Video Player Controls ----------------
  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (video.paused || video.ended) {
      video.play().then(() => {
        playerContainer.classList.add('playing');
        playSvg.style.display = 'none';
        pauseSvg.style.display = 'block';
        resetHideControlsTimer();
      }).catch(err => {
        console.warn('Playback prevented:', err);
      });
    } else {
      video.pause();
      playerContainer.classList.remove('playing');
      playSvg.style.display = 'block';
      pauseSvg.style.display = 'none';
      playerContainer.classList.remove('hide-controls');
    }
  };

  centerPlayBtn.addEventListener('click', togglePlay);
  playPauseBtn.addEventListener('click', togglePlay);

  video.addEventListener('play', () => {
    playerContainer.classList.add('playing');
    playSvg.style.display = 'none';
    pauseSvg.style.display = 'block';
  });

  video.addEventListener('pause', () => {
    playerContainer.classList.remove('playing');
    playSvg.style.display = 'block';
    pauseSvg.style.display = 'none';
    playerContainer.classList.remove('hide-controls');
  });

  // Time & Progress Updates
  video.addEventListener('timeupdate', () => {
    if (!video.duration) return;
    const progress = (video.currentTime / video.duration) * 100;
    seekProgress.style.width = `${progress}%`;
    scrubberThumb.style.left = `${progress}%`;
    currentTimeEl.textContent = formatTime(video.currentTime);

    // Update Captions contextually
    updateCaptions(video.currentTime);
  });

  video.addEventListener('loadedmetadata', () => {
    durationTimeEl.textContent = formatTime(video.duration);
    currentTimeEl.textContent = '00:00';
  });

  video.addEventListener('progress', () => {
    if (video.buffered.length > 0 && video.duration) {
      const bufferedEnd = video.buffered.end(video.buffered.length - 1);
      const bufferPercent = (bufferedEnd / video.duration) * 100;
      bufferProgress.style.width = `${Math.min(bufferPercent, 100)}%`;
    }
  });

  // Scrubber / Seek Interaction
  const handleSeek = (e) => {
    const rect = scrubberWrap.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    if (video.duration) {
      video.currentTime = pos * video.duration;
      seekProgress.style.width = `${pos * 100}%`;
      scrubberThumb.style.left = `${pos * 100}%`;
    }
  };

  let isScrubbing = false;
  scrubberWrap.addEventListener('mousedown', (e) => {
    isScrubbing = true;
    handleSeek(e);
  });

  window.addEventListener('mousemove', (e) => {
    if (isScrubbing) handleSeek(e);
  });

  window.addEventListener('mouseup', () => {
    isScrubbing = false;
  });

  // Scrubber Tooltip on Hover
  scrubberWrap.addEventListener('mousemove', (e) => {
    const rect = scrubberWrap.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    if (video.duration) {
      const targetTime = pos * video.duration;
      scrubberTooltip.textContent = formatTime(targetTime);
      scrubberTooltip.style.left = `${pos * 100}%`;
      scrubberTooltip.style.display = 'block';
    }
  });

  scrubberWrap.addEventListener('mouseleave', () => {
    scrubberTooltip.style.display = 'none';
  });

  // Skip Buttons
  const showFeedback = (text) => {
    quickFeedbackText.textContent = text;
    quickFeedback.style.opacity = '1';
    setTimeout(() => {
      quickFeedback.style.opacity = '0';
    }, 600);
  };

  skipBackBtn.addEventListener('click', () => {
    video.currentTime = Math.max(0, video.currentTime - 10);
    showFeedback('◀◀ 10s');
  });

  skipForwardBtn.addEventListener('click', () => {
    video.currentTime = Math.min(video.duration || 0, video.currentTime + 10);
    showFeedback('10s ▶▶');
  });

  // Volume & Mute
  const updateVolumeIcon = (val, muted) => {
    if (muted || val === 0) {
      volHigh.style.display = 'none';
      volMute.style.display = 'block';
    } else {
      volHigh.style.display = 'block';
      volMute.style.display = 'none';
    }
  };

  volumeSlider.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    video.volume = val;
    video.muted = val === 0;
    updateVolumeIcon(val, video.muted);
  });

  volumeBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    if (video.muted) {
      updateVolumeIcon(0, true);
    } else {
      updateVolumeIcon(video.volume, false);
      if (video.volume === 0) {
        video.volume = 0.5;
        volumeSlider.value = 0.5;
      }
    }
  });

  // Speed Menu
  speedMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    speedDropdown.style.display = speedDropdown.style.display === 'none' ? 'block' : 'none';
  });

  document.querySelectorAll('.speed-dropdown .dropdown-item').forEach(item => {
    item.addEventListener('click', () => {
      const speed = parseFloat(item.dataset.speed);
      video.playbackRate = speed;
      currentSpeedText.textContent = `${speed}x`;
      document.querySelectorAll('.speed-dropdown .dropdown-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      speedDropdown.style.display = 'none';
      showFeedback(`Speed: ${speed}x`);
    });
  });

  document.addEventListener('click', () => {
    speedDropdown.style.display = 'none';
  });

  // Captions Toggle & Dynamic Sync
  let captionsEnabled = true;
  ccToggleBtn.addEventListener('click', () => {
    captionsEnabled = !captionsEnabled;
    ccToggleBtn.classList.toggle('active', captionsEnabled);
    captionsOverlay.style.display = captionsEnabled ? 'flex' : 'none';
    showToast(captionsEnabled ? 'Captions ON' : 'Captions OFF');
  });

  const signCaptions = [
    { start: 0, end: 4, text: 'Sign Language Class — "I Am Here"' },
    { start: 4, end: 8, text: 'Gesture 1: "I understand your silence"' },
    { start: 8, end: 12, text: 'Gesture 2: "Where words fade, hands speak"' },
    { start: 12, end: 18, text: 'Key Phrase: "I Am Here with you"' },
    { start: 18, end: 30, text: 'Expressing emotion with gentle finger motion' },
    { start: 30, end: 60, text: 'Daily Conversation Sentences (ISL standard)' }
  ];

  const updateCaptions = (time) => {
    if (!captionsEnabled) return;
    const current = signCaptions.find(c => time >= c.start && time < c.end);
    if (current) {
      captionText.textContent = `Sign: "${current.text}"`;
    } else {
      captionText.textContent = `Sign Language: "${mainVideoTitle.textContent.trim()}"`;
    }
  };

  // Fullscreen Toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerContainer.requestFullscreen().then(() => {
        fsEnter.style.display = 'none';
        fsExit.style.display = 'block';
      }).catch(err => console.warn(err));
    } else {
      document.exitFullscreen().then(() => {
        fsEnter.style.display = 'block';
        fsExit.style.display = 'none';
      }).catch(err => console.warn(err));
    }
  };

  fullscreenBtn.addEventListener('click', toggleFullscreen);
  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
      fsEnter.style.display = 'block';
      fsExit.style.display = 'none';
    }
  });

  // Auto Hide Controls
  const resetHideControlsTimer = () => {
    playerContainer.classList.remove('hide-controls');
    clearTimeout(hideControlsTimeout);
    if (!video.paused) {
      hideControlsTimeout = setTimeout(() => {
        playerContainer.classList.add('hide-controls');
      }, 2800);
    }
  };

  playerContainer.addEventListener('mousemove', resetHideControlsTimer);
  playerContainer.addEventListener('click', resetHideControlsTimer);

  // Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    switch (e.key.toLowerCase()) {
      case ' ':
      case 'k':
        e.preventDefault();
        togglePlay();
        break;
      case 'j':
        e.preventDefault();
        video.currentTime = Math.max(0, video.currentTime - 10);
        showFeedback('◀◀ 10s');
        break;
      case 'l':
        e.preventDefault();
        video.currentTime = Math.min(video.duration || 0, video.currentTime + 10);
        showFeedback('10s ▶▶');
        break;
      case 'm':
        e.preventDefault();
        volumeBtn.click();
        break;
      case 'f':
        e.preventDefault();
        toggleFullscreen();
        break;
      case 'c':
        e.preventDefault();
        ccToggleBtn.click();
        break;
      case 'arrowleft':
        e.preventDefault();
        video.currentTime = Math.max(0, video.currentTime - 5);
        showFeedback('◀◀ 5s');
        break;
      case 'arrowright':
        e.preventDefault();
        video.currentTime = Math.min(video.duration || 0, video.currentTime + 5);
        showFeedback('5s ▶▶');
        break;
      case 'arrowup':
        e.preventDefault();
        video.volume = Math.min(1, video.volume + 0.1);
        volumeSlider.value = video.volume;
        updateVolumeIcon(video.volume, false);
        showFeedback(`Vol: ${Math.round(video.volume * 100)}%`);
        break;
      case 'arrowdown':
        e.preventDefault();
        video.volume = Math.max(0, video.volume - 0.1);
        volumeSlider.value = video.volume;
        updateVolumeIcon(video.volume, video.volume === 0);
        showFeedback(`Vol: ${Math.round(video.volume * 100)}%`);
        break;
    }
  });

  // ---------------- Video URL Helper (Supports Drive / Dropbox / CDN / Local) ----------------
  const formatVideoUrl = (url) => {
    if (!url) return '';
    // Convert Google Drive sharing link into direct streamable/downloadable URL
    if (url.includes('drive.google.com')) {
      const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
      if (fileIdMatch && fileIdMatch[1]) {
        return `https://drive.google.com/uc?export=download&id=${fileIdMatch[1]}`;
      }
    }
    // Convert Dropbox link to direct link
    if (url.includes('dropbox.com')) {
      return url.replace('dl=0', 'raw=1');
    }
    return url;
  };

  // ---------------- Playlist Switching & Chapter Seeking ----------------
  const loadLessonVideo = (card) => {
    const rawVideoUrl = card.dataset.video || 'assets/videos/Sign Language Class.mp4';
    const videoUrl = formatVideoUrl(rawVideoUrl);
    const timestamp = parseFloat(card.dataset.timestamp || '0');
    const title = card.dataset.title;
    const thumb = card.dataset.thumb;
    const views = card.dataset.views;
    const date = card.dataset.date;
    const likes = card.dataset.likes;
    const comments = card.dataset.comments;
    const desc = card.dataset.desc;

    // Check if the video source needs to be changed or if we just seek inside current long video
    const currentSrc = video.currentSrc || video.src || '';
    const targetSrcClean = videoUrl.replace(/\\/g, '/');

    if (currentSrc.includes(encodeURI(targetSrcClean)) || currentSrc.includes(targetSrcClean) || !videoUrl) {
      // Same video: directly seek to the lesson chapter timestamp
      video.currentTime = timestamp;
      video.play().then(() => {
        playerContainer.classList.add('playing');
        playSvg.style.display = 'none';
        pauseSvg.style.display = 'block';
      }).catch(() => {});
    } else {
      // Different video: switch source and seek
      video.src = videoUrl;
      video.poster = thumb;
      video.load();
      video.currentTime = timestamp;
      video.play().then(() => {
        playerContainer.classList.add('playing');
        playSvg.style.display = 'none';
        pauseSvg.style.display = 'block';
      }).catch(() => {});
    }

    // Update Details
    mainVideoTitle.textContent = title;
    videoViewsCount.textContent = views;
    videoUploadDate.textContent = date;
    likeCountEl.textContent = likes;
    commentsCountText.textContent = `${comments} Comments`;
    mainDescParagraph.textContent = desc;

    // Reset like state for new video view
    isVideoLiked = false;
    likeBtn.classList.remove('liked');

    // Update Active Card
    document.querySelectorAll('.video-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');

    // Scroll to top of player smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });

    showToast(`Now playing: ${title} (${formatTime(timestamp)})`);
  };

  document.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('click', () => loadLessonVideo(card));
  });

  // ---------------- Fetch and Sync from videos.json ----------------
  const initVideosFromJson = async () => {
    try {
      const res = await fetch('videos.json');
      if (!res.ok) throw new Error(`Status: ${res.status}`);
      const data = await res.json();

      // Update Main Video
      if (data.mainVideo) {
        const streamUrl = formatVideoUrl(data.mainVideo.videoUrl);
        if (streamUrl && streamUrl !== video.src) {
          video.src = streamUrl;
        }
        if (data.mainVideo.poster) video.poster = data.mainVideo.poster;
        if (data.mainVideo.title) mainVideoTitle.textContent = data.mainVideo.title;
        if (data.mainVideo.views) videoViewsCount.textContent = data.mainVideo.views;
        if (data.mainVideo.uploadDate) videoUploadDate.textContent = data.mainVideo.uploadDate;
        if (data.mainVideo.likes) likeCountEl.textContent = data.mainVideo.likes;
        if (data.mainVideo.commentsCount) commentsCountText.textContent = `${data.mainVideo.commentsCount} Comments`;
        if (data.mainVideo.description) mainDescParagraph.textContent = data.mainVideo.description;
      }

      // Update Playlist Cards dynamically
      if (Array.isArray(data.playlist) && data.playlist.length > 0) {
        const playlistContainer = document.getElementById('playlistCardsList');
        if (playlistContainer) {
          playlistContainer.innerHTML = '';
          data.playlist.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = `video-card ${index === 0 ? 'active' : ''}`;
            card.dataset.lessonId = item.id || `lesson-${index + 1}`;
            card.dataset.video = item.videoUrl || data.mainVideo?.videoUrl || '';
            card.dataset.timestamp = item.timestamp !== undefined ? item.timestamp : (index * 25);
            card.dataset.title = item.title;
            card.dataset.thumb = item.thumbnail || `assets/thumbnails/thumb_lesson${index + 1}.jpg`;
            card.dataset.views = item.views || '1.2M views';
            card.dataset.date = item.uploadDate || '2 weeks ago';
            card.dataset.likes = item.likes || '87K';
            card.dataset.comments = item.commentsCount || 574;
            card.dataset.desc = item.description || '';

            card.innerHTML = `
              <div class="card-thumb-wrap">
                <img src="${escapeHtml(card.dataset.thumb)}" alt="${escapeHtml(item.title)}" class="card-thumbnail" onerror="this.src='assets/thumbnails/main_poster.jpg'">
                <span class="card-timestamp">${escapeHtml(item.duration || formatTime(card.dataset.timestamp))}</span>
                <div class="now-playing-badge">
                  <span class="equalizer-bar"></span>
                  <span class="equalizer-bar"></span>
                  <span class="equalizer-bar"></span>
                </div>
              </div>
              <div class="card-details">
                <h4 class="card-title">${escapeHtml(item.title)}</h4>
                <p class="card-channel">${escapeHtml(item.channel || 'The Silent Classroom')} <span class="verified-dot">✓</span></p>
                <div class="card-meta">
                  <span>${escapeHtml(item.views || '1.2M views')}</span>
                  <span class="meta-bullet">•</span>
                  <span>${escapeHtml(item.uploadDate || '2 weeks ago')}</span>
                </div>
              </div>
            `;

            card.addEventListener('click', () => loadLessonVideo(card));
            playlistContainer.appendChild(card);
          });
        }
      }
      console.log('Videos successfully loaded and synced from videos.json');
    } catch (e) {
      console.info('Using local HTML fallback configuration for video player:', e);
    }
  };

  initVideosFromJson();

  // Autoplay next video on end
  video.addEventListener('ended', () => {
    if (!autoplayToggle.checked) return;
    const activeCard = document.querySelector('.video-card.active');
    if (!activeCard) return;

    let nextCard = activeCard.nextElementSibling;
    if (!nextCard || !nextCard.classList.contains('video-card')) {
      nextCard = playlistCards[0];
    }

    if (nextCard) {
      showToast('Autoplaying next lesson in 2s...');
      setTimeout(() => {
        loadLessonVideo(nextCard);
      }, 2000);
    }
  });

  // ---------------- Description Expansion & Chapters ----------------
  descToggleBtn.addEventListener('click', () => {
    const isOpen = descExpandedContent.classList.toggle('open');
    descToggleBtn.textContent = isOpen ? 'Show less' : 'Show more';
  });

  document.querySelectorAll('.ts-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const seekSec = parseFloat(link.dataset.seek);
      video.currentTime = seekSec;
      video.play().catch(() => {});
      showToast(`Jumped to chapter: ${formatTime(seekSec)}`);
    });
  });

  // ---------------- Video Action Buttons ----------------
  // Like Button
  likeBtn.addEventListener('click', () => {
    isVideoLiked = !isVideoLiked;
    likeBtn.classList.toggle('liked', isVideoLiked);
    let count = isVideoLiked ? '88K' : '87K';
    likeCountEl.textContent = count;
    showToast(isVideoLiked ? 'Added to Liked Videos ❤️' : 'Removed from Liked Videos');
  });

  // Dislike Button
  dislikeBtn.addEventListener('click', () => {
    showToast('Feedback submitted');
  });

  // Subscribe Button
  subscribeBtn.addEventListener('click', () => {
    isSubscribed = !isSubscribed;
    subscribeBtn.classList.toggle('subscribed', isSubscribed);
    const subText = subscribeBtn.querySelector('.sub-text');
    if (isSubscribed) {
      subText.textContent = 'Subscribed';
      showToast('Subscribed to The Silent Classroom 🔔');
    } else {
      subText.textContent = 'Subscribe';
      showToast('Unsubscribed');
    }
  });

  // Share Modal
  shareBtn.addEventListener('click', () => {
    shareLinkInput.value = window.location.href;
    shareModal.style.display = 'flex';
  });

  closeShareModalBtn.addEventListener('click', () => {
    shareModal.style.display = 'none';
  });

  shareModal.addEventListener('click', (e) => {
    if (e.target === shareModal) shareModal.style.display = 'none';
  });

  copyLinkBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(shareLinkInput.value).then(() => {
      copyLinkBtn.textContent = 'Copied!';
      showToast('Link copied to clipboard!');
      setTimeout(() => {
        copyLinkBtn.textContent = 'Copy';
      }, 2000);
    }).catch(() => {
      showToast('Link copied!');
    });
  });

  document.querySelectorAll('.share-icon-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('Opening share link...');
      shareModal.style.display = 'none';
    });
  });

  // Download Button
  downloadBtn.addEventListener('click', () => {
    showToast('Preparing lesson video download (MP4)...');
    setTimeout(() => {
      const a = document.createElement('a');
      a.href = video.currentSrc || 'assets/videos/lesson1.mp4';
      a.download = `${mainVideoTitle.textContent.trim()}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast('Download started!');
    }, 800);
  });

  // Save Button
  saveBtn.addEventListener('click', () => {
    isSaved = !isSaved;
    saveBtnText.textContent = isSaved ? 'Saved' : 'Save';
    showToast(isSaved ? 'Saved to "Learn Sign Language" playlist' : 'Removed from playlist');
  });

  // ---------------- Comments Rendering & Interaction ----------------
  const renderComments = () => {
    commentList.innerHTML = '';
    const slice = commentsData.slice(0, visibleCommentCount);

    slice.forEach(comment => {
      const item = document.createElement('div');
      item.className = 'comment-item';
      item.innerHTML = `
        <div class="commenter-avatar ${comment.avatarClass}">
          <span>${comment.name.charAt(0)}</span>
        </div>
        <div class="comment-content">
          <div class="comment-author-line">
            <span class="comment-username">${escapeHtml(comment.name)}</span>
            <span class="comment-time">${comment.time}</span>
          </div>
          <p class="comment-text">${escapeHtml(comment.text)}</p>
          <div class="comment-actions">
            <button class="c-action-btn c-like-btn ${comment.isLiked ? 'liked' : ''}" data-id="${comment.id}">
              <span>${comment.isLiked ? '❤️' : '🤍'}</span>
              <span class="c-like-count">${comment.likes}</span>
            </button>
            <button class="c-action-btn c-reply-btn" data-id="${comment.id}">Reply</button>
          </div>
          <div class="reply-container" id="replyBox-${comment.id}" style="display: none; margin-top: 10px;">
            <input type="text" class="reply-input" placeholder="Reply to ${escapeHtml(comment.name)}..." style="width: 100%; background: var(--bg-surface-hover); border: 1px solid var(--border-subtle); border-radius: 20px; padding: 6px 14px; font-size: 13px; outline: none;">
          </div>
        </div>
      `;
      commentList.appendChild(item);
    });

    // Attach Like Listeners
    document.querySelectorAll('.c-like-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id, 10);
        const item = commentsData.find(c => c.id === id);
        if (item) {
          item.isLiked = !item.isLiked;
          item.likes += item.isLiked ? 1 : -1;
          renderComments();
        }
      });
    });

    // Attach Reply Listeners
    document.querySelectorAll('.c-reply-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const box = document.getElementById(`replyBox-${id}`);
        if (box) {
          box.style.display = box.style.display === 'none' ? 'block' : 'none';
          const input = box.querySelector('input');
          if (box.style.display === 'block' && input) input.focus();
        }
      });
    });
  };

  // New Comment Input
  newCommentInput.addEventListener('focus', () => {
    commentActionsBar.style.display = 'flex';
  });

  newCommentInput.addEventListener('input', () => {
    postCommentBtn.disabled = newCommentInput.value.trim().length === 0;
  });

  cancelCommentBtn.addEventListener('click', () => {
    newCommentInput.value = '';
    postCommentBtn.disabled = true;
    commentActionsBar.style.display = 'none';
  });

  postCommentBtn.addEventListener('click', () => {
    const text = newCommentInput.value.trim();
    if (!text) return;

    const newComment = {
      id: Date.now(),
      name: 'Reyansh (You)',
      avatarClass: 'circle-av-user',
      time: 'Just now',
      text: text,
      likes: 1,
      isLiked: true
    };

    commentsData.unshift(newComment);
    totalCommentsCount++;
    commentsCountText.textContent = `${totalCommentsCount} Comments`;
    newCommentInput.value = '';
    postCommentBtn.disabled = true;
    commentActionsBar.style.display = 'none';
    renderComments();
    showToast('Your comment was posted!');
  });

  // Sort Comments
  commentSortSelect.addEventListener('change', (e) => {
    const val = e.target.value;
    if (val === 'top') {
      commentsData.sort((a, b) => b.likes - a.likes);
    } else {
      commentsData.sort((a, b) => b.id - a.id);
    }
    renderComments();
  });

  // Load More Comments
  loadMoreCommentsBtn.addEventListener('click', () => {
    visibleCommentCount += 10;
    renderComments();
    if (visibleCommentCount >= commentsData.length) {
      loadMoreCommentsBtn.textContent = 'All 50 top comments loaded';
      loadMoreCommentsBtn.disabled = true;
    }
  });

  renderComments();

  // ---------------- Search & Filter System ----------------
  const lessonsDatabase = [
    { title: 'Lesson 1: The Language of Silence', channel: 'The Silent Classroom', type: 'lesson', id: 0 },
    { title: 'Lesson 2: Greetings Without Sound', channel: 'The Silent Classroom', type: 'lesson', id: 1 },
    { title: 'Lesson 3: Family in Fingertips', channel: 'The Silent Classroom', type: 'lesson', id: 2 },
    { title: 'Lesson 4: Emotions in Gestures', channel: 'The Silent Classroom', type: 'lesson', id: 3 },
    { title: 'Lesson 5: Daily Life in Signs', channel: 'The Silent Classroom', type: 'lesson', id: 4 },
    { title: 'Lesson 6: Advanced Conversations', channel: 'The Silent Classroom', type: 'lesson', id: 5 },
    { title: 'Words Unspoken (Channel)', channel: '2.8M subscribers', type: 'channel' },
    { title: 'Beyond Silence (Channel)', channel: '2.2M subscribers', type: 'channel' },
    { title: 'Gestures & Grace (Channel)', channel: '1.9M subscribers', type: 'channel' },
    { title: 'The Deaf Collective (Channel)', channel: '1.6M subscribers', type: 'channel' },
    { title: 'Echoes of Hope (Channel)', channel: '1.3M subscribers', type: 'channel' },
    { title: 'Hear With Your Eyes (Channel)', channel: '1.1M subscribers', type: 'channel' },
    { title: 'Silent Voices Academy (Channel)', channel: '980K subscribers', type: 'channel' },
    { title: 'The Unheard Orchestra (Channel)', channel: '876K subscribers', type: 'channel' },
    { title: 'Fingers That Speak (Channel)', channel: '754K subscribers', type: 'channel' }
  ];

  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    clearSearchBtn.style.display = q ? 'flex' : 'none';

    if (!q) {
      searchDropdown.style.display = 'none';
      return;
    }

    const matches = lessonsDatabase.filter(item => 
      item.title.toLowerCase().includes(q) || item.channel.toLowerCase().includes(q)
    );

    if (matches.length > 0) {
      searchDropdown.innerHTML = matches.slice(0, 6).map(m => `
        <div class="search-result-item" data-title="${escapeHtml(m.title)}" data-id="${m.id !== undefined ? m.id : ''}">
          <span class="search-result-icon">${m.type === 'lesson' ? '🎬' : '📺'}</span>
          <span class="search-result-title">${escapeHtml(m.title)}</span>
        </div>
      `).join('');
      searchDropdown.style.display = 'block';

      searchDropdown.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
          const lessonId = item.dataset.id;
          if (lessonId !== '') {
            const card = playlistCards[parseInt(lessonId, 10)];
            if (card) loadLessonVideo(card);
          }
          searchInput.value = item.dataset.title;
          searchDropdown.style.display = 'none';
        });
      });
    } else {
      searchDropdown.innerHTML = `<div style="padding: 10px 18px; font-size: 13px; color: var(--text-muted);">No matching lessons found</div>`;
      searchDropdown.style.display = 'block';
    }
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearSearchBtn.style.display = 'none';
    searchDropdown.style.display = 'none';
    searchInput.focus();
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.header-center')) {
      searchDropdown.style.display = 'none';
    }
  });

  // Filter Chips
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      showToast(`Filter: ${chip.textContent}`);
    });
  });

  // Nav Tabs & Mobile Nav
  const handleTabClick = (tabName) => {
    navTabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tabName));
    mobNavBtns.forEach(t => t.classList.toggle('active', t.dataset.tab === tabName));
    showToast(`Navigated to ${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`);
  };

  navTabs.forEach(tab => {
    tab.addEventListener('click', () => handleTabClick(tab.dataset.tab));
  });

  mobNavBtns.forEach(btn => {
    btn.addEventListener('click', () => handleTabClick(btn.dataset.tab));
  });

  // Featured Creators Subscribe Buttons
  document.querySelectorAll('.subscribe-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const isSub = btn.classList.toggle('btn-primary');
      btn.classList.toggle('btn-outline', !isSub);
      btn.textContent = isSub ? 'Subscribed' : 'Subscribe';
      showToast(isSub ? 'Subscribed to creator!' : 'Unsubscribed');
    });
  });

  // Community Join Button
  document.getElementById('joinCommunityBtn').addEventListener('click', () => {
    showToast('Welcome to the "I Am Here" Learning Circle! ✨');
  });

  // ---------------- Toast Notifications ----------------
  let toastTimeout = null;
  function showToast(msg) {
    toastMessage.textContent = msg;
    toastNotification.style.display = 'flex';
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastNotification.style.display = 'none';
    }, 2800);
  }

  function escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  }
});

