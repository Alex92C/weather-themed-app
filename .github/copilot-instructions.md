# GitHub Copilot Instructions

## Project Overview

This is a large-scale React application. All code suggestions must follow these guidelines strictly.

---

## Core Principles

### 1. Type Safety

- **ALWAYS** use TypeScript or PropTypes for type checking
- Define explicit types for all props, state, and function parameters
- Avoid `any` types - use specific types or generics
- Use TypeScript interfaces for complex object structures
- Type all API responses and data models

### 2. Component Structure

- **Each component MUST have its own folder** containing:
  - Component JSX file (e.g., `Button.jsx`)
  - Component SCSS file (e.g., `Button.scss`)
  - Index file for clean imports (optional but recommended)
- Example structure:
  ```
  components/
    Button/
      Button.jsx
      Button.scss
      index.js
  ```

### 3. Styling Requirements

- **ALWAYS use SCSS** for styling - never CSS-in-JS or inline styles
- **ALWAYS use BEM (Block Element Modifier)** methodology
- Follow the **principle of least specificity**
- Avoid overly specific selectors (e.g., avoid deep nesting like `.block .element .child .grandchild`)
- Avoid inline styles unless absolutely necessary (e.g., dynamic calculated values)
- **ALWAYS use global styles from `src/styles/` folder**:
  - Import variables: `@use '../../styles/variables' as *`
  - Import mixins: `@use '../../styles/mixins' as *`
  - Reference utility classes from `_utilities.scss` in JSX when applicable
- BEM naming convention example:
  ```scss
  .button {
  } // Block
  .button__icon {
  } // Element
  .button--primary {
  } // Modifier
  .button__icon--large {
  } // Element with Modifier
  ```

### 4. Reusability & Composition

- **ALWAYS prefer creating separate components** over duplicating code
- Extract repeated logic into custom hooks
- Create utility functions for shared business logic
- Use composition over inheritance
- Keep components small and focused (Single Responsibility Principle)
- Design components to be **extendible** - use props for customization, accept className prop for styling extensions
- Build with **future reusability** in mind - avoid tight coupling to specific contexts

### 5. Responsive Design

- **ALL components MUST be compatible with different display resolutions**
- Use the `@include responsive()` mixin for breakpoints (tablet: 768px, desktop: 1024px, wide: 1280px)
- Design mobile-first, then enhance for larger screens
- Test components at multiple viewport sizes (mobile, tablet, desktop, wide)
- Use relative units (%, rem, em) instead of fixed pixels where appropriate
- Avoid fixed widths that break on smaller screens
- Ensure touch targets are appropriately sized for mobile (minimum 44x44px)

---

## React Best Practices for Large-Scale Projects

### Component Organization

- Separate presentational (UI) components from container (logic) components
- Use a clear folder structure:
  ```
  src/
    components/        # Reusable UI components
    features/          # Feature-specific components
    hooks/             # Custom React hooks
    utils/             # Utility functions
    services/          # API services
    constants/         # Constants and enums
    types/             # TypeScript types/interfaces
    styles/            # Global styles, variables, mixins
  ```

### State Management

- Use appropriate state management for scale (Context API, Redux, Zustand, etc.)
- Keep state as local as possible
- Lift state up only when necessary
- Use custom hooks to encapsulate stateful logic

### Performance

- Memoize expensive computations with `useMemo`
- Memoize callback functions with `useCallback`
- Use `React.memo` for components that render often with same props
- Implement code splitting with `React.lazy` and `Suspense`
- Avoid unnecessary re-renders

### Code Quality

- Write self-documenting code with clear naming
- Add JSDoc comments for complex functions
- Keep functions pure when possible
- Handle errors gracefully with error boundaries
- Validate props with PropTypes or TypeScript

### Testing

- Write unit tests for utility functions
- Write component tests for UI components
- Test user interactions, not implementation details
- Aim for high coverage on critical paths

### Accessibility

- Use semantic HTML elements
- Include ARIA labels when necessary
- Ensure keyboard navigation works
- Test with screen readers

### File Naming

- Use PascalCase for component files (e.g., `UserProfile.jsx`)
- Use camelCase for utility files (e.g., `formatDate.js`)
- Use kebab-case for SCSS files (e.g., `user-profile.scss`) or match component name
- Be consistent throughout the project

---

## Code Generation Rules

When generating code, GitHub Copilot should:

1. ✅ **Always ask about types** - If types aren't clear, suggest creating TypeScript interfaces
2. ✅ **Always create folder structure** - When creating a component, create its folder and SCSS file
3. ✅ **Always use BEM** - Generate class names following BEM methodology
4. ✅ **Always import global styles** - Include `@use` statements for variables and mixins
5. ✅ **Always use existing variables** - Never hardcode colors, spacing, font sizes
6. ✅ **Always use existing mixins** - Check `_mixins.scss` before writing custom CSS
7. ✅ **Always consider utility classes** - Check `_utilities.scss` before creating custom styles
8. ✅ **Always look for reusability** - If code could be reused, suggest extracting it
9. ✅ **Always design for extendibility** - Accept props for customization, support className prop
10. ✅ **Always make components responsive** - Use responsive mixins, test at all breakpoints
11. ✅ **Never use inline styles** - Unless explicitly requested for dynamic values
12. ✅ **Never nest too deeply** - Keep SCSS nesting to 2-3 levels maximum
13. ✅ **Never duplicate code** - Suggest creating a shared component or utility instead
14. ✅ **Never hardcode style values** - Always reference global variables or CSS custom properties
15. ✅ **Never use fixed widths** - Unless specifically required, prefer fluid/responsive sizing

---

## SCSS Global System (CRITICAL)

**ALWAYS use the existing global style system located in `src/styles/`**

### Required Imports in Component SCSS Files

```scss
@use "../../styles/variables" as *; // For variables ($color-primary, $spacing-md, etc.)
@use "../../styles/mixins" as *; // For mixins (@include flex-center, @include responsive(), etc.)
```

### Variables (`_variables.scss`)

**NEVER hardcode values - ALWAYS use these global variables:**

#### Colors

- **Primary/Secondary**: `$color-primary`, `$color-primary-dark`, `$color-secondary`, `$color-secondary-dark`
- **Feedback**: `$color-success`, `$color-error`
- **Text**: `$color-text`, `$color-text-secondary`
- **Background**: `$color-background`, `$color-background-glass`,
- **Border**: `$color-border`, `$color-border-glass`
- **Utility**: `$color-white`, `$color-black`
- **CSS Variables**: Use `var(--color-primary)`, `var(--spacing-md)`, etc. for dynamic values

#### Spacing

- `$spacing-xs` (4px), `$spacing-sm` (8px), `$spacing-md` (16px), `$spacing-lg` (24px)
- CSS variables: `var(--spacing-xs)`, `var(--spacing-sm)`, etc.

#### Typography

- **Font sizes**: `$font-size-xs` through `$font-size-xxl` or `var(--font-size-base)`
- **Font weights**: `$font-weight-light`, `$font-weight-normal`, `$font-weight-semibold`, `$font-weight-bold`
- **Line height**: `var(--line-height-base)`

#### Transitions

- `$transition-base` or `var(--transition-base)` for consistent animations

### Mixins (`_mixins.scss`)

**ALWAYS use these mixins instead of writing custom CSS:**

#### Layout Mixins

- `@include flex-center` - Perfect centering with flexbox
- `@include responsive($breakpoint)` - Media queries (tablet, desktop, wide)
- `@include grid-base` - Grid with standard gap
- `@include grid-columns($columns)` - Grid with specific columns
- `@include grid-auto-fit($min-width)` - Responsive auto-fit grid

#### Component Mixins

- `@include button-base` - Standard button styling
- `@include input-base` - Standard input/select/date styling
- `@include card-base` - Card container with hover effect
- `@include form-field` - Complete form field structure
- `@include icon-base` - Icon sizing and centering

#### Typography Mixins

- `@include heading-base` - Base heading styles
- `@include text-base` - Base text styles
- `@include truncate` - Text truncation with ellipsis

#### Effect Mixins

- `@include focus-outline` - Consistent focus styling
- `@include fade-in` - Fade in animation
- `@include slide-in` - Slide in animation
- `@include scale-in` - Scale in animation
- `@include status-badge($color)` - Status badge styling

### Utility Classes (`_utilities.scss`)

**ALWAYS check if a utility class exists before writing custom CSS:**

#### Common Utilities Available

- **Typography**: `.text-xs`, `.text-sm`, `.text-bold`, `.text-center`, `.text-truncate`
- **Spacing**: `.m-md`, `.mt-lg`, `.p-sm`, `.mb-xs` (margin/padding)
- **Display**: `.d-flex`, `.d-grid`, `.d-none`
- **Flexbox**: `.flex-row`, `.justify-center`, `.items-center`
- **Sizing**: `.w-100`, `.h-100`
- **Colors**: `.text-primary`, `.bg-primary`
- **Border**: `.border`, `.rounded-sm`, `.rounded-lg`
- **Shadow**: `.shadow-sm`, `.shadow-md`, `.shadow-lg`
- **Cursor**: `.cursor-pointer`
- **Opacity**: `.opacity-50`, `.opacity-75`

#### When to Use Utility Classes

- Use utility classes in JSX for common, single-property styling
- Combine utility classes to avoid writing custom CSS
- Example: `<div className="d-flex items-center justify-between p-md">`

### SCSS Best Practices

#### Always Use Global System

```scss
/* ✅ GOOD - Using global variables and mixins */
@use "../../styles/variables" as *;
@use "../../styles/mixins" as *;

.my-component {
  padding: $spacing-md;
  color: $color-text;
  background: $color-background;
  transition: $transition-base;

  @include responsive(tablet) {
    padding: $spacing-lg;
  }
}

.my-component__button {
  @include button-base;
  background: $color-primary;
}

/* ❌ BAD - Hardcoded values */
.my-component {
  padding: 16px; // Should use $spacing-md
  color: #3d3d41; // Should use $color-text
  transition: 0.5s ease; // Should use $transition-base
}
```

#### Prefer Mixins Over Custom Code

```scss
/* ✅ GOOD - Using existing mixin */
.card {
  @include card-base;
}

.centered-content {
  @include flex-center;
}

/* ❌ BAD - Reimplementing existing mixins */
.card {
  background-color: #fff;
  border: 1px solid #e2e8f0;
  padding: 16px;
  /* ... this already exists as @include card-base */
}
```

### Specificity

```scss
/* ✅ GOOD - Low specificity */
.card {
}
.card__title {
}
.card--featured {
}

/* ❌ BAD - High specificity */
.container .content .card .title {
}
```

### Nesting

```scss
/* ✅ GOOD - Shallow nesting */
.card {
  &__title {
  }
  &__body {
  }
  &--featured {
  }
}

/* ❌ BAD - Deep nesting */
.card {
  .inner {
    .content {
      .title {
        .text {
        }
      }
    }
  }
}
```

---

## Example Component Structure

```jsx
// components/WeatherCard/WeatherCard.jsx
import React from "react";
import PropTypes from "prop-types";
import "./WeatherCard.scss";

const WeatherCard = ({ temperature, condition, location }) => {
  return (
    <div className="weather-card">
      <h2 className="weather-card__location">{location}</h2>
      <div className="weather-card__temperature">{temperature}°</div>
      <p className="weather-card__condition">{condition}</p>
    </div>
  );
};

WeatherCard.propTypes = {
  temperature: PropTypes.number.isRequired,
  condition: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};

export default WeatherCard;
```

```scss
// components/WeatherCard/WeatherCard.scss
@use "../../styles/variables" as *;
@use "../../styles/mixins" as *;

.weather-card {
  @include card-base; // Use existing card mixin
  padding: $spacing-md;

  &__location {
    @include heading-base; // Use existing heading mixin
    font-size: $font-size-lg;
    margin-bottom: $spacing-sm;
  }

  &__temperature {
    font-size: $font-size-xxl;
    font-weight: $font-weight-bold;
    color: $color-primary;
  }

  &__condition {
    color: $color-text-secondary;
    font-size: $font-size-base;
  }

  // Responsive behavior using mixin
  @include responsive(tablet) {
    padding: $spacing-lg;
  }
}
```

---

## Summary

- ✅ Type safety is mandatory
- ✅ One component = one folder with JSX + SCSS
- ✅ SCSS + BEM methodology only
- ✅ **ALWAYS use global styles** - variables, mixins, utilities from `src/styles/`
- ✅ **NEVER hardcode values** - use `$spacing-md`, `$color-primary`, etc.
- ✅ **Check existing mixins first** - before writing custom CSS patterns
- ✅ **Use utility classes** - for simple, common styling needs
- ✅ Lowest specificity possible
- ✅ Extract and reuse whenever possible
- ✅ **Design for extendibility** - components should accept customization props
- ✅ **Ensure responsive compatibility** - test at mobile, tablet, desktop, and wide resolutions

Follow these rules consistently to maintain code quality and scalability.

---

## Quick Reference: Style Imports

**Every component SCSS file should start with:**

```scss
@use "../../styles/variables" as *;
@use "../../styles/mixins" as *;
```

**Common patterns:**

- Colors: `$color-primary`, `$color-text`, `$color-background`
- Spacing: `$spacing-xs` (4px), `$spacing-sm` (8px), `$spacing-md` (16px), `$spacing-lg` (24px)
- Centering: `@include flex-center`
- Responsive: `@include responsive(tablet)` or `@include responsive(desktop)`
- Buttons: `@include button-base`
- Inputs: `@include input-base`
- Cards: `@include card-base`
- Animations: `@include fade-in`, `@include slide-in`
