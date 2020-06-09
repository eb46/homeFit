# homeFit - curated workout videos

## Live Link
https://limitless-beach-09379.herokuapp.com/

## Description
Hello all! I built this application during the 2020 quarantine to stay fit and accountable for a healthy lifestyle. The workouts are organized by 10, 20, and 30 minute videos.

## Technologies used
- HTML
- CSS
- Node.js
- Javascript

## Approach
I wanted to build a simple/minimal layout and design. I also wanted to limit the user to only being able to view the content and have a separate Admin user that would be able to add, edit, and delete content.

## Installation Instructions
- Access to Internet and web-browser.

## Key features/wins
- Created logic so only the "Admin" had visibility to the "add workout", "edit workout", and "delete workout" options. However, users can still access new and edit by going the the correct URL.
- Used regular expressions to replace text in the URL with the embedded URL link.

```
<iframe src="<%= workouts[i].video.replace(/watch\?v\=/, 'embed/') %>" frameborder="0" allow="encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
```

- Able to sort content by alphabet
- Created separate .ejs files that would find and display videos by the length of the workout.

## Unsolved Problems
- Creating author relationship
- More restricted access and role specific permissions
