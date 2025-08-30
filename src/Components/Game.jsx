import React, { useState, useEffect, useCallback } from 'react';
import styles from './Game.module.css';

const Game = () => {
  const [gameState, setGameState] = useState('waiting'); // waiting, playing, paused, finished
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds = 1 minute
  const [currentScore, setCurrentScore] = useState(0);
  const [totalWinnings, setTotalWinnings] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [targetScore, setTargetScore] = useState(400); // Set initial target score
  const [jokes, setJokes] = useState([]);
  const [selectedJoke, setSelectedJoke] = useState(null);
  const [showJoke, setShowJoke] = useState(false);

  // New joke data structure with everyday life jokes - balanced scoring
  const allJokes = [
    { id: 1, text: "Yesterday I decided to run 5 kilometers. I ran… with my eyes on the map.", points: 80 },
    { id: 2, text: "Bought smart scales. Now they know my weight and my secrets.", points: 85 },
    { id: 3, text: "My fridge started closing the door by itself. Maybe it's ashamed of me in front of the neighbors.", points: 90 },
    { id: 4, text: "Installed a 'Meditation' app. Now I meditate while it loads.", points: 95 },
    { id: 5, text: "They say sports are life. That's why I live slowly to enjoy it longer.", points: 100 },
    { id: 6, text: "Ordered sushi, but the courier got lost. Says he needs GPS even for the fridge.", points: 105 },
    { id: 7, text: "My neighbor bought an electric car. Now we all know when his power goes out.", points: 110 },
    { id: 8, text: "My cat looks at me like I owe her bowl money.", points: 115 },
    { id: 9, text: "Nothing motivates home renovation like a new crack in the ceiling.", points: 120 },
    { id: 10, text: "Read a book on self-organization… postponed finishing it till tomorrow.", points: 125 },
    { id: 11, text: "Got a fitness tracker. It counts my steps from bed to fridge.", points: 130 },
    { id: 12, text: "Tried to understand cryptocurrency. Now I have two tokens and zero friends who get it.", points: 135 },
    { id: 13, text: "Set my alarm for 6:00. Woke up at 5:59 — now I hate technology.", points: 140 },
    { id: 14, text: "Bought a smart speaker. It listens to me more than my family does.", points: 145 },
    { id: 15, text: "They say laughter prolongs life. That's why I read utility bills daily.", points: 150 },
    { id: 16, text: "My friend decided to be an optimist. Even when his car won't start, he says: 'Hey, at least I'm saving gas!'", points: 155 },
    { id: 17, text: "Signed up for a gym. Now I train my willpower by not going.", points: 160 },
    { id: 18, text: "When a computer freezes, it's just meditating.", points: 165 },
    { id: 19, text: "Ordered decaf coffee. Barista said: 'So… water?'", points: 170 },
    { id: 20, text: "They say money doesn't smell. But my wallet smells like tears.", points: 175 },
    { id: 21, text: "My phone updated itself. Maybe I'll upgrade someday too.", points: 180 },
    { id: 22, text: "Opened the fridge — the light's on. There's still hope in this world.", points: 185 },
    { id: 23, text: "Sold my alarm clock. Now life wakes me up with bills.", points: 190 },
    { id: 24, text: "My neighbor says he loves sleeping. I said, 'Who doesn't?' He said, 'The tax office.'", points: 195 },
    { id: 25, text: "Bought a bicycle. Now I know what a real headwind is.", points: 200 },
    { id: 26, text: "Placed my Wi-Fi router in the center of the apartment. Now the bad signal is equal everywhere.", points: 205 },
    { id: 27, text: "My dog fears the vacuum cleaner. Probably thinks it's a robot invader.", points: 210 },
    { id: 28, text: "They say the early bird gets the worm. I'm not a bird, bring me coffee.", points: 215 },
    { id: 29, text: "In the rain, my umbrella only opens halfway. It's protesting.", points: 220 },
    { id: 30, text: "Bought a smart kettle. It only boils when it feels like it.", points: 225 },
    { id: 31, text: "My friend started morning runs. He says he catches taxis faster now.", points: 230 },
    { id: 32, text: "Read that laughter reduces stress. Now I laugh at bank interest rates.", points: 235 },
    { id: 33, text: "Got a swimming pool membership. Now I have a place where I don't swim.", points: 240 },
    { id: 34, text: "I have a life plan. It's in draft mode and without deadlines.", points: 245 },
    { id: 35, text: "Watched a motivational film. Now I'm motivated to postpone work till tomorrow.", points: 250 },
    { id: 36, text: "My cat thinks the whole apartment is her bed and I'm just visiting.", points: 255 },
    { id: 37, text: "Bought a coffee maker with a timer. Now it knows when I want to live.", points: 260 },
    { id: 38, text: "Neighbor says he works out. I only see his phone charging.", points: 265 },
    { id: 39, text: "My hobby is buying books. Sometimes I even read the covers.", points: 270 },
    { id: 40, text: "Bought running shoes. Now I run… from responsibilities.", points: 275 },
    { id: 41, text: "My dog greets me more happily than people do. She doesn't know how much I owe the bank.", points: 280 },
    { id: 42, text: "In the subway they said 'watch your belongings'. I hid my sandwich from myself.", points: 285 },
    { id: 43, text: "Bought smart scales. They said: 'One for all, and all on a diet!'", points: 290 },
    { id: 44, text: "Neighbor made renovations and calls it 'Euro-level'. I call it 'neighbor's noise.'", points: 295 },
    { id: 45, text: "Signed up for English classes. Now I know the word 'deadline' in three languages.", points: 300 },
    { id: 46, text: "Got noise-cancelling headphones. Now I can't hear my money disappearing.", points: 305 },
    { id: 47, text: "They say laughter prolongs life. I prolonged it with a bank loan.", points: 310 },
    { id: 48, text: "My alarm rings at 7:00. I ring at 10:00.", points: 315 },
    { id: 49, text: "I decided to run every morning. Now I run… through TV series.", points: 320 },
    { id: 50, text: "They say love is chemistry. Explains pharmacy prices.", points: 325 }
  ];

  // Balanced target scores for each round - easier to pass
  const roundTargets = [400, 600, 800, 1000, 1200];

  // Initialize game
  const initializeRound = useCallback(() => {
    setCurrentScore(0);
    setTimeLeft(60);
    setGameState('playing');
    
    // Set target score for current round
    const target = roundTargets[currentRound - 1] || roundTargets[roundTargets.length - 1];
    setTargetScore(target);
    
    // Select 4 random jokes
    const shuffled = [...allJokes].sort(() => 0.5 - Math.random());
    setJokes(shuffled.slice(0, 4));
    setSelectedJoke(null);
    setShowJoke(false);
  }, [currentRound]);

  // Start new round
  const startNewRound = () => {
    setCurrentRound(prev => prev + 1);
    // Don't call initializeRound here, let useEffect handle it
  };

  // Reset game function
  const resetGame = () => {
    setGameState('waiting');
    setCurrentScore(0);
    setTimeLeft(60);
    setCurrentRound(1);
    setTargetScore(400);
    setJokes([]);
    setSelectedJoke(null);
    setShowJoke(false);
    setTotalWinnings(0);
  };

  // Handle joke selection
  const handleJokeSelect = (joke) => {
    if (showJoke || gameState !== 'playing') return;
    
    setSelectedJoke(joke);
    setShowJoke(true);
    
    // Show joke for 3 seconds, then add points and remove joke
    setTimeout(() => {
      setCurrentScore(prev => prev + joke.points);
      setJokes(prev => prev.filter(j => j.id !== joke.id));
      setShowJoke(false);
      setSelectedJoke(null);
      
      // Check if target reached
      if (currentScore + joke.points >= targetScore) {
        setGameState('finished');
        setTotalWinnings(prev => prev + (roundTargets[currentRound - 1] || 0));
      }
      
      // Check if all jokes are used - end game
      if (jokes.length <= 1) {
        setTimeout(() => {
          setGameState('finished');
        }, 1000);
      }
    }, 3000);
  };

  // Timer effect
  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('finished');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  // Effect to handle round changes
  useEffect(() => {
    if (currentRound > 1) {
      initializeRound();
    }
  }, [currentRound, initializeRound]);

  // Debug effect to prevent infinite loops
  useEffect(() => {
    console.log('Game State:', gameState);
    console.log('Current Round:', currentRound);
    console.log('Target Score:', targetScore);
    console.log('Current Score:', currentScore);
    console.log('Time Left:', timeLeft);
    console.log('Jokes Count:', jokes.length);
  }, [gameState, currentRound, targetScore, currentScore, timeLeft, jokes.length]);

  // Safety check to prevent game from hanging
  useEffect(() => {
    if (gameState === 'playing' && jokes.length === 0 && timeLeft > 0) {
      console.warn('Game state inconsistency detected, resetting...');
      resetGame();
    }
  }, [gameState, jokes.length, timeLeft]);

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle game end
  const handleGameEnd = () => {
    if (currentScore >= targetScore) {
      // Player won - show happy Zelensky
      return (
        <div className={`${styles.gameEnd} ${styles.won}`}>
          <div className={styles.zelenskyContainer}>
            <img 
              src="/img/funny_zelya.png" 
              alt="Happy Zelensky" 
              className={styles.zelenskyImage}
              onError={(e) => {
                console.error('Failed to load happy Zelensky image');
                e.target.style.display = 'none';
              }}
            />
          </div>
          <h2>🎉 Congratulations! You won!</h2>
          <p>Your score: {currentScore} points</p>
          <p>Target was: {targetScore} points</p>
          <p className={styles.zelenskyMessage}>
            "Ha-ha-ha! These jokes are really funny! Thank you for making me laugh! 
            Ready to continue the game and tell me more jokes?"
          </p>
          <div className={styles.gameEndButtons}>
            <button onClick={startNewRound} className={styles.btnPrimary}>
              Continue Game
            </button>
            <button onClick={() => window.location.href = '/'} className={styles.btnSecondary}>
              Take Winnings
            </button>
          </div>
        </div>
      );
    } else {
      // Player lost - show sad Zelensky
      return (
        <div className={`${styles.gameEnd} ${styles.lost}`}>
          <div className={styles.zelenskyContainer}>
            <img 
              src="/img/sad_zelya.png" 
              alt="Sad Zelensky" 
              className={styles.zelenskyImage}
              onError={(e) => {
                console.error('Failed to load sad Zelensky image');
                e.target.style.display = 'none';
              }}
            />
          </div>
          <h2>😔 Game Over!</h2>
          <p>Your score: {currentScore}</p>
          <p>Target was: {targetScore}</p>
          <p className={styles.zelenskyMessage}>
            "Thank you for coming and telling these jokes! Although we didn't reach the goal, 
            you still made my day brighter. Try again!"
          </p>
          <button onClick={() => window.location.href = '/'} className={styles.btnPrimary}>
            Go Home
          </button>
        </div>
      );
    }
  };

  return (
    <div className={styles.gameContainer}>
      {/* Header with timer and target */}
      <div className={styles.gameHeader}>
        <div className={styles.gameInfo}>
          <div className={styles.roundInfo}>
            <span className={styles.roundLabel}>Round {currentRound}</span>
            <span className={styles.targetScore}>Target: {targetScore} points</span>
          </div>
          <div className={styles.currentScore}>
            <span className={styles.scoreLabel}>Your points:</span>
            <span className={styles.scoreValue}>{currentScore}</span>
          </div>
        </div>
        
        <div className={styles.timerContainer}>
          <div className={styles.timerLabel}>Time left:</div>
          <div className={styles.timer}>{formatTime(timeLeft)}</div>
        </div>

        {/* Debug/Reset button */}
        <button 
          onClick={resetGame} 
          className={styles.resetButton}
          title="Reset Game (Debug)"
        >
          🔄 Reset
        </button>
      </div>

      {/* Game content */}
      {gameState === 'waiting' && (
        <div className={styles.gameStart}>
          <div className={styles.zelenskyContainer}>
            <img 
              src="/img/default_zelya.png" 
              alt="Zelensky" 
              className={styles.zelenskyImage}
              onError={(e) => {
                console.error('Failed to load default Zelensky image');
                e.target.style.display = 'none';
                // Add fallback text
                const fallback = document.createElement('div');
                fallback.textContent = '🎭 Zelensky';
                fallback.className = styles.zelenskyFallback;
                e.target.parentNode.appendChild(fallback);
              }}
            />
          </div>
          <h1>🎭 Funny Jokes Game</h1>
          <p>You have 1 minute to score {targetScore} points!</p>
          <p>Choose 4 jokes and score maximum points.</p>
          <p className={styles.zelenskyMessage}>
            "Hello! I'm Zelensky, the head of this project. I love listening to funny jokes! 
            Tell me the best ones, and we'll laugh together!"
          </p>
          <button onClick={initializeRound} className={styles.btnStart}>
            Start Game
          </button>
        </div>
      )}

      {gameState === 'playing' && (
        <div className={styles.gameContent}>
          {/* Background Zelensky listening attentively */}
          <div className={styles.backgroundZelensky}>
            <img 
              src="/img/default_zelya.png" 
              alt="Zelensky listening" 
              className={styles.backgroundZelenskyImage}
              onError={(e) => {
                console.error('Failed to load background Zelensky image');
                e.target.style.display = 'none';
              }}
            />
            <p className={styles.listeningMessage}>"I'm listening carefully..."</p>
          </div>
          
          <div className={styles.jokesGrid}>
            {jokes.map((joke) => (
              <div
                key={joke.id}
                className={`${styles.jokeCard} ${selectedJoke?.id === joke.id ? styles.selected : ''}`}
                onClick={() => handleJokeSelect(joke)}
              >
                <div className={styles.jokeText}>
                  {joke.text}
                </div>
                {/* Points are hidden - only show when joke is selected */}
                {selectedJoke?.id === joke.id && showJoke && (
                  <div className={styles.jokePoints}>+{joke.points} points</div>
                )}
              </div>
            ))}
          </div>
          
          {jokes.length === 0 && (
            <div className={styles.noJokes}>
              <p>All jokes used! Game ending...</p>
            </div>
          )}
        </div>
      )}

      {gameState === 'finished' && handleGameEnd()}

      {/* Total winnings display */}
      {totalWinnings > 0 && (
        <div className={styles.totalWinnings}>
          <span>Total winnings: {totalWinnings} UAH</span>
        </div>
      )}
    </div>
  );
};

export default Game; 