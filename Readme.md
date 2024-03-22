# General setup
- clone project into %projectpath%

## Back-end

### Installation
- install [.net cli 6.0](https://download.visualstudio.microsoft.com/download/pr/68ff350e-8b8d-4249-8678-570d5025f8e3/2178c63b5572b6016647525b53aa75b5/dotnet-sdk-6.0.420-win-x64.exe)

### Setup database
- SET DBPATH=%projectpath%\fullstack\fullstack.db
- cd %projectpath%\fullstack\back-end\.net\infrastructure
- dotnet ef database update
- cd %projectpath%\fullstack\back-end\.net\seeddata
- dotnet run -- %userprofile%\\Documents\\fullstack\\back-end\\.net\\SeedData

### Run project
- cd %projectpath%\fullstack\back-end\.net\api
- dotnet run
- start chrome [Local API server](https://localhost:7297/)

## Front-end

- cd %projectpath%\fullstack\front-end\angular
- npm i
- code %projectpath%\fullstack\front-end\angular\src\environments\environment.ts
- keep line 7 for mock server
- keep line 8 for api local server

### Run project
- npm run start
- start chrome [Local Angular server](https://localhost:4200/)

## Mock-server

### Setup
- cd %projectpath%\fullstack\back-end\json-server
- npm i
- npm run start

## Troubleshooting Front-end

### Enable ssl (Git bash should be installed)
- start cmd
- SET set NODE_OPTIONS=--openssl-legacy-provider

### Use older version of node
- Install nvm
- nvm use 10 ?
