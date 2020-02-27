# Mobile Application Development
FBLA program for Mobile App Development

## Description
This application was created to enable chapter advisors to manage their chapters.  The app not only includes a list of all members, with the ability to add new ones, it also includes the ability to create meetings and take attendance.  In a world where paper is becoming more and more irrelevant, this app is the perfect solution for any FBLA chapter.  My application, using the Gluon Mobile library can be compiled to almost every device.  Android, Apple, or Windows devices are the most common to compile it to.  Compilation can be done through gradle. (https://docs.gradle.org/current/userguide/command_line_interface.html) 

## Prerequisites
1.  Node.js https://nodejs.org/en/download/
2.  npm(Comes with node.js) https://www.npmjs.com/
3.  Netbeans https://netbeans.org/downloads/8.0.2/
4.  Java https://java.com/en/download/
5.  Gradle (Might come preinstalled with netbeans) https://gradle.org/install/
6.  Gluon (Add throught netbeans as a plugin) https://gluonhq.com/products/mobile/
7.  A sqlite database viewer.  I used https://sqlitebrowser.org/dl/

## Installation for backend
1.  Download the complete folder
2.  Open API folder
3.  Open a new command prompt window by pressing windows + r, or searching "cmd"
4.  nagavate to the API folder
5.  run the command ```npm install```
6.  node_modules should have been created as a folder.  If it has not been created, create the folder "node_modules" then rerun the command
7.  Once completed in your command prompt run ```node index.js```
8.  The backend API should now be live.

## Installation for front end

1.  Open netbeans
2.  File -> import project from zip folder
3.  Navigate to the "MADApplication.zip and select it
4.  The code should now be completely loaded in netbeans.
5.  Run the code with the green arrow.  If there is an error right click on the project on the left and select clean and build.  Then try again!
6.  The application should now be live!

When both ends of the application are live, it should function perfectly.
I made a judge login, but feel free to make another!
```Firstname: FBLA, lastname: Judge, password FBLAJudge```
Note: the application is set to run on localhost:3000.  If their is a connection error, you may need to port forward port 3000.
## Libraries
1.  HTTP Library (org.apache.httpcomponents:httpclient:4.5.11)
2.  JSON Library (com.googlecode.json-simple)
3.  Gluon Mobile (com.gluonhq:charm:5.0.2)
## License
I used a standard MIT license, found in the project
All images used were copyright free
