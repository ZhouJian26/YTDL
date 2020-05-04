# YTDL

A JS script to download Audio or Video from different website (included YouTube).

## Install

Clone the repo and install all modules

`> npm i`

## Use

To download a video
`> node . (url)`

or to download a specific format
`> node . (url) FORMAT`

**FORMAT**

- mp4
- m4a
- mp3
- ogg
- wav
- webm
- aac
- 3gp
- flv

### Example

This download a video from the url  
`> node . https://www.youtube.com/watch?v=4Q46xYqUwZQ`

This download **Only Audio** from the url  
`> node . https://www.youtube.com/watch?v=4Q46xYqUwZQ m4a`

## Note

Those scripts are based on `youtube-dl`
