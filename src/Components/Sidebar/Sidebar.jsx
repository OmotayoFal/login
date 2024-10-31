/* General styling for sidebar */
.sidebar {
  width: 250px; /* Sidebar width */
  background-color: #333; /* Dark background */
  padding: 20px; /* Internal padding */
  transition: width 0.3s ease; /* Smooth transition when collapsing */
}
.header-container {
  display: flex; /* Aligns child elements in a row */
  align-items: center; /* Vertically center elements */
  gap: 10%;
  padding: 10px; /* Add some padding if needed */
}
.sidebar-logo {
  font-size: 24px; /* Logo font size */
  color: white; /* White text */
  text-align: center;
  margin-bottom: 20px; /* Space below logo */
}

.sidebar-nav {
  list-style: none; /* Remove list bullets */
  padding: 0; /* Remove padding */
}

.sidebar-item {
  margin-bottom: 20px; /* Space between each sidebar item */
}

.sidebar-link {
  display: flex; /* Flexbox for layout */
  align-items: center; /* Align items vertically */
  padding: 15px; /* Padding inside the link */
  background-color: #444; /* Dark gray background */
  border-radius: 8px; /* Rounded corners */
  text-decoration: none; /* Remove underline */
  color: white; /* White text */
  font-size: 18px; /* Font size */
  transition: background-color 0.3s ease; /* Smooth background transition */
}

.sidebar-link:hover {
  background-color: #555; /* Change background on hover */
}

.sidebar-icon {
  margin-right: 10px; /* Space between icon and text */
}

.sidebar.collapsed {
  width: 59px; /* Narrower width when collapsed */
}
.sidebar.collapsed.sidebar-icon {
  margin-right: 0px;
}
.sidebar.collapsed .sidebar-link {
  justify-content: center; /* Center icons when collapsed */
}
.sidebar.collapsed .sidebar-logo {
  display: none;
}
.sidebar.collapsed .sidebar-link span {
  display: none; /* Hide text when collapsed */
}

.toggle-button {
  background: transparent; /* No background */
  border: none; /* No border */
  cursor: pointer; /* Pointer cursor on hover */
  font-size: 24px; /* Font size for the toggle icon */
  margin-bottom: 10px; /* Space below toggle button */
  display: block; /* Block element for easier clicking */
}
