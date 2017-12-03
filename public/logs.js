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
            
            array.reverse();
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
        table: 'logtable'
    }
    
    return {
        
        fillTable: function(entries) {
            
            var table = document.getElementById(DOMstrings.table);
            table = table.childNodes[1].children;
            
            for (i = 0; i < table.length; i++) {
                table[i].children[0].innerHTML = entries[i].name
                table[i].children[1].innerHTML = entries[i].timestamp
                table[i].children[2].innerHTML = entries[i].text + entries[i].roll
            }
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
            UICtrl.fillTable(entries);
            
                
            });
            

        }
   }

    
})(dataController, UIController);

controller.init();
