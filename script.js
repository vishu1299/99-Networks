// Navigation functionality
document.addEventListener("DOMContentLoaded", () => {
  // Handle dropdown toggles
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default link behavior
      e.stopPropagation(); // Prevent event bubbling to parent nav-item

      const dropdownType = this.getAttribute("data-dropdown");
      const dropdownContent = document.getElementById(
        dropdownType + "-dropdown"
      );
      const arrow = this.querySelector(".dropdown-arrow");

      // Close other dropdowns
      dropdownToggles.forEach((otherToggle) => {
        if (otherToggle !== this) {
          const otherDropdownType = otherToggle.getAttribute("data-dropdown");
          const otherDropdownContent = document.getElementById(
            otherDropdownType + "-dropdown"
          );
          const otherArrow = otherToggle.querySelector(".dropdown-arrow");

          if (otherDropdownContent) {
            otherDropdownContent.classList.remove("show");
          }
          if (otherArrow) {
            otherArrow.classList.remove("rotated");
          }
        }
      });

      // Toggle current dropdown
      if (dropdownContent) {
        const isShown = dropdownContent.classList.contains("show");
        dropdownContent.classList.toggle("show", !isShown);
        if (arrow) {
          arrow.classList.toggle("rotated", !isShown);
        }
      }
    });
  });

  // Handle navigation item clicks (non-dropdown)
  const navItems = document.querySelectorAll(
    ".nav-item[data-page]:not(.dropdown-toggle)"
  );

  navItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove active class from all nav items and dropdown items
      navItems.forEach((navItem) => navItem.classList.remove("active"));
      document.querySelectorAll(".dropdown-item").forEach((dropdownItem) => {
        dropdownItem.classList.remove("active");
      });

      // Add active class to clicked item
      this.classList.add("active");

      const page = this.getAttribute("data-page");
      loadPageContent(page);
    });
  });

  // Handle dropdown item clicks
  const dropdownItems = document.querySelectorAll(".dropdown-item[data-page]");

  dropdownItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation(); // Prevent event bubbling to parent dropdown

      // Remove active class from all nav items and dropdown items
      navItems.forEach((navItem) => navItem.classList.remove("active"));
      dropdownItems.forEach((dropdownItem) =>
        dropdownItem.classList.remove("active")
      );

      // Add active class to clicked item
      this.classList.add("active");

      const page = this.getAttribute("data-page");
      loadPageContent(page);
    });
  });

  // Initialize charts
  initializeCharts();

  // Set default active page
  loadPageContent("job-posting");
});

// Function to load page content
function loadPageContent(page) {
  // Hide all page contents
  const pageContents = document.querySelectorAll(".page-content");
  pageContents.forEach((content) => {
    content.classList.remove("active");
  });

  // Show selected page content
  const targetContent = document.getElementById(page + "-content");
  if (targetContent) {
    targetContent.classList.add("active");
  }

  console.log("Loaded page:", page);
}

// Create Job function
function createJob() {
  const form = document.getElementById("createJobForm");
  const formData = new FormData(form);

  // Basic validation
  const requiredFields = [
    "jobTitle",
    "jobCategory",
    "jobType",
    "jobLocation",
    "jobDescription",
    "contactEmail",
  ];
  let isValid = true;

  requiredFields.forEach((field) => {
    const input = document.getElementById(field);
    if (!input.value.trim()) {
      input.classList.add("is-invalid");
      isValid = false;
    } else {
      input.classList.remove("is-invalid");
    }
  });

  if (!isValid) {
    alert("Please fill in all required fields.");
    return;
  }

  // Simulate job creation
  console.log("Creating job with data:", Object.fromEntries(formData));

  // Close modal
  const modal = window.bootstrap.Modal.getInstance(
    document.getElementById("createJobModal")
  );
  modal.hide();

  // Reset form
  form.reset();

  // Show success message
  alert("Job posting created successfully!");
}

// Create Placement function
function createPlacement() {
  const form = document.getElementById("createPlacementForm");
  const formData = new FormData(form);

  // Basic validation
  const requiredFields = [
    "candidateName",
    "candidateEmail",
    "placementPosition",
    "companyName",
    "placementType",
    "startDate",
    "placementStatus",
  ];
  let isValid = true;

  requiredFields.forEach((field) => {
    const input = document.getElementById(field);
    if (!input.value.trim()) {
      input.classList.add("is-invalid");
      isValid = false;
    } else {
      input.classList.remove("is-invalid");
    }
  });

  if (!isValid) {
    alert("Please fill in all required fields.");
    return;
  }

  // Simulate placement creation
  console.log("Creating placement with data:", Object.fromEntries(formData));

  // Close modal
  const modal = window.bootstrap.Modal.getInstance(
    document.getElementById("createPlacementModal")
  );
  modal.hide();

  // Reset form
  form.reset();

  // Show success message
  alert("Placement added successfully!");
}

// Initialize Charts
function initializeCharts() {
  // Performance Chart
  const performanceCtx = document.getElementById("performanceChart");
  if (performanceCtx) {
    new Chart(performanceCtx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Jobs Posted",
            data: [4, 6, 3, 8, 5, 7],
            borderColor: "#0d6efd",
            backgroundColor: "rgba(13, 110, 253, 0.1)",
            tension: 0.4,
          },
          {
            label: "Successful Placements",
            data: [2, 4, 2, 5, 3, 4],
            borderColor: "#198754",
            backgroundColor: "rgba(25, 135, 84, 0.1)",
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  // Status Chart
  const statusCtx = document.getElementById("statusChart");
  if (statusCtx) {
    new Chart(statusCtx, {
      type: "doughnut",
      data: {
        labels: ["Active", "Pending", "Closed"],
        datasets: [
          {
            data: [12, 5, 7],
            backgroundColor: ["#198754", "#ffc107", "#dc3545"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    });
  }
}

// Export to Excel function
function exportToExcel() {
  console.log("Exporting data to Excel...");
  alert("Report exported successfully!");
}

// Handle window resize for responsive behavior
window.addEventListener("resize", () => {
  const navTexts = document.querySelectorAll(".nav-text");

  if (window.innerWidth <= 768) {
    navTexts.forEach((text) => {
      text.style.display = "none";
    });
  } else {
    navTexts.forEach((text) => {
      text.style.display = "inline";
    });
  }
});

// Initialize responsive behavior on load
window.dispatchEvent(new Event("resize"));

// Declare bootstrap variable
const bootstrap = window.bootstrap;
