/*

Display the 50 most recent log entries from log.json.

*/

// DATA CONTROLLER
var dataController = (function() {
    
    return {
        
        getJSON: function(callback) {
        
            var url, req, res;
            url = '/log.json'
            req = new XMLHttpRequest();
 
            req.responseType = 'json';
            req.onload = function() {
                callback(req.response);
            }
            
            req.open('GET', url, true);
            req.send();   
            
            
        },
        
        getFirstEntries: function(array) {
            
            var firstentries = [];
            
            for (i = 0; i < 50; i++) {
                firstentries.push(array[i])
            }
        
            return firstentries
        }
        
                
    }
    
})();

// UI CONTROLLER

var UIController = (function() {
    
    var DOMstrings = {
        log: 'log',
    }
    
    return {
        
        loopTable: function(table) {
            
            table.forEach
        }
    }
    
})();

// GLOBAL CONTROLLER
var controller = (function(dataCtrl, UICtrl) {
       
       return {
        init: function() {
            console.log('Log page loaded.');
            
            // 1. Load the JSON file
            dataCtrl.getJSON(function(response) {
                
            //2. Get the 50 first entries
            var entries = dataCtrl.getFirstEntries(response);
            
            //3. Fill in the table    
            var section = document.getElementById('logtable'); 
                
                
                
                
            });
            

        }
   }

    
})(dataController, UIController);

controller.init();
