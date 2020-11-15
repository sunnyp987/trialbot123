<div align="center">

# 7-Day-Trial Bot

[Installation](#Installation) • [How to Use](#How-to-Use)

---

## Installation

</div>

##### Prerequisite

- To use this bot, Node.js 12.0.0 or newer must be [installed](https://nodejs.org/en/download/).

##### Downloading and installing steps

1.  **[Download](https://github.com/jay1934/7-Day-Trial/archive/main.zip)** the `zip` file.

2.  Configure the Bot:

    - Run `npm i`
    - You will need to [create a bot application](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot) in the **[developers space](https://discordapp.com/developers/applications/me)**
    - Replace the placeholders in [`config.json`](/config.json) with your preffered settings (more on this in the [How To Use](#How-to-Use) section).

3.  Invite the Bot to your Server:

    - In your bot's application page, navigate to [OAUTH2](https://discord.com/developers/applications/771430839250059274/oauth2)
    - In the "scopes" section, select `bot`
    - In the "bot permission" section, select:

      - `ADMINISTRATOR`

      This will account for permissions needed on all three features.

    - Copy and paste the generated invite link!

4.  Get the Bot Online
    - Run `node index.js`
    - **The bot is now operational ! 🎉**

<br>

---

<div align="center">

## How to Use

</div>

### Configuration

First, you have to enter the correct values in [`config.json`](/config.json). Most of the properties require you to get the ID of a role role, message, or channel. Please read [this article](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-) to learn how to get that data.

```js
{
  "joinRoleID": "", // role that should be assigned on join
  "trialRoleID": "", // role that should be assigned after reacting
  "messageID": "", // message to react to
  "channelID": "", // channel the message is in
  "emojiID": "", // emoji ID or name (more on this below)
  "token": "" // your bot's token
}
```

---

### Emoji ID

The `emojiID` property can be a bit confusing, because it differs if the emoji is unicode rather to custom. Unicode emoji are default in Discord, such as `:x:`, while custom emojis are created per-server.

<br>

Here's a gif that shows how to get the "ID" for both options.

![](/assets/get_id_or_name.gif)

An example of a unicode emoji id is: ✅, and an example of a custom emoji id is: `704670075667611648`

---

### Usage

When the bot restarts/goes online, it will:

- Remove all reactions from the message specified in [`config.json`](/config.json)
- React to the message with the emoji specified in [`config.json`](/config.json)
- Listen for _that_ reaction on _that_ message

When someone reacts to that emoji on that message, it will:

- Remove that reaction immediately
- Check the ID of the user against the array of IDs of users who have already used their trial (if a match is found, DM the user that they already used up their trial)
- Add the user to the array of IDs
- Remove the joined role specified in [`config.json`](/config.json) and replace it with the trial role (specified in the same place)
- Start a timer till the end of the trial, and add it to the database so it can continue counting through a restart
