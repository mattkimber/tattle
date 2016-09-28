module.exports = function(intents) {
    return {
        getIntent: function(input) {
            var tokens = input.toLowerCase().split(" ")

            for(var i in intents) {
                if(tokens.find((token) => intents[i].tokens.includes(token))) {
                    return i
                }
            }
        },
        getIntentWithParameters: function(input) {
            var intent = this.getIntent(input)
            var parameters = intents[intent].parameters
            
            var returnValue = {
                intent: intent,
                parameters: {}
            }

            var tokens = input.toLowerCase().split(" ")

            for(var p in parameters) {
                var tokenLocation = -1

                for(var t in parameters[p].tokens) {
                    var index = tokens.findIndex((token) => token == parameters[p].tokens[t])

                    if(index != -1 && tokens[index + 1]) {
                        returnValue.parameters[p] = tokens[index + 1]
                    }                    
                }
            }

            return returnValue
        },
        getHelpMessage: function() {
            var response = ""

            for(var i in intents) {
                response += (response ? "\r\n" : "") + i + ": "
                response += intents[i].tokens[0]

                for(var p in intents[i].parameters) {
                    response += " " + intents[i].parameters[p].tokens[0] + " "
                    response += "[" + p + "]"                     
                }            
            }

            return response
        }
    }
}