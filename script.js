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

  // Handle profile button click
  const profileButton = document.querySelector(".btn-edit-profile[data-page]");

  if (profileButton) {
    profileButton.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove active class from all nav items and dropdown items
      navItems.forEach((navItem) => navItem.classList.remove("active"));
      dropdownItems.forEach((dropdownItem) =>
        dropdownItem.classList.remove("active")
      );

      const page = this.getAttribute("data-page");
      loadPageContent(page);
    });
  }

  // Handle conversation switching in messaging
  const conversationItems = document.querySelectorAll(
    ".conversation-item[data-conversation]"
  );

  conversationItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove active class from all conversation items
      conversationItems.forEach((conv) => conv.classList.remove("active"));

      // Add active class to clicked item
      this.classList.add("active");

      // Get conversation type
      const conversationType = this.getAttribute("data-conversation");

      // Update the main conversation area
      updateConversationView(conversationType);
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

// Function to update conversation view
function updateConversationView(conversationType) {
  const conversationInfo = document.querySelector(".conversation-info");
  const messageThread = document.querySelector(".message-thread");

  if (!conversationInfo || !messageThread) return;

  // Define conversation data
  const conversations = {
    admin: {
      name: "Platform Admin",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      status: "Online",
      statusClass: "online",
      messages: [
        {
          type: "received",
          text: "Hello Alex! Welcome to the platform. How can I assist you today?",
          time: "Today, 2:30 PM",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
        },
        {
          type: "sent",
          text: "Hi! I have a question about my placement status. Could you help me understand the next steps?",
          time: "Today, 2:32 PM",
        },
        {
          type: "received",
          text: "Of course! I'd be happy to help. Let me check your current placement status and get back to you with detailed information.",
          time: "Today, 2:35 PM",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
        },
      ],
    },
    team99: {
      name: "Team 99 Support",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      status: "Away",
      statusClass: "away",
      messages: [
        {
          type: "received",
          text: "Hello! Your placement documentation has been processed successfully.",
          time: "Today, 1:15 PM",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
        },
        {
          type: "sent",
          text: "Thank you! When can I expect the next update?",
          time: "Today, 1:20 PM",
        },
        {
          type: "received",
          text: "We'll send you an update within 24-48 hours with the next steps.",
          time: "Today, 1:25 PM",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
        },
      ],
    },
    hr: {
      name: "HR Department",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40&h=40&fit=crop&crop=face",
      status: "Offline",
      statusClass: "offline",
      messages: [
        {
          type: "received",
          text: "Welcome to the platform! Here's your onboarding guide and important information.",
          time: "3 days ago",
          avatar:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=32&h=32&fit=crop&crop=face",
        },
        {
          type: "sent",
          text: "Thank you for the welcome! I've reviewed the onboarding materials.",
          time: "3 days ago",
        },
        {
          type: "received",
          text: "Great! If you have any questions about policies or procedures, feel free to reach out.",
          time: "3 days ago",
          avatar:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=32&h=32&fit=crop&crop=face",
        },
      ],
    },
  };

  const conversation = conversations[conversationType];
  if (!conversation) return;

  // Update conversation header
  conversationInfo.innerHTML = `
    <img src="${conversation.avatar}" alt="${conversation.name}" class="avatar-img">
    <div>
      <h6>${conversation.name}</h6>
      <span class="status-text">
        <div class="status-indicator ${conversation.statusClass}"></div>
        ${conversation.status}
      </span>
    </div>
  `;

  // Update message thread
  let messagesHTML = "";
  conversation.messages.forEach((message) => {
    if (message.type === "received") {
      messagesHTML += `
        <div class="message-item received">
          <div class="message-avatar">
            <img src="${message.avatar}" alt="${conversation.name}">
          </div>
          <div class="message-content">
            <div class="message-bubble">
              <p>${message.text}</p>
            </div>
            <div class="message-time">${message.time}</div>
          </div>
        </div>
      `;
    } else {
      messagesHTML += `
        <div class="message-item sent">
          <div class="message-content">
            <div class="message-bubble">
              <p>${message.text}</p>
            </div>
            <div class="message-time">${message.time}</div>
          </div>
        </div>
      `;
    }
  });

  messageThread.innerHTML = messagesHTML;

  // Hide typing indicator
  const typingIndicator = document.getElementById("typing-indicator");
  if (typingIndicator) {
    typingIndicator.style.display = "none";
  }
}

// Function to submit issue report
function submitIssueReport() {
  const form = document.getElementById("reportIssueForm");

  // Get form values
  const issueData = {
    type: document.getElementById("issueType").value,
    priority: document.getElementById("priorityLevel").value,
    area: document.getElementById("affectedArea").value,
    title: document.getElementById("issueTitle").value,
    description: document.getElementById("issueDescription").value,
    steps: document.getElementById("stepsToReproduce").value,
    expected: document.getElementById("expectedBehavior").value,
    actual: document.getElementById("actualBehavior").value,
    browser: document.getElementById("browserInfo").value,
    contact: document.getElementById("contactPreference").value,
    timestamp: new Date().toISOString(),
  };

  // Validate required fields
  if (
    !issueData.type ||
    !issueData.priority ||
    !issueData.title ||
    !issueData.description
  ) {
    alert("Please fill in all required fields.");
    return;
  }

  // Generate ticket ID
  const ticketId = `HD-${new Date().getFullYear()}-${String(
    Math.floor(Math.random() * 1000)
  ).padStart(3, "0")}`;

  // Simulate API call
  console.log("Submitting issue report:", issueData);

  // Show success message
  alert(
    `Issue report submitted successfully!\n\nTicket ID: ${ticketId}\n\nYou will receive a confirmation email shortly and our support team will respond according to the priority level selected.`
  );

  // Close modal and reset form
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("reportIssueModal")
  );
  modal.hide();
  form.reset();
}

// Function to submit e-learning inquiry
function submitElearningInquiry() {
  const form = document.getElementById("elearningInquiryForm");

  // Get form values
  const inquiryData = {
    type: document.getElementById("inquiryType").value,
    format: document.getElementById("learningFormat").value,
    topic: document.getElementById("topicArea").value,
    title: document.getElementById("inquiryTitle").value,
    description: document.getElementById("inquiryDescription").value,
    knowledge: document.getElementById("knowledgeLevel").value,
    urgency: document.getElementById("urgencyLevel").value,
    questions: document.getElementById("specificQuestions").value,
    contact: document.getElementById("contactMethod").value,
    followup: document.getElementById("followupPreference").value,
    resources: document.getElementById("additionalResources").value,
    timestamp: new Date().toISOString(),
  };

  // Validate required fields
  if (!inquiryData.type || !inquiryData.title || !inquiryData.description) {
    alert("Please fill in all required fields.");
    return;
  }

  // Generate inquiry ID
  const inquiryId = `EL-${new Date().getFullYear()}-${String(
    Math.floor(Math.random() * 1000)
  ).padStart(3, "0")}`;

  // Simulate API call
  console.log("Submitting e-learning inquiry:", inquiryData);

  // Show success message
  alert(
    `E-learning inquiry submitted successfully!\n\nInquiry ID: ${inquiryId}\n\nOur learning support team will review your request and provide appropriate resources or schedule a learning session based on your preferences.`
  );

  // Close modal and reset form
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("elearningInquiryModal")
  );
  modal.hide();
  form.reset();
}

// Learning & FAQ Interactive Functions
document.addEventListener("DOMContentLoaded", function () {
  // Initialize FAQ functionality
  initializeFAQFeatures();
});

function initializeFAQFeatures() {
  // FAQ item click to expand/collapse
  document.querySelectorAll(".faq-item").forEach((item) => {
    item.addEventListener("click", function (e) {
      // Don't expand if clicking on action buttons
      if (e.target.closest(".faq-actions") || e.target.closest(".faq-media")) {
        return;
      }

      // Toggle expanded state
      const isExpanded = this.classList.contains("expanded");

      // Close all other expanded items
      document
        .querySelectorAll(".faq-item.expanded")
        .forEach((expandedItem) => {
          expandedItem.classList.remove("expanded");
        });

      // Toggle current item
      if (!isExpanded) {
        this.classList.add("expanded");
      }
    });
  });

  // FAQ filter tabs
  document.querySelectorAll(".faq-tab").forEach((tab) => {
    tab.addEventListener("click", function () {
      // Update active tab
      document
        .querySelectorAll(".faq-tab")
        .forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      // Filter FAQ items
      const filter = this.getAttribute("data-filter");
      filterFAQs(filter);
    });
  });

  // FAQ search functionality
  const searchInput = document.getElementById("faqSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      searchFAQs(searchTerm);
    });
  }

  // Initialize audio players
  initializeAudioPlayers();
}

function filterFAQs(filter) {
  const faqItems = document.querySelectorAll(".faq-item");
  let visibleCount = 0;

  faqItems.forEach((item) => {
    const itemType = item.getAttribute("data-type");
    const shouldShow = filter === "all" || itemType === filter;

    if (shouldShow) {
      item.style.display = "block";
      visibleCount++;
    } else {
      item.style.display = "none";
      item.classList.remove("expanded");
    }
  });

  // Show/hide no results message
  const noResults = document.getElementById("faqNoResults");
  if (noResults) {
    noResults.style.display = visibleCount === 0 ? "block" : "none";
  }
}

function searchFAQs(searchTerm) {
  const faqItems = document.querySelectorAll(".faq-item");
  let visibleCount = 0;

  faqItems.forEach((item) => {
    const title = item.querySelector("h6").textContent.toLowerCase();
    const description = item.querySelector("p").textContent.toLowerCase();
    const expandedContent = item.querySelector(".faq-expanded-content");
    const expandedText = expandedContent
      ? expandedContent.textContent.toLowerCase()
      : "";

    const matches =
      title.includes(searchTerm) ||
      description.includes(searchTerm) ||
      expandedText.includes(searchTerm);

    if (matches || searchTerm === "") {
      item.style.display = "block";
      visibleCount++;
    } else {
      item.style.display = "none";
      item.classList.remove("expanded");
    }
  });

  // Show/hide no results message
  const noResults = document.getElementById("faqNoResults");
  if (noResults) {
    noResults.style.display =
      visibleCount === 0 && searchTerm !== "" ? "block" : "none";
  }
}

function initializeAudioPlayers() {
  document.querySelectorAll(".audio-play-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleAudioPlayback(this);
    });
  });
}

function toggleAudioPlayback(button) {
  const isPlaying = button.classList.contains("playing");
  const waveform = button
    .closest(".faq-audio-player")
    .querySelector(".waveform-bars");

  // Stop all other audio players
  document.querySelectorAll(".audio-play-btn.playing").forEach((btn) => {
    btn.classList.remove("playing");
    const otherWaveform = btn
      .closest(".faq-audio-player")
      .querySelector(".waveform-bars");
    otherWaveform.classList.remove("playing");
    otherWaveform.classList.add("paused");
  });

  if (!isPlaying) {
    button.classList.add("playing");
    waveform.classList.add("playing");
    waveform.classList.remove("paused");

    // Simulate audio progress
    simulateAudioProgress(button);
  } else {
    button.classList.remove("playing");
    waveform.classList.remove("playing");
    waveform.classList.add("paused");
  }
}

function simulateAudioProgress(button) {
  const progressBar = button
    .closest(".faq-audio-player")
    .querySelector(".audio-progress-bar");
  const duration = button
    .closest(".faq-audio-player")
    .querySelector(".audio-duration");

  let progress = 0;
  const interval = setInterval(() => {
    if (!button.classList.contains("playing")) {
      clearInterval(interval);
      return;
    }

    progress += 1;
    progressBar.style.width = `${Math.min(progress, 100)}%`;

    // Update duration display
    const remaining = Math.max(0, 135 - Math.floor(progress * 1.35)); // 2:15 = 135 seconds
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    duration.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    if (progress >= 100) {
      clearInterval(interval);
      button.classList.remove("playing");
      const waveform = button
        .closest(".faq-audio-player")
        .querySelector(".waveform-bars");
      waveform.classList.remove("playing");
      waveform.classList.add("paused");

      // Reset progress after a delay
      setTimeout(() => {
        progressBar.style.width = "0%";
        duration.textContent = "2:15";
      }, 1000);
    }
  }, 100);
}

// FAQ Action Functions
function playVideo(button) {
  const faqItem = button.closest(".faq-item");
  const thumbnail = faqItem.querySelector(".faq-thumbnail");

  // Add playing state
  thumbnail.classList.add("playing");
  button.innerHTML = '<i class="fas fa-pause"></i> Pause Video';
  button.classList.add("active");

  // Simulate video playback
  setTimeout(() => {
    thumbnail.classList.remove("playing");
    button.innerHTML = '<i class="fas fa-play"></i> Play Video';
    button.classList.remove("active");
    alert("Video playback completed!");
  }, 5000);

  alert("Starting video playback...");
}

function playAudio(button) {
  const audioBtn = button.closest(".faq-item").querySelector(".audio-play-btn");
  toggleAudioPlayback(audioBtn);
}

function bookmarkFAQ(button) {
  const faqItem = button.closest(".faq-item");
  const title = faqItem.querySelector("h6").textContent;

  if (button.classList.contains("active")) {
    button.classList.remove("active");
    button.innerHTML = '<i class="fas fa-bookmark"></i> Bookmark';
    alert(`Removed "${title}" from bookmarks`);
  } else {
    button.classList.add("active");
    button.innerHTML = '<i class="fas fa-bookmark"></i> Bookmarked';
    alert(`Added "${title}" to bookmarks`);
  }
}

function shareFAQ(button) {
  const faqItem = button.closest(".faq-item");
  const title = faqItem.querySelector("h6").textContent;

  // Simulate sharing functionality
  if (navigator.share) {
    navigator.share({
      title: title,
      text: "Check out this helpful FAQ",
      url: window.location.href,
    });
  } else {
    // Fallback - copy to clipboard
    const url = `${window.location.href}#faq-${title
      .toLowerCase()
      .replace(/\s+/g, "-")}`;
    navigator.clipboard.writeText(url).then(() => {
      alert("FAQ link copied to clipboard!");
    });
  }
}

function downloadTranscript(button) {
  const faqItem = button.closest(".faq-item");
  const title = faqItem.querySelector("h6").textContent;

  // Simulate transcript download
  const transcript = `Transcript for: ${title}\n\nThis is a sample transcript of the video content...\n\n[Generated transcript content would appear here]`;

  const blob = new Blob([transcript], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${title.replace(/\s+/g, "_")}_transcript.txt`;
  a.click();
  URL.revokeObjectURL(url);

  alert("Transcript downloaded!");
}

function downloadAudio(button) {
  const faqItem = button.closest(".faq-item");
  const title = faqItem.querySelector("h6").textContent;

  alert(`Downloading audio file: "${title}"`);
  // Simulate download process
  setTimeout(() => {
    alert("Audio download completed!");
  }, 2000);
}

function getTranscript(button) {
  const faqItem = button.closest(".faq-item");
  const title = faqItem.querySelector("h6").textContent;

  // Show transcript in a modal or new window
  const transcript = `Audio Transcript: ${title}\n\n[Transcript content would be displayed here with timestamps and speaker identification]`;

  alert(`Transcript for "${title}":\n\n${transcript}`);
}

function readFullArticle(button) {
  const faqItem = button.closest(".faq-item");
  const title = faqItem.querySelector("h6").textContent;

  // Simulate opening full article
  alert(`Opening full article: "${title}"`);
  // In a real implementation, this would open a new page or modal with the complete article
}

function downloadPDF(button) {
  const faqItem = button.closest(".faq-item");
  const title = faqItem.querySelector("h6").textContent;

  alert(`Downloading PDF: "${title}"`);
  // Simulate PDF download
  setTimeout(() => {
    alert("PDF download completed!");
  }, 1500);
}

function printArticle(button) {
  const faqItem = button.closest(".faq-item");
  const title = faqItem.querySelector("h6").textContent;
  const content = faqItem.querySelector(".faq-expanded-content").innerHTML;

  // Create print window
  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <html>
      <head>
        <title>${title}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 2rem; }
          h1 { color: #1e40af; }
          ul { margin-left: 1rem; }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        ${content}
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
}

// Reach Out for Assistance Functions
document.addEventListener("DOMContentLoaded", function () {
  // Initialize reach out functionality
  initializeReachOutFeatures();
});

function initializeReachOutFeatures() {
  // Support type radio button change handler
  document.querySelectorAll('input[name="supportType"]').forEach((radio) => {
    radio.addEventListener("change", function () {
      handleSupportTypeChange(this.value);
    });
  });

  // Support option cards click handler
  document.querySelectorAll(".support-option-card").forEach((card) => {
    card.addEventListener("click", function () {
      const supportType = this.getAttribute("data-support-type");
      if (supportType) {
        // Pre-select the support type in the modal
        const radioButton = document.querySelector(
          `input[name="supportType"][value="${supportType}"]`
        );
        if (radioButton) {
          radioButton.checked = true;
          handleSupportTypeChange(supportType);
        }
      }
    });
  });

  // Auto-detect browser and system information
  autoFillSystemInfo();
}

function handleSupportTypeChange(supportType) {
  const stepsToReproduce = document.getElementById("stepsToReproduce");
  const browserInfo = document.getElementById("browserInfo");
  const systemInfo = document.getElementById("systemInfo");

  // Show/hide technical fields based on support type
  if (supportType === "technical") {
    stepsToReproduce.style.display = "block";
    browserInfo.style.display = "block";
    systemInfo.style.display = "block";
  } else {
    stepsToReproduce.style.display = "none";
    browserInfo.style.display = "none";
    systemInfo.style.display = "none";
  }

  // Update form placeholders based on support type
  updateFormPlaceholders(supportType);
}

function updateFormPlaceholders(supportType) {
  const issueTitle = document.getElementById("issueTitle");
  const issueDescription = document.getElementById("issueDescription");

  switch (supportType) {
    case "navigation":
      issueTitle.placeholder = "e.g., Need help finding the reports section";
      issueDescription.placeholder =
        "Describe what you're trying to find or do on the platform. Include any specific features or sections you're looking for.";
      break;
    case "technical":
      issueTitle.placeholder = "e.g., Login page not loading properly";
      issueDescription.placeholder =
        "Describe the technical issue you're experiencing. Include what you were doing when the problem occurred, any error messages, and what you expected to happen.";
      break;
    case "general":
      issueTitle.placeholder = "e.g., Question about account settings";
      issueDescription.placeholder =
        "Describe your question or request. Include any relevant context or background information that might help us assist you better.";
      break;
  }
}

function autoFillSystemInfo() {
  // Auto-detect browser information
  const browserDetails = document.getElementById("browserDetails");
  const systemDetails = document.getElementById("systemDetails");

  if (browserDetails) {
    const userAgent = navigator.userAgent;
    let browserInfo = "";

    if (userAgent.includes("Chrome")) {
      const chromeVersion = userAgent.match(/Chrome\/(\d+)/);
      browserInfo = `Chrome ${chromeVersion ? chromeVersion[1] : "Unknown"}`;
    } else if (userAgent.includes("Firefox")) {
      const firefoxVersion = userAgent.match(/Firefox\/(\d+)/);
      browserInfo = `Firefox ${firefoxVersion ? firefoxVersion[1] : "Unknown"}`;
    } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
      const safariVersion = userAgent.match(/Version\/(\d+)/);
      browserInfo = `Safari ${safariVersion ? safariVersion[1] : "Unknown"}`;
    } else if (userAgent.includes("Edge")) {
      const edgeVersion = userAgent.match(/Edge\/(\d+)/);
      browserInfo = `Edge ${edgeVersion ? edgeVersion[1] : "Unknown"}`;
    }

    browserDetails.value = browserInfo;
  }

  if (systemDetails) {
    const platform = navigator.platform;
    let osInfo = "";

    if (platform.includes("Win")) {
      osInfo = "Windows";
    } else if (platform.includes("Mac")) {
      osInfo = "macOS";
    } else if (platform.includes("Linux")) {
      osInfo = "Linux";
    } else {
      osInfo = platform;
    }

    systemDetails.value = osInfo;
  }
}

function submitReachOutRequest() {
  const form = document.getElementById("reachOutForm");

  // Get form values
  const requestData = {
    supportType: document.querySelector('input[name="supportType"]:checked')
      ?.value,
    name: document.getElementById("contactName").value,
    email: document.getElementById("contactEmail").value,
    urgency: document.getElementById("urgencyLevel").value,
    preferredContact: document.getElementById("preferredContact").value,
    title: document.getElementById("issueTitle").value,
    description: document.getElementById("issueDescription").value,
    reproductionSteps: document.getElementById("reproductionSteps").value,
    browserDetails: document.getElementById("browserDetails").value,
    systemDetails: document.getElementById("systemDetails").value,
    availability: document.getElementById("availability").value,
    previousAttempts: document.getElementById("previousAttempts").value,
    attachments: document.getElementById("attachments").files,
    timestamp: new Date().toISOString(),
  };

  // Validate required fields
  if (
    !requestData.supportType ||
    !requestData.name ||
    !requestData.email ||
    !requestData.urgency ||
    !requestData.preferredContact ||
    !requestData.title ||
    !requestData.description
  ) {
    alert("Please fill in all required fields.");
    return;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(requestData.email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Generate request ID
  const requestId = `T99-${new Date().getFullYear()}-${String(
    Math.floor(Math.random() * 10000)
  ).padStart(4, "0")}`;

  // Simulate API call
  console.log("Submitting reach out request:", requestData);

  // Show success message with next steps
  const urgencyResponse = getUrgencyResponseTime(requestData.urgency);
  const contactMethod = getContactMethodDescription(
    requestData.preferredContact
  );

  alert(
    `Request submitted successfully to Team 99!\n\n` +
      `Request ID: ${requestId}\n\n` +
      `What happens next:\n` +
      `• You'll receive a confirmation email within 5 minutes\n` +
      `• A Team 99 specialist will contact you via ${contactMethod} ${urgencyResponse}\n` +
      `• We'll work with you until your issue is completely resolved\n\n` +
      `Thank you for reaching out to Team 99!`
  );

  // Close modal and reset form
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("reachOutModal")
  );
  modal.hide();
  form.reset();

  // Reset dynamic fields
  document.getElementById("stepsToReproduce").style.display = "none";
  document.getElementById("browserInfo").style.display = "none";
  document.getElementById("systemInfo").style.display = "none";
}

function getUrgencyResponseTime(urgency) {
  switch (urgency) {
    case "urgent":
      return "within 30 minutes";
    case "high":
      return "within 1 hour";
    case "medium":
      return "within 2 hours";
    case "low":
      return "within 4 hours";
    default:
      return "within 2 hours";
  }
}

function getContactMethodDescription(method) {
  switch (method) {
    case "chat":
      return "live chat";
    case "video":
      return "video call";
    case "phone":
      return "phone call";
    case "email":
      return "email";
    default:
      return "your preferred method";
  }
}
