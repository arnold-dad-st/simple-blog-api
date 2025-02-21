import { Injectable } from '@nestjs/common';

@Injectable()
export class QuizService {
  private questions = [
    {
      question: "Who directed the 1994 movie 'Pulp Fiction'?",
      options: [
        'Quentin Tarantino',
        'Steven Spielberg',
        'Martin Scorsese',
        'Christopher Nolan',
      ],
      correctOption: 0,
      points: 10,
    },
    {
      question:
        "Which movie features the quote 'I'm gonna make him an offer he can't refuse'?",
      options: ['Goodfellas', 'The Godfather', 'Scarface', 'Casino'],
      correctOption: 1,
      points: 10,
    },
    {
      question: 'What is the highest-grossing movie of all time (as of 2024)?',
      options: ['Avengers: Endgame', 'Titanic', 'Avatar', 'The Lion King'],
      correctOption: 2,
      points: 10,
    },
    {
      question: "Which actor played Jack Dawson in 'Titanic'?",
      options: ['Leonardo DiCaprio', 'Brad Pitt', 'Tom Cruise', 'Matt Damon'],
      correctOption: 0,
      points: 10,
    },
    {
      question: 'Which animated movie features a character named Woody?',
      options: ['Shrek', 'Finding Nemo', 'Toy Story', 'The Incredibles'],
      correctOption: 2,
      points: 10,
    },
    {
      question: "In 'The Matrix', what color pill does Neo take?",
      options: ['Blue', 'Red', 'Green', 'Yellow'],
      correctOption: 1,
      points: 10,
    },
    {
      question: 'Which film won the Best Picture Oscar in 2020?',
      options: ['1917', 'Joker', 'Parasite', 'Once Upon a Time in Hollywood'],
      correctOption: 2,
      points: 10,
    },
    {
      question:
        "Which director is known for movies like 'Inception' and 'Interstellar'?",
      options: [
        'Christopher Nolan',
        'James Cameron',
        'David Fincher',
        'Ridley Scott',
      ],
      correctOption: 0,
      points: 10,
    },
    {
      question: "Which movie features the character 'Tony Montana'?",
      options: ['Scarface', 'The Godfather', 'Heat', 'Goodfellas'],
      correctOption: 0,
      points: 10,
    },
    {
      question:
        "Which sci-fi film features the line 'Houston, we have a problem'?",
      options: ['Gravity', 'Interstellar', 'Apollo 13', 'The Martian'],
      correctOption: 2,
      points: 10,
    },
    {
      question: "Which actor played the Joker in 'The Dark Knight'?",
      options: [
        'Joaquin Phoenix',
        'Heath Ledger',
        'Jack Nicholson',
        'Jared Leto',
      ],
      correctOption: 1,
      points: 10,
    },
    {
      question:
        'Which movie is set in the fictional African nation of Wakanda?',
      options: [
        'Coming to America',
        'Black Panther',
        'The Lion King',
        'Blood Diamond',
      ],
      correctOption: 1,
      points: 10,
    },
    {
      question:
        "What is the name of the hobbit played by Elijah Wood in 'The Lord of the Rings'?",
      options: [
        'Bilbo Baggins',
        'Frodo Baggins',
        'Samwise Gamgee',
        'Pippin Took',
      ],
      correctOption: 1,
      points: 10,
    },
    {
      question: 'Which movie features a DeLorean time machine?',
      options: [
        'The Terminator',
        'Back to the Future',
        'Men in Black',
        'Blade Runner',
      ],
      correctOption: 1,
      points: 10,
    },
    {
      question: "Which famous phrase is from 'The Terminator'?",
      options: [
        'May the Force be with you',
        "You can't handle the truth",
        "I'll be back",
        'Why so serious?',
      ],
      correctOption: 2,
      points: 10,
    },
    {
      question: "Which actress played Katniss Everdeen in 'The Hunger Games'?",
      options: [
        'Emma Watson',
        'Scarlett Johansson',
        'Jennifer Lawrence',
        'Anne Hathaway',
      ],
      correctOption: 2,
      points: 10,
    },
    {
      question: 'Which movie is about a man reliving the same day repeatedly?',
      options: ['Edge of Tomorrow', 'Inception', 'Groundhog Day', 'Looper'],
      correctOption: 2,
      points: 10,
    },
    {
      question: "Which director made the 'Kill Bill' movies?",
      options: [
        'Quentin Tarantino',
        'Robert Rodriguez',
        'Guy Ritchie',
        'Tim Burton',
      ],
      correctOption: 0,
      points: 10,
    },
    {
      question: "What is the name of Batman's butler?",
      options: ['Jarvis', 'Alfred', 'Wilson', 'James'],
      correctOption: 1,
      points: 10,
    },
    {
      question: 'Which movie franchise features the character Ethan Hunt?',
      options: [
        'James Bond',
        'Mission: Impossible',
        'Fast & Furious',
        'Bourne',
      ],
      correctOption: 1,
      points: 10,
    },
    {
      question: "Which movie has the song 'Let It Go'?",
      options: ['Moana', 'Frozen', 'Tangled', 'Encanto'],
      correctOption: 1,
      points: 10,
    },
    {
      question: 'Which Star Wars movie is the first in chronological order?',
      options: [
        'A New Hope',
        'The Phantom Menace',
        'The Empire Strikes Back',
        'Revenge of the Sith',
      ],
      correctOption: 1,
      points: 10,
    },
    {
      question: 'Which horror movie features a clown named Pennywise?',
      options: ['Halloween', 'It', 'The Conjuring', 'The Exorcist'],
      correctOption: 1,
      points: 10,
    },
    {
      question: 'Which actor voices Shrek?',
      options: ['Eddie Murphy', 'Mike Myers', 'Jim Carrey', 'Robin Williams'],
      correctOption: 1,
      points: 10,
    },
    {
      question: "Which film features the fictional band 'Stillwater'?",
      options: [
        'School of Rock',
        'Almost Famous',
        'Bohemian Rhapsody',
        'That Thing You Do!',
      ],
      correctOption: 1,
      points: 10,
    },
    {
      question: "Which movie features the character 'Tyler Durden'?",
      options: ['The Fight Club', 'American Psycho', 'Se7en', 'The Machinist'],
      correctOption: 0,
      points: 10,
    },
    {
      question: 'Which Pixar movie is about a rat who wants to become a chef?',
      options: ['Finding Nemo', 'Up', 'Ratatouille', 'Monsters, Inc.'],
      correctOption: 2,
      points: 10,
    },
    {
      question: 'Which war movie features the beach landing at Normandy?',
      options: ['Dunkirk', 'Saving Private Ryan', 'Hacksaw Ridge', 'Fury'],
      correctOption: 1,
      points: 10,
    },
    {
      question:
        "Which movie features a group of criminals known as 'The Suicide Squad'?",
      options: ['The Dark Knight', 'The Suicide Squad', 'Sin City', 'Watchmen'],
      correctOption: 1,
      points: 10,
    },
    {
      question: 'Which movie features a DeLorean time machine?',
      options: [
        "Bill & Ted's Excellent Adventure",
        'Back to the Future',
        'The Time Machine',
        'Interstellar',
      ],
      correctOption: 1,
      points: 10,
    },
  ];

  getQuestions(limit: number) {
    const shuffled = [...this.questions].sort(() => Math.random() - 0.5);

    return shuffled.slice(0, Math.min(limit, 30));
  }
}
