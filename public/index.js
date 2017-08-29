/*
From node: 
1a. If user opens app from messenger, get user ID, go to step 2

In the app:
1b. Load the names of all characters, print to the UI with a link to that character (step 2)
*/

// DATA CONTROLLER
var dataController = (function() {
    var chars;
    
    chars = characters;
    
    return {
        
    loopChars: function(psid) {
        var uri;
        
        chars.map(function (current) {
            if (current.id == psid) {
                uri = current.lastName;
            }
            })
        
        return uri
            
        },
    
    loadCharNames: function() {
        var names;
    
        
        names = chars.map (function (current) {
             return {
                fn: current.firstName,   
                ln: current.lastName
            };
            })
        
        return names;    
        
        }
    }
    
})();

// UI CONTROLLER

var UIController = (function() {
    
    var DOMstrings = {
        list: 'result',
        links: 'links'
    }


    return {
    
        printNames: function(names) {

                names.forEach (function(current) {
                    var name, para;
                    name = '<h2><a href= "./' + (current.ln.toLowerCase()) + '.html">' + current.fn + ' ' + current.ln + '</a></h2>';
                    para = document.getElementById(DOMstrings.list);
                    para.insertAdjacentHTML('afterbegin', name);

                    });      
        
        }
    }
    
})();

// GLOBAL CONTROLLER
var controller = (function(dataCtrl, UICtrl) {
       
    
       return {
        init: function() {
            console.log('Application has started.');
            
            // 1. Load the names of all characters
            var names = dataCtrl.loadCharNames();
            
            // 2. Print the names to the UI with URLs
            UICtrl.printNames(names);

        }
   }

    
})(dataController, UIController);


