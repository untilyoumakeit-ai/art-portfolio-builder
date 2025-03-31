// Initialize app state and cache elements
let portfolio = JSON.parse(localStorage.getItem('portfolio')) || [];

const addProjectBtn = document.getElementById('addProjectBtn');
const addProjectModal = document.getElementById('addProjectModal');
const closeModal = document.getElementById('closeModal');
const portfolioList = document.getElementById('portfolioList');
const projectForm = document.getElementById('projectForm');

// Show modal to add a new project
addProjectBtn.addEventListener('click', () => {
    addProjectModal.style.display = 'block';
});

// Close modal
closeModal.addEventListener('click', () => {
    addProjectModal.style.display = 'none';
});

// Handle form submission to add a new project
projectForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const imageInput = document.getElementById('imageInput');
    const titleInput = document.getElementById('titleInput');
    const descInput = document.getElementById('descInput');

    const newProject = {
        title: titleInput.value,
        description: descInput.value,
        image: URL.createObjectURL(imageInput.files[0]),
    };

    portfolio.push(newProject);
    localStorage.setItem('portfolio', JSON.stringify(portfolio));

    // Close modal and reset form
    addProjectModal.style.display = 'none';
    projectForm.reset();

    renderPortfolio();
});

// Function to delete a project
function deleteProject(index) {
    portfolio.splice(index, 1);
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
    renderPortfolio();
}

// Render portfolio items
function renderPortfolio() {
    portfolioList.innerHTML = '';
    portfolio.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');
        projectCard.innerHTML = `
            <img src="${project.image}" alt="Project Image">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <button class="deleteBtn" onclick="deleteProject(${index})">Delete</button>
        `;
        portfolioList.appendChild(projectCard);
    });
}

// Initial render of portfolio
renderPortfolio();

