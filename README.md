# odd-duck

This website pushes the user through a voting system to determine their favorite products by clicking the pictures that pop up.  Once they've completed this, statistcs showing the amount of views and clicks for each picture will be rendered.

### Lab 11

Got the core site running with rendering clickable images and tallying up the views/clicks which are shown with a results button.

### Lab 12 Additions

Added a couple of CSS elements and more will probably be worked on after I submit.  Added a visual representation of data with a bar graph.  Pictures also won't be shown for at least one round after appearing as a selection option.

### Lab 13 Additions

Added local storage to the website.  Images are saved so that viewcount isn't reset when refreshing the page.  Graph reflects stored data when rendered. Also added a reset button and made some progress with Grid.

## Links and Resources

[Color Palette](https://color.adobe.com/create/color-wheel)\
[CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)

## Reflections and Comments

**Lab 12**: Had a lot of issues trying to implement my idea for ensuring pictures don't repeat in a subsequent round.  I ended up talking a TA (thanks Ben!) that had a completely different approach to the idea, but after he explained the logic it was actually pretty easy to implement the code.

**Lab 13**: Reset button works but I want to tinker with it some more.  I think I'll have to refactor my code if I want it to allow the user to immediately start clicking on pictures again without refreshing.  Right now it causes some console errors because the picture ids are cleared and my render image function can't grab onto them to generate new pictures. 

Also, reading over more documentation for CSS Grid is great.  It really helps to have a more targeted approach.