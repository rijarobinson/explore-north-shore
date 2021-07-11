# Explore North Shore (Udacity Neighborhood Map Project)
### (In fullfillment of Udacity's Full Stack Developer Program)

Explore North Shore was developed as part of Udacity's Full Stack Developer Nanodegree. It contains the code for a system designed to share information on favorite haunts on Chicago's North Shore sites. The purpose of this project was to develop a site and functions that would pass the requirements of the Neighborhood Map project.

## Table of Contents
 * [Functionality](#functionality)
 * [Structure Overview](#structure-overview)
 * [Technologies](#technologies)
 * [Folders & Files](#folders-files)
 * [Libraries & Modules](#libraries-modules)
 * [Using the Software](#using-software)

<a id="functionality"></a>
## Functionality
The *Explore North Shore* app is a responsive site that contains functionality for browsing pre-defined locations using the Google Maps API and FOURSQUARE data. No login is necessary for users to access. Users can filter the locations using a text search box that filters on the name and address of the location. They can also filter by the listed categories by clicking a category name or marker in the list. Locations are displayed on the map, and markers are filtered along with text data. A user can click on a location to see location details and have the marker highlighted on the map. They can also click on the marker to see the data. Tips from FOURSQUARE and a link to the FOURSQUARE listing (if available) appear on the map marker infowindow. Users may reset the map markers and filters at any time.
<a id="structure-overview"></a>
## Structure Overview

Data is located in the **js/data.js** file.
<a id="technologies"></a>
## Technologies

| Tool Used  | Purpose                                      | Notes                                     | About         |
| ---------- | -------------------------------------------- | ----------------------------------------- | ------------- |
| Windows OS | developer platform                           |                                           | [More info](http://www.microsoft.com) |
| GitHub     | version control       |       | [More info](https://en.wikipedia.org/wiki/GitHub) |
| Git Bash   | To interact with GitHub                      | Provides Unix-Style terminal              | [More info](https://en.wikipedia.org/wiki/Bash_(Unix_shell)) |
| JavaScript     | language used to program functions       | JavaScript files detailed below           | [More info](https://www.javascript.com/) |
| Knockout      | Javascript Library                        | Allows dynamic updating of DOM and more   | [More info](http://knockoutjs.com/) |
| jquery/AJAX | JavaScript Library      | Allows interaction with APIs        | [More info](https://jquery.com/) |
| Google Maps API | Interface for utilizing Google Maps     | TGet maps, set markers, infowindow        | [More info](https://developers.google.com/maps/) |
| FOURSQUARE API | Interface for using data from FOURSQUARE | Translate address to geocode and get maps | [More info](https://developer.foursquare.com/) |
| Bootstrap | Framework for front end                       | Aids in responsive design                 | [More info](http://getbootstrap.com/) |
| CSS       | Language for styling web pages                |                                           | [More info](http://www.w3schools.com/css/css_intro.asp) |
| HTML      | Language for structuring web pages            |                                           | [More info](http://www.w3schools.com/html/html_intro.asp) |
| JSON      | Data Interchange Format                       | App utilizes JSON datasets                | [More info](http://www.json.org/) |

<a id="folders-files"></a>
## Folders & Files

| File/Folder      | Purpose                             |
| ---------------- | ----------------------------------- |
| index.html       | main html page                      |
| js/app.js        | file containg ViewModel             |
| js/data.js       | contains application datasets API   |
| js/map_v3.js     | contains map functions              |
| js/helpers.js    | misc functions used by app          |
| images Folder    | Application images                  |
| css/styles.css   | CSS file with styles                |

<a id="libraries-modules"></a>
## Libraries & Modules
| Library or Module | Purpose                                                        |
| ----------------- | -------------------------------------------------------------- |
| Bootstrap         | Framework for responsive design               |
| jQuery            | Allows interaction with DOM elements          |
| AJAX              | Helps get data from FOURSQUARE (in this app)  |
| Knockout          |        |

<a id="using-software"></a>
## Using the Site

**To run the site**, place all files in the same folder, open index.html in a web browser.

**To customize the files**, you can open the index.html file in your favorite text editor and make changes as desired.You can customize the data in **js/data.js**.

You will need to get your own API key for use of Google and FOURSQUARE APIs.

Instructions for this project were provided by [Udacity](http://www.Udacity.com). Additional instruction on Full Stack Application Development is available by signing up for a class on their site. No code was directly copied and pasted, but resources such as [Stack Overflow](http://www.stackoverflow.com) and Udacity's instructional videos were used for guidance. Additional guidance on this app provided by Udacity Mentor Sarah Maris.

I welcome any feedback on this project at marija@springmail.com.
