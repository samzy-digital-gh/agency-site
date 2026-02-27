// blog-common.js
// Shared functions for all blog pages

export function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return `hsl(${hash % 360}, 70%, 80%)`;
}

export function formatTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return minutes + 'm ago';
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return hours + 'h ago';
  const days = Math.floor(hours / 24);
  return days + 'd ago';
}

export function loadUserAvatar(user, db, avatarDiv) {
  db.collection('users').doc(user.uid).get().then(doc => {
    if (doc.exists && doc.data().avatarURL) {
      avatarDiv.innerHTML = `<img src="${doc.data().avatarURL}" alt="avatar">`;
    } else {
      const displayName = doc.exists && doc.data().displayName ? doc.data().displayName : user.email;
      const initials = displayName.charAt(0).toUpperCase();
      avatarDiv.style.background = stringToColor(displayName);
      avatarDiv.innerHTML = `<span>${initials}</span>`;
    }
  }).catch(() => {
    avatarDiv.style.background = stringToColor(user.email);
    avatarDiv.innerHTML = `<span>${user.email.charAt(0).toUpperCase()}</span>`;
  });
}

export function setupDropdown(avatarEl, dropdownEl, logoutBtn) {
  avatarEl.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownEl.classList.toggle('show');
  });
  document.addEventListener('click', () => dropdownEl.classList.remove('show'));
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      firebase.auth().signOut().then(() => {
        window.location.href = 'community.html';
      });
    });
  }
}