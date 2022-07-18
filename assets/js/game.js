//fight or skip function
var fightOrSkip = function() {
    //ask player if they would like to fight or run
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    // conditional recursive function call
    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid asnwer! Please try again.");
        return fightOrSkip();
    }

    promptFight = promptFight.toLowerCase();

    //if player chooses to skip confirm and then stop loop
    if (promptFight === "skip" || promptFight === "SKIP") {
        //confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        //if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            //subtract money from playerInfo.money for skipping
            playerInfo.money = playerInfo.money - 10;
            console.log("playerInfo.money", playerInfo.money);
            
            // return true if the player wants to leave
            return true;
        }
    }

    return false;
};

//fight function (with parameter for enemy names)
var fight = function(enemy) {
    while(playerInfo.health > 0 && enemy.health > 0) {
        // ask player if they'd like to ifhg to rksip using fightoRskipa funciotn
        if (fightOrSkip()) {
            //if true, leave fight by breaking loop
            break;
        };

        //Subtract the value of 'playerInfo.attack' from the value of 'enemy.health' and use that result to update the value in the 'enemy.health' variable
        //generate random damage value based on player's attack power
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
        
        enemy.health = Math.max(0, enemy.health - damage);
        console.log(
            playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
        );

        //check enemy's health
        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died!");

            //award player money for winning
            playerInfo.money = playerInfo.money + 20;

            //leave while() loop since enemy is dead
            break;
        }
        else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }

        //Subtract the value of 'enemy.attack' from the value of 'playerInfo.health' and use that result to update the value in the 'playerInfo.health' variable
        var damage = randomNumber(enemy.attack - 3, enemy.attack);
        
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        console.log(
            enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
        );

        //check player's health
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
            //leave while() loop if player is dead
            break;
        }
        else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
    }//end of while loop
};//end of fight function

// function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1)) + min;

    return value;
}; //end of randomNumber function

// function to set name
var getPlayerName = function() {
    var name = "";

    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }

    console.log("Your robot's name is " + name);
    return name;
};

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        } else {
            window.alert("You don't have enough money!");
        }
    }
};

var enemyInfo = [
    {
        name: "Impostor",
        attack: randomNumber(10, 14)
    },
    {
        name: "Sussy",
        attack: randomNumber(10, 14)
    },
    {
        name: "Su Gnoma",
        attack: randomNumber(10, 14)
    }
];

console.log(playerInfo.name, playerInfo.attack, playerInfo.health, playerInfo.money);

console.log(enemyInfo.name);
console.log(enemyInfo.length);

//function to start a new game
var startGame = function() {
    //reset player stats
    playerInfo.reset();

    //fight each enemy-robot by looping and fighting them one at a time
    for(var i = 0; i < enemyInfo.length; i++) {
        //if player is still alive, keep fighting
        if (playerInfo.health > 0) {
            //let player know which round they are in; arrays start at 0, so 1 needs to be added to it
            window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ) );

            //pick new enemy to fight based on the index of the enemy.names array
            var pickedEnemyObj = enemyInfo[i];
        
            //reset enemy.health before starting new fight
            pickedEnemyObj.health = randomNumber(40, 60);
        
            //debugger to pause script and check on events in code
            //debugger;
        
            //pass the pickedEnemy.name variable's value into the fight function, where it will asusme the value of the enemy.name parameter
            fight(pickedEnemyObj);

            //if we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                //ask if the player wants to use the store before the next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                //if yes, take them to the store() function
                if (storeConfirm) {
                    shop();
                }
            }
        }
        //if player isn't alive,, stop the game
        else {
            window.alert("You have lost your robot in battle! Game Over");
            break;
        }
    }//end of for loop

    //after loop ends, player is either out of health or enemies to fight, so run the endGame function
    endGame();
};//end of startGame function

//function to end the entire game
var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");
    //if player is still alive, player wins!
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    } else {
        window.alert("You've lost your robot in battle.");
    }
    //ask the plaayer if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        //restart the game
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back again soon!");
    }
};//end of endGame function

//shop function
var shop = function() {
    //ask the player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );

    //use switch to carry out action
    switch (shopOptionPrompt) {
        case "REFILL": //new case
        case "refill":
            playerInfo.refillHealth();

            break;
        case "UPGRADE": //new case
        case "upgrade":
            playerInfo.upgradeAttack();

            break;
        case "LEAVE": //new case
        case "leave":
            window.alert("Leaving the store.");

            //do nothing, so the function will end
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");

            //call shop() again to force player to pick a valid option
            shop();
            break;
    }
};//end shop function

//starts the game on page refresh
startGame();