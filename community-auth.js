// community-auth.js – Handles Firebase registration from the main form
// No automatic redirect after registration – user decides when to log in.

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('communityForm');
    const successDiv = document.getElementById('formSuccess');
    const submitBtn = document.getElementById('registerSubmit');

    if (!form) return;

    // Override form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault(); // Stop any default action

        // Clear previous errors
        document.querySelectorAll('.community-error').forEach(el => el.textContent = '');
        successDiv.style.display = 'none';

        // Get form values
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const phone = document.getElementById('phone').value.trim();
        const experience = document.getElementById('experience').value;
        const interests = Array.from(document.querySelectorAll('input[name="interests"]:checked')).map(cb => cb.value);
        const message = document.getElementById('message').value.trim();

        // Basic validation
        let isValid = true;
        if (!fullName) { showError('fullName', 'Full name is required'); isValid = false; }
        if (!email) { showError('email', 'Email is required'); isValid = false; }
        else if (!/^\S+@\S+\.\S+$/.test(email)) { showError('email', 'Invalid email'); isValid = false; }
        if (!password || password.length < 6) { showError('password', 'Password must be at least 6 characters'); isValid = false; }
        if (!phone) { showError('phone', 'Phone is required'); isValid = false; }
        if (!experience) { showError('experience', 'Please select your experience level'); isValid = false; }

        if (!isValid) return;

        // Disable button to prevent double submission
        submitBtn.disabled = true;
        submitBtn.textContent = 'Creating account...';

        try {
            // 1. Create Firebase Auth user
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // 2. Update profile with display name
            await user.updateProfile({ displayName: fullName });

            // 3. Store additional data in Firestore
            await firebase.firestore().collection('users').doc(user.uid).set({
                displayName: fullName,
                email: email,
                phone: phone,
                experience: experience,
                interests: interests,
                message: message,
                points: 0,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            // 4. Show success message – no redirect
            successDiv.style.display = 'block';
            successDiv.textContent = '✅ Account created successfully! You can now log in.';
            
            // Optionally clear the form or disable fields
            form.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = 'Join now';

        } catch (error) {
            console.error('Registration error:', error);
            // Handle specific Firebase errors
            if (error.code === 'auth/email-already-in-use') {
                showError('email', 'This email is already registered. Please log in.');
            } else {
                alert('Registration failed: ' + error.message);
            }
            submitBtn.disabled = false;
            submitBtn.textContent = 'Join now';
        }
    });

    function showError(fieldId, msg) {
        const errSpan = document.getElementById(`error${fieldId.charAt(0).toUpperCase() + fieldId.slice(1)}`);
        if (errSpan) errSpan.textContent = msg;
    }
});