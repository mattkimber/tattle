var assert = require("assert")

var tattle = require("../")

describe("Help message functionality", function() {

    var intents = {
        example1: {
            tokens: ["example", "notused"],
            parameters: {
                place: {
                    tokens: [ "in" ]
                }
            }
        },
        example2: {
            tokens: ["example2"]
        }
    }

    it("should return a help message with all options", function(){

        var bot = tattle(intents)
        
        var result = bot.getHelpMessage()

        assert.equal(result, "example1: example in [place]\r\nexample2: example2")
    })

    it("should return a help message for a specific intent", function() {
        var bot = tattle(intents)

        var result = bot.getHelpMessage("example1")

        assert.equal(result, "example in [place]")
    })
})