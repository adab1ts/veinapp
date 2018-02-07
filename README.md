# Veinapp

[![Build Status](https://travis-ci.org/adab1ts/veinapp.svg?branch=master)](https://travis-ci.org/adab1ts/veinapp)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://choosealicense.com/licenses/mit/)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)

Map your vicinity and search for places around.


## Getting Started

This application relies on [Firebase Realtime Database](https://firebase.google.com/docs/database/) as its data store. So first sign in to [Firebase](https://firebase.google.com/), head to the console and create your project. Then grab your initialization data. More on this below.

This application also relies on [Mapbox](https://www.mapbox.com/geocoding/) as its geocoding service provider. Create a [Mapbox account](https://www.mapbox.com/signup/) and grab your Access token as explained [here](https://www.mapbox.com/help/how-access-tokens-work/).

Now, [fork](https://help.github.com/articles/fork-a-repo/) the main [Veinapp repository](https://github.com/adab1ts/veinapp.git) from GitHub and then...

```shell
# Install Angular CLI globally
npm install -g @angular/cli@1.0.0-rc.2

# Clone your fork (https://help.github.com/articles/cloning-a-repository/):
git clone git@github.com:<github username>/veinapp.git

# Go to the project directory:
cd veinapp

# Install project dependencies:
npm install

# Edit Mapbox configuration files and update it with your data
cp src/config/mapbox.{ts.sample,ts}
vi src/config/mapbox.ts

cp src/config/mapbox.{ts.sample,prod.ts}
vi src/config/mapbox.prod.ts

# Edit Firebase configuration files and update it with your data
cp src/config/firebase.{ts.sample,ts}
vi src/config/firebase.ts

cp src/config/firebase.{ts.sample,prod.ts}
vi src/config/firebase.prod.ts

# To populate firebase with the list of places and their coordinates:
# 1. Place your JSON/CSV data files at db/data folder following this structure:
#    [{
#      "name": "the name",
#      "address": "the address",
#      "zip": "00000",
#      "city": "the city",
#      "telephone": "999 999 999",
#      "email": "email@email.com",
#      "web": "www.the-web.com",
#      "group": "the group",
#      "type": "the type",
#      "latitude": "00.00000",
#      "longitude": "00.00000"
#     },
#     ...
#    ]

# 2. In your console at the application root execute the following script
#    (check out the examples in the usage information):
npm run db:populate

# 3. In firebase console go to the rules tab in your project view
#    and add the following rule in order to index and have better querys:
#    "coords": {
#      ".indexOn": ["g"]
#    }
    
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

Contributions of any kind are welcome!

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<img alt="laklau" src="https://avatars.githubusercontent.com/u/6210292?v=3&s=117" width="117"> |[<img alt="zuzust" src="https://avatars.githubusercontent.com/u/351530?v=3&s=117" width="117">](https://github.com/adab1ts/veinapp/commits?author=zuzust) |[<img alt="plastikaweb" src="https://avatars.githubusercontent.com/u/5324001?v=3&s=117" width="117">](https://github.com/adab1ts/veinapp/commits?author=plastikaweb) |
:---: |:---: |:---: |
[Klaudia Alvarez](https://github.com/laklau) |[Carles Muiños](https://github.com/zuzust) |[Carlos Matheu](https://github.com/plastikaweb) |
<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

See the [LICENSE](LICENSE) file for license rights and limitations.
