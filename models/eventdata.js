const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchema = new Schema(
    {
        eventId: {
            type: Schema.Types.ObjectId,
            ref: 'event',
            required: true
        },
        fields: [{
            fieldId: {
                type: Schema.Types.ObjectId,
                ref:'field',
                required: true
            },
            value: [{
                type: String,
                required: true
            }]
        }
        ]

    }
)
module.exports = mongoose.model("eventdata", dataSchema);