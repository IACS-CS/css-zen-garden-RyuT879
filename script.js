/*
STUDENTS: DO NOT MODIFY THIS FILE

Note: many cool things can be done with JavaScript, but
they are outside the scope of this project. This file
exists just to switch the styles around when
you click the "Select a Design" links.

There is a different script that is loaded on the live site
which handles all the many links from students in the live 
project. 
*/

// When the page loads, add a click event listener to each of the
// "Select a Design" links.
document.addEventListener("DOMContentLoaded", function () {
  var designLinks = document.querySelectorAll(".design-name");
  for (var i = 0; i < designLinks.length; i++) {
    const a = designLinks[i];
    a.addEventListener("click", function (event) {
      let filename = a.href.replace(/^.*#/, "");
      let link = document.querySelector("link#thestyle");
      console.log("Changing style to " + filename);
      link.href = filename;
    });
  }

  // Set up "next" button
  var nextButton = document.querySelector('[href="#next"]');
  nextButton.addEventListener("click", function (event) {
    let links = Array.from(designLinks).slice(0, 3);
    let current = links.findIndex(function (a) {
      return a.href.includes(
        document.querySelector("link#thestyle").getAttribute("href")
      );
    });
    let next = (current + 1) % links.length;
    let filename = links[next].href.replace(/^.*#/, "");
    let link = document.querySelector("link#thestyle");
    console.log("Changing style to " + filename);
    link.href = filename;
  });

  // Set up "all" button
  var allButton = document.querySelector('[href="#all"]');
  allButton.addEventListener("click", function (event) {
    let designLinks = document.querySelectorAll(".design-name");
    let links = Array.from(designLinks);
    if (links.length < 6) {
      document.querySelector(".design-selection ul");
      for (let i = 0; i < 20; i++) {
        let li = document.createElement("li");
        let html = `
          <a class="design-name" href="#">Fake Design ${i + 1}</a>
          by <a href="#">Fake Student</a>
        `;
        li.innerHTML = html;
        document.querySelector(".design-selection ul").appendChild(li);
      }
    }
  });

  // Add a Requirements toggle button into the sidebar wrapper (if present)
  var sidebarWrapper = document.querySelector('.sidebar .wrapper');
  var requirementsPanel = document.querySelector('.requirements');
  if (sidebarWrapper && requirementsPanel) {
    var reqBtn = document.createElement('button');
    reqBtn.type = 'button';
    reqBtn.className = 'requirements-toggle';
    reqBtn.setAttribute('aria-expanded', 'false');
    reqBtn.textContent = 'Requirements';
    reqBtn.style.cursor = 'pointer';
    // Insert at the start of the wrapper so it appears in the top-right cluster
    sidebarWrapper.insertBefore(reqBtn, sidebarWrapper.firstChild);

    // Close button inside the panel
    var closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'req-close';
    closeBtn.setAttribute('aria-label', 'Close requirements');
    closeBtn.textContent = '✕';
    closeBtn.style.cursor = 'pointer';
    requirementsPanel.appendChild(closeBtn);

    function openRequirements() {
      document.documentElement.classList.add('show-requirements');
      reqBtn.setAttribute('aria-expanded', 'true');
    }
    function closeRequirements() {
      document.documentElement.classList.remove('show-requirements');
      reqBtn.setAttribute('aria-expanded', 'false');
    }

    reqBtn.addEventListener('click', function (e) {
      if (document.documentElement.classList.contains('show-requirements')) closeRequirements();
      else openRequirements();
      e.stopPropagation();
    });

    closeBtn.addEventListener('click', function (e) {
      closeRequirements();
      e.stopPropagation();
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeRequirements();
    });

    // Click outside to close
    document.addEventListener('click', function (e) {
      if (!document.documentElement.classList.contains('show-requirements')) return;
      if (!requirementsPanel.contains(e.target) && !reqBtn.contains(e.target)) {
        closeRequirements();
      }
    });
  }
});
