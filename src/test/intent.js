var assert = require("assert")

var tattle = require("../")

describe("Intent parsing", function() {

    var intents = {
        flight: {
            tokens: [ "flight", "flights" ]
        },
        lounge: {
            tokens: [ "lounge", "lounges" ],
            parameters: {
                airport: {
                    tokens: [ "airport", "in" ],
                    isMandatory: true
                },
                terminal: {
                    tokens: [ "terminal" ]
                }
            }
        }
    }


    it("should parse an intent from a text string", function() {
        var bot = tattle(intents)
        
        var result = bot.getIntent("find me lounges in Gatwick")

        assert.equal(result, "lounge")
    })

    it("should not return an intent when one is not matched", function() {
        var bot = tattle(intents)
        
        var result = bot.getIntent("find me a spoon")

        assert.equal(result, null)
    })

    it("should parse intent parameters from a text string", function() {
        var bot = tattle(intents)

        var result = bot.getIntentWithParameters("find me lounges in Gatwick")

        assert.equal(result.parameters.airport, "gatwick")
        assert.equal(result.isValid, true)
    })

    it("should parse multiple parameters from a text string", function() {
        var bot = tattle(intents)

        var result = bot.getIntentWithParameters("find me lounges in Gatwick terminal S")

        assert.equal(result.parameters.airport, "gatwick")        
        assert.equal(result.parameters.terminal, "s")
        assert.equal(result.isValid, true)
    })

    it("should mark an intent as invalid when parameters are missing", function() {
        var bot = tattle(intents)

        var result = bot.getIntentWithParameters("find me lounges")

        assert.equal(result.isValid, false)

    })
})