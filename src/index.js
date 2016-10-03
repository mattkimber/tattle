var getTokens = function(input)
{
    return input
        .toLowerCase()
        .replace(/(?:\r\n|\r|\n)/g, " ")
        .split(" ")
        .filter((val) => val != "")
}

module.exports = function(intents) {
    return {
        getIntent: function(input) {
            var tokens = getTokens(input)

            for(var i in intents) {
                if(tokens.find((token) => intents[i].tokens.includes(token))) {
                    return i
                }
            }
        },
        getIntentWithParameters: function(input) {

            var intent = this.getIntent(input)            
            
            var returnValue = {
                intent: intent,
                parameters: {},
                isValid: true
            }

            if(!intent) {
                return returnValue
            }

            var parameters = intents[intent].parameters
            var tokens = getTokens(input)

            for(var p in parameters) {
                var tokenLocation = -1

                for(var t in parameters[p].tokens) {
                    var index = tokens.findIndex((token) => token == parameters[p].tokens[t])

                    if(index != -1 && tokens[index + 1]) {
                        returnValue.parameters[p] = tokens[index + 1]
                    }                    
                }

                if(parameters[p].isMandatory && !returnValue.parameters[p]) {
                    returnValue.isValid = false
                }
            }

            return returnValue
        },
        getHelpMessage: function(intent) {
            var response = ""

            var intentsArray = intent ? { intent: intents[intent] } : intents;

            for(var i in intentsArray) {
                if(!intent) {
                    response += (response ? "\r\n" : "") + i + ": "                
                }

                response += intentsArray[i].tokens[0]

                for(var p in intentsArray[i].parameters) {
                    response += " " + intentsArray[i].parameters[p].tokens[0] + " "
                    response += "[" + p + "]"                     
                }            
            }

            return response
        }
    }
}