const { App } = require("@slack/bolt");


const app = new App({
    token: "xoxp-3172215028145-3161931853348-5660607399105-73b9b034314954dd57e418493201ba79", //Find in the Oauth  & Permissions tab
    signingSecret: "3f8391654e2e054ff2a4ff020f3bbe6e", // Find in Basic Information Tab
    socketMode:true,
    appToken: "xapp-1-A03QW37RM6Y-5641310079478-56050209e40c02bf562c93e5b50bab186416ea338cddffa3b51462833c2fa9e5" // Token from the App-level Token that we created
});

(async () => {
    await app.start();
    console.log('⚡️ Bolt app started');
  })();

app.command("/clean", async ({ command, ack, say, client }) => {
    try {
      await ack();
      let txt = command.text // The inputted parameters
      // Store conversation history
        let conversationHistory;
        // ID of channel you watch to fetch the history for
        let channelId = "C05JLNGSW15";

        try {
        // Call the conversations.history method using WebClient
        const result = await client.conversations.history({
            channel: channelId
        });

        conversationHistory = result.messages;

        conversationHistory.splice(0, parseInt(txt));
        conversationHistory.forEach(async (h) => {
            try {
                // Call the chat.delete method using the WebClient
                const result = await client.chat.delete({
                  channel: channelId,
                  ts: h.ts,
                  as_user: true
                });
                console.log(result);
              }
              catch (error) {
                console.error(error);
              }
        })
        }
        catch (error) {
        console.error(error);
        }
    } catch (error) {
      console.log("err")
      console.error(error);
    }
});

// app.start(3000)