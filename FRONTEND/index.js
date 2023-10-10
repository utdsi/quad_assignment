document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registration-form');
    const userList = document.getElementById('user-list');

    // Function to fetch and display all users
    async function fetchUsers() {
        try {
            const response = await fetch('http://127.0.0.1:3000/details', {
                method: 'GET',
            });
            const data = await response.json();

            if (data.length === 0) {
                userList.innerHTML = '<li>No users found.</li>';
                return;
            }

            userList.innerHTML = '';
            data.forEach((user) => {
                const listItem = document.createElement('li');
                listItem.textContent = `Username: ${user.user_name}, Email: ${user.user_email}`;
                userList.appendChild(listItem);
            });
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    // Handle user registration form submission
    registrationForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(registrationForm);
        const user = {
            user_name: formData.get('username'),
            user_email: formData.get('email'),
            user_password: formData.get('password'),
            user_image: formData.get('image'),
        };

        try {
            const response = await fetch('http://127.0.0.1:3000/insert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            const data = await response.json();

            if (response.status === 200) {
                alert(data.msg);
                registrationForm.reset();
                fetchUsers(); // Refresh the user list
            } else {
                alert('Error registering user');
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
    });

    // Fetch and display users when the page loads
    fetchUsers();
});
