// Global Variables
let products = [
    { id: 1, name: "iPhone 15 Pro", category: "smartphones", price: 1199, rating: 5, description: "Latest iPhone with A17 Pro chip" },
    { id: 2, name: "Samsung Galaxy S24", category: "smartphones", price: 899, rating: 4, description: "Flagship Android smartphone" },
    { id: 3, name: "MacBook Air M3", category: "laptops", price: 1599, rating: 5, description: "Powerful and lightweight laptop" },
    { id: 4, name: "Dell XPS 13", category: "laptops", price: 1299, rating: 4, description: "Premium ultrabook for professionals" },
    { id: 5, name: "AirPods Pro", category: "accessories", price: 249, rating: 5, description: "Wireless earbuds with noise cancellation" },
    { id: 6, name: "iPad Pro 12.9", category: "accessories", price: 1099, rating: 5, description: "Professional tablet for creative work" },
    { id: 7, name: "Google Pixel 8", category: "smartphones", price: 699, rating: 4, description: "AI-powered Android smartphone" },
    { id: 8, name: "Surface Laptop 5", category: "laptops", price: 1799, rating: 4, description: "Premium Windows laptop" }
];

let gallery = [];
let todos = [];
let currentQuizQuestion = 0;
let quizScore = 0;
let selectedAnswer = null;

// Quiz Questions
const quizQuestions = [
    {
        question: "What does CPU stand for?",
        options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Unit", "Computer Processing Unit"],
        correct: 0
    },
    {
        question: "Which company developed the iPhone?",
        options: ["Samsung", "Google", "Apple", "Microsoft"],
        correct: 2
    },
    {
        question: "What does RAM stand for?",
        options: ["Read Access Memory", "Random Access Memory", "Rapid Access Memory", "Real Access Memory"],
        correct: 1
    },
    {
        question: "Which of these is NOT an operating system?",
        options: ["Windows", "macOS", "Linux", "Photoshop"],
        correct: 3
    },
    {
        question: "What does USB stand for?",
        options: ["Universal Serial Bus", "Universal System Bus", "United Serial Bus", "Universal Storage Bus"],
        correct: 0
    }
];

// Initialize the website when page loads
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    smoothScroll();
});

// Smooth scrolling for navigation links
function smoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Toggle mobile menu
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Basic alert functionality
function showAlert() {
    alert('Welcome to TechStore! Browse our amazing electronics collection.');
}

// Display products
function displayProducts(filteredProducts = products) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">📱</div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">$${product.price}</div>
                <div class="product-rating">
                    ${'⭐'.repeat(product.rating)}
                    <span>${product.rating}/5</span>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Filter products
function filterProducts() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const priceFilter = document.getElementById('priceFilter').value;
    const ratingFilter = document.getElementById('ratingFilter').value;

    let filteredProducts = products;

    // Filter by category
    if (categoryFilter !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
    }

    // Filter by price
    if (priceFilter !== 'all') {
        if (priceFilter === 'low') {
            filteredProducts = filteredProducts.filter(product => product.price < 500);
        } else if (priceFilter === 'medium') {
            filteredProducts = filteredProducts.filter(product => product.price >= 500 && product.price <= 1500);
        } else if (priceFilter === 'high') {
            filteredProducts = filteredProducts.filter(product => product.price > 1500);
        }
    }

    // Filter by rating
    if (ratingFilter !== 'all') {
        const minRating = parseInt(ratingFilter);
        filteredProducts = filteredProducts.filter(product => product.rating >= minRating);
    }

    displayProducts(filteredProducts);
}

// Gallery Functions
function addImage() {
    const imageUrl = document.getElementById('imageUrl').value;
    const imageTitle = document.getElementById('imageTitle').value;

    if (!imageUrl || !imageTitle) {
        alert('Please enter both image URL and title');
        return;
    }

    const newImage = {
        id: Date.now(),
        url: imageUrl,
        title: imageTitle
    };

    gallery.push(newImage);
    displayGallery();

    // Clear inputs
    document.getElementById('imageUrl').value = '';
    document.getElementById('imageTitle').value = '';
}

function displayGallery() {
    const imageGallery = document.getElementById('imageGallery');
    imageGallery.innerHTML = '';

    gallery.forEach(image => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${image.url}" alt="${image.title}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YwZjBmMCIvPgogIDx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIwLjNlbSI+SW1hZ2UgTm90IEZvdW5kPC90ZXh0Pgo8L3N2Zz4K'">
            <div class="gallery-item-info">
                <h4>${image.title}</h4>
            </div>
            <button class="delete-btn" onclick="removeImage(${image.id})">×</button>
        `;
        imageGallery.appendChild(galleryItem);
    });
}

function removeImage(imageId) {
    gallery = gallery.filter(image => image.id !== imageId);
    displayGallery();
}

// Quiz Functions
function startQuiz() {
    currentQuizQuestion = 0;
    quizScore = 0;
    selectedAnswer = null;
    document.getElementById('startQuiz').style.display = 'none';
    document.getElementById('quizResults').style.display = 'none';
    displayQuestion();
}

function displayQuestion() {
    if (currentQuizQuestion < quizQuestions.length) {
        const question = quizQuestions[currentQuizQuestion];
        document.getElementById('questionText').textContent = `Question ${currentQuizQuestion + 1}: ${question.question}`;
        
        const optionsContainer = document.getElementById('optionsContainer');
        optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'quiz-option';
            optionElement.textContent = option;
            optionElement.onclick = () => selectAnswer(index);
            optionsContainer.appendChild(optionElement);
        });

        document.getElementById('nextQuestion').style.display = 'none';
    } else {
        showQuizResults();
    }
}

function selectAnswer(answerIndex) {
    selectedAnswer = answerIndex;
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => option.classList.remove('selected'));
    options[answerIndex].classList.add('selected');
    
    // Show correct/incorrect immediately
    setTimeout(() => {
        const question = quizQuestions[currentQuizQuestion];
        options.forEach((option, index) => {
            if (index === question.correct) {
                option.classList.add('correct');
            } else if (index === selectedAnswer && index !== question.correct) {
                option.classList.add('incorrect');
            }
        });

        if (selectedAnswer === question.correct) {
            quizScore++;
        }

        document.getElementById('nextQuestion').style.display = 'block';
    }, 500);
}

function nextQuestion() {
    currentQuizQuestion++;
    displayQuestion();
}

function showQuizResults() {
    document.getElementById('questionText').style.display = 'none';
    document.getElementById('optionsContainer').style.display = 'none';
    document.getElementById('nextQuestion').style.display = 'none';
    
    const resultsDiv = document.getElementById('quizResults');
    resultsDiv.style.display = 'block';
    
    const scoreText = document.getElementById('scoreText');
    const percentage = Math.round((quizScore / quizQuestions.length) * 100);
    scoreText.textContent = `You scored ${quizScore} out of ${quizQuestions.length} (${percentage}%)`;
}

function restartQuiz() {
    document.getElementById('questionText').style.display = 'block';
    document.getElementById('optionsContainer').style.display = 'block';
    document.getElementById('quizResults').style.display = 'none';
    document.getElementById('startQuiz').style.display = 'block';
    document.getElementById('questionText').textContent = 'Click Start Quiz to begin!';
}

// Todo Functions
function addTodo() {
    const todoInput = document.getElementById('todoInput');
    const todoText = todoInput.value.trim();

    if (!todoText) {
        alert('Please enter a task');
        return;
    }

    const newTodo = {
        id: Date.now(),
        text: todoText,
        completed: false
    };

    todos.push(newTodo);
    displayTodos();
    todoInput.value = '';
}

function handleTodoKeyPress(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
}

function displayTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    todos.forEach(todo => {
        const todoItem = document.createElement('li');
        todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        todoItem.innerHTML = `
            <span>${todo.text}</span>
            <div class="todo-actions">
                <button class="complete-btn" onclick="toggleTodo(${todo.id})">${todo.completed ? 'Undo' : 'Complete'}</button>
                <button class="delete-todo-btn" onclick="deleteTodo(${todo.id})">Delete</button>
            </div>
        `;
        todoList.appendChild(todoItem);
    });
}

function toggleTodo(todoId) {
    todos = todos.map(todo => {
        if (todo.id === todoId) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    displayTodos();
}

function deleteTodo(todoId) {
    todos = todos.filter(todo => todo.id !== todoId);
    displayTodos();
}

// Weather Functions
async function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim();
    const weatherDisplay = document.getElementById('weatherDisplay');

    if (!city) {
        alert('Please enter a city name');
        return;
    }

    weatherDisplay.innerHTML = '<p>Loading weather data...</p>';

    try {
        // Using OpenWeatherMap API (you'll need to get your own API key)
        const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with actual API key
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        
        if (!response.ok) {
            throw new Error('Weather data not found');
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        // Mock weather data when API is not available
        displayMockWeather(city);
    }
}

function handleWeatherKeyPress(event) {
    if (event.key === 'Enter') {
        getWeather();
    }
}

function displayWeather(data) {
    const weatherDisplay = document.getElementById('weatherDisplay');
    weatherDisplay.innerHTML = `
        <div class="weather-info">
            <h3>${data.name}, ${data.sys.country}</h3>
            <div class="temperature">${Math.round(data.main.temp)}°C</div>
            <p>${data.weather[0].description}</p>
            <p>Feels like: ${Math.round(data.main.feels_like)}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
        </div>
    `;
}

function displayMockWeather(city) {
    const mockTemperature = Math.floor(Math.random() * 35) + 5;
    const mockWeatherConditions = ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'];
    const mockCondition = mockWeatherConditions[Math.floor(Math.random() * mockWeatherConditions.length)];
    
    const weatherDisplay = document.getElementById('weatherDisplay');
    weatherDisplay.innerHTML = `
        <div class="weather-info">
            <h3>${city}</h3>
            <div class="temperature">${mockTemperature}°C</div>
            <p>${mockCondition}</p>
            <p>Feels like: ${mockTemperature + 2}°C</p>
            <p>Humidity: ${Math.floor(Math.random() * 50) + 30}%</p>
            <small style="color: #666;">*Demo weather data</small>
        </div>
    `;
}

// Form Validation Functions
function validateForm() {
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(error => error.textContent = '');
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => input.classList.remove('error'));

    // Validate name
    const name = document.getElementById('name').value.trim();
    if (!name) {
        showError('name', 'Name is required');
        isValid = false;
    }

    // Validate email
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate phone (optional but must be valid if provided)
    const phone = document.getElementById('phone').value.trim();
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (phone && !phoneRegex.test(phone)) {
        showError('phone', 'Please enter a valid phone number');
        isValid = false;
    }

    // Validate message
    const message = document.getElementById('message').value.trim();
    if (!message) {
        showError('message', 'Message is required');
        isValid = false;
    }

    return isValid;
}

function showError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const errorSpan = document.getElementById(fieldName + 'Error');
    field.classList.add('error');
    errorSpan.textContent = message;
}

function submitForm(event) {
    event.preventDefault();
    
    if (validateForm()) {
        alert('Thank you for your message! We will get back to you soon.');
        document.getElementById('contactForm').reset();
    }
}