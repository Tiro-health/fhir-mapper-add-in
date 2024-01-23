# FHIR Mapper

## Sideload the add-in for testing

You can test the continous build of the add-in by sideloading it into Excel. To do this, you'll need a `manifest.xml` file that describes the add-in an import it into Excel. Depending on your platform (Mac or Windows), you'll need to place the `manifest.xml` file in a different location.

1. Download the `manifest.xml` file from the [latest release](https://fhir-mapper.tiro.health/manifest.xml).

2. Follow the instructions for [sideloading an add-in on Mac](https://docs.microsoft.com/en-us/office/dev/add-ins/testing/sideload-an-office-add-in-on-ipad-and-mac) or [sideloading an add-in on Windows](https://learn.microsoft.com/en-us/office/dev/add-ins/testing/create-a-network-shared-folder-catalog-for-task-pane-and-content-add-ins#sideload-your-add-in).


## Setup development environment
You'll need to install the following tools to build and run the add-in locally:
- [Node.js](https://nodejs.org/en/download/) (version 18 LTS) and npm (version 6.14.15)
- [Visual Studio Code](https://code.visualstudio.com/download) (recommended)

The required node version is also specified in the `.nvmrc` file.

A good video series on setting up your development environment for Office Add-ins can be found [here](https://www.youtube.com/playlist?list=PLcFcktZ0wnNnil2ID209GA8B3Jj0Ffb7I).
### Install dependencies

`npm install`

You'll see a new folder `node_modules` appear in your project.

### Build

`npm run build`

You'll see a new folder `dist` appear in your project. This folder contains the files that are required to run the add-in.
This step is important when changing the `manifest.xml` file (description of the ribbon, metadata, runtime, ...) or the `functions.json` (description of the Excel functions).
 when sideloading the add-in.
Use the `manifest.xml` to sideload the add-in.

### Setup development server:
Run the following command to start the development server:

```bash
npm run dev-server
```

This will start a local server on port 3000. You can verify that the server is running by navigating to [http://localhost:3000/manifest.xml](http://localhost:3000/manifest.xml). You should see the contents of the `manifest.xml` file.

## Launch dev add-in:
```bash
npm start
```
This will open Excel and load the add-in. The add-in needs some loading time, so be patient. You can seed the loading status in the status bar of Excel. Once the add-in is loaded, you'll receive a notification in the top right corner of Excel.

Click on the home tab and you should see a button called "FHIR Mapper". Click on it and you should see the add-in.

## Troubleshooting

### Clear Cache (on Mac)

Sometimes the add-in will not load properly. This can be fixed by clearing the cache. [Clear Cache](https://learn.microsoft.com/en-us/office/dev/add-ins/testing/clear-cache)

```bash
rm -rf  ~/Library/Containers/com.microsoft.Excel/Data/Library/Caches/*
```

### Enable Debugging (on Mac)
You can enable debugging in Excel to see the console (like in browser) of the add-in:
```bash
defaults write com.microsoft.Excel OfficeWebAddinDeveloperExtras -bool true
```

Now you can open the developer tools by right clicking on the add-in and selecting "Inspect Element".(Mac)

For Mac OS X?
Make sure you have installed Excel via Office 365, and not the App Store.
[Debug Office Add-ins on iPad and Mac](https://learn.microsoft.com/en-us/office/dev/add-ins/testing/debug-office-add-ins-on-ipad-and-mac)

