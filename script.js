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

// Assistance Page Functions
document.addEventListener("DOMContentLoaded", function () {
  // Initialize Team 99 modal functionality
  initializeTeam99Modal();

  // Initialize assistance page enhancements
  initializeAssistanceEnhancements();
});

function initializeTeam99Modal() {
  // Handle contact method selection
  const contactMethodRadios = document.querySelectorAll(
    'input[name="contactMethod"]'
  );
  contactMethodRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      updateContactMethodFields(this.value);
    });
  });

  // Auto-fill device info
  autoFillDeviceInfo();
}

function updateContactMethodFields(method) {
  const phoneField = document.getElementById("phoneNumberField");
  const timeField = document.getElementById("preferredTimeField");
  const screenSharingField = document.getElementById("screenSharingField");

  // Hide all conditional fields first
  phoneField.style.display = "none";
  timeField.style.display = "none";
  screenSharingField.style.display = "none";

  // Show relevant fields based on selected method
  if (method === "callback") {
    phoneField.style.display = "block";
    timeField.style.display = "block";
    // Make phone number required
    document.getElementById("phoneNumber").required = true;
  } else if (method === "videocall") {
    timeField.style.display = "block";
    screenSharingField.style.display = "block";
    // Remove phone number requirement
    document.getElementById("phoneNumber").required = false;
  } else {
    // Live chat - no additional fields needed
    document.getElementById("phoneNumber").required = false;
  }
}

function autoFillDeviceInfo() {
  const deviceInfoField = document.getElementById("deviceInfo");
  if (deviceInfoField && !deviceInfoField.value) {
    // Auto-detect browser and OS
    const userAgent = navigator.userAgent;
    let browser = "Unknown";
    let os = "Unknown";

    // Detect browser
    if (userAgent.includes("Chrome")) browser = "Chrome";
    else if (userAgent.includes("Firefox")) browser = "Firefox";
    else if (userAgent.includes("Safari")) browser = "Safari";
    else if (userAgent.includes("Edge")) browser = "Edge";

    // Detect OS
    if (userAgent.includes("Windows")) os = "Windows";
    else if (userAgent.includes("Mac")) os = "macOS";
    else if (userAgent.includes("Linux")) os = "Linux";
    else if (userAgent.includes("Android")) os = "Android";
    else if (userAgent.includes("iOS")) os = "iOS";

    deviceInfoField.value = `${browser} on ${os}`;
  }
}

function connectToTeam99() {
  const form = document.getElementById("team99ContactForm");

  // Get form values
  const contactData = {
    contactMethod: document.querySelector('input[name="contactMethod"]:checked')
      .value,
    issueCategory: document.getElementById("issueCategory").value,
    urgencyLevel: document.getElementById("urgencyLevel").value,
    issueDescription: document.getElementById("issueDescription").value,
    currentLocation: document.getElementById("currentLocation").value,
    deviceInfo: document.getElementById("deviceInfo").value,
    phoneNumber: document.getElementById("phoneNumber").value,
    preferredTime: document.getElementById("preferredTime").value,
    allowScreenSharing: document.getElementById("allowScreenSharing").checked,
    timestamp: new Date().toISOString(),
  };

  // Validate required fields
  if (!contactData.issueCategory || !contactData.issueDescription) {
    alert("Please fill in all required fields.");
    return;
  }

  // Additional validation for phone callback
  if (contactData.contactMethod === "callback" && !contactData.phoneNumber) {
    alert("Phone number is required for callback requests.");
    return;
  }

  // Generate support ticket ID
  const ticketId = `T99-${new Date().getFullYear()}-${String(
    Math.floor(Math.random() * 10000)
  ).padStart(4, "0")}`;

  // Simulate connection process
  console.log("Connecting to Team 99:", contactData);

  // Show appropriate success message based on contact method
  let successMessage = "";
  switch (contactData.contactMethod) {
    case "livechat":
      successMessage = `Connecting you to Team 99 live chat...\n\nTicket ID: ${ticketId}\n\nA Team 99 specialist will join the chat within 2 minutes.`;
      // Simulate opening chat window
      setTimeout(() => {
        alert("Team 99 Chat Window would open here in a real implementation.");
      }, 2000);
      break;

    case "videocall":
      successMessage = `Video call scheduled with Team 99!\n\nTicket ID: ${ticketId}\n\nYou will receive a calendar invite and video call link shortly. Our specialist will be ready at your preferred time.`;
      break;

    case "callback":
      successMessage = `Phone callback requested!\n\nTicket ID: ${ticketId}\n\nTeam 99 will call you at ${contactData.phoneNumber} within 15 minutes. Please keep your phone available.`;
      break;
  }

  alert(successMessage);

  // Close modal and reset form
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("team99Modal")
  );
  modal.hide();
  form.reset();

  // Reset conditional fields
  updateContactMethodFields("livechat");
}

// Quick Help Functions
function showNavigationHelp(type) {
  const helpContent = {
    login: {
      title: "Login Issues Help",
      content: `Common login solutions:

1. Check your email and password
2. Try resetting your password
3. Clear browser cache and cookies
4. Disable browser extensions
5. Try incognito/private mode

If you're still having trouble, Team 99 can help you immediately!`,
    },
    navigation: {
      title: "Platform Navigation Help",
      content: `Navigation tips:

1. Use the main menu on the left sidebar
2. Search function is in the top navigation
3. Breadcrumbs show your current location
4. Dashboard provides quick access to key features
5. Profile menu is in the top right corner

Need a guided tour? Team 99 can walk you through it!`,
    },
    features: {
      title: "Feature Access Help",
      content: `Finding features:

1. Check the main navigation menu
2. Use the search function to find specific features
3. Some features may require specific permissions
4. Check your user role and access level
5. Look for feature announcements in notifications

Can't find what you need? Team 99 knows where everything is!`,
    },
    performance: {
      title: "Performance Issues Help",
      content: `Performance troubleshooting:

1. Check your internet connection
2. Close unnecessary browser tabs
3. Clear browser cache
4. Disable browser extensions temporarily
5. Try a different browser
6. Restart your device

Still experiencing slowness? Team 99 can diagnose the issue!`,
    },
    mobile: {
      title: "Mobile Access Help",
      content: `Mobile platform tips:

1. Use the latest version of your mobile browser
2. Try the mobile app if available
3. Check your mobile data/WiFi connection
4. Clear mobile browser cache
5. Restart your mobile device

Mobile issues can be tricky - Team 99 specializes in mobile support!`,
    },
  };

  const help = helpContent[type];
  if (help) {
    const shouldContact = confirm(
      `${help.title}\n\n${help.content}\n\nWould you like to connect with Team 99 for personalized help?`
    );
    if (shouldContact) {
      // Open Team 99 modal with pre-filled category
      const modal = new bootstrap.Modal(document.getElementById("team99Modal"));
      modal.show();

      // Pre-fill the issue category
      setTimeout(() => {
        const categorySelect = document.getElementById("issueCategory");
        if (categorySelect) {
          switch (type) {
            case "login":
              categorySelect.value = "login";
              break;
            case "navigation":
              categorySelect.value = "navigation";
              break;
            case "features":
              categorySelect.value = "features";
              break;
            case "performance":
              categorySelect.value = "performance";
              break;
            case "mobile":
              categorySelect.value = "mobile";
              break;
          }
        }
      }, 500);
    }
  }
}

// Other Support Functions
function scheduleCall() {
  alert(
    'Opening calendar scheduling system...\n\nYou can also use the "Reach out to Team 99" button and select "Video Call" for immediate scheduling.'
  );
}

function sendEmail() {
  const email = "team99@platform.com";
  const subject = "Platform Support Request";
  const body =
    "Hi Team 99,\n\nI need help with:\n\n[Please describe your issue here]\n\nThanks!";

  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoLink;
}

function callPhone() {
  const phoneNumber = "+1 (555) 099-9999";
  alert(
    `Calling Team 99 at ${phoneNumber}...\n\nNote: For faster service, you can also use the "Reach out to Team 99" button for live chat or video support.`
  );
}

function emergencyContact() {
  const shouldProceed = confirm(
    'Emergency Support Contact\n\nThis is for critical platform issues that are completely blocking your work.\n\nFor general help, please use the regular "Reach out to Team 99" option.\n\nProceed with emergency contact?'
  );

  if (shouldProceed) {
    alert(
      "Connecting to emergency support...\n\nTeam 99 emergency specialist will contact you within 5 minutes.\n\nEmergency Ticket: EMG-" +
        Date.now()
    );
  }
}

// Enhanced Assistance Page Functionality
function initializeAssistanceEnhancements() {
  // Add loading states to support cards
  addLoadingStates();

  // Initialize real-time status updates
  initializeStatusUpdates();

  // Add keyboard shortcuts
  initializeKeyboardShortcuts();

  // Initialize tooltips and help hints
  initializeTooltips();

  // Add analytics tracking
  initializeAnalytics();
}

function addLoadingStates() {
  // Add loading states to support option cards
  document.querySelectorAll(".support-option-card").forEach((card) => {
    card.addEventListener("click", function () {
      if (!this.classList.contains("loading")) {
        this.classList.add("loading");

        // Add loading indicator
        const loadingDiv = document.createElement("div");
        loadingDiv.className = "loading-state active";
        loadingDiv.innerHTML = `
          <div class="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p>Connecting to Team 99...</p>
        `;

        this.appendChild(loadingDiv);

        // Remove loading state after delay
        setTimeout(() => {
          this.classList.remove("loading");
          this.removeChild(loadingDiv);
        }, 2000);
      }
    });
  });
}

function initializeStatusUpdates() {
  // Simulate real-time status updates
  const statusIndicators = document.querySelectorAll(".status-indicator");

  setInterval(() => {
    statusIndicators.forEach((indicator) => {
      // Randomly update status (simulation)
      if (Math.random() > 0.95) {
        const currentStatus = indicator.classList.contains("online")
          ? "online"
          : "available";
        const newStatus = currentStatus === "online" ? "available" : "online";

        indicator.classList.remove("online", "available");
        indicator.classList.add(newStatus);

        // Update status text
        const statusText =
          indicator.parentElement.querySelector(".status-text");
        if (statusText) {
          statusText.textContent =
            newStatus === "online" ? "Team 99 Online" : "Available Soon";
        }
      }
    });
  }, 30000); // Update every 30 seconds
}

function initializeKeyboardShortcuts() {
  document.addEventListener("keydown", function (e) {
    // Ctrl/Cmd + H to open Team 99 modal
    if ((e.ctrlKey || e.metaKey) && e.key === "h") {
      e.preventDefault();
      const modal = new bootstrap.Modal(document.getElementById("team99Modal"));
      modal.show();
    }

    // Escape to close any open modals
    if (e.key === "Escape") {
      const openModals = document.querySelectorAll(".modal.show");
      openModals.forEach((modal) => {
        const modalInstance = bootstrap.Modal.getInstance(modal);
        if (modalInstance) {
          modalInstance.hide();
        }
      });
    }
  });
}

function initializeTooltips() {
  // Add tooltips to various elements
  const tooltipElements = [
    {
      selector: ".assistance-stat-card",
      title: "Click for detailed statistics",
    },
    {
      selector: ".support-option-card",
      title: "Click to start this support method",
    },
    {
      selector: ".quick-help-item",
      title: "Click for instant help with this issue",
    },
    {
      selector: ".status-indicator",
      title: "Real-time Team 99 availability status",
    },
  ];

  tooltipElements.forEach(({ selector, title }) => {
    document.querySelectorAll(selector).forEach((element) => {
      element.setAttribute("title", title);
      element.setAttribute("data-bs-toggle", "tooltip");
    });
  });

  // Initialize Bootstrap tooltips
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
}

function initializeAnalytics() {
  // Track user interactions for analytics
  const trackableElements = [
    { selector: ".support-option-card", event: "support_option_clicked" },
    { selector: ".quick-help-item", event: "quick_help_accessed" },
    {
      selector: '[data-bs-target="#team99Modal"]',
      event: "team99_modal_opened",
    },
  ];

  trackableElements.forEach(({ selector, event }) => {
    document.querySelectorAll(selector).forEach((element) => {
      element.addEventListener("click", function () {
        // Simulate analytics tracking
        console.log(`Analytics: ${event}`, {
          element: this.textContent.trim().substring(0, 50),
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
        });
      });
    });
  });
}

// Enhanced Team 99 Connection with Progress Tracking
function connectToTeam99Enhanced() {
  const form = document.getElementById("team99ContactForm");
  const submitButton = document.querySelector('[onclick="connectToTeam99()"]');

  // Show loading state
  submitButton.innerHTML =
    '<i class="fas fa-spinner fa-spin me-2"></i>Connecting...';
  submitButton.disabled = true;

  // Get form values
  const contactData = {
    contactMethod: document.querySelector('input[name="contactMethod"]:checked')
      .value,
    issueCategory: document.getElementById("issueCategory").value,
    urgencyLevel: document.getElementById("urgencyLevel").value,
    issueDescription: document.getElementById("issueDescription").value,
    currentLocation: document.getElementById("currentLocation").value,
    deviceInfo: document.getElementById("deviceInfo").value,
    phoneNumber: document.getElementById("phoneNumber").value,
    preferredTime: document.getElementById("preferredTime").value,
    allowScreenSharing: document.getElementById("allowScreenSharing").checked,
    timestamp: new Date().toISOString(),
  };

  // Validate required fields
  if (!contactData.issueCategory || !contactData.issueDescription) {
    submitButton.innerHTML =
      '<i class="fas fa-headset me-2"></i>Connect to Team 99';
    submitButton.disabled = false;
    alert("Please fill in all required fields.");
    return;
  }

  // Additional validation for phone callback
  if (contactData.contactMethod === "callback" && !contactData.phoneNumber) {
    submitButton.innerHTML =
      '<i class="fas fa-headset me-2"></i>Connect to Team 99';
    submitButton.disabled = false;
    alert("Phone number is required for callback requests.");
    return;
  }

  // Simulate connection process with progress
  let progress = 0;
  const progressInterval = setInterval(() => {
    progress += 20;
    submitButton.innerHTML = `<i class="fas fa-spinner fa-spin me-2"></i>Connecting... ${progress}%`;

    if (progress >= 100) {
      clearInterval(progressInterval);

      // Generate support ticket ID
      const ticketId = `T99-${new Date().getFullYear()}-${String(
        Math.floor(Math.random() * 10000)
      ).padStart(4, "0")}`;

      // Show appropriate success message based on contact method
      let successMessage = "";
      switch (contactData.contactMethod) {
        case "livechat":
          successMessage = `✅ Connected to Team 99 live chat!\n\nTicket ID: ${ticketId}\n\nA Team 99 specialist will join the chat within 2 minutes.`;
          // Simulate opening chat window
          setTimeout(() => {
            showChatSimulation();
          }, 2000);
          break;

        case "videocall":
          successMessage = `📹 Video call scheduled with Team 99!\n\nTicket ID: ${ticketId}\n\nYou will receive a calendar invite and video call link shortly.`;
          break;

        case "callback":
          successMessage = `📞 Phone callback requested!\n\nTicket ID: ${ticketId}\n\nTeam 99 will call you at ${contactData.phoneNumber} within 15 minutes.`;
          break;
      }

      alert(successMessage);

      // Reset button
      submitButton.innerHTML =
        '<i class="fas fa-headset me-2"></i>Connect to Team 99';
      submitButton.disabled = false;

      // Close modal and reset form
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("team99Modal")
      );
      modal.hide();
      form.reset();

      // Reset conditional fields
      updateContactMethodFields("livechat");

      // Track successful connection
      console.log("Analytics: team99_connection_successful", contactData);
    }
  }, 500);
}

function showChatSimulation() {
  const chatWindow = window.open(
    "",
    "team99chat",
    "width=400,height=600,scrollbars=yes,resizable=yes"
  );
  chatWindow.document.write(`
    <html>
      <head>
        <title>Team 99 Live Chat</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
          .chat-header { background: #3b82f6; color: white; padding: 15px; margin: -20px -20px 20px -20px; }
          .chat-message { background: white; padding: 10px; margin: 10px 0; border-radius: 8px; }
          .agent { background: #e3f2fd; }
          .typing { color: #666; font-style: italic; }
        </style>
      </head>
      <body>
        <div class="chat-header">
          <h3>🎧 Team 99 Live Chat</h3>
          <p>Connected to specialist</p>
        </div>
        <div class="chat-message agent">
          <strong>Team 99 Agent:</strong> Hello! I'm here to help you with your platform navigation issue. How can I assist you today?
        </div>
        <div class="chat-message typing">
          Agent is typing...
        </div>
        <p><em>This is a simulation. In a real implementation, this would be a fully functional chat interface.</em></p>
      </body>
    </html>
  `);
}

// Change Request Functions
document.addEventListener("DOMContentLoaded", function () {
  // Initialize change request functionality
  initializeChangeRequestModal();
});

function initializeChangeRequestModal() {
  // Handle request type selection
  const requestTypeRadios = document.querySelectorAll(
    'input[name="requestType"]'
  );
  requestTypeRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      updateSpecificFields(this.value);
    });
  });

  // Initialize filter buttons
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Update active filter
      filterButtons.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      // Filter requests
      const filter = this.getAttribute("data-filter");
      filterRequests(filter);
    });
  });
}

function updateSpecificFields(requestType) {
  // Hide all specific field sections
  const allSections = document.querySelectorAll(".specific-fields-section");
  allSections.forEach((section) => {
    section.style.display = "none";
  });

  // Show the relevant section
  const targetSection = document.getElementById(`${requestType}-fields`);
  if (targetSection) {
    targetSection.style.display = "block";
  }
}

function openChangeRequest(type) {
  // Open the modal
  const modal = new bootstrap.Modal(
    document.getElementById("changeRequestModal")
  );
  modal.show();

  // Pre-select the request type
  setTimeout(() => {
    const radio = document.getElementById(`${type}-radio`);
    if (radio) {
      radio.checked = true;
      updateSpecificFields(type);
    }
  }, 500);
}

function submitChangeRequest() {
  const form = document.getElementById("changeRequestForm");

  // Get form values
  const requestData = {
    requestType: document.querySelector('input[name="requestType"]:checked')
      .value,
    requestTitle: document.getElementById("requestTitle").value,
    priorityLevel: document.getElementById("priorityLevel").value,
    requestDescription: document.getElementById("requestDescription").value,
    justification: document.getElementById("justification").value,
    contactMethod: document.getElementById("contactMethod").value,
    followUpTime: document.getElementById("followUpTime").value,
    timestamp: new Date().toISOString(),
  };

  // Add specific fields based on request type
  switch (requestData.requestType) {
    case "locked-forms":
      requestData.formName = document.getElementById("formName").value;
      requestData.lockReason = document.getElementById("lockReason").value;
      requestData.fieldsToChange =
        document.getElementById("fieldsToChange").value;
      break;
    case "preferences":
      requestData.preferenceCategory =
        document.getElementById("preferenceCategory").value;
      requestData.currentSetting =
        document.getElementById("currentSetting").value;
      requestData.desiredSetting =
        document.getElementById("desiredSetting").value;
      break;
    case "financials":
      requestData.financialCategory =
        document.getElementById("financialCategory").value;
      requestData.verificationRequired = document.getElementById(
        "verificationRequired"
      ).value;
      break;
    case "job-details":
      requestData.jobCategory = document.getElementById("jobCategory").value;
      requestData.jobId = document.getElementById("jobId").value;
      requestData.managerApproval = document.getElementById(
        "managerApprovalCheck"
      ).checked;
      break;
  }

  // Validate required fields
  if (
    !requestData.requestTitle ||
    !requestData.requestDescription ||
    !requestData.justification
  ) {
    alert("Please fill in all required fields.");
    return;
  }

  // Additional validation for job details
  if (
    requestData.requestType === "job-details" &&
    !requestData.managerApproval
  ) {
    const proceed = confirm(
      "Manager approval is recommended for job detail changes. Do you want to proceed without approval?"
    );
    if (!proceed) {
      return;
    }
  }

  // Generate request ID
  const requestId = `CR-${new Date().getFullYear()}-${String(
    Math.floor(Math.random() * 1000)
  ).padStart(3, "0")}`;

  // Simulate API call
  console.log("Submitting change request:", requestData);

  // Show success message with appropriate processing time
  let processingTime = "";
  switch (requestData.requestType) {
    case "locked-forms":
      processingTime =
        requestData.priorityLevel === "urgent"
          ? "4 hours"
          : "1-2 business days";
      break;
    case "preferences":
      processingTime = "same day";
      break;
    case "financials":
      processingTime = "2-3 business days";
      break;
    case "job-details":
      processingTime = "1-3 business days";
      break;
  }

  alert(
    `Change request submitted successfully!\n\nRequest ID: ${requestId}\nRequest Type: ${requestData.requestType
      .replace("-", " ")
      .replace(/\b\w/g, (l) =>
        l.toUpperCase()
      )}\nExpected Processing Time: ${processingTime}\n\nYou will receive email updates about your request status.`
  );

  // Close modal and reset form
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("changeRequestModal")
  );
  modal.hide();
  form.reset();

  // Reset to default request type
  document.getElementById("locked-forms-radio").checked = true;
  updateSpecificFields("locked-forms");
}

function filterRequests(filter) {
  const requestItems = document.querySelectorAll(".request-item");

  requestItems.forEach((item) => {
    const status = item.getAttribute("data-status");
    const shouldShow = filter === "all" || status === filter;

    if (shouldShow) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function viewRequest(requestId) {
  alert(
    `Viewing details for request: ${requestId}\n\nThis would open a detailed view of the change request with full information, status history, and any attached documents.`
  );
}

function editRequest(requestId) {
  const canEdit = confirm(
    `Edit request: ${requestId}\n\nNote: Only pending requests can be edited. Approved or rejected requests cannot be modified.\n\nProceed with editing?`
  );

  if (canEdit) {
    // Open the change request modal with pre-filled data
    const modal = new bootstrap.Modal(
      document.getElementById("changeRequestModal")
    );
    modal.show();

    // Simulate pre-filling form with existing data
    setTimeout(() => {
      alert("Form would be pre-filled with existing request data for editing.");
    }, 1000);
  }
}

function viewAllRequests() {
  alert(
    "Opening comprehensive view of all your change requests...\n\nThis would display a full list with advanced filtering, sorting, and search capabilities."
  );
}

function checkRequestStatus() {
  const requestId = prompt("Enter your request ID to check status:");

  if (requestId) {
    // Simulate status check
    const statuses = [
      "Pending Review",
      "Under Review",
      "Approved",
      "In Progress",
      "Completed",
    ];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    alert(
      `Request Status: ${requestId}\n\nCurrent Status: ${randomStatus}\nLast Updated: ${new Date().toLocaleDateString()}\n\nYou will receive email notifications when the status changes.`
    );
  }
}

function downloadTemplate() {
  alert(
    "Downloading change request template...\n\nThis would provide a downloadable template with guidelines for submitting detailed change requests."
  );
}

// Approval Process Functions
document.addEventListener("DOMContentLoaded", function () {
  // Initialize approval process functionality
  initializeApprovalProcess();
  // Initialize post-approval lock functionality
  initializePostApprovalLock();
});

function initializeApprovalProcess() {
  // Initialize filter functionality
  const filterButton = document.querySelector(".btn-outline-secondary");
  if (filterButton && filterButton.textContent.includes("Filter Requests")) {
    filterButton.addEventListener("click", showFilterModal);
  }

  // Initialize bulk approve functionality
  const bulkApproveButton = document.querySelector(".btn-success");
  if (
    bulkApproveButton &&
    bulkApproveButton.textContent.includes("Bulk Approve")
  ) {
    bulkApproveButton.addEventListener("click", showBulkApproveModal);
  }

  // Initialize individual request action buttons
  initializeRequestActions();

  // Initialize priority filtering
  initializePriorityFiltering();

  // Auto-refresh approval statistics
  setInterval(updateApprovalStatistics, 30000); // Update every 30 seconds
}

function initializeRequestActions() {
  // Review Details buttons
  document.querySelectorAll(".btn-outline-primary").forEach((btn) => {
    if (btn.textContent.includes("Review Details")) {
      btn.addEventListener("click", function () {
        const requestItem = this.closest(".approval-request-item");
        const requestTitle =
          requestItem.querySelector(".request-title").textContent;
        const requestUser = requestItem
          .querySelector(".request-user")
          .textContent.replace("👤 ", "");
        reviewRequestDetails(requestTitle, requestUser, requestItem);
      });
    }
  });

  // Approve buttons
  document.querySelectorAll(".btn-success").forEach((btn) => {
    if (
      btn.textContent.includes("Approve") &&
      !btn.textContent.includes("Bulk")
    ) {
      btn.addEventListener("click", function () {
        const requestItem = this.closest(".approval-request-item");
        const requestTitle =
          requestItem.querySelector(".request-title").textContent;
        const requestUser = requestItem
          .querySelector(".request-user")
          .textContent.replace("👤 ", "");
        approveRequest(requestTitle, requestUser, requestItem);
      });
    }
  });

  // Reject buttons
  document.querySelectorAll(".btn-danger").forEach((btn) => {
    if (btn.textContent.includes("Reject")) {
      btn.addEventListener("click", function () {
        const requestItem = this.closest(".approval-request-item");
        const requestTitle =
          requestItem.querySelector(".request-title").textContent;
        const requestUser = requestItem
          .querySelector(".request-user")
          .textContent.replace("👤 ", "");
        rejectRequest(requestTitle, requestUser, requestItem);
      });
    }
  });

  // Request Info buttons
  document.querySelectorAll(".btn-warning").forEach((btn) => {
    if (btn.textContent.includes("Request Info")) {
      btn.addEventListener("click", function () {
        const requestItem = this.closest(".approval-request-item");
        const requestTitle =
          requestItem.querySelector(".request-title").textContent;
        const requestUser = requestItem
          .querySelector(".request-user")
          .textContent.replace("👤 ", "");
        requestMoreInfo(requestTitle, requestUser, requestItem);
      });
    }
  });
}

function reviewRequestDetails(title, user, requestElement) {
  const priority = requestElement.classList.contains("priority-high")
    ? "High"
    : requestElement.classList.contains("priority-medium")
    ? "Medium"
    : "Low";
  const requestType = requestElement
    .querySelector(".request-type")
    .textContent.replace("🏷️ ", "");
  const timeAgo = requestElement
    .querySelector(".request-time")
    .textContent.replace("🕐 ", "");

  const changes = [];
  requestElement.querySelectorAll(".request-details ul li").forEach((li) => {
    changes.push(li.textContent);
  });

  const reason = requestElement
    .querySelector(".request-reason")
    .textContent.replace("Reason: ", "");

  // Create detailed modal
  const modalHTML = `
    <div class="modal fade" id="reviewDetailsModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">📋 Request Review Details</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="row g-4">
              <div class="col-md-6">
                <h6>👤 Requester Information</h6>
                <p><strong>Name:</strong> ${user}</p>
                <p><strong>Request Type:</strong> ${requestType}</p>
                <p><strong>Submitted:</strong> ${timeAgo}</p>
                <p><strong>Priority:</strong> <span class="priority-badge priority-${priority.toLowerCase()}">${priority} Priority</span></p>
              </div>
              <div class="col-md-6">
                <h6>📊 Request Status</h6>
                <p><strong>Status:</strong> <span class="badge bg-warning">Pending Review</span></p>
                <p><strong>Assigned Reviewer:</strong> Current User</p>
                <p><strong>SLA Deadline:</strong> ${getSLADeadline(
                  priority
                )}</p>
              </div>
            </div>
            <hr>
            <h6>📝 Requested Changes</h6>
            <ul class="list-group list-group-flush">
              ${changes
                .map((change) => `<li class="list-group-item">✓ ${change}</li>`)
                .join("")}
            </ul>
            <hr>
            <h6>💭 Justification</h6>
            <p class="bg-light p-3 rounded">${reason}</p>
            <hr>
            <h6>📎 Supporting Documents</h6>
            <div class="d-flex gap-2">
              <button class="btn btn-outline-primary btn-sm">📄 View Document 1</button>
              <button class="btn btn-outline-primary btn-sm">📄 View Document 2</button>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-warning" onclick="requestMoreInfoFromModal('${title}', '${user}')">Request More Info</button>
            <button type="button" class="btn btn-danger" onclick="rejectRequestFromModal('${title}', '${user}')">Reject</button>
            <button type="button" class="btn btn-success" onclick="approveRequestFromModal('${title}', '${user}')">Approve</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Remove existing modal if any
  const existingModal = document.getElementById("reviewDetailsModal");
  if (existingModal) {
    existingModal.remove();
  }

  // Add modal to body
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // Show modal
  const modal = new bootstrap.Modal(
    document.getElementById("reviewDetailsModal")
  );
  modal.show();
}

function getSLADeadline(priority) {
  const now = new Date();
  let hours;

  switch (priority) {
    case "High":
      hours = 4;
      break;
    case "Medium":
      hours = 24;
      break;
    case "Low":
      hours = 72;
      break;
    default:
      hours = 24;
  }

  const deadline = new Date(now.getTime() + hours * 60 * 60 * 1000);
  return (
    deadline.toLocaleDateString() +
    " " +
    deadline.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
}

function approveRequest(title, user, requestElement) {
  const confirmApproval = confirm(
    `Approve request: "${title}" from ${user}?\n\nThis will:\n✓ Grant the requested changes\n✓ Send approval notification to user\n✓ Update system records\n✓ Move to approved requests list\n\nProceed with approval?`
  );

  if (confirmApproval) {
    // Generate approval ID
    const approvalId = `APR-${new Date().getFullYear()}-${String(
      Math.floor(Math.random() * 1000)
    ).padStart(3, "0")}`;

    // Animate request removal
    requestElement.style.transition = "all 0.5s ease";
    requestElement.style.opacity = "0";
    requestElement.style.transform = "translateX(100%)";

    setTimeout(() => {
      requestElement.remove();
      updateApprovalStatistics();
      showNotification(
        `Request approved successfully! Approval ID: ${approvalId}`,
        "success"
      );
    }, 500);
  }
}

function rejectRequest(title, user, requestElement) {
  const reason = prompt(
    `Reject request: "${title}" from ${user}\n\nPlease provide a reason for rejection:`
  );

  if (reason && reason.trim()) {
    // Generate rejection ID
    const rejectionId = `REJ-${new Date().getFullYear()}-${String(
      Math.floor(Math.random() * 1000)
    ).padStart(3, "0")}`;

    // Animate request removal
    requestElement.style.transition = "all 0.5s ease";
    requestElement.style.opacity = "0";
    requestElement.style.transform = "translateX(-100%)";

    setTimeout(() => {
      requestElement.remove();
      updateApprovalStatistics();
      showNotification(
        `Request rejected. Rejection ID: ${rejectionId}`,
        "warning"
      );
    }, 500);
  }
}

function requestMoreInfo(title, user, requestElement) {
  const infoRequest = prompt(
    `Request additional information for: "${title}" from ${user}\n\nWhat additional information do you need?`
  );

  if (infoRequest && infoRequest.trim()) {
    // Generate info request ID
    const infoId = `INFO-${new Date().getFullYear()}-${String(
      Math.floor(Math.random() * 1000)
    ).padStart(3, "0")}`;

    // Update request status
    const requestHeader = requestElement.querySelector(".request-header");
    const statusBadge = document.createElement("span");
    statusBadge.className = "badge bg-info ms-2";
    statusBadge.textContent = "Info Requested";
    requestHeader.appendChild(statusBadge);

    showNotification(`Information request sent. Request ID: ${infoId}`, "info");
  }
}

function showFilterModal() {
  const filterModalHTML = `
    <div class="modal fade" id="filterModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">🔍 Filter Approval Requests</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Priority Level</label>
              <select class="form-select" id="priorityFilter">
                <option value="">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Request Type</label>
              <select class="form-select" id="typeFilter">
                <option value="">All Types</option>
                <option value="personal">Personal Details</option>
                <option value="financial">Financial</option>
                <option value="professional">Professional Profile</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Time Range</label>
              <select class="form-select" id="timeFilter">
                <option value="">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Requester</label>
              <input type="text" class="form-control" id="userFilter" placeholder="Search by user name...">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-outline-primary" onclick="clearFilters()">Clear Filters</button>
            <button type="button" class="btn btn-primary" onclick="applyFilters()">Apply Filters</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Remove existing modal if any
  const existingModal = document.getElementById("filterModal");
  if (existingModal) {
    existingModal.remove();
  }

  // Add modal to body
  document.body.insertAdjacentHTML("beforeend", filterModalHTML);

  // Show modal
  const modal = new bootstrap.Modal(document.getElementById("filterModal"));
  modal.show();
}

function showBulkApproveModal() {
  const bulkModalHTML = `
    <div class="modal fade" id="bulkApproveModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">✅ Bulk Approve Requests</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="alert alert-warning">
              <strong>⚠️ Warning:</strong> This will approve multiple requests at once. Please review carefully.
            </div>
            <div class="mb-3">
              <label class="form-label">Select Requests to Approve</label>
              <div id="bulkRequestsList">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="profile-update" id="bulk1">
                  <label class="form-check-label" for="bulk1">
                    Profile Information Update - Sarah Johnson (High Priority)
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="rate-adjustment" id="bulk2">
                  <label class="form-check-label" for="bulk2">
                    Contract Rate Adjustment - Michael Chen (Medium Priority)
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="skill-update" id="bulk3">
                  <label class="form-check-label" for="bulk3">
                    Skill Set Update - Emily Rodriguez (Low Priority)
                  </label>
                </div>
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">Approval Comments (Optional)</label>
              <textarea class="form-control" id="bulkComments" rows="3" placeholder="Add comments for bulk approval..."></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-success" onclick="processBulkApproval()">
              <i class="fas fa-check-double me-2"></i>Approve Selected
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Remove existing modal if any
  const existingModal = document.getElementById("bulkApproveModal");
  if (existingModal) {
    existingModal.remove();
  }

  // Add modal to body
  document.body.insertAdjacentHTML("beforeend", bulkModalHTML);

  // Show modal
  const modal = new bootstrap.Modal(
    document.getElementById("bulkApproveModal")
  );
  modal.show();
}

function applyFilters() {
  const priorityFilter = document.getElementById("priorityFilter").value;
  const typeFilter = document.getElementById("typeFilter").value;
  const timeFilter = document.getElementById("timeFilter").value;
  const userFilter = document.getElementById("userFilter").value.toLowerCase();

  const requestItems = document.querySelectorAll(".approval-request-item");

  requestItems.forEach((item) => {
    let showItem = true;

    // Priority filter
    if (
      priorityFilter &&
      !item.classList.contains(`priority-${priorityFilter}`)
    ) {
      showItem = false;
    }

    // Type filter
    if (typeFilter) {
      const requestType = item
        .querySelector(".request-type")
        .textContent.toLowerCase();
      if (!requestType.includes(typeFilter)) {
        showItem = false;
      }
    }

    // User filter
    if (userFilter) {
      const userName = item
        .querySelector(".request-user")
        .textContent.toLowerCase();
      if (!userName.includes(userFilter)) {
        showItem = false;
      }
    }

    // Show/hide item
    item.style.display = showItem ? "block" : "none";
  });

  // Close modal
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("filterModal")
  );
  modal.hide();

  showNotification("Filters applied successfully", "info");
}

function clearFilters() {
  document.getElementById("priorityFilter").value = "";
  document.getElementById("typeFilter").value = "";
  document.getElementById("timeFilter").value = "";
  document.getElementById("userFilter").value = "";

  // Show all items
  const requestItems = document.querySelectorAll(".approval-request-item");
  requestItems.forEach((item) => {
    item.style.display = "block";
  });

  showNotification("Filters cleared", "info");
}

function processBulkApproval() {
  const selectedRequests = [];
  const checkboxes = document.querySelectorAll(
    '#bulkRequestsList input[type="checkbox"]:checked'
  );

  checkboxes.forEach((checkbox) => {
    selectedRequests.push(checkbox.nextElementSibling.textContent);
  });

  if (selectedRequests.length === 0) {
    alert("Please select at least one request to approve.");
    return;
  }

  const comments = document.getElementById("bulkComments").value;
  const confirmBulk = confirm(
    `Bulk approve ${
      selectedRequests.length
    } requests?\n\n${selectedRequests.join(
      "\n"
    )}\n\nThis action cannot be undone.`
  );

  if (confirmBulk) {
    // Generate bulk approval ID
    const bulkId = `BULK-${new Date().getFullYear()}-${String(
      Math.floor(Math.random() * 1000)
    ).padStart(3, "0")}`;

    // Close modal
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("bulkApproveModal")
    );
    modal.hide();

    // Remove approved requests from UI
    selectedRequests.forEach((request, index) => {
      setTimeout(() => {
        const requestElements = document.querySelectorAll(
          ".approval-request-item"
        );
        if (requestElements[index]) {
          requestElements[index].style.transition = "all 0.5s ease";
          requestElements[index].style.opacity = "0";
          requestElements[index].style.transform = "translateX(100%)";

          setTimeout(() => {
            requestElements[index].remove();
          }, 500);
        }
      }, index * 200);
    });

    setTimeout(() => {
      updateApprovalStatistics();
      showNotification(
        `Bulk approval completed! Bulk ID: ${bulkId}`,
        "success"
      );
    }, selectedRequests.length * 200 + 500);
  }
}

function updateApprovalStatistics() {
  // Update pending requests count
  const pendingCount = document.querySelectorAll(
    ".approval-request-item"
  ).length;
  const pendingElement = document.querySelector(".approval-stat-number");
  if (pendingElement) {
    pendingElement.textContent = pendingCount;
  }

  // Update approved count (simulate increase)
  const approvedElements = document.querySelectorAll(".approval-stat-number");
  if (approvedElements[1]) {
    const currentApproved = parseInt(approvedElements[1].textContent);
    approvedElements[1].textContent = currentApproved + 1;
  }

  // Update response time (simulate improvement)
  const responseTimeElement = approvedElements[3];
  if (responseTimeElement) {
    const currentTime = parseFloat(responseTimeElement.textContent);
    responseTimeElement.textContent = Math.max(1.0, currentTime - 0.1).toFixed(
      1
    );
  }
}

function initializePriorityFiltering() {
  // Add priority filter buttons to the page
  const requestsHeader = document.querySelector(".approval-requests-header");
  if (requestsHeader) {
    const priorityFilters = document.createElement("div");
    priorityFilters.className = "priority-filters mt-3";
    priorityFilters.innerHTML = `
      <div class="btn-group" role="group">
        <button type="button" class="btn btn-outline-secondary btn-sm active" data-priority="all">All</button>
        <button type="button" class="btn btn-outline-danger btn-sm" data-priority="high">High</button>
        <button type="button" class="btn btn-outline-warning btn-sm" data-priority="medium">Medium</button>
        <button type="button" class="btn btn-outline-success btn-sm" data-priority="low">Low</button>
      </div>
    `;
    requestsHeader.appendChild(priorityFilters);

    // Add event listeners
    priorityFilters.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", function () {
        // Update active button
        priorityFilters
          .querySelectorAll("button")
          .forEach((b) => b.classList.remove("active"));
        this.classList.add("active");

        // Filter requests
        const priority = this.getAttribute("data-priority");
        filterByPriority(priority);
      });
    });
  }
}

function filterByPriority(priority) {
  const requestItems = document.querySelectorAll(".approval-request-item");

  requestItems.forEach((item) => {
    if (priority === "all") {
      item.style.display = "block";
    } else {
      const showItem = item.classList.contains(`priority-${priority}`);
      item.style.display = showItem ? "block" : "none";
    }
  });
}

// Modal action functions (called from modal buttons)
function approveRequestFromModal(title, user) {
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("reviewDetailsModal")
  );
  modal.hide();

  // Find the request element and approve it
  const requestItems = document.querySelectorAll(".approval-request-item");
  requestItems.forEach((item) => {
    const itemTitle = item.querySelector(".request-title").textContent;
    const itemUser = item
      .querySelector(".request-user")
      .textContent.replace("👤 ", "");
    if (itemTitle === title && itemUser === user) {
      approveRequest(title, user, item);
    }
  });
}

function rejectRequestFromModal(title, user) {
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("reviewDetailsModal")
  );
  modal.hide();

  // Find the request element and reject it
  const requestItems = document.querySelectorAll(".approval-request-item");
  requestItems.forEach((item) => {
    const itemTitle = item.querySelector(".request-title").textContent;
    const itemUser = item
      .querySelector(".request-user")
      .textContent.replace("👤 ", "");
    if (itemTitle === title && itemUser === user) {
      rejectRequest(title, user, item);
    }
  });
}

function requestMoreInfoFromModal(title, user) {
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("reviewDetailsModal")
  );
  modal.hide();

  // Find the request element and request more info
  const requestItems = document.querySelectorAll(".approval-request-item");
  requestItems.forEach((item) => {
    const itemTitle = item.querySelector(".request-title").textContent;
    const itemUser = item
      .querySelector(".request-user")
      .textContent.replace("👤 ", "");
    if (itemTitle === title && itemUser === user) {
      requestMoreInfo(title, user, item);
    }
  });
}

// Post-Approval Lock Functions

function initializePostApprovalLock() {
  // Initialize filter buttons for locked forms
  const formFilterButtons = document.querySelectorAll(
    ".form-filters .filter-btn"
  );
  formFilterButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Update active filter
      formFilterButtons.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      // Filter locked forms
      const filter = this.getAttribute("data-filter");
      filterLockedForms(filter);
    });
  });

  // Initialize auto-refresh for lock status
  setInterval(updateLockTimers, 60000); // Update every minute
}

function filterLockedForms(filter) {
  const formItems = document.querySelectorAll(".locked-form-item");

  formItems.forEach((item) => {
    const category = item.getAttribute("data-category");
    const shouldShow = filter === "all" || category === filter;

    if (shouldShow) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function refreshLockStatus() {
  // Show loading state
  const refreshBtn = document.querySelector('[onclick="refreshLockStatus()"]');
  const originalText = refreshBtn.innerHTML;
  refreshBtn.innerHTML =
    '<i class="fas fa-spinner fa-spin me-2"></i>Refreshing...';
  refreshBtn.disabled = true;

  // Simulate API call to refresh lock status
  setTimeout(() => {
    // Update lock timers and status
    updateLockTimers();

    // Reset button
    refreshBtn.innerHTML = originalText;
    refreshBtn.disabled = false;

    // Show success message
    showNotification("Lock status refreshed successfully", "success");
  }, 2000);
}

function updateLockTimers() {
  // Simulate updating lock timers
  const timers = document.querySelectorAll(".lock-timer span");
  timers.forEach((timer) => {
    const currentText = timer.textContent;
    // This would normally calculate actual time differences
    console.log("Updating timer:", currentText);
  });
}

function viewFormDetails(formId) {
  alert(
    `Viewing details for form: ${formId}\n\nThis would open a detailed view showing:\n- Form content (read-only)\n- Lock history\n- Approval details\n- Security information\n- Related change requests`
  );
}

function requestUnlock(formId) {
  const confirmUnlock = confirm(
    `Request unlock for form: ${formId}\n\nThis will:\n1. Create a new change request\n2. Require admin approval\n3. Provide temporary access if approved\n4. Auto-lock again after completion\n\nProceed with unlock request?`
  );

  if (confirmUnlock) {
    // Generate unlock request ID
    const requestId = `UNL-${new Date().getFullYear()}-${String(
      Math.floor(Math.random() * 1000)
    ).padStart(3, "0")}`;

    alert(
      `Unlock request submitted!\n\nRequest ID: ${requestId}\nForm ID: ${formId}\nStatus: Pending Admin Review\n\nYou will receive email notifications about the approval status.\n\nExpected processing time: 2-4 hours for standard requests.`
    );

    // Update UI to show pending request
    showNotification("Unlock request submitted successfully", "info");
  }
}

function viewAllLockedForms() {
  alert(
    "Opening comprehensive view of all locked forms...\n\nThis would display:\n- Complete list of locked forms\n- Advanced filtering and search\n- Bulk unlock requests\n- Export capabilities\n- Detailed lock analytics"
  );
}

function checkLockHistory() {
  alert(
    "Opening lock history...\n\nThis would show:\n- Complete timeline of lock/unlock events\n- Admin actions and approvals\n- System-triggered locks\n- User requests and responses\n- Audit trail with timestamps"
  );
}

function downloadLockReport() {
  alert(
    "Generating lock report...\n\nThis would create a comprehensive report including:\n- Current lock status of all forms\n- Recent lock/unlock activity\n- Pending unlock requests\n- Security compliance metrics\n- Downloadable in PDF/Excel format"
  );
}

function emergencyUnlock() {
  const confirmEmergency = confirm(
    "EMERGENCY UNLOCK REQUEST\n\nThis is for critical situations only and will:\n\n⚠️ Trigger immediate admin notification\n⚠️ Require emergency justification\n⚠️ Create high-priority audit log\n⚠️ May require additional verification\n\nOnly proceed if this is a genuine emergency.\n\nContinue with emergency unlock?"
  );

  if (confirmEmergency) {
    const emergencyReason = prompt(
      "Please provide emergency justification:\n\n(This will be logged and reviewed by administrators)"
    );

    if (emergencyReason && emergencyReason.trim().length > 10) {
      const emergencyId = `EMG-${Date.now()}`;

      alert(
        `EMERGENCY UNLOCK INITIATED\n\nEmergency ID: ${emergencyId}\nJustification: ${emergencyReason.substring(
          0,
          50
        )}...\n\n🚨 Admin team has been notified\n🚨 Emergency response team activated\n🚨 You will be contacted within 15 minutes\n\nPlease remain available for verification.`
      );

      showNotification(
        "Emergency unlock request submitted - Admin team notified",
        "warning"
      );
    } else {
      alert(
        "Emergency justification is required and must be at least 10 characters."
      );
    }
  }
}

function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
  notification.style.cssText =
    "top: 20px; right: 20px; z-index: 9999; min-width: 300px;";
  notification.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;

  // Add to page
  document.body.appendChild(notification);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 5000);
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
