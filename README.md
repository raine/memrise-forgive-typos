# MemriseForgiveTypos.user.js

Shows an alert box ***once*** if the [Levenshtein
distance](http://en.wikipedia.org/wiki/Levenshtein_distance) of a given
answer and the correct answer is 1 or 2.

I'm not a big fan of making a hack like this but at the same time I don't
think you should be punished for accidental typos as Memrise currently does.
Use at your own peril.

![](https://raw.github.com/raneksi/memrise-forgive-typos/gh-pages/demo.gif)

# Installation

I have tested the userscript on Chrome and Firefox using Greasemonkey.

## Firefox

1. Install [Greasemonkey][greasemonkey].
2. Open [MemriseForgiveTypos.user.js][raw-script] and click **Install**.

## Chrome

### Method 1 (Recommended)

This method provides automatic updates for the script.

1. Install [Tampermonkey extension][tampermonkey] on Chrome Store.
2. Open [MemriseForgiveTypos.user.js][raw-script] and click **Install**.

### Method 2

1. Download [MemriseForgiveTypos.user.js][raw-script] to your computer.
2. Go to the extension view in Chrome ([chrome://extensions](chrome://extensions)).
3. Drag the `MemriseForgiveTypos.user.js` file on the extension page. It should say "Drop to install" as you do so.

## Safari

I haven't tried. [Search Google](https://www.google.com/search?q=install+userscripts+safari) for ways to install userscripts.

[raw-script]: https://github.com/raine/memrise-forgive-typos/raw/master/MemriseForgiveTypos.user.js
[tampermonkey]: https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo
[greasemonkey]: https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/
