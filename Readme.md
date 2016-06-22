### Task:

Create a web app (desktop or mobile) that provides a query box and a search button
and then calls the Places Library for Google Maps (https://developers.google.com/
maps/documentation/javascript/places). Format the results to give a good user
experience.

### Functionality ideas

- do NOT make it look just like the example in the docs. Boring and not
  representative of my skills (hence didn't plot search results on a map).
- Make use of browser's "current location"
- Demonstrate thoroughness by covering all edge cases I can think of

### Focus:

Focused on making components as modular/independent of each other as possible,
trying to make a single object do one job.

Split out components into separate files to simulate how in real codebase I would
use something like es6 require syntax to include only necessary bits for each page.

Did not spend much time styling things up because I'm no designer (but I am good
with css, given a mock I can make it look pixel-perfect quite quickly).

### User guide

Would work from a file downloaded to your computer.
Also hosted on github pages - https://istro.github.io/challenge-1

When opening the file, user is prompted to allow using current location.
A. that request is denied:
  - user is presented with an input for location, search button is disabled.
  - when location is entered & user tabs or clicks on search input - location coordinates are fetched via ajax from google (spinner icon shown next to location, upon success a checkmark icon is shown & search is enabled)
  - after entering search query (e.g. coffee), search can be performed by hitting "enter" or clicking search button
  - multiple searches can be performed, location can be changed.
B. Request to access browser location is granted.
  - all functionality described in previous option is still available, user is presented with an input for location, search button is disabled.
  - browser location is queried. On success, heading is changed to "near you", search is enabled (unless the location input was focused - i.e. user was typing a custom location name)
  - little links to toggle between using browser location ("near me") or custom location ("somewhere else") are displayed.
  - multiple suearches can be performed, using current location or specified location.

### Tests:

I was going to write Mocha tests (with SinonJS for async stuff) for externally
exposed attributes and functions of individual components - it's not too
complicated once you have things set up, alas I've already spent more time than
allotted, so I'll leave it without tests.
