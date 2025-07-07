# Build Instructions

## Quick Build

Run the automated build script:
```bash
chmod +x build.sh
./build.sh
```

## Manual Build Steps

1. **Clean previous build:**
   ```bash
   rm -rf dist
   ```

2. **Build with Vite:**
   ```bash
   npx vite build --config vite.config.simple.ts
   ```

3. **Add TypeScript definitions:**
   The build script automatically adds `index.d.ts` with complete type definitions.

4. **Test the package:**
   ```bash
   node test-package.js
   ```

## Build Output

The build creates:
- `dist/index.es.js` - ES Module bundle (~213KB)
- `dist/index.cjs.js` - CommonJS bundle (~139KB) 
- `dist/index.d.ts` - TypeScript definitions (~4KB)

## Package Structure

```
npm-package/
├── dist/                   # Built package files
│   ├── index.es.js        # ES module
│   ├── index.cjs.js       # CommonJS module  
│   └── index.d.ts         # TypeScript definitions
├── src/                   # Source files
├── package.json           # Package configuration
├── vite.config.simple.ts  # Working Vite config
├── build.sh              # Automated build script
└── test-package.js       # Import verification test
```

## Publishing

After successful build:
```bash
npm publish
```

## Troubleshooting

- **Build hangs**: Use `vite.config.simple.ts` instead of main vite.config.ts
- **Module not found**: Ensure dist contains .js files, not .ts files
- **Import errors**: Run test-package.js to verify exports
- **Type errors**: TypeScript definitions are auto-generated in build script