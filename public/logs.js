/*

Display the 50 most recent log entries from log.json.

*/

// DATA CONTROLLER
var dataController = (function() {
    
    return {
        
        getJSON: function() {
            var url, req, res;
            url = '/log.json'
            req = new XMLHttpRequest();
            req.open('GET', url);
            req.responseType = 'json';
            req.send();
            req.onload = function() {
                res = req.response    
            }
            return res
        }
        
    }
    
})();

// UI CONTROLLER

var UIController = (function() {
    
    var DOMstrings = {
        log: 'log',
    }
    
})();

// GLOBAL CONTROLLER
var controller = (function(dataCtrl, UICtrl) {
       
       return {
        init: function() {
            console.log('Log page loaded.');
            
            // 1. Load the JSON file
            var file = dataCtrl.getJSON()
            console.log(file);
            

        }
   }

    
})(dataController, UIController);


