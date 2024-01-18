//300375188
// Ekene Innocent Onyemanjo
// UserListController class to handle user list operations
function UserListController(users) {
    this.users = users;
    this.currentPage = 1;
    this.usersPerPage = 10;
    this.paginationElement = document.querySelector('.pagination');
    this.contactListElement = document.querySelector('.contact-list');
    this.pageHeaderElement = document.querySelector('.page-header h3');
}

// Method to fetch users for a specific page
UserListController.prototype.fetchUsersForPage = function(pageNumber) {
    var startIndex = (pageNumber - 1) * this.usersPerPage;
    var endIndex = pageNumber * this.usersPerPage;
    return this.users.slice(startIndex, Math.min(endIndex, this.users.length));
};

// Method to create HTML for user list
UserListController.prototype.createUserHtml = function(user) {
    var userEmail = user.name.replace(" ", ".") + "@example.com";
    return `
        <li class="contact-item cf">
            <div class="contact-details">
                <img class="avatar" src="${user.image}">
                <h3>${user.name}</h3>
                <span class="email">${userEmail}</span>
            </div>
            <div class="joined-details">
                <span class="date">Joined ${user.joined}</span>
            </div>
        </li>`;
};

// Method to update the contact list on the page
UserListController.prototype.updateContactList = function(pageNumber) {
    var usersToShow = this.fetchUsersForPage(pageNumber);
    this.contactListElement.innerHTML = usersToShow.map(this.createUserHtml).join('');
    this.pageHeaderElement.textContent = `Total: ${this.users.length}`;
};

// Method to create and display pagination controls
UserListController.prototype.createPaginationControls = function() {
    var totalPageCount = Math.ceil(this.users.length / this.usersPerPage);
    var paginationHtml = '<ul>';

    for (let i = 1; i <= totalPageCount; i++) {
        paginationHtml += `<li><a id="page-${i}" onclick="userListController.updateContactList(${i})">${i}</a></li>`;
    }

    paginationHtml += '</ul>';
    this.paginationElement.innerHTML = paginationHtml;
};

// Initialization
var userListController = new UserListController(users);
userListController.updateContactList(1);
userListController.createPaginationControls();
