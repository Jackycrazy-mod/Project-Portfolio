# Paper Idol Fans Club Website

A simple fan website for a singer, built as a fundamental front-end project.  
The site includes a home page, about page, songs page, contact page, with interactive hover effects, responsive layout, and basic form validation.

**Demo:** Not hosted (static HTML/CSS/JS, screenshots provided below)

---

## Technologies Used

- HTML5
- CSS3 (hover effects, responsive breakpoints)
- JavaScript (DOM manipulation, form validation)

---

## Features Implemented

### 1. Interactive Hover Effects
- Navigation buttons change color on hover:
  - “About” button: dark grey → yellow
  - “YouTube Channel” button: dark grey → light blue
  - “Songs” button: dark grey → yellow
  - “Contact” button: dark grey → yellow
  - “Send” button: dark grey → light blue
- Song images zoom in slightly when hovered.

### 2. Multi-Page Navigation
- Home page with introduction.
- About page with brief profile of Paper Idol.
- Songs page listing songs; clicking on an image navigates to the corresponding song (external link placeholder).
- Contact page with a simple form for user input.

### 3. Responsive Design
- **Header hiding:** When screen width < 1200px, the main header is hidden and a menu button appears in the upper-right corner.
- **Menu button:** Click to toggle the header visibility (works on all pages).
- **Image grid rearrangement:** On screens < 991px and < 400px, the song photos reorder to fit the screen.

### 4. Form Validation (Contact Page)
- Validates that the email field contains an `@` character before submission.
- Displays an alert message if validation fails.

---

## Code Snippet (Email Validation)

```javascript
function validateEmail() {
  const emailInput = document.getElementById("email").value;
  if (!emailInput.includes("@")) {
    alert("Please enter a valid email address containing '@'.");
    return false;
  }
  return true;
}
