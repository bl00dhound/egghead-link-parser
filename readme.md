# Egghead.io courses downloader.

This is a node.js application for downloading courses from [egghead.io](https://egghead.io).
App receives file with course's links and downloads all videos, sorting them into folders according course's name. I've tested this app only on Linux (Ubuntu 16.04).

#### Requirements:
- just newest version of [node.js](https://nodejs.org) (not older than 7.3.x).

#### To get started:
- `git clone git@github.com:bl00dhound/egghead-link-parser.git`
- `cd egghead-link-parser`
- `npm install`

#### To download course(s):
1. Go to [egghead.io](https://egghead.io)
2. Go to page of course that you need and right-click on **Rss**:
    [image](https://github.com/bl00dhound/egghead-link-parser/blob/develop/images/1.jpg)
3. Click on `Copy link address` in the menu:
    [image](https://github.com/bl00dhound/egghead-link-parser/blob/develop/images/2.jpg)
4. Create text-file `rss-links.txt` in any folder where you need to download courses.
5. Paste link that was copied in created text-file. You can add many links of any courses (in text-file those links must begin with new line).
6. Run application:
    `npm start /path_to_destination_folder/rss-links.txt`
7. Done!


License: MIT.
