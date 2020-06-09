# homeFit - curated workout videos

## Live Link
https://limitless-beach-09379.herokuapp.com/

## Description
Hello all! I built this application during the 2020 quarantine to stay fit and accountable for a healthy lifestyle. The workouts are organized by 10, 20, and 30 minute videos. Users can sign-up/log into their accounts to view the curated videos but they cannot add unless they are an "Admin" user.

## Key features/wins
- Created logic so only the "Admin" had visibility to the "add workout", "edit workout", and "delete workout" options. However, users can still access new and edit by going the the correct URL.

```
<iframe src="<%= workouts[i].video.replace(/watch\?v\=/, 'embed/') %>" frameborder="0" allow="encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
```

- Used regular expressions to replace text in the URL with the embedded URL link.
- Able to sort content by alphabet
- Created separate .ejs files that would find and display videos by the length of the workout.

## Installation Instructions
