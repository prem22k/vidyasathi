# Contributing to Vidhyavaani

Thank you for your interest in contributing to Vidhyavaani! This document provides guidelines and instructions for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Issue Guidelines](#issue-guidelines)
- [Merge Request Guidelines](#merge-request-guidelines)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone. Please be considerate and professional in all interactions.

## Getting Started

1. **Fork the repository** on GitLab
2. **Clone your fork** locally:
   ```bash
   git clone https://code.swecha.org/your-username/vidhyavaani.git
   cd vidhyavaani
   ```

3. **Set up the development environment**:
   ```bash
   # Install Python dependencies
   pip install -r requirements.txt
   
   # Set up frontend
   cd frontend
   npm install
   ```

4. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## How to Contribute

### Reporting Bugs

- Use the Bug issue template
- Provide a clear description of the issue
- Include steps to reproduce
- Add screenshots if applicable
- Specify your environment (OS, browser, Python version)

### Suggesting Features

- Use the Feature Request issue template
- Clearly describe the feature and its benefits
- Provide use cases and examples
- Discuss potential implementation approaches

### Improving Documentation

- Use the Documentation issue template
- Fix typos, clarify explanations, or add examples
- Ensure documentation is up-to-date with code changes

## Development Workflow

1. **Sync with upstream** before starting work:
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Make your changes** following our coding standards

3. **Test your changes** thoroughly

4. **Commit your changes** with clear, descriptive messages:
   ```bash
   git commit -m "feat: add new feature description"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Merge Request** on GitLab

## Coding Standards

### Python Code

- Follow PEP 8 style guidelines
- Use **Ruff** for linting and formatting
- Write clear, self-documenting code with appropriate comments
- Use type hints where applicable
- Maximum line length: 100 characters

### Frontend Code (TypeScript/React)

- Follow ESLint configuration
- Use TypeScript for type safety
- Write functional components with hooks
- Follow React best practices

### General Guidelines

- Write meaningful variable and function names
- Keep functions small and focused
- Avoid code duplication (DRY principle)
- Write comments for complex logic
- Update documentation when changing functionality

## Testing

- Write tests for new features
- Ensure all existing tests pass before submitting
- Run tests locally:
  ```bash
  # Backend tests
  pytest
  
  # Frontend tests
  cd frontend && npm test
  ```

## Submitting Changes

### Commit Message Format

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no code change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(chat): add voice input support

fix(assistant): resolve memory leak in conversation history

docs(readme): update installation instructions
```

## Issue Guidelines

- Search existing issues before creating a new one
- Use appropriate issue templates
- Provide all requested information
- Use clear, descriptive titles
- Add relevant labels
- Reference related issues or MRs

## Merge Request Guidelines

- Use the appropriate MR template
- Fill out all sections of the template
- Link related issues using "Closes #issue-number"
- Keep MRs focused on a single feature or fix
- Ensure CI/CD pipelines pass
- Request review from maintainers
- Respond to review comments promptly
- Keep your branch up-to-date with main

### MR Checklist

Before submitting, ensure:
- [ ] Code follows project coding standards
- [ ] Tests are added/updated and passing
- [ ] Documentation is updated
- [ ] Commit messages follow conventions
- [ ] No merge conflicts with main branch
- [ ] CI/CD pipeline passes
- [ ] Self-review completed

## Development Setup

### Backend Setup

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run development server
python app.py
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

## Questions?

If you have questions or need help:
- Open a Discussion on GitLab
- Check existing documentation
- Reach out to maintainers

Thank you for contributing to Vidhyavaani! 🙏
