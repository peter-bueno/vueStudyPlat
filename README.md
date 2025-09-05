# Vue 3 Learning Guide - Application Overview

This document provides a detailed explanation of the class structure and methods in the `app.js` file of the Vue 3 Learning Guide application. It covers the main application class, supporting classes, and their roles in delivering an interactive learning experience.

---

## Main Class: `Vue3LearningApp`

The `Vue3LearningApp` class is the core of the application. It manages the app's state, user interface interactions, navigation, theming, search functionality, code examples, accessibility, and performance monitoring.

### Constructor

- Initializes the current section to `'introduction'`.
- Defines the list of sections available in the app.
- Builds a search index for quick keyword-based navigation.
- Retrieves the saved theme from `localStorage` or defaults to `'auto'`.
- Calls the `init()` method to set up the app.

### Methods

#### `init()`

Initializes the app by setting up:

- Navigation links and their event listeners.
- Theme toggle button and applying the saved theme.
- Search input and search functionality.
- Code tabs for switching between code examples.
- API comparison toggles.
- Copy-to-clipboard buttons for code snippets.
- Interactive demos (counter and name update).
- Progress bar update.
- Syntax highlighting using Prism.js (if available).

#### `setupNavigation()`

Adds click event listeners to navigation links (`.nav-link`) to navigate between sections.

#### `navigateToSection(sectionName)`

- Updates the active navigation link and content section.
- Updates the current section state.
- Updates the progress bar.
- Scrolls the main content area to the top.

#### `updateProgress()`

Calculates and updates the progress bar width and text based on the current section's position in the sections list.

#### `setupThemeToggle()`

Sets up the theme toggle button to switch between light and dark themes, saving the preference in `localStorage`.

#### `applyTheme(theme)`

Applies the selected theme to the document body and updates the theme icon accordingly.

#### `setupSearch()`

Sets up the search input with debounced input handling and triggers search on Enter key.

#### `buildSearchIndex()`

Returns an object mapping each section to an array of keywords for search matching.

#### `performSearch(query)`

Performs a keyword search on the sections and navigates to the first matching section, showing feedback. Shows "No results found" if no matches.

#### `getSectionTitle(sectionName)`

Returns a human-readable title for a given section key.

#### `showSearchFeedback(message)`

Displays a temporary feedback message below the search input.

#### `setupCodeTabs()`

Enables tabbed code examples by toggling active tabs and their corresponding content.

#### `setupAPIComparison()`

Sets up buttons to toggle between different API views (e.g., Composition API vs Options API).

#### `setupCopyButtons()`

Enables copy-to-clipboard functionality on buttons with visual feedback on success or failure.

#### `setupInteractiveDemos()`

Initializes interactive UI demos:

- Counter demo with increment button.
- Name update demo cycling through a list of names.

#### `setupCounterDemo()`

Handles the counter increment button and animates the count display.

#### `setupNameDemo()`

Handles the name update button with fade transition effects.

#### `debounce(func, wait)`

Utility method to debounce function calls.

#### `setupKeyboardNavigation()`

Adds keyboard shortcuts:

- Ctrl/Cmd + K: Focus search input.
- Ctrl/Cmd + Right Arrow: Navigate to next section.
- Ctrl/Cmd + Left Arrow: Navigate to previous section.

#### `navigateNext()`

Navigates to the next section if available.

#### `navigatePrevious()`

Navigates to the previous section if available.

#### `initializeTooltips()`

Sets up tooltips on elements with `data-tooltip` attributes.

#### `showTooltip(element, text)`

Creates and positions a tooltip near the target element.

#### `hideTooltip()`

Removes the tooltip from the DOM.

#### `measurePerformance()`

Logs page load time using the Performance API.

---

## Supporting Classes

### `LearningTracker`

Tracks user progress and bookmarks:

- Stores visited sections and bookmarks in `localStorage`.
- Methods to mark sections visited, toggle bookmarks, and get progress statistics.

### `CodePlayground`

Manages live code playgrounds embedded in the app:

- Sets up playground UI with Run and Reset buttons.
- Executes code snippets and displays output (basic simulation).

### `AccessibilityManager`

Enhances accessibility:

- Adds a "Skip to main content" link for keyboard users.
- Manages focus and screen reader announcements.
- Provides methods to announce messages to screen readers.

---

## Application Initialization

On `DOMContentLoaded` event:

- Creates instances of `Vue3LearningApp`, `LearningTracker`, `CodePlayground`, and `AccessibilityManager`.
- Sets up keyboard navigation, tooltips, and performance monitoring.
- Overrides `navigateToSection` to track visited sections and announce navigation changes.
- Adds global error handling.
- (Commented out) Service worker registration for offline support.
- Logs initialization success and keyboard shortcut info to the console.

---

## Notable Features

- **Section Navigation:** Click or keyboard shortcuts to navigate through learning sections.
- **Theme Toggle:** Switch between light and dark modes with persistence.
- **Search:** Keyword search with instant navigation and feedback.
- **Code Tabs & API Comparison:** Interactive code examples with tabbed views.
- **Copy Buttons:** Easily copy code snippets with visual feedback.
- **Interactive Demos:** Simple UI demos to illustrate concepts.
- **Accessibility:** Keyboard navigation, tooltips, screen reader announcements, and skip links.
- **Performance Monitoring:** Logs page load time for performance insights.

---

This README provides a comprehensive overview of the app's structure and functionality to help developers understand and maintain the Vue 3 Learning Guide application.
