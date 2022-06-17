export async function generateFactoryState(address) {
  return `{
  "podcasts": [],
  "superAdmins": [
    "vZY2XY1RD9HIfWi8ift-1_DnHLDadZMWrufSh-_rKF0",
    "kaYP9bJtpqON8Kyy3RbqnqdtDBDUsPTQTNUCvZtKiFI"
  ],
  "maintainers": [],
  "contractOwner": "${address}",
  "ownerSwapped": false,
  "limitations": {
    "podcast_name_len": {
      "min": 2,
      "max": 500
    },
    "podcast_desc_len": {
      "min": 10,
      "max": 15000
    },
    "author_name_len": {
      "min": 2,
      "max": 150
    },
    "lang_char_code": {
      "min": 2,
      "max": 2
    },
    "categories": {
      "min": 1,
      "max": 300
    },
    "episode_name_len": {
      "min": 3,
      "max": 500
    },
    "episode_desc_len": {
      "min": 1,
      "max": 5000
    }
  }
}`;
}
