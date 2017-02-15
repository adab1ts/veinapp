# Veinapp

[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://choosealicense.com/licenses/mit/)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)

Map your vicinity and search for places around.


## Getting Started

This application relies on [Firebase Realtime Database](https://firebase.google.com/docs/database/) as its data store. So first sign in to [Firebase](https://firebase.google.com/), head to the console and create your project. Then grab your initialization data as explained [here](https://www.youtube.com/v/k1D0_wFlXgo?start=60&end=104&autoplay=1). More on this below.

Now, [fork](https://help.github.com/articles/fork-a-repo/) the main [Veinapp repository](https://github.com/adab1ts/veinapp.git) from GitHub and then...

```shell
# Install Angular CLI globally
npm install -g @angular/cli@latest

# Clone your fork (https://help.github.com/articles/cloning-a-repository/):
git clone git@github.com:<github username>/veinapp.git

# Go to the project directory:
cd veinapp

# Install project dependencies:
npm install

# Edit Firebase configuration file and update it with your data
cp src/config/firebase.{ts.sample,ts}
vi src/config/firebase.ts

# Edit Mapzen configuration file and update it with your data
cp src/config/mapzen.{ts.sample,ts}
vi src/config/mapzen.ts

# Run the development server:
ng serve
```

Check the [Contributing Guidelines](CONTRIBUTING.md) out for further information.


## Contact

Email:    info[@]adabits[.]org  
Twitter:  [@adab1ts](https://twitter.com/adab1ts)  
Facebook: [Adab1ts](https://www.facebook.com/Adab1ts)  
LinkedIn: [adab1ts](https://www.linkedin.com/company/adab1ts)  


## Contributors

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification.
Contributions of any kind are welcome!

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars.githubusercontent.com/u/5324001?v=3" width="100px;"/><br /><sub>Carlos Matheu</sub>](https://github.com/adab1ts/veinapp/commits?author=plastikaweb) | <img src="https://avatars.githubusercontent.com/u/6210292?v=3" width="100px;"/><br /><sub>Klaudia Alvarez</sub> | [<img src="https://avatars.githubusercontent.com/u/946661?v=3" width="100px;"/><br /><sub>Sergio Gimeno</sub>](https://github.com/adab1ts/veinapp/commits?author=sgimeno) | [<img src="https://avatars.githubusercontent.com/u/351530?v=3" width="100px;"/><br /><sub>Carles Muiños</sub>](https://github.com/adab1ts/veinapp/commits?author=zuzust) |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

See the [LICENSE](LICENSE) file for license rights and limitations.
