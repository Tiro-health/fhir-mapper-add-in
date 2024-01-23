# Node version
check `.nvmrc``

# Install dependencies

`npm install`

# Build

`npm run build`

The build artifacts will be stored in the `dist/` directory.
Use the `manifest.xml` to sideload the add-in.

[https://learn.microsoft.com/en-us/office/dev/add-ins/testing/sideload-an-office-add-in-on-mac](Side load add-in on Mac)
[https://learn.microsoft.com/en-us/office/dev/add-ins/testing/create-a-network-shared-folder-catalog-for-task-pane-and-content-add-ins](Side load add-in on Windows)

# Clear Cache:
[https://learn.microsoft.com/en-us/office/dev/add-ins/testing/clear-cache](Clear Cache)
```bash
rm -rf  ~/Library/Containers/com.microsoft.Excel/Data/Library/Caches/*
```


# Enable Debugging

For Mac OS X?
Make sure you have installed Excel via Office 365, and not the App Store.
[https://learn.microsoft.com/en-us/office/dev/add-ins/testing/debug-office-add-ins-on-ipad-and-mac](Debug Office Add-ins on iPad and Mac)

```bash
defaults write com.microsoft.Excel OfficeWebAddinDeveloperExtras -bool true
```


# Test on new devices:
https://learn.`icrosoft.com/en-us/office/dev/add-ins/testing/sideload-an-office-add-in-on-mac

### Development

## Setup development server:
```bash
npm run dev-server
```

## Launch dev add-in:
```bash
npm start
```

