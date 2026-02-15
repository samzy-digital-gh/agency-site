/**
 * COMMUNITY PAGE – INTERACTIVITY (with Firebase)
 * Carousel, accordion, progress bars, form validation + Firebase Auth & Firestore
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ========== EXISTING FUNCTIONALITY (KEPT INTACT) ==========

    // ---------- MENTOR CAROUSEL ----------
    const mentors = [
        { name: 'Samuel Ahiaba', title: 'Full‑Stack Engineer', bio: '5+ years, passionate about teaching React & Node.' },
        { name: 'Ama Boateng', title: 'UI/UX Lead', bio: 'Design mentor, helped 20+ juniors land first roles.' },
        { name: 'Kwame Osei', title: 'Mobile Dev', bio: 'Flutter & Kotlin expert, Google Certified.' },
        { name: 'Esi Thompson', title: 'Data Scientist', bio: 'Python, SQL, Power BI – builds real‑world models.' }
    ];

    const carouselDiv = document.getElementById('mentorCarousel');
    const dotsContainer = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');

    let currentIndex = 0;
    let interval;

    function renderMentor(index) {
        const m = mentors[index];
        const html = `
            <div class="community-mentor-card">
                <div class="community-avatar"><i class="fas fa-user-circle"></i></div>
                <h3 style="font-size:1.4rem; margin-bottom:0.3rem;">${m.name}</h3>
                <p style="color: var(--community-orange); font-weight: 600;">${m.title}</p>
                <p style="margin-top: 1rem; color: var(--community-text-soft);">${m.bio}</p>
            </div>
        `;
        carouselDiv.innerHTML = html;
        const dots = document.querySelectorAll('.community-dot');
        dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    }

    function createDots() {
        dotsContainer.innerHTML = '';
        mentors.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('community-dot');
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentIndex = i;
                renderMentor(currentIndex);
                resetAutoRotate();
            });
            dotsContainer.appendChild(dot);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % mentors.length;
        renderMentor(currentIndex);
    }
    function prevSlide() {
        currentIndex = (currentIndex - 1 + mentors.length) % mentors.length;
        renderMentor(currentIndex);
    }
    function startAutoRotate() { interval = setInterval(nextSlide, 6000); }
    function stopAutoRotate() { clearInterval(interval); }
    function resetAutoRotate() { stopAutoRotate(); startAutoRotate(); }

    if (carouselDiv && dotsContainer) {
        createDots();
        renderMentor(0);
        startAutoRotate();
        const carouselContainer = document.querySelector('.community-carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopAutoRotate);
            carouselContainer.addEventListener('mouseleave', startAutoRotate);
        }
        if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoRotate(); });
        if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoRotate(); });
    }

    // ---------- ACCORDION ----------
    const accordionItems = document.querySelectorAll('.community-accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.community-accordion-header');
        if (header) {
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                accordionItems.forEach(i => i.classList.remove('active'));
                if (!isActive) item.classList.add('active');
            });
        }
    });

    // ---------- PROGRESS BARS ----------
    const progressFills = document.querySelectorAll('.community-progress-fill');
    progressFills.forEach(fill => {
        const width = fill.getAttribute('data-width');
        if (width) setTimeout(() => { fill.style.width = width + '%'; }, 200);
    });

    // ---------- FORM VALIDATION + FORMSPREE SUBMIT ----------
    const form = document.getElementById('communityForm');
    if (form) {
        const fullName = document.getElementById('fullName');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const experience = document.getElementById('experience');
        const successDiv = document.getElementById('formSuccess');

        function showError(fieldId, msg) {
            const err = document.getElementById(`error${fieldId}`);
            if (err) err.textContent = msg || '';
        }

        function validateFullName() {
            const val = fullName.value.trim();
            showError('FullName', val === '' ? 'Full name is required' : '');
            return val !== '';
        }
        function validateEmail() {
            const val = email.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (val === '') {
                showError('Email', 'Email is required');
                return false;
            } else if (!emailRegex.test(val)) {
                showError('Email', 'Enter a valid email');
                return false;
            } else {
                showError('Email', '');
                return true;
            }
        }
        function validatePhone() {
            const val = phone.value.trim();
            showError('Phone', val === '' ? 'Phone number is required' : '');
            return val !== '';
        }
        function validateExperience() {
            const val = experience.value;
            showError('Experience', val === '' ? 'Select your experience level' : '');
            return val !== '';
        }

        fullName.addEventListener('blur', validateFullName);
        email.addEventListener('blur', validateEmail);
        phone.addEventListener('blur', validatePhone);
        experience.addEventListener('blur', validateExperience);

        form.addEventListener('submit', function(e) {
            const isValidName = validateFullName();
            const isValidEmail = validateEmail();
            const isValidPhone = validatePhone();
            const isValidExp = validateExperience();

            if (!isValidName || !isValidEmail || !isValidPhone || !isValidExp) {
                e.preventDefault();
                successDiv.style.display = 'none';
            } else {
                successDiv.style.display = 'block';
                successDiv.innerHTML = '✅ Sending your information...';
            }
        });
    }

    // ---------- SMOOTH SCROLL FOR ANCHOR LINKS ----------
    const anchorLinks = document.querySelectorAll('a[href="#events"], a[href="#registration"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // ========== NEW FIREBASE FUNCTIONALITY ==========
    // Make sure Firebase SDK is loaded and initialized in your HTML

    // ---------- DOM elements for new features ----------
    const userInfoDiv = document.getElementById('userInfo');
    const userNameSpan = document.getElementById('userName');
    const loginPrompt = document.getElementById('loginPrompt');
    const logoutBtn = document.getElementById('logoutBtn');
    const postFormContainer = document.getElementById('postFormContainer');
    const postsList = document.getElementById('postsList');
    const clickBtn = document.getElementById('clickBtn');
    const scoreSpan = document.getElementById('score');
    const gameMessage = document.getElementById('gameMessage');

    // Modal elements
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const showLogin = document.getElementById('showLogin');
    const showRegister = document.getElementById('showRegister');
    const closeModals = document.querySelectorAll('.close-modal');

    // Only proceed if Firebase is available
    if (typeof firebase === 'undefined') {
        console.warn('Firebase not loaded – new features disabled');
    } else {
        // Firestore reference
        const db = firebase.firestore();

        // ---------- Auth State Observer ----------
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // User is signed in
                userInfoDiv.style.display = 'block';
                userNameSpan.textContent = user.displayName || user.email;
                loginPrompt.style.display = 'none';
                if (postFormContainer) postFormContainer.style.display = 'block';
                loadPosts(); // load posts when logged in (though we load anyway)
            } else {
                // No user
                userInfoDiv.style.display = 'none';
                loginPrompt.style.display = 'block';
                if (postFormContainer) postFormContainer.style.display = 'none';
                // Still load posts for visitors
                loadPosts();
            }
        });

        // ---------- Login / Register Modal Handlers ----------
        if (showLogin) {
            showLogin.addEventListener('click', e => {
                e.preventDefault();
                loginModal.style.display = 'flex';
            });
        }
        if (showRegister) {
            showRegister.addEventListener('click', e => {
                e.preventDefault();
                registerModal.style.display = 'flex';
            });
        }
        closeModals.forEach(btn => {
            btn.addEventListener('click', () => {
                loginModal.style.display = 'none';
                registerModal.style.display = 'none';
            });
        });

        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', e => {
                e.preventDefault();
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;
                firebase.auth().signInWithEmailAndPassword(email, password)
                    .then(() => {
                        loginModal.style.display = 'none';
                        loginForm.reset();
                        document.getElementById('loginError').textContent = '';
                    })
                    .catch(error => {
                        document.getElementById('loginError').textContent = error.message;
                    });
            });
        }

        // Register form
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', e => {
                e.preventDefault();
                const name = document.getElementById('regName').value;
                const email = document.getElementById('regEmail').value;
                const password = document.getElementById('regPassword').value;
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(userCredential => {
                        // Update profile with display name
                        return userCredential.user.updateProfile({ displayName: name });
                    })
                    .then(() => {
                        document.getElementById('registerSuccess').style.display = 'block';
                        document.getElementById('registerSuccess').textContent = 'Registration successful!';
                        setTimeout(() => {
                            registerModal.style.display = 'none';
                            document.getElementById('registerSuccess').style.display = 'none';
                        }, 2000);
                        registerForm.reset();
                        document.getElementById('registerError').textContent = '';
                    })
                    .catch(error => {
                        document.getElementById('registerError').textContent = error.message;
                    });
            });
        }

        // Logout
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                firebase.auth().signOut();
            });
        }

        // ---------- Load Posts (real‑time) ----------
        function loadPosts() {
            if (!postsList) return;
            db.collection('posts')
                .orderBy('createdAt', 'desc')
                .limit(20)
                .onSnapshot(snapshot => {
                    postsList.innerHTML = '';
                    snapshot.forEach(doc => {
                        const post = doc.data();
                        const div = document.createElement('div');
                        div.className = 'community-post';
                        div.innerHTML = `
                            <h3>${escapeHTML(post.title)}</h3>
                            <div class="meta">By ${escapeHTML(post.authorName)} · ${new Date(post.createdAt?.toDate()).toLocaleString()}</div>
                            <p>${escapeHTML(post.content).replace(/\n/g, '<br>')}</p>
                        `;
                        postsList.appendChild(div);
                    });
                }, error => {
                    console.error('Error loading posts:', error);
                });
        }

        // Escape HTML helper (same as before)
        function escapeHTML(str) {
            return String(str).replace(/[&<>"]/g, function(m) {
                if (m === '&') return '&amp;';
                if (m === '<') return '&lt;';
                if (m === '>') return '&gt;';
                if (m === '"') return '&quot;';
                return m;
            });
        }

        // ---------- Create Post ----------
        const newPostForm = document.getElementById('newPostForm');
        if (newPostForm) {
            newPostForm.addEventListener('submit', e => {
                e.preventDefault();
                const user = firebase.auth().currentUser;
                if (!user) {
                    alert('You must be logged in to post.');
                    return;
                }
                const title = document.getElementById('postTitle').value.trim();
                const content = document.getElementById('postContent').value.trim();
                if (!title || !content) return;

                db.collection('posts').add({
                    title: title,
                    content: content,
                    authorId: user.uid,
                    authorName: user.displayName || user.email,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                })
                .then(() => {
                    newPostForm.reset();
                })
                .catch(error => {
                    alert('Error creating post: ' + error.message);
                });
            });
        }

        // ---------- Game ----------
        if (clickBtn) {
            let clickCount = 0;
            clickBtn.addEventListener('click', () => {
                const user = firebase.auth().currentUser;
                if (!user) {
                    gameMessage.textContent = 'Please log in to play!';
                    return;
                }
                clickCount++;
                scoreSpan.textContent = clickCount;
                if (clickCount >= 10) {
                    // Award points – store in Firestore (e.g., user profile or a separate collection)
                    db.collection('users').doc(user.uid).set({
                        points: firebase.firestore.FieldValue.increment(10)
                    }, { merge: true })
                    .then(() => {
                        gameMessage.textContent = '🎉 You earned 10 points!';
                    })
                    .catch(err => {
                        gameMessage.textContent = 'Error saving points.';
                        console.error(err);
                    });
                    clickCount = 0;
                    scoreSpan.textContent = '0';
                }
            });
        }
    }
});