$(document).ready(function() {
  var attackingCharacter;
  var defendingCharacter;
  var selectedCharacter;
  var currentEnemy;
  var enemiesRemaining = 3;

  // Default state of reset button: hidden
  $('#reset-button').hide();

  // Take a copy of the current DOM for reset
  var reset = $('#reset').clone();

  // Define playable character objects
  var characters = [
    {
      id: 'darth-maul',
      name: 'Darth Maul',
      hp: 180,
      ap: 6,
      baseap: 6,
      cap: 25
    },
    {
      id: 'darth-sidious',
      name: 'Darth Sidious',
      hp: 150,
      ap: 5,
      baseap: 5,
      cap: 20
    },
    {
      id: 'obiwan-kenobi',
      name: 'Obi-Wan Kenobi',
      hp: 145,
      ap: 8,
      baseap: 8,
      cap: 4
    },
    {
      id: 'luke-skywalker',
      name: 'Luke Skywalker',
      hp: 135,
      ap: 10,
      baseap: 10,
      cap: 5
    }
  ];

  // Attack
  function Attack(attackingCharacter, defendingCharacter) {
    // Decrease attacking characters hp by defending characters counter ap
    attackingCharacter.hp -= defendingCharacter.cap;

    // Decrease defending characters hp by attacking characters ap
    defendingCharacter.hp -= attackingCharacter.ap;

    // Increase attacking characters "experience" by increasing ap by base ap
    attackingCharacter.ap += attackingCharacter.baseap;

    // Check to win-lose conditions
    if (enemiesRemaining > 0) {
      if (attackingCharacter.hp <= 0) {
        $('#status').text('You have been defeated...GAME OVER!');

        // Make reset button available
        $('#reset-button').show();
      } else if (defendingCharacter.hp <= 0) {
        // Reduce enemy count by 1
        enemiesRemaining -= 1;
        console.log('Enemies Remaining: ' + enemiesRemaining);

        if (enemiesRemaining <= 0) {
          $('#status').text('YOU WON!!!! GAME OVER!!!');

          // Remove defeated character from the game
          $('#' + defendingCharacter.id).remove();
          currentEnemy = '';

          // Make reset button available
          $('#reset-button').show();
        } else {
          $('#status').text(
            'You have defeated ' +
              defendingCharacter.name +
              ', you can choose to fight another enemy.'
          );

          // Remove defeated character from the game
          $('#' + defendingCharacter.id).remove();
          currentEnemy = '';
        }
      } else {
        $('#status').text(
          'You attacked ' +
            defendingCharacter.name +
            ' for ' +
            (attackingCharacter.ap - attackingCharacter.baseap) +
            ' damage. ' +
            defendingCharacter.name +
            ' attacked you back for ' +
            defendingCharacter.cap +
            ' damage.'
        );

        // Update attacking characters hp
        $('#' + attackingCharacter.id + '-hp').text(
          'HP: ' + attackingCharacter.hp
        );

        // Update defending characters hp
        $('#' + defendingCharacter.id + '-hp').text(
          'HP: ' + defendingCharacter.hp
        );
      }
    }
  }

  // Select character
  function SelectCharacter(characterID) {
    // Check to see if character is already selected
    if (!selectedCharacter) {
      // Assign the selected character
      selectedCharacter = characterID;

      // Loop through all characters and assign all but the selected characters as enemies
      for (var i = 0; i < characters.length; i++) {
        if (characters[i].id !== selectedCharacter) {
          $('#' + characters[i].id).appendTo('#enemies');

          // Change background to red
          $('#' + characters[i].id).addClass('bg-danger');
        }
      }
    } else if (!currentEnemy && selectedCharacter !== characterID) {
      // Move selected character to defender slot
      $('#' + characterID).appendTo('#defender');
      $('#' + characterID).addClass('bg-dark');

      // Set the current defender
      currentEnemy = characterID;

      // Clear any status text
      $('#status').text('');
    }
  }

  // Respond to character click
  function AssignClick() {
    $('.character').click(function() {
      SelectCharacter(this.id);
    });
  }

  AssignClick();

  // Reset the game
  function AssignReset() {
    $('#reset-button').click(function() {
      // Reset characters to their initial state
      characters = [
        {
          id: 'darth-maul',
          name: 'Darth Maul',
          hp: 180,
          ap: 6,
          baseap: 6,
          cap: 25
        },
        {
          id: 'darth-sidious',
          name: 'Darth Sidious',
          hp: 150,
          ap: 5,
          baseap: 5,
          cap: 20
        },
        {
          id: 'obiwan-kenobi',
          name: 'Obi-Wan Kenobi',
          hp: 145,
          ap: 8,
          baseap: 8,
          cap: 4
        },
        {
          id: 'luke-skywalker',
          name: 'Luke Skywalker',
          hp: 135,
          ap: 10,
          baseap: 10,
          cap: 5
        }
      ];

      // Reset all variables to their initial state
      attackingCharacter = undefined;
      defendingCharacter = undefined;
      selectedCharacter = undefined;
      currentEnemy = undefined;
      enemiesRemaining = 3;

      // Reset DOM to initial state
      $('#reset').replaceWith(reset.clone());

      // Assign event handlers to objects
      AssignClick();
      AssignFight();
      AssignReset();
    });
  }

  AssignReset();

  // Fight
  function AssignFight() {
    $('#fighting').click(function() {
      // Assign the attacking character
      switch (selectedCharacter) {
        case 'darth-maul':
          attackingCharacter = characters[0];
          break;
        case 'darth-sidious':
          attackingCharacter = characters[1];
          break;
        case 'obiwan-kenobi':
          attackingCharacter = characters[2];
          break;
        case 'luke-skywalker':
          attackingCharacter = characters[3];
          break;
      }

      // Assign the defending character
      switch (currentEnemy) {
        case 'darth-maul':
          defendingCharacter = characters[0];
          break;
        case 'darth-sidious':
          defendingCharacter = characters[1];
          break;
        case 'obiwan-kenobi':
          defendingCharacter = characters[2];
          break;
        case 'luke-skywalker':
          defendingCharacter = characters[3];
          break;
      }

      // Attack
      if (currentEnemy) {
        Attack(attackingCharacter, defendingCharacter);
      }
    });
  }

  AssignFight();
});
