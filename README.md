# Deck of Cards
This is an application to create decks of cards and order it with a giving rotation card.

## Project setup
After cloning the project the first command you must run is the following.
```
npm install
```

### Compiles and hot-reloads
Now you're ready to compile and run the application with the command below.
After you did it the application can be acessed in http://localhost:8080/
```
npm run serve
```

### Run application tests
You can run application tests with the command below.
```
npm run test:unit
```

### Explore the application
The application has two paths, one to create a deck of cards and choose one rotate card (#/deck/new) and another one to show your submitted deck where you can sort by the rotate card and the input order or you can just see a submitted deck given the deck_ids (in this format -> deck_id,rotate_card_deck) (#/deck/:deck_ids).
The field card name can be inputed with a two character string. The first character must be a suit card and the second one must be a value card. The available values ate these:
1. Suits: Hearts (H), Diamonds (D), Clubs (C), and Spades (S)
2. Values: 2, A, K, Q, J, 0, 9, 8, 7, 6, 5, 4, 3 (0 means 10)

Input examples: AS, 9D, 0C, JH

You cannot repeat any card card name adding to your deck but the rotation card can be a card that you already have in your deck.
The rotation card you choose defines wich cards are going to be the strongests considering suits taking precedence over card values.
Enjoy it!

