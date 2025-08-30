import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
    return (
        <div className={styles.homeContainer}>
            <div className={styles.homeContent}>
                <div className={styles.heroSection}>
                    <h1 className={styles.heroTitle}>
                        🎭 Funny Jokes Game
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Play, laugh and win money!
                    </p>
                    <div className={styles.heroDescription}>
                        <p>
                            You have 1 minute to choose the funniest jokes and score points. 
                            Each joke has its own value - choose wisely!
                        </p>
                        <p>
                            Score points and pass rounds with bigger winnings. 
                            But remember - time is limited!
                        </p>
                    </div>
                </div>

                <div className={styles.gameRules}>
                    <h2>📋 Game Rules</h2>
                    <div className={styles.rulesGrid}>
                        <div className={styles.ruleCard}>
                            <div className={styles.ruleIcon}>⏰</div>
                            <h3>Timer</h3>
                            <p>You have 1 minute for each round</p>
                        </div>
                        <div className={styles.ruleCard}>
                            <div className={styles.ruleIcon}>🎯</div>
                            <h3>Target</h3>
                            <p>Score the required number of points to win</p>
                        </div>
                        <div className={styles.ruleCard}>
                            <div className={styles.ruleIcon}>😄</div>
                            <h3>Jokes</h3>
                            <p>Choose 4 jokes with different values</p>
                        </div>
                        <div className={styles.ruleCard}>
                            <div className={styles.ruleIcon}>💰</div>
                            <h3>Winnings</h3>
                            <p>Each next round - bigger winnings!</p>
                        </div>
                    </div>
                </div>

                <div className={styles.prizeInfo}>
                    <h2>🎯 Round Targets</h2>
                    <div className={styles.prizeList}>
                        <div className={styles.prizeItem}>
                            <span className={styles.prizeRound}>Round 1</span>
                            <span className={styles.prizeAmount}>400 points</span>
                        </div>
                        <div className={styles.prizeItem}>
                            <span className={styles.prizeRound}>Round 2</span>
                            <span className={styles.prizeAmount}>600 points</span>
                        </div>
                        <div className={styles.prizeItem}>
                            <span className={styles.prizeRound}>Round 3</span>
                            <span className={styles.prizeAmount}>800 points</span>
                        </div>
                        <div className={styles.prizeItem}>
                            <span className={styles.prizeRound}>Round 4</span>
                            <span className={styles.prizeAmount}>1,000 points</span>
                        </div>
                        <div className={styles.prizeItem}>
                            <span className={styles.prizeRound}>Round 5</span>
                            <span className={styles.prizeAmount}>1,200 points</span>
                        </div>
                    </div>
                </div>

                <div className={styles.prizeInfo}>
                    <h2>🏆 Prize Amounts</h2>
                    <div className={styles.prizeList}>
                        <div className={styles.prizeItem}>
                            <span className={styles.prizeRound}>Round 1</span>
                            <span className={styles.prizeAmount}>1,000 UAH</span>
                        </div>
                        <div className={styles.prizeItem}>
                            <span className={styles.prizeRound}>Round 2</span>
                            <span className={styles.prizeAmount}>5,000 UAH</span>
                        </div>
                        <div className={styles.prizeItem}>
                            <span className={styles.prizeRound}>Round 3</span>
                            <span className={styles.prizeAmount}>10,000 UAH</span>
                        </div>
                        <div className={styles.prizeItem}>
                            <span className={styles.prizeRound}>Round 4</span>
                            <span className={styles.prizeAmount}>20,000 UAH</span>
                        </div>
                        <div className={styles.prizeItem}>
                            <span className={styles.prizeRound}>Round 5</span>
                            <span className={styles.prizeAmount}>50,000 UAH</span>
                        </div>
                    </div>
                </div>

                <div className={styles.startGameSection}>
                    <Link to="/game" className={styles.startGameBtn}>
                        🚀 Start Game
                    </Link>
                    <p className={styles.startGameNote}>
                        Ready to laugh and win? Click the button!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home; 