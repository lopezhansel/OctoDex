# [OctoDex](http://lopezhansel.com:2000)
Github's Octocat + Rolodex = OctoDex.

Easily create and share vCards using your Github information.
## Features
* **Inline component** - Custom [inline-directive](https://github.com/lopezhansel/OctoDex/blob/master/src/js/inlineDirective.js) to easily edit and user information when selected .
* [**Shareable links**](http://lopezhansel.com:2000/#/profile/lopezhansel) to user profiles.
* **Responsive Design** - Prioritizing mobile layout first utilizing Angular Material's Flexbox.
* **Up-to-Date About Page** custom gulp task converting [**readme**](http://lopezhansel.com:2000/#/about) markdown file to html template.

## Library and Frameworks
* **Node.js, Express.js, Angular.js, and MongoDB**
* [**Angular Material**](https://material.angularjs.org/latest/demo/tabs) Material design Components built by Google
* [**Angular Router**](https://docs.angularjs.org/api/ngRoute/directive/ngView) Front End Router allowing Single Page Application.
* [**$resource**](https://docs.angularjs.org/api/ngResource/service/$resource) A factory which creates a resource object that lets you interact with RESTful server-side data sources.
* [**Passport.js**](https://github.com/jaredhanson/passport) -  Authentication middleware for Node.js.
* [**passport-github**](https://github.com/jaredhanson/passport-github) - Log in using your Github account
* [**Markdown-to-html**](https://github.com/cwjohan/markdown-to-html) Converts markdown text to HTML. A readable stream plus utilities and web demo.
* [**vCards JS**](https://github.com/enesser/vCards-js) Create vCards to import contacts into Outlook, iOS, Mac OS, and Android devices from your website or application.

## To-Do List
- [ ] add css to od-readme directive 
- [ ] Let user know if profile is an octodex user or not 
- [ ] Add Repo Project View
- [ ] Upload Image to Node server
- [ ] Add Organization/Group  View
- [ ] Use Ng-file Upload
- [ ] BUG: If POST timeout css color wont change 
- [ ] Fix: "UPDATE PROFILE" button showing up everywhere 
- [ ] Show random OctoDex Users at home page. 
- [ ] Comment more code 
- [ ] Make Server even more restful 
- [x] Fixed service.client.isLoggedIn getting overwritten [](https://github.com/lopezhansel/OctoDex/commit/)
- [x] add loading animation when loading user in odCard directive [94eb646](https://github.com/lopezhansel/OctoDex/commit/94eb646)
- [x] Save github response headers into mongo [1d28b7c](https://github.com/lopezhansel/OctoDex/commit/1d28b7c) [6981285](https://github.com/lopezhansel/OctoDex/commit/6981285) 
- [x] Make jobTitle editable on od-Card [1d28b7c](https://github.com/lopezhansel/OctoDex/commit/1d28b7c) 
- [x] Add "Following" tab to profile view [f0938c5](https://github.com/lopezhansel/OctoDex/commit/f0938c5) 
- [x] Create and Download vcf contact file [fbecb24](https://github.com/lopezhansel/OctoDex/commit/fbecb24) [8fc3dfa](https://github.com/lopezhansel/OctoDex/commit/8fc3dfa)
- [x] Convert ReadMe Markdown files to html [c52ffd2](https://github.com/lopezhansel/OctoDex/commit/c52ffd2)
- [x] Rewrite and add links to readme.md [8b07647](https://github.com/lopezhansel/OctoDex/commit/8b07647)
- [x] Adding about readme view trigger and route [c6a8658](https://github.com/lopezhansel/OctoDex/commit/c6a8658) [d1494c5](https://github.com/lopezhansel/OctoDex/commit/d1494c5)
- [x] Allowing user to download vCard from users [8fc3dfa](https://github.com/lopezhansel/OctoDex/commit/8fc3dfa) 
- [x] Fix "unable to import vCard" data corruption [f51fbb9](https://github.com/lopezhansel/OctoDex/commit/f51fbb9)
- [x] Client attempts to POST/save when not logged in. [0a20d84](https://github.com/lopezhansel/OctoDex/commit/0a20d84)
- [x] clicking "Share Profile" button closes sidenav [e749d0c](https://github.com/lopezhansel/OctoDex/commit/e749d0c)
- [x] repo page refactorU too slow because of MongoDb retrieving too much data [801d13d](https://github.com/lopezhansel/OctoDex/commit/801d13d)
- [x] shareable link [7d209a5](https://github.com/lopezhansel/OctoDex/commit/7d209a5)
- [x] Adding Jobtitle,LinkedIn,Facebook, and Twiter options [4c9d23d](https://github.com/lopezhansel/OctoDex/commit/4c9d23d)
- [x] add toggleSidenav() when clicking on sidenav list item [83de42b](https://github.com/lopezhansel/OctoDex/commit/83de42b)
- [x] Perfect Mobile layout of profileView [83de42b](https://github.com/lopezhansel/OctoDex/commit/83de42b) [efed9ec](https://github.com/lopezhansel/OctoDex/commit/efed9ec)[a845ff1](https://github.com/lopezhansel/OctoDex/commit/a845ff1)
- [x] Fix: Update button in accountView [50bcbe3](https://github.com/lopezhansel/OctoDex/commit/50bcbe3)
- [x] Make Group page [c8e40a2](https://github.com/lopezhansel/OctoDex/commit/c8e40a2) [0426a6e](https://github.com/lopezhansel/OctoDex/commit/0426a6e)
- [x] Fixing Layout Issues [b0b43bf](https://github.com/lopezhansel/OctoDex/commit/b0b43bf)
- [x] Change Color Scheme [a845ff1](https://github.com/lopezhansel/OctoDex/commit/a845ff1)
- [x] Make Account Setting Page for editing more information. [428e3a5](https://github.com/lopezhansel/OctoDex/commit/428e3a5)
- [x] Break views into directive Components  [9cb5340](https://github.com/lopezhansel/OctoDex/commit/9cb5340)
- [x] "Sign In" button doesn't update after logging in [e2ba986](https://github.com/lopezhansel/OctoDex/commit/e2ba986)
- [x] Improve sidenav [47fdb4e](https://github.com/lopezhansel/OctoDex/commit/47fdb4e)[44413b1](https://github.com/lopezhansel/OctoDex/commit/44413b1)
- [x] Add sidenav [4da0259](https://github.com/lopezhansel/OctoDex/commit/4da0259)
- [x] Remove Full Profile Button [0e16448](https://github.com/lopezhansel/OctoDex/commit/0e16448)
- [x] add plumber to gulpfile [e1c395f](https://github.com/lopezhansel/OctoDex/commit/e1c395f)
- [x] Fix Social Profiles Icon. [7125bf9](https://github.com/lopezhansel/OctoDex/commit/7125bf9) [e3f879e](https://github.com/lopezhansel/OctoDex/commit/e3f879e)
- [x] Improve Responsive Design [f766a43](https://github.com/lopezhansel/OctoDex/commit/f766a43)
- [x] Use md-tabs for user profiles [4c9bc31](https://github.com/lopezhansel/OctoDex/commit/4c9bc31)
- [x] Search for users [f8b1096](https://github.com/lopezhansel/OctoDex/commit/f8b1096) [1e1c1d6](https://github.com/lopezhansel/OctoDex/commit/1e1c1d6) 
- [x] Comment more code and simplify [9ecc990](https://github.com/lopezhansel/OctoDex/commit/9ecc990) [f61f003](https://github.com/lopezhansel/OctoDex/commit/f61f003)
- [x] Simplify Code [f61f003](https://github.com/lopezhansel/OctoDex/commit/f61f003) [2693cf7](https://github.com/lopezhansel/OctoDex/commit/2693cf7) 
- [x] Matching to schema to Githubs properties [5de26a4](https://github.com/lopezhansel/OctoDex/commit/5de26a4) [6273ee0](https://github.com/lopezhansel/OctoDex/commit/6273ee0) [b4b6960](https://github.com/lopezhansel/OctoDex/commit/b4b6960)
- [x] UX: Changing color properties when Updating [04e8fdd](https://github.com/lopezhansel/OctoDex/commit/04e8fdd)
- [x] See if octoDex User first then check github. [52b91fa](https://github.com/lopezhansel/OctoDex/commit/52b91fa)
- [x] Simplify and improve inlineDirective performance [60bdd03](https://github.com/lopezhansel/OctoDex/commit/60bdd03) [78acd2d](https://github.com/lopezhansel/OctoDex/commit/78acd2d)
- [x] BUG : service.updateClient(); is being called by getOtherUsers [c4269ba](https://github.com/lopezhansel/OctoDex/commit/c4269ba)
- [x] Making Server a bit more restful [0d1ed05](https://github.com/lopezhansel/OctoDex/commit/0d1ed05) [f8b1096](https://github.com/lopezhansel/OctoDex/commit/f8b1096) [08e59a2](https://github.com/lopezhansel/OctoDex/commit/08e59a2) [6f04b09](https://github.com/lopezhansel/OctoDex/commit/6f04b09)
- [x] improve service.getFollowersAndRepos. [b783c6c](https://github.com/lopezhansel/OctoDex/commit/b783c6c) 
- [x] Improve api calls retrieving Repos and Followers; [0efde16](https://github.com/lopezhansel/OctoDex/commit/0efde16)
- [x] learn to implement $q or $resource service from angular [c468925](https://github.com/lopezhansel/OctoDex/commit/c468925)
- [x] Inline directive not edit more when not in client profile [60bdd03](https://github.com/lopezhansel/OctoDex/commit/60bdd03)
- [x] add a variable for $dirty  [1c3f58f](https://github.com/lopezhansel/OctoDex/commit/1c3f58f)
- [x] Enable "Full Profile" Button [ea1567c](https://github.com/lopezhansel/OctoDex/commit/ea1567c)
- [x] Fixed other github users not being able to log in [e9c1f9c](https://github.com/lopezhansel/OctoDex/commit/e9c1f9c) [aaa36f9](https://github.com/lopezhansel/OctoDex/commit/aaa36f9)
**Future Possibility**
- [ ] Highlight Syntax
**Not a Priority**
- [ ] home page/od-card not flexing (iOS safari)
- [ ] Sidenav flex problem  (iOS safari)
- [ ] edit page padding at bottom (iOS safari)
- [ ] about page flex layout-fill (iOS safari)
