## TODO

### GAME LOGIC AND DESIGN

- change pointer particle to brick's borders on collision.
- particles radius should have a fixed scale with bricks widths.
- on projectile collision with the middle of the bricks, both should decrease weight and projectile shouldn't detect collision on corners (which it does at the moment).
- draw emitted projectiles' tales when they are on the move.
- record and score should be aligned to right.
- pointer dashes are smaller and closer to each other in the original game.

### GAME START AND GAME OVER

- game start borders pixels animation. (still not quit right)
- game over animation and new game card.

### GAME OPTIONS

- 3 lines icon (just like the original game) with the additional option of controlling the game speed.
- emit projectile margin should depend on the projectile velocity coefficient, cause if we lower velocity, it'll break.
- add show/hide fps ability in settings.
- add swipe/click option in settings.
- add sounds.
- control the thickness of pointer or wether it being dashed or not in the settings as a bonus to the features this version has compared to the original.

### GAME RESIZE AND REPOSITION

- prevent the top-border from colliding with score and record by not decreasing it's value once reaches a certain amount.
- makes sure the projectile will never leave the screen under no circumstances.
- change to swipe mode when width is lower than certain amounts, and go back to click mode when higher than that.
- repoSize on tab movement (dropped into another screen and etc).
- change projectile velocity based on canvas width.
- repoSize at any given circumstances (whether anything is moving or not).
- the wider the screen width is, the higher the velocities should be.
- the wider the screen width is, the less the min-angle and the more the max-angle should be (or should it?).

### GAME STATE (LOCALSTORAGE)

- save everything in LocalStorage.
- display game introduction if it's the first time one is playing it (swipe for mobile and click for desktop, detect from screen width).
- check for memory leaks and clear them through out the whole app.

### GAME DEPLOYMENT

- add 'keywords' and 'description' and 'author' meta tags.
- represent myself as game's developer in some cool way (show JALAL HAMED in console or something).
- go through all the game's structure again and try to make the best possible protocol for every module and shit. (refactoring method's names and functionality, re-thinking motions directory maybe.. see for yourself if this is the best version of the game structure that you would want to show the world as an open source project. see if it is your kind of piece of art. specially take another look at the games flow which is currently mostly handled with object's modes).
- add statistic reports to see how many people play the game daily and where are they from and...
- github README (define used abbreviations too. e.g. BaB => Brick(s) and Bonus(es), calc => calculate)

---

## BUGS

- bonus straight merge bug.
- bricks pieces color on collapse bug.
- brick's color would sometimes stuck onto fade from the projectile hit (related to the 999 max value of the game's counter)
- still projectiles find a way through inside of the bricks!
- projectile hits the exact target shown by the pointer only and only if it's velocities coefficient is 1. in another words the velocity alters the end destination of projectiles.
