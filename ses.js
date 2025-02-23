const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "eu-west-1",
});

module.exports.sendEmail = function (to, text, subj) {
    return ses
        .sendEmail({
            Source: "Bolder Dahlia <bolder.dahlia@spicedling.email>",
            Destination: {
                ToAddresses: ["alessandra.lega@gmail.com"],
            },
            Message: {
                Body: {
                    Text: {
                        Data: text,
                    },
                },
                Subject: {
                    Data: subj,
                },
            },
        })
        .promise()
        .then(() => console.log("it worked!"))
        .catch((err) => console.log("error in sendEmail: ", err));
};
