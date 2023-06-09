# multicw

**multi**-**c**ountdo**w**n is a simple countdown timer for multiple events.

Rushed, written during GPN21 to keep track of talks and events.

Notifications only work on Linux with `notify-send` installed.

Außerdem ist es nur auf Deutsch.

## Installation

```
git clone https://github.com/infi/multicw
cd multicw
npm install -g
```

## Usage

```
multicw (list|add|remove|watch)

list: List all events
add <name> <js-date-string>: Add a new event
remove <id>: Remove an event
watch: Watch all events. Send a notification when an event is happening. Will spam notifications until stopped.
```
