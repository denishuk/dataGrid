# Testing Guide

## Overview

This project includes comprehensive testing infrastructure to ensure code quality and reliability. The testing setup includes unit tests, integration tests, and coverage reporting.

## Test Framework

- **Testing Library**: Vitest with jsdom environment
- **React Testing**: @testing-library/react for component testing
- **Mocking**: Built-in Vitest mocking capabilities
- **Coverage**: V8 coverage provider with multiple report formats

## Running Tests

### Basic Commands

```bash
# Run all tests once
npx vitest run

# Run tests in watch mode
npx vitest

# Run tests with coverage
npx vitest run --coverage

# Run tests with UI
npx vitest --ui
```

### Coverage Reports

Coverage reports are generated in multiple formats:
- **Text**: Console output during test runs
- **HTML**: Detailed interactive report in `coverage/index.html`
- **LCOV**: For integration with coverage services
- **JSON**: Machine-readable format for CI/CD

## Test Structure

### Core Functionality Tests
Location: `client/src/components/DataTable/__tests__/core-functionality.test.tsx`

Tests include:
- ✅ Data filtering with various operators
- ✅ Data sorting (ascending/descending)
- ✅ Data grouping and aggregation
- ✅ Pagination calculations
- ✅ Summary statistics
- ✅ Column configuration
- ✅ Filter operators validation
- ✅ Export data formatting

### Utility Tests
Location: `client/src/lib/__tests__/utils.test.ts`

Tests include:
- ✅ Class name merging (cn function)
- ✅ Conditional class handling
- ✅ Tailwind conflict resolution
- ✅ Complex scenarios

### Component Tests
Location: `client/src/components/DataTable/__tests__/`

Comprehensive component testing covering:
- DataTable main component
- Column filters and configuration
- Action bar functionality
- Grouping and sorting
- Pagination controls
- Row selection and editing

## Coverage Targets

Current coverage thresholds:
- **Statements**: 70%
- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%

## CI/CD Integration

### GitHub Actions
The project includes automated testing via GitHub Actions:

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm test
      - run: npm run test:coverage
```

### Coverage Reporting
Integration with Codecov for coverage tracking:
- Automatic coverage uploads
- Pull request coverage reports
- Coverage trend tracking

## Git Repository Badges

Add these badges to your README.md:

```markdown
[![Tests](https://github.com/username/repo/actions/workflows/test.yml/badge.svg)](https://github.com/username/repo/actions/workflows/test.yml)
[![Coverage Status](https://codecov.io/gh/username/repo/branch/main/graph/badge.svg)](https://codecov.io/gh/username/repo)
```

## Writing New Tests

### Test File Structure
```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

describe('ComponentName', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should test specific behavior', () => {
    // Test implementation
    expect(result).toBe(expected)
  })
})
```

### Best Practices
1. **Clear Test Names**: Use descriptive test names
2. **Isolated Tests**: Each test should be independent
3. **Mock External Dependencies**: Use vi.mock() for external services
4. **Test User Interactions**: Focus on user-facing behavior
5. **Coverage Goals**: Aim for meaningful coverage, not just numbers

## Debugging Tests

### Common Issues
1. **Component Not Rendering**: Check for missing providers or context
2. **Async Operations**: Use waitFor() for async state changes
3. **Mock Functions**: Ensure mocks are properly configured
4. **DOM Queries**: Use appropriate queries (getBy, findBy, queryBy)

### Debug Commands
```bash
# Run specific test file
npx vitest run path/to/test.file.ts

# Run tests with verbose output
npx vitest run --reporter=verbose

# Generate coverage report
npx vitest run --coverage --reporter=html
```

## Performance Considerations

- Tests run in parallel by default
- Use beforeEach/afterEach for setup/cleanup
- Mock heavy operations to improve test speed
- Consider test.concurrent for independent tests

## Integration with Development

### Pre-commit Hooks
Consider adding pre-commit hooks to run tests:
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm test"
    }
  }
}
```

### IDE Integration
Most IDEs support Vitest integration:
- VSCode: Vitest extension
- WebStorm: Built-in Vitest support
- Vim/Neovim: Various plugins available

## Future Enhancements

Planned testing improvements:
- [ ] E2E tests with Playwright
- [ ] Visual regression testing
- [ ] Performance benchmarking
- [ ] Accessibility testing
- [ ] Mobile responsiveness tests