import React from 'react';
import styles from './style.module.css';

function Card({ values, infected }) {
    const concat = (class1, class2) => `${class1} ${class2}`

    const title = Object.keys(values)[0];
    const total = values[title];
    const classname = styles[title] || null;
    const percentageRate = Math.floor((total * 100) / infected);
    const text = {
        recovered: "recovery",
        deaths: "fatality"
    };

    return (
        <div className={styles.cards}>
            <h4 className={styles.title}>{title}</h4>
            <span className={ concat(styles.total, classname) }>{total.toLocaleString()}</span>

            { classname &&
                <span className={ concat(styles.percentage, classname) }>
                    {percentageRate}% {text[title]} rate
                </span>
            }
        </div>
    )
}

export default Card;
