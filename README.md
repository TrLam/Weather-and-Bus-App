# Introduction
Toronto Weather and Bus is a simple web application with two main features:
* Displaying current weather in Toronto
* Predicting in real time when the next TTC bus of your choice will arrive

This web app is for Torontonians who are tired of switching between many platforms to know the weather and their bus time every morning before they leave the house. 

# Demo
Available [here] (http://tranglam.ca/wbApp/)

# Structure
## Frameworks and Libraries
* AngularJS
* Angular UI-Router
* Bootstrap
* X2JS

## App Structure

```javascript
app/
----- components/	// controllers
---------- bus-controller.js	// controller for displaying bus information
---------- bus-edit-controller.js	// controller for editing, adding new route
---------- weather-controller.js	// controler for displaying weather data
----- core/	// services, frameworks and libraries
---------- bus/
--------------- bus-edit-service.js	// service for editing, adding new route
--------------- bus-service.js	// service for making API calls and storing necessary bus data
---------- ui-router/
---------- weather/
--------------- weather-service.js	// service for making API calls and storing necessary weather data
---------- x2js/
---------- helper-service.js	// service that holds all helper functions
---------- server-service.js	// service that makes request calls to API servers
css/	// custom css
img/	// All images and icons
partials/
----- edit.html	// bus edit view
----- show.html	// bus result view
app.js
index.html
```

# User Guide
## Weather :sunny:
Weather is updated every 30 minutes.

You can also get the latest weather update by clicking/tapping the Toronto skyline banner.

## Bus :oncoming_bus:
Default bus routes: 71 and 134

Bus time is updated every minute.

You can also get the the latest bus update by clicking/tapping the button with the route number.

### To edit bus routes
Click/tap the empty bus button or the pencil button
![edit](https://raw.githubusercontent.com/TrLam/Weather-and-Bus-App/master/edit1.jpg)
### To remove a route
![remove](https://raw.githubusercontent.com/TrLam/Weather-and-Bus-App/master/edit2.jpg)
### To add a new route
![add](https://raw.githubusercontent.com/TrLam/Weather-and-Bus-App/master/edit3.jpg)

## Limitations
* The app is only available online for now
* The app only tracks 3 routes at a time. If the app is already tracking 3 routes, user needs to remove an existing route to add a new one
* The app does not save any user input at the moment so refreshing/reloading the page will refresh the tracked routes to default routes (71 and 134)
* No min and max temperature (I’m looking for a new weather API to update this soon)

# API Reference
* [Current weather data from Open Weather Map API] (http://openweathermap.org/current)
* [Next Bus Public XML Feed] (http://www.nextbus.com/xmlFeedDocs/NextBusXMLFeed.pdf)
* [Public Transit Agency List] (http://webservices.nextbus.com/service/publicXMLFeed?command=agencyList)

# Modification
If you want to modify how Toronto Weather and Bus app is implemented, please follow GitHub Help instruction on how to [Fork a Repo](https://help.github.com/articles/fork-a-repo/)

## To change bus agency and city
Check out bus-service.js and weather-service.js and simply change the information in the API links

# Bugs, Feedback and Contribution
Thank you for your interest in contributing to this project :two_hearts:

Please feel free to use the [GitHub Issues](https://github.com/TrLam/Weather-and-Bus-App/issues)

