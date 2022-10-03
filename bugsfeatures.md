After testing the below doesn't work...
- User can inject code because of use of innerHTML

If the website can be restored with crtl+t the next day, would the website have the same date and data? (not be reloaded)

Would that mean that in addStreak() the streak should be checked again?

Consider making better animations. lol

Widgets:

Calender

Reminder

Time

Add pane in specific positions

Extra text is made into divs and disapear because first time they are SAVED as divs second time they are ADDED as divs and third they are not added because they are seperate to p as div

*/
/*

When blue button is pressed twice, make size of pane back to original

The ||| is just empty configs so when you refer to a config you can just use a specific index

Reward system:

Streak of 50 - Yay (button)

When yay pressed give confetti and popup with a reward if the user adds rewards for example breaks

Popup to show due today

Filter panes

On topbar have button that shows all your due stuff

Or at the topbar there is a bunch of buttons that contain the sections

Floating title and description (seperate)

Span one pane to fit the entire screen

When cookies are set, new Date() gives the date in two days accourding to console.log()????

New Items don't follow colors and other styles from the inputs

Restore original inputs to default value

When you enter a new line and paste, font size is changed
(Div is created)
https://stackoverflow.com/questions/2176861/javascript-get-clipboard-data-on-paste-event-cross-browser/2177059#2177059

Restore old pane feature (save to oldPane storage and access when needed)

Heights are inconsistent

Color pickers don't support rgba or transparent hexs, workaround used is opacity

Blur doesn't work, maybe because it doesn't work on opacque elements

Add goal

Consider using typescript and react

Instead of addpane(), you can do:

<div id="allpanes">
<pane>
</div>

function Pane(props) {
  return <div class="{props.class}">
  <pre>{props.title}</pre>
  <pre>{props.description}</pre>
  </div>;
}

ReactDOM.render(<pane />, document.getElementsByTagName('body')[0])

const streak = <h1>Streak: {getCookie('streak')}</h1>

Work on new item select

Use a phantom background instead of the pane background

Ability to enter the localStorage to load the site

Make date in setcookie also include minutes and seconds

You can't store innerText spaces in plaintext and therefore you can't enter the localItems because the spaces won't register

When working with sections, addpane doesn't account for rounded corners, etc

Consider using a class to automate JSON packing and unpacking

Reward system

Update popup

Popup to motivate user

Implement extra

If width and height do not exceed constraints, put pane in original size (like reload)

Add comments and tips for contributers

Put getData and e function in seperate files

Create function to automate removing elements (notably for the section functions, etc)

Addsection can replace a section if the randnum is the same

Slow animation for mql.matches

If data is disabled, then either don't allow user to use site or don't use localstorage

Using longerPane on all the panes at window onload doesn't work (doesn't mimick when pane is inputed)

Add section if section is undefined (tryed to implement but doesn't work)

Add a bar with all the labels to filter through panes

Add tutorial on site

When clicking on inputs, the inputs does a animation that extends to the right
and opposite when clicking out

Background image

ON UNSUPPORTED browers:
Turn all settings into a image that looks blurrred

Create palettes

Deleteing a section (in other section) saves wrong section

Text formating

Goals (text goals)

Settings rework

Progress for list items

More labels

Dashboard