# NPM Package Publishing Guide

## Prerequisites

1. **Create NPM Account**: If you don't have one, sign up at [npmjs.com](https://npmjs.com)
2. **Verify Email**: Make sure your NPM account email is verified
3. **Install NPM CLI**: Ensure you have Node.js and NPM installed globally

## Publishing Steps

### 1. Login to NPM
```bash
npm login
```
Enter your NPM username, password, and email when prompted.

### 2. Navigate to Package Directory
```bash
cd npm-package
```

### 3. Build the Package
```bash
./build.sh
```
This creates the optimized package in the `dist/` directory.

### 4. Update Package Version (if needed)
```bash
npm version patch  # for bug fixes
npm version minor  # for new features  
npm version major  # for breaking changes
```

### 5. Publish to NPM
```bash
cd dist
npm publish
```

If this is your first time publishing, you might need:
```bash
npm publish --access public
```

## Package Information

- **Package Name**: `advanced-react-datatable`
- **Current Version**: `1.1.0`
- **Registry**: https://www.npmjs.com/package/advanced-react-datatable

## What Gets Published

The build process creates:
- `dist/index.js` - CommonJS bundle
- `dist/index.es.js` - ES modules bundle  
- `dist/index.d.ts` - TypeScript definitions
- `dist/components/` - Individual component files
- `package.json` - Package metadata
- `README.md` - Documentation
- `README-screenshot.png` - Demo screenshot

## Installation for Users

Once published, users can install with:
```bash
npm install advanced-react-datatable
```

## Verification

After publishing, verify your package:
1. Visit https://www.npmjs.com/package/advanced-react-datatable
2. Check that the version number updated
3. Review the README display
4. Test installation in a new project

## Updating the Package

For future updates:
1. Make your changes to the source code
2. Update version in `package.json`
3. Run `./build.sh`
4. Run `npm publish` from the `dist` directory

## Troubleshooting

### Common Issues

**"Package name already taken"**
- Choose a unique package name in `package.json`

**"You do not have permission to publish"**
- Make sure you're logged in with `npm whoami`
- Check package name doesn't conflict with existing packages

**"Version already exists"**
- Update the version number in `package.json`
- Use `npm version` command to increment properly

**"Missing dependencies"**
- Ensure all peer dependencies are listed correctly
- Check that build completes without errors

### Support

If you encounter issues:
1. Check NPM documentation: https://docs.npmjs.com/
2. Verify your account status at npmjs.com
3. Review package.json for correct configuration

## Security

- Never commit your NPM authentication token
- Use 2FA on your NPM account for security
- Review package contents before publishing
- Keep your package up to date with security patches