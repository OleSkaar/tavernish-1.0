// 3. On a skill button click, roll two random numbers from -1 to +1. If the result is double, or a previous result is a double of the same type (positive or negative), store the result and prompt user to roll again. If result is not double, add them together with the skill level and any potential previous results, and calculate result.
// Game logic: skill roll
// Data controller: return skill level and store roll result

// 4a. Produce a string that shows the result 

// 4b. If the roll was a double plus or minus, freeze all other buttons from being clickable, show text with previous dice roll and a highlighted text explaining that the roll was double, and create a new button for rolling again. If result is not double, go to 4a

// LOGIC CONTROLLER
var logicController = (function() {
    var prevResult;
    
    return {
        
         skillRoll: function (lvl, skill) {
            
            var dice = logicController.roll();
             
            var output = {
                d1: dice.one,
                d2: dice.two,
                result: dice.one + dice.two,
                prev: prevResult,
                lvl: lvl,
                skill: skill,
                doubleRoll: undefined
            }
            
            console.log('Initial dice roll: ' + dice.one + ' ' + dice.two);
            console.log('prevResult: ' + prevResult);

            if (prevResult === 0 || prevResult === undefined) {

                if (output.result === 2 || output.result === -2) {
                    console.log('Rolled a double: ' + (output.result) + ' Roll again!');
                    
                    prevResult = output.result;
                    console.log(' Prev is now' + prevResult);
                    output.doubleRoll = true;
                    
                    return output

                } else {
                    console.log('Not a double, no previous result. ' + output.result);
                    
                    return output
                }

            } else {

                if (output.result === prevResult) {
                    console.log('Double again! Final result: ' + (output.result * 1.5));
                    
                    output.result = output.result * 1.5;
                    output.doubleRoll = false;
                    prevResult = 0;
                    
                    return output
                    
                } else {
                    console.log('Not a double. Result: ' + prevResult);
                    
                    output.result = prevResult;
                    output.doubleRoll = false;
                    prevResult = 0;
                                        
                    return output
                }
       
            } 
},
        
        roll: function() {
            var dice = {
                one: 0,
                two: 0
            }
            dice.one = Math.floor(Math.random()*3)-1;
            dice.two = Math.floor(Math.random()*3)-1;
            return dice
}, 
        numberRoll: function() {
            var dice = Math.floor(Math.random()*10)+1;
            return dice
        }
    }
    
})()

// DATA CONTROLLER
var dataController = (function() {
    var chars;
    chars = characters;
    
    return {
        
        getURL: function() {
        
            var path = window.location.pathname.split('/')[1].split('.')[0];
            console.log(path);
            
            return path;
            
        },  
            
        loadChar: function(lastname) {
            var char, i;
        
            for (i = 0; i < chars.length; i++) {
                if (chars[i].lastName.toUpperCase() === lastname.toUpperCase()) {
                    char = chars[i];
                }
            }
        
            return char;    
        }
        
    }
    
})();

// UI CONTROLLER

var UIController = (function() {
    
    var DOMstrings = {
        list: 'result',
        name: 'name',
        rank: 'rank',
        poor: '0',
        roll: 'diceRoll',
        nmbrdice: 'numberDice',
        dblbtn: 'doubleRollBtn',
        result: 'result',
        green: 'green',
        orange: 'orange',
        blue: 'blue',
        
    }
    
    var DOMtext = {
        poor: 'Generell',
        doubleButton: 'Trill igjen',
        doubleRoll: function (result, skill) {
            return 'Du trillet ' + result + ' i ' + skill + '. Trill igjen!'
            },
        numberDice: 'd10'
        
    }
    
    var lvls = ['poor', 'average', 'fair', 'good', 'great', 'excellent'];
    
    var HTML = '<header id="header"><h1 id="name"></h1><h2 id="rank"></h2></header><section id="result"><p id="diceRoll"></p></section><section id="5"><p>Fremragende</p></section><section id="4"><p>Dugelig</p></section><section id="3"><p>God</p></section><section id="2"><p>Middels</p></section><section id="1"><p>Måtelig</p></section><section id="0"><p>Dårlig</p><button class = "grey">' + DOMtext.poor + '</button><button class="grey" id="' + DOMstrings.nmbrdice + '">' + DOMtext.numberDice + '</button></section>';
    
    var name;
    

    return {
        
        loadHTML: function() {
            document.getElementById('body').insertAdjacentHTML('beforeend', HTML); 
        },
        
        printNameAndRank: function(char) {
            if (char.middleName === '') {
            name = char.firstName + ' ' + char.lastName;
            } else {
            name = char.firstName + ' ' + char.middleName + ' ' + char.lastName;
            }
            document.getElementById(DOMstrings.name).innerHTML = name;
            
            var rank = char.rank
            document.getElementById(DOMstrings.rank).innerHTML = rank;
        },
        
        printSkills: function(skills, style) {
            var y;
            for (y = 0; y < lvls.length; y++) {
            for (var t = 0; t < skills.length; t++) {
                if (skills[t][lvls[y]]) {
                for (z = 0; z < skills[t][lvls[y]].length; z++) {
                UIController.createButton(y, skills[t][lvls[y]][z], style);
                        }
                    }
                }
            }
        },
        
        createButton: function(id, text, style) {
            
            var section = document.getElementById(id);
            var button = document.createElement('button');
            var node = document.createTextNode(text);
            
            section.appendChild(button);
            button.appendChild(node);
            
            if (style !== undefined) {
                button.classList.add(style);
            }
        }, 
        
        removeEmptyCategories: function() {
            lvls.forEach(function callback(current, index) {
                var el = document.getElementById(index);
                var tag = el.getElementsByTagName('button');
                    if (tag.length === 0) {
                        el.style.display = 'none';
                }
            })
        },
        
        readDice: function (d) {
            if (d === -1) {
                return '[-]'; 
            } else if (d === 0) {
                return '[ ]';
            } else {
                return '[+]';
            }
        },
        
        skillRead: function (n, t, d1, d2, prev) {
            var lvl, el, text, time, br;
            el = document.getElementById(DOMstrings.roll);
            
            
            if (n >= 6) {
                lvl = 'gudommelig';
            } else if (n === 5) {
                lvl = 'fremragende';
            } else if (n === 4) {
                lvl =  'dugelig';
            } else if (n === 3) {
                lvl = 'god';
            } else if (n === 2) {
                lvl = 'middels';
            } else if (n === 1) {
                lvl = 'måtelig';
            } else if (n === 0) {
                lvl = 'dårlig';
            } else if (n === -1) {
                lvl = 'elendig';
            } else if (n === -2) {
                lvl = 'ynkelig';
            } else if (n === -3) {
                lvl = 'nei';
            } else if (n <= -4) {
                lvl = 'tok en Andersen';
            } else {
                return n + ' ' + t + ' is not a valid dice roll';
            }  
            time = UIController.time() + ' | '
            br = '</br> '
            text =  name + ' fikk ' + lvl + ' i ' + t;
            
            if (prev === 0 || prev === undefined) {
                roll = ' (' + UIController.readDice(d1) + UIController.readDice(d2) + ')';
                el.innerHTML = time + br + text + roll;
                return text + roll
            } else {
                prev = UIController.readDice((prev/2));
                roll = ' (' + UIController.readDice(d1) + UIController.readDice(d2) + ' & ' + prev + prev + ')'
                el.innerHTML = time + br + text + roll;
                return text + roll
            }
            
            
        },
        
        time: function() {
            var d = new Date();
            return d.getHours() + ':' + (d.getMinutes()<10?'0':'') + d.getMinutes();
        },
        
        doubleRollText: function(d1, d2, skill) {
            var dice = UIController.readDice(d1) + UIController.readDice(d2);
            document.getElementById(DOMstrings.roll).innerHTML = DOMtext.doubleRoll(dice, skill);
        },
        
        numberRoll: function (roll) {
            var time, text, el;
            
            el = document.getElementById(DOMstrings.roll)
            time = UIController.time() + ' | '
            text = name + ' rolled ' + roll + ' (d10)';
            
            el.innerHTML = time + text;
            
            return text
            
        },
        
        getDOMstrings: function() {
            return DOMstrings;
        },
        
        getDOMtext: function() {
            return DOMtext;
        }
    }
    
})();

// GLOBAL CONTROLLER
var controller = (function(dataCtrl, UICtrl, logCtrl) {
    var DOM = UICtrl.getDOMstrings();
    var DOMtext = UICtrl.getDOMtext();
    
    var setupEventListeners = function() {
        
        var btns = document.querySelectorAll('button');
        
        btns.forEach(function callback(current) {
            if (current.id === DOM.nmbrdice) {
                current.addEventListener('click', function() {
                window.scroll(0,0);
                var dice = logCtrl.numberRoll()
                var text = UICtrl.numberRoll(dice);
                var msg = newMessage(text);
                share(msg);
                sendDiscordWebhook(text)
                })
            } else {
            var lvl = parseInt(current.parentNode.id);
            current.addEventListener('click', (function() {
                return function() {
                    updateAfterRoll(lvl, current.innerHTML);
                    
                }
            })());
            }
        })
    
        };
    
    function sendDiscordWebhook(message) {
        console.log("Sending message to Discord: ")
        console.log(message)
        var request = new XMLHttpRequest(); // create an xmlhttp object
        request.open("GET", "/discord-webhook"); // means GET stuff in there

        // wait for the response
        request.addEventListener("readystatechange", function() {
           // checks if we are ready to read response
           if (this.readyState === 4 && this.status === 200) {
                // do something with response
               console.log("GET request received by  Discord.");
            }

        })       

        //send request
        request.send(message); 
    }
    var toggleButtons = function() {
        
        var btns = document.querySelectorAll('button');
        
        btns.forEach(function callback(current) {
            if (current.disabled === false) {
                current.disabled = true;
            } else {
                current.disabled = false;
            }
        
        });
    };
    
    var newMessage = function (text) {
            return {
            "attachment":{
                "type": "template",
                "payload":{
                    "template_type":"generic",
                    "elements":
                        [{
                        "title":"Result:",
                        "subtitle": text
                        }]  
                    }
                }
            }
        }
    
    var updateAfterRoll = function(lvl, text) {
        window.scroll(0,0);
        var roll, btn; 
        
        // 1. Skill roll
            roll = logCtrl.skillRoll(lvl, text);
            
        // 2. Check if double roll button should be displayed
            if (roll.doubleRoll === true) {
                
                // 2a. If yes, stop other event listeners, create double roll button,
                // and set up event listener for double roll and pass in skill level
                
                UICtrl.doubleRollText(roll.d1, roll.d2, text);
                
                toggleButtons();
                UICtrl.createButton(DOM.result, DOMtext.doubleButton, DOM.blue);
                btn = document.getElementById(DOM.result).getElementsByTagName('button')[0];
            
                    btn.addEventListener('click', (function() {
                        return function() { 
                            updateAfterRoll(lvl, text);
                            }
                    })());                
                          
            } else if (roll.doubleRoll === false) {
                
                // 2b. If not, remove double roll button, and turn on event listeners again
    
                var text = UICtrl.skillRead((roll.result + lvl), text, roll.d1, roll.d2, roll.prev);
                console.log(text);
                var msg = newMessage(text);
                console.log(msg);
                share(msg)
                sendDiscordWebhook(text);
 
                
                var btn = document.getElementById(DOM.result).getElementsByTagName('button')[0];
    
                    btn.parentNode.removeChild(btn);
                    toggleButtons();
                
            } else {
                var text = UICtrl.skillRead((roll.result + lvl), text, roll.d1, roll.d2, roll.prev);
                console.log(text);
                var msg = newMessage(text);
                share(msg);
                sendDiscordWebhook(text);
            }
        }
    
       return {
        init: function() {
            console.log('Character sheet loaded.');
            
            // 1. Load inital HTML
            UICtrl.loadHTML();
            
            // 2. Get character name from URL
            var charname = dataCtrl.getURL();
            
            // 3. Get character
            var char = dataCtrl.loadChar(charname);
            
            // 4. Load the character's name, rank, and skill in each category.
            //    Remove empty categories
            UICtrl.printNameAndRank(char);
            UICtrl.printSkills(char.skills, DOM.green);
            UICtrl.printSkills(char.bioskills, DOM.orange);
            UICtrl.removeEmptyCategories();
            
            // 5. Set up event listeners on each button
            setupEventListeners();
        }
   }

    
})(dataController, UIController, logicController);


controller.init();



    